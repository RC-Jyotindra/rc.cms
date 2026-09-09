'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { HeroContent } from '@/types/hero'
import { revalidatePath } from 'next/cache'

export async function getHero(slug: string = 'home'): Promise<HeroContent | null> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .eq('page_slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Error fetching hero:', error.message)
    return null
  }
  return data
}

export async function getAllHeroes(): Promise<HeroContent[]> {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('hero_content')
    .select('*')
    .order('updated_at', { ascending: false })

  if (error) {
    console.error('Error fetching all heroes:', error.message)
    return []
  }
  return data || []
}

export type HeroInput = {
  id?: string
  page_slug: string
  text_banner: string
  banner_image_url: string
  main_header: string
  description_header: string
  primary_button_label: string
  primary_button_url: string
  secondary_button_label: string
  secondary_button_url: string
  is_published: boolean
}

export async function upsertHero(input: HeroInput) {
  // Use admin client so Server Actions bypass RLS for single-admin dashboard
  const supabase = createAdminClient()

  const payload = {
    page_slug: input.page_slug || 'home',
    text_banner: input.text_banner,
    banner_image_url: input.banner_image_url,
    main_header: input.main_header,
    description_header: input.description_header,
    primary_button_label: input.primary_button_label,
    primary_button_url: input.primary_button_url,
    secondary_button_label: input.secondary_button_label,
    secondary_button_url: input.secondary_button_url,
    is_published: input.is_published,
    updated_at: new Date().toISOString(),
  }

  let result
  if (input.id) {
    result = await supabase
      .from('hero_content')
      .update(payload)
      .eq('id', input.id)
      .select()
      .single()
  } else {
    result = await supabase
      .from('hero_content')
      .upsert(payload, { onConflict: 'page_slug' })
      .select()
      .single()
  }

  if (result.error) {
    console.error('Error saving hero:', result.error.message)
    return { success: false, error: result.error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  revalidatePath('/admin/edit')
  return { success: true, data: result.data as HeroContent }
}

export async function uploadBannerImage(formData: FormData) {
  const file = formData.get('file') as File | null
  if (!file) {
    return { success: false, error: 'No file provided' }
  }

  const supabase = createAdminClient()
  const fileExt = file.name.split('.').pop()
  const fileName = `banner-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  const { error: uploadError } = await supabase.storage
    .from('banners')
    .upload(fileName, buffer, {
      contentType: file.type,
      upsert: true,
    })

  if (uploadError) {
    console.error('Error uploading image:', uploadError.message)
    return { success: false, error: uploadError.message }
  }

  const { data: { publicUrl } } = supabase.storage
    .from('banners')
    .getPublicUrl(fileName)

  return { success: true, publicUrl }
}

export async function deleteHero(id: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('hero_content')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin')
  return { success: true }
}

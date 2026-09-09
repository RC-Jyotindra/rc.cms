import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export const runtime = 'nodejs'

// Maximum file size: 10MB
const MAX_FILE_SIZE = 10 * 1024 * 1024

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No image file provided' },
        { status: 400 }
      )
    }

    // Validate MIME type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { success: false, error: 'Uploaded file must be an image (JPEG, PNG, WebP, SVG, etc.)' },
        { status: 400 }
      )
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: `Image size exceeds the 10MB limit (file is ${(file.size / (1024 * 1024)).toFixed(1)}MB)` },
        { status: 400 }
      )
    }

    const supabase = createAdminClient()
    const fileExt = file.name ? file.name.split('.').pop()?.toLowerCase() : 'png'
    const fileName = `banner-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('banners')
      .upload(fileName, buffer, {
        contentType: file.type || 'image/png',
        upsert: true,
      })

    if (uploadError) {
      console.error('[API /api/upload] Supabase storage error:', uploadError.message)
      return NextResponse.json(
        { success: false, error: `Supabase Storage error: ${uploadError.message}` },
        { status: 500 }
      )
    }

    const { data: { publicUrl } } = supabase.storage
      .from('banners')
      .getPublicUrl(fileName)

    return NextResponse.json({
      success: true,
      publicUrl,
      fileName,
    })
  } catch (error: any) {
    console.error('[API /api/upload] Unexpected upload error:', error)
    return NextResponse.json(
      { success: false, error: error.message || 'An unexpected error occurred during image upload' },
      { status: 500 }
    )
  }
}

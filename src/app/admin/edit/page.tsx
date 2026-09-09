import { getHero } from '@/app/actions/hero'
import { HeroEditorForm } from '@/components/cms/HeroEditorForm'

export const dynamic = 'force-dynamic'

interface EditPageProps {
  searchParams: Promise<{ slug?: string }>
}

export default async function AdminEditPage({ searchParams }: EditPageProps) {
  const { slug = 'home' } = await searchParams
  const hero = await getHero(slug)

  return <HeroEditorForm initialData={hero} />
}

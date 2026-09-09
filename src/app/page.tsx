import { getHero } from '@/app/actions/hero'
import { HeroSection } from '@/components/hero/HeroSection'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const hero = await getHero('home')

  return (
    <main className="min-h-screen bg-white">
      <HeroSection content={hero} showAdminBadge={true} />
    </main>
  )
}

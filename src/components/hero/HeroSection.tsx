import { HeroContent } from '@/types/hero'
import { TextBanner } from './TextBanner'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface HeroSectionProps {
  content?: Partial<HeroContent> | null
  showAdminBadge?: boolean
}

export function HeroSection({ content, showAdminBadge = true }: HeroSectionProps) {
  const textBanner = content?.text_banner ?? 'New to Google Ads? Choose an offer to earn up to ₹20,000 in ad credit.'
  const mainHeader = content?.main_header ?? 'Drive Growth and Reach Customers with Smart Advertising'
  const descriptionHeader = content?.description_header ?? 'Get your business in front of customers right when they are searching for what you offer on Google Search and Maps.'
  const primaryLabel = content?.primary_button_label ?? 'Start Now'
  const primaryUrl = content?.primary_button_url ?? '#'
  const secondaryLabel = content?.secondary_button_label ?? 'Explore Offers'
  const secondaryUrl = content?.secondary_button_url ?? '#'
  const bannerImage = content?.banner_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80'

  return (
    <div className="relative min-h-[580px] flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Simple Top Navigation Bar: Name + Button */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 h-15 flex items-center justify-between">
          <a href="#" className="font-bold text-lg text-slate-900 tracking-tight">
            Ads Portal
          </a>
          <a
            href={primaryUrl}
            className="inline-flex items-center justify-center px-5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-xs transition-colors"
          >
            {primaryLabel}
          </a>
        </div>
      </header>

      {/* Top Text Banner */}
      {textBanner && <TextBanner text={textBanner} />}

      {/* Hero Body */}
      <div className="relative flex-1 flex items-center justify-center px-6 lg:px-12 py-16 lg:py-20 border-b border-slate-100">
        <div className="relative mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left / Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 text-left">
            {/* Campaign Category Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 border border-blue-200/80 px-2.5 py-1 text-xs font-medium text-blue-800">
              <span>Google Ads Partner Campaign</span>
            </div>

            {/* Main Header */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15]">
              {mainHeader}
            </h1>

            {/* Description Header */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-xl">
              {descriptionHeader}
            </p>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {primaryLabel && (
                <a
                  href={primaryUrl}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm transition-colors shadow-xs"
                >
                  <span>{primaryLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              )}

              {secondaryLabel && (
                <a
                  href={secondaryUrl}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium text-sm transition-colors"
                >
                  <span>{secondaryLabel}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
                </a>
              )}
            </div>

            {/* Trust Signals */}
            <div className="pt-4 flex items-center gap-4 text-xs text-slate-500 border-t border-slate-200 w-full">
              <div>Verified Partner</div>
              <span className="text-slate-300">•</span>
              <div>No Setup Fees</div>
              <span className="text-slate-300">•</span>
              <div>Cancel Anytime</div>
            </div>
          </div>

          {/* Right / Banner Image Showcase */}
          <div className="lg:col-span-5 w-full flex justify-center">
            <div className="relative w-full max-w-md aspect-4/3 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
              {/* Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={bannerImage}
                alt="Campaign Banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Floating CMS Edit Button for preview convenience */}
      {showAdminBadge && (
        <div className="fixed bottom-5 right-5 z-50">
          <a
            href="/admin"
            className="flex items-center gap-2 px-3.5 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs shadow-md border border-slate-700 transition-colors"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>Open CMS Dashboard</span>
          </a>
        </div>
      )}
    </div>
  )
}

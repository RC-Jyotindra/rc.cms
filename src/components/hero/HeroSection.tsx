import { HeroContent } from '@/types/hero'
import { TextBanner } from './TextBanner'
import { ArrowRight, ExternalLink } from 'lucide-react'

interface HeroSectionProps {
  content?: Partial<HeroContent> | null
  showAdminBadge?: boolean
}

export function HeroSection({ content, showAdminBadge = true }: HeroSectionProps) {
  const textBanner = content?.text_banner ?? '[Verified Research Study] Participate in online surveys & earn guaranteed participant honorarium rewards.'
  const mainHeader = content?.main_header ?? 'Share Your Voice & Earn Verified Research Honorariums'
  const descriptionHeader = content?.description_header ?? 'Research Connect USA links qualified participants with leading institutional and corporate research projects. Complete quick surveys and receive legitimate honorariums and gift vouchers for your time.'
  const primaryLabel = content?.primary_button_label ?? 'Start Survey'
  const primaryUrl = content?.primary_button_url ?? '#'
  const secondaryLabel = content?.secondary_button_label ?? 'Study Guidelines'
  const secondaryUrl = content?.secondary_button_url ?? '#'
  const bannerImage = content?.banner_image_url || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80'

  return (
    <div className="relative min-h-[580px] flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Simple Top Navigation Bar: Name + Button */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/80">
        <div className="max-w-6xl mx-auto px-6 h-15 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 font-bold text-base sm:text-lg text-slate-900 tracking-tight">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://res.cloudinary.com/dkwrm0luo/image/upload/v1788947942/logo_g1zdpl.webp"
              alt="Research Connect Logo"
              className="h-7 sm:h-8 w-auto object-contain"
            />
            <span>Research Connect Surveys</span>
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
      {textBanner && (
        <TextBanner
          text={textBanner}
          ctaText={content?.banner_cta_text || 'Participate Now'}
          ctaUrl={primaryUrl}
        />
      )}

      {/* Hero Body */}
      <div className="relative flex-1 flex items-center justify-center px-6 lg:px-12 py-16 lg:py-20 border-b border-slate-100">
        <div className="relative mx-auto max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left / Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-5 text-left">
            {/* Campaign Category Tag */}
            <div className="inline-flex items-center gap-1.5 rounded-md bg-blue-50 border border-blue-200/80 px-2.5 py-1 text-xs font-medium text-blue-800">
              <span>Verified Research Connect Study</span>
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
              <div>ESOMAR Compliant</div>
              <span className="text-slate-300">•</span>
              <div>Guaranteed Honorarium</div>
              <span className="text-slate-300">•</span>
              <div>100% Confidential</div>
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

              {/* Research Studies Overlay */}
              <div className="absolute right-3 bottom-3 w-[55%] max-w-[210px] bg-white rounded-xl p-2 shadow-lg border border-slate-200/80 text-[10px]">
                <div className="flex items-center gap-1.5 bg-slate-100 rounded-lg px-2 py-1 mb-1.5 font-medium text-slate-800 text-[9px]">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                  <span>Available Surveys</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="bg-slate-50 rounded-md p-1 border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=200&q=80" className="w-full h-10 rounded object-cover bg-slate-200" alt="AI & Tech Study" />
                    <div className="font-medium text-slate-900 mt-1 text-[8.5px] truncate">AI &amp; Tech Study</div>
                    <div className="text-blue-600 font-semibold text-[8px]">$30 Honorarium</div>
                    <div className="text-slate-500 text-[7.5px]">⏱ 20 min survey</div>
                  </div>
                  <div className="bg-slate-50 rounded-md p-1 border border-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=200&q=80" className="w-full h-10 rounded object-cover bg-slate-200" alt="Consumer Insights" />
                    <div className="font-medium text-slate-900 mt-1 text-[8.5px] truncate">Consumer Insights</div>
                    <div className="text-blue-600 font-semibold text-[8px]">$25 Honorarium</div>
                    <div className="text-slate-500 text-[7.5px]">⏱ 15 min survey</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Site Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 px-6 lg:px-12 text-slate-600 text-xs mt-auto">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-slate-200">
            {((content?.cards && content.cards.length > 0) ? content.cards : [
              {
                heading: 'Participant Honorarium Policy',
                description: 'Honorariums and gift vouchers are research tokens provided in accordance with ESOMAR international guidelines to thank citizens for their dedicated time. Only qualified, unique, and non-fraudulent submissions are processed.'
              },
              {
                heading: 'Data Protection Standard',
                description: 'We adhere strictly to DPDP Act principles. Personal identifying information (PII) is isolated from survey responses during statistical calculation to safeguard individual participant privacy.'
              },
              {
                heading: 'Institutional Authenticity',
                description: 'Research Connect USA is an independent research consulting collective. We do not sell consumer loans, financial instruments, or physical goods.'
              }
            ]).map((policy, idx) => (
              <div key={idx}>
                <h3 className="font-bold text-slate-900 text-sm mb-2">{policy.heading}</h3>
                <p className="text-slate-600 leading-relaxed text-[12px]">
                  {policy.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pt-2">
            <div>
              <p className="font-bold text-slate-900 text-[12.5px]">
                &copy; 2026 Research Connect USA. All Rights Reserved.
              </p>
              <p className="text-slate-500 text-[11px] mt-0.5">
                CIN: U74140DL2022PTC892110 | Registered Office: Barakhamba Road, Connaught Place, New Delhi 110001, India.
              </p>
            </div>

            <nav className="flex flex-wrap items-center gap-5 text-[12px]">
              <a href="https://www.research-connectllc.com/privacy-policy.php" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline underline-offset-2 hover:text-slate-900">Privacy Policy</a>
              <a href="https://www.research-connectllc.com/terms-of-use.php" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline underline-offset-2 hover:text-slate-900">Terms of Participation</a>
              <a href="https://www.research-connectllc.com/contact-us.php" target="_blank" rel="noopener noreferrer" className="text-slate-700 underline underline-offset-2 hover:text-slate-900">Contact Us</a>
            </nav>
          </div>
        </div>
      </footer>

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

'use client'

import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

interface TextBannerProps {
  text?: string | null
  ctaText?: string
  ctaUrl?: string
}

export function TextBanner({
  text = 'New to Google Ads? Choose an offer to earn up to ₹20,000 in ad credit.',
  ctaText = 'Claim Offer',
  ctaUrl = '#',
}: TextBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible || !text) return null

  return (
    <aside
      aria-label="Announcement"
      className="relative flex items-center justify-between gap-x-4 border-b border-blue-100 bg-blue-50/90 px-4 py-2 text-xs text-blue-950"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mx-auto">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-600 text-white uppercase tracking-wider">
          Offer
        </span>
        <span className="font-normal text-blue-900">{text}</span>
        {ctaText && (
          <a
            href={ctaUrl}
            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:text-blue-900 underline underline-offset-2 ml-1"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="p-1 text-blue-700/70 hover:text-blue-900 rounded hover:bg-blue-100/60 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  )
}

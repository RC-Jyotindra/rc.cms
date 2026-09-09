'use client'

import { useState } from 'react'
import { X, ArrowRight } from 'lucide-react'

interface TextBannerProps {
  text?: string | null
  ctaText?: string
  ctaUrl?: string
}

export function TextBanner({
  text = 'Participate in online surveys & earn guaranteed participant honorarium rewards.',
  ctaText = 'Participate Now',
  ctaUrl = '#',
}: TextBannerProps) {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible || !text) return null

  return (
    <aside
      aria-label="Announcement"
      className="relative flex items-center justify-between gap-x-4 border-b border-pink-200/80 bg-[#fff0f5] px-4 py-2 text-xs text-slate-800"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mx-auto">
        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-[#ff007f] text-white uppercase tracking-wider">
          Offer
        </span>
        <span className="font-normal text-slate-800">{text}</span>
        {ctaText && (
          <a
            href={ctaUrl}
            className="inline-flex items-center gap-1 font-semibold text-[#ff007f] hover:text-[#e0006f] underline underline-offset-2 ml-1"
          >
            <span>{ctaText}</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="p-1 text-pink-700/70 hover:text-pink-900 rounded hover:bg-pink-100/60 transition-colors"
        aria-label="Dismiss banner"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </aside>
  )
}

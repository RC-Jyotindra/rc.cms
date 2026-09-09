'use client'

import { useState, useTransition } from 'react'
import { HeroContent, HeroCard } from '@/types/hero'
import { upsertHero, uploadBannerImage } from '@/app/actions/hero'
import { HeroSection } from '../hero/HeroSection'
import { 
  Save, 
  UploadCloud, 
  Eye, 
  ArrowLeft,
  Globe,
  ExternalLink,
  Check
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'
import Link from 'next/link'

interface HeroEditorFormProps {
  initialData?: HeroContent | null
}

export function HeroEditorForm({ initialData }: HeroEditorFormProps) {
  const [isPending, startTransition] = useTransition()
  const [isUploading, setIsUploading] = useState(false)
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'split'>('split')

  const [formData, setFormData] = useState<Partial<HeroContent>>({
    id: initialData?.id,
    page_slug: initialData?.page_slug || 'home',
    text_banner: initialData?.text_banner ?? '[Verified Research Study] Participate in online surveys & earn guaranteed participant honorarium rewards.',
    banner_cta_text: initialData?.banner_cta_text ?? 'Participate Now',
    banner_image_url: initialData?.banner_image_url ?? 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80',
    main_header: initialData?.main_header ?? 'Share Your Voice & Earn Verified Research Honorariums',
    description_header: initialData?.description_header ?? 'Research Connect USA links qualified participants with leading institutional and corporate research projects. Complete quick surveys and receive legitimate honorariums and gift vouchers for your time.',
    primary_button_label: initialData?.primary_button_label ?? 'Start Survey',
    primary_button_url: initialData?.primary_button_url ?? '#',
    secondary_button_label: initialData?.secondary_button_label ?? 'Study Guidelines',
    secondary_button_url: initialData?.secondary_button_url ?? '#',
    is_published: initialData?.is_published ?? true,
  })

  const DEFAULT_CARDS: HeroCard[] = [
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
    },
  ]

  const [cards, setCards] = useState<HeroCard[]>(
    (initialData?.cards && initialData.cards.length > 0) ? initialData.cards : DEFAULT_CARDS
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleCardChange = (index: number, field: keyof HeroCard, value: string) => {
    setCards((prev) => prev.map((c, i) => i === index ? { ...c, [field]: value } : c))
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Pre-flight client validation
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (PNG, JPG, WebP, SVG)')
      e.target.value = ''
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error(`Image is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Limit is 10MB.`)
      e.target.value = ''
      return
    }

    setIsUploading(true)
    const toastId = toast.loading('Uploading banner image to Supabase...')

    try {
      const data = new FormData()
      data.append('file', file)

      // Upload via dedicated API route to avoid React Server Action payload limits and error masking
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: data,
      })

      const res = await response.json()

      if (response.ok && res.success && res.publicUrl) {
        setFormData((prev) => ({ ...prev, banner_image_url: res.publicUrl }))
        toast.success('Banner image uploaded successfully', { id: toastId })
      } else {
        toast.error(res.error || 'Failed to upload image', { id: toastId })
      }
    } catch (err: any) {
      toast.error(err.message || 'Image upload error', { id: toastId })
    } finally {
      setIsUploading(false)
      // Reset input value so the same file can be selected again if needed
      e.target.value = ''
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      const toastId = toast.loading('Saving configuration...')
      const res = await upsertHero({
        id: formData.id,
        page_slug: formData.page_slug || 'home',
        text_banner: formData.text_banner || '',
        banner_cta_text: formData.banner_cta_text || 'Claim Offer',
        banner_image_url: formData.banner_image_url || '',
        main_header: formData.main_header || '',
        description_header: formData.description_header || '',
        primary_button_label: formData.primary_button_label || '',
        primary_button_url: formData.primary_button_url || '',
        secondary_button_label: formData.secondary_button_label || '',
        secondary_button_url: formData.secondary_button_url || '',
        cards: cards,
        is_published: !!formData.is_published,
      })

      if (res.success && res.data) {
        setFormData((prev) => ({ ...prev, id: res.data.id }))
        toast.success('Configuration saved successfully', { id: toastId })
      } else {
        toast.error(res.error || 'Failed to save', { id: toastId })
      }
    })
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col font-sans antialiased">
      <Toaster position="top-right" />

      {/* Editor Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </Link>
          <span className="text-slate-300">/</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-900">Hero Section Editor</span>
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
              {formData.page_slug}
            </span>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-md border border-slate-200 text-xs">
          <button
            type="button"
            onClick={() => setActiveTab('editor')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === 'editor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Form
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('split')}
            className={`hidden lg:block px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Split
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`px-2.5 py-1 rounded font-medium transition-colors ${
              activeTab === 'preview' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Preview
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>Live Site</span>
          </Link>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{isPending ? 'Saving...' : 'Save changes'}</span>
          </button>
        </div>
      </header>

      {/* Main Split Interface */}
      <div className="flex-1 flex overflow-hidden">
        {/* Editor Form Column */}
        <div
          className={`flex-1 overflow-y-auto p-6 lg:p-8 max-w-2xl bg-white ${
            activeTab === 'preview' ? 'hidden' : 'block'
          } ${activeTab === 'split' ? 'lg:border-r border-slate-200' : 'mx-auto w-full'}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Publication State */}
            <div className="flex items-center justify-between py-3 px-4 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <div className="text-xs font-semibold text-slate-900">Publishing status</div>
                <div className="text-[11px] text-slate-500">Enable to make this hero visible on the public page</div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="is_published"
                  checked={!!formData.is_published}
                  onChange={handleCheckbox}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-600"></div>
                <span className="ml-2.5 text-xs font-medium text-slate-700">
                  {formData.is_published ? 'Published' : 'Draft'}
                </span>
              </label>
            </div>

            {/* Fieldset: Top Announcement Banner */}
            <div className="space-y-3 pt-1">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Top Banner</h3>
                <p className="text-[11px] text-slate-500">Promo ribbon positioned immediately above the hero</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Banner Message
                  </label>
                  <input
                    type="text"
                    name="text_banner"
                    value={formData.text_banner || ''}
                    onChange={handleChange}
                    placeholder="e.g. [Verified Research Study] Participate in online surveys & earn guaranteed honorariums..."
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Banner CTA Text
                  </label>
                  <input
                    type="text"
                    name="banner_cta_text"
                    value={formData.banner_cta_text || ''}
                    onChange={handleChange}
                    placeholder="e.g. Participate Now"
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Fieldset: Main Content */}
            <div className="space-y-3 pt-1">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Headline & Copy</h3>
                <p className="text-[11px] text-slate-500">Primary value proposition and supporting description</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Main Header (H1)
                </label>
                <textarea
                  rows={2}
                  name="main_header"
                  value={formData.main_header || ''}
                  onChange={handleChange}
                  placeholder="e.g. Share Your Voice & Earn Verified Research Honorariums"
                  className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  name="description_header"
                  value={formData.description_header || ''}
                  onChange={handleChange}
                  placeholder="e.g. Research Connect USA links qualified participants with leading research projects..."
                  className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder-slate-400"
                />
              </div>
            </div>

            {/* Fieldset: Action Buttons */}
            <div className="space-y-3 pt-1">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Action Buttons</h3>
                <p className="text-[11px] text-slate-500">Labels and target URLs for call-to-actions</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Primary Button Label
                  </label>
                  <input
                    type="text"
                    name="primary_button_label"
                    value={formData.primary_button_label || ''}
                    onChange={handleChange}
                    placeholder="Start Survey"
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Primary Button Link
                  </label>
                  <input
                    type="text"
                    name="primary_button_url"
                    value={formData.primary_button_url || ''}
                    onChange={handleChange}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Secondary Button Label
                  </label>
                  <input
                    type="text"
                    name="secondary_button_label"
                    value={formData.secondary_button_label || ''}
                    onChange={handleChange}
                    placeholder="Study Guidelines"
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">
                    Secondary Button Link
                  </label>
                  <input
                    type="text"
                    name="secondary_button_url"
                    value={formData.secondary_button_url || ''}
                    onChange={handleChange}
                    placeholder="#offers or https://..."
                    className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400"
                  />
                </div>
              </div>
            </div>

            {/* Fieldset: Banner Image & Storage Upload */}
            <div className="space-y-3 pt-1">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Banner Image</h3>
                <p className="text-[11px] text-slate-500">Upload to Supabase Storage or link an external CDN image</p>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 cursor-pointer transition-colors shadow-xs">
                    <UploadCloud className="w-3.5 h-3.5 text-slate-500" />
                    <span>{isUploading ? 'Uploading to Supabase...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                      className="sr-only"
                    />
                  </label>
                  <span className="text-[11px] text-slate-500">Saved to Supabase &apos;banners&apos; bucket</span>
                </div>

                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Image URL
                </label>
                <input
                  type="text"
                  name="banner_image_url"
                  value={formData.banner_image_url || ''}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 text-xs text-slate-900 placeholder-slate-400"
                />
              </div>

              {formData.banner_image_url && (
                <div className="mt-2 p-2 rounded-md bg-slate-50 border border-slate-200 flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={formData.banner_image_url}
                    alt="Current Banner"
                    className="h-12 w-20 object-cover rounded border border-slate-200"
                  />
                  <div className="overflow-hidden text-[11px]">
                    <span className="font-medium text-slate-700 block">Preview Loaded</span>
                    <span className="text-slate-500 truncate block">{formData.banner_image_url}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Fieldset: Participant Honorarium & Privacy Policies */}
            <div className="space-y-4 pt-1">
              <div className="border-b border-slate-200 pb-2">
                <h3 className="text-xs font-semibold text-slate-900 uppercase tracking-wider">Policy & Privacy Standards</h3>
                <p className="text-[11px] text-slate-500">Edit the 3 policy columns (Participant Honorarium Policy, Data Protection Standard, Institutional Authenticity) displayed in the footer</p>
              </div>

              {cards.map((card, index) => {
                const defaultTitles = [
                  'Participant Honorarium Policy',
                  'Data Protection Standard',
                  'Institutional Authenticity',
                ]
                return (
                  <div key={index} className="p-4 rounded-lg border border-slate-200 bg-slate-50 space-y-3">
                    <div className="text-[11px] font-semibold text-slate-700 uppercase tracking-wider">
                      Policy {index + 1}: <span className="text-slate-900 normal-case font-medium">{defaultTitles[index] || `Policy ${index + 1}`}</span>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Heading / Title
                      </label>
                      <input
                        type="text"
                        value={card.heading}
                        onChange={(e) => handleCardChange(index, 'heading', e.target.value)}
                        placeholder={`Policy ${index + 1} heading`}
                        className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder-slate-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        Content / Description
                      </label>
                      <textarea
                        rows={3}
                        value={card.description}
                        onChange={(e) => handleCardChange(index, 'description', e.target.value)}
                        placeholder={`Policy ${index + 1} description`}
                        className="w-full px-3 py-2 rounded-md bg-white border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 text-xs text-slate-900 placeholder-slate-400"
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Bottom Form Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">
                Slug: <strong className="text-slate-700 font-mono">{formData.page_slug}</strong>
              </span>
              <button
                type="submit"
                disabled={isPending}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{isPending ? 'Saving...' : 'Save Configuration'}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Live Preview Column */}
        <div
          className={`flex-1 overflow-y-auto bg-slate-200/60 p-4 lg:p-6 ${
            activeTab === 'editor' ? 'hidden' : 'block'
          }`}
        >
          <div className="mb-2 flex items-center justify-between text-xs text-slate-600 px-1">
            <span className="flex items-center gap-1 font-medium">
              <Eye className="w-3.5 h-3.5 text-slate-500" />
              <span>Interactive Live Preview</span>
            </span>
            <span className="text-[11px] text-slate-500">
              Renders with current form values
            </span>
          </div>

          <div className="rounded-xl overflow-hidden border border-slate-300 shadow-sm bg-white">
            <HeroSection content={{ ...formData, cards }} showAdminBadge={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

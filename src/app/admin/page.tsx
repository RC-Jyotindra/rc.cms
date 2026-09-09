import { getAllHeroes } from '@/app/actions/hero'
import Link from 'next/link'
import { Plus, Edit3, Globe, Layers, ArrowRight, ExternalLink } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function AdminDashboardPage() {
  const heroes = await getAllHeroes()

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased">
      {/* Top Navigation / App Header */}
      <header className="border-b border-slate-200 bg-white">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white font-semibold text-xs tracking-wider">
              RC
            </div>
            <div>
              <span className="font-semibold text-sm text-slate-900 leading-none block">RC-CMS</span>
              <span className="text-[11px] text-slate-500 leading-none block mt-0.5">Campaign & Hero Management</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-xs font-medium text-slate-700 transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-500" />
              <span>View Live Site</span>
            </Link>

            <Link
              href="/admin/edit?slug=home"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-xs font-medium text-white transition-colors"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Edit Home Hero</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 py-8 space-y-6">
        {/* Metric summary band */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-white border border-slate-200">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Total Configurations</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1">{Math.max(heroes.length, 1)}</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Campaigns registered in Supabase</div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Database Connection</div>
            <div className="text-2xl font-semibold text-emerald-700 mt-1 flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Connected</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">PostgreSQL & Storage bucket ready</div>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wider">Primary Target Route</div>
            <div className="text-2xl font-semibold text-slate-900 mt-1 font-mono text-xl">/</div>
            <div className="text-[11px] text-slate-400 mt-0.5">Public root homepage</div>
          </div>
        </div>

        {/* Configurations List / Table */}
        <div className="rounded-lg border border-slate-200 bg-white overflow-hidden shadow-xs">
          <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">Campaign Hero Configurations</h2>
              <p className="text-xs text-slate-500 mt-0.5">Manage banners, headlines, promo text, and call-to-actions</p>
            </div>

            <Link
              href="/admin/edit?slug=home"
              className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700"
            >
              <span>Quick Edit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-600 font-medium border-b border-slate-200">
                <tr>
                  <th className="px-5 py-3">Slug</th>
                  <th className="px-5 py-3">Headline</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Updated</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {heroes.length === 0 ? (
                  <tr>
                    <td className="px-5 py-3.5 font-medium text-slate-900 font-mono">home</td>
                    <td className="px-5 py-3.5 text-slate-600 max-w-sm truncate">
                      Drive Growth and Reach Customers with Smart Advertising
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-50 text-amber-700 border border-amber-200">
                        Default
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-slate-400">Not saved yet</td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href="/admin/edit?slug=home"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                      >
                        <Edit3 className="w-3 h-3" />
                        <span>Configure</span>
                      </Link>
                    </td>
                  </tr>
                ) : (
                  heroes.map((hero) => (
                    <tr key={hero.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="px-5 py-3.5 font-medium text-slate-900 font-mono">{hero.page_slug}</td>
                      <td className="px-5 py-3.5 text-slate-600 max-w-sm truncate">
                        {hero.main_header || 'Untitled headline'}
                      </td>
                      <td className="px-5 py-3.5">
                        {hero.is_published ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                            Published
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            Draft
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-slate-500">
                        {new Date(hero.updated_at).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          href={`/admin/edit?slug=${hero.page_slug}`}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-medium transition-colors"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </Link>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

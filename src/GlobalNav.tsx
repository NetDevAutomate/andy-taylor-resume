import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, House, ChevronRight } from 'lucide-react'

function useTheme() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  useEffect(() => {
    if (localStorage.getItem('theme')) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (e: MediaQueryListEvent) => {
      setIsDark(e.matches)
      document.documentElement.classList.toggle('dark', e.matches)
      document.documentElement.classList.toggle('light', !e.matches)
    }
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  const toggleTheme = useCallback(() => {
    document.documentElement.style.setProperty('--theme-transition', 'none')
    document.querySelectorAll('*').forEach(el => {
      (el as HTMLElement).style.transition = 'none'
    })

    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    document.documentElement.classList.toggle('light', !next)
    localStorage.setItem('theme', next ? 'dark' : 'light')

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.documentElement.style.removeProperty('--theme-transition')
        document.querySelectorAll('*').forEach(el => {
          (el as HTMLElement).style.transition = ''
        })
      })
    })
  }, [isDark])

  return { isDark, toggleTheme }
}

function ThemeToggle({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-lg hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
    </button>
  )
}

const PAGE_TITLES: Record<string, string> = {
  '/about': 'About',
}

export default function GlobalNav() {
  const { pathname } = useLocation()
  const { isDark, toggleTheme } = useTheme()
  const isHome = pathname === '/'
  const pageTitle = PAGE_TITLES[pathname] ?? null

  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])

  const fade = (duration: string) => ({ animation: `nav-fade-in ${duration} ease-out` })

  if (!isHome) {
    return (
      <nav className="sticky top-0 z-50 relative">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-md border-b border-border" style={fade('0.35s')} />
        <div className="relative pt-4 pb-3 px-6 pl-14 xl:pl-6 flex items-center justify-between">
          <div className="min-w-0 flex items-center">
            <nav aria-label="Breadcrumb" className="inline-flex items-center gap-1.5 text-sm" style={fade('0.4s')}>
              <Link to="/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors shrink-0">
                <House className="w-4 h-4" />
                <span className="hidden sm:inline">andytaylor.dev</span>
              </Link>
              {pageTitle && (
                <>
                  <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50 shrink-0" />
                  <span className="text-foreground font-medium truncate">{pageTitle}</span>
                </>
              )}
            </nav>
          </div>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </nav>
    )
  }

  if (!hydrated) return null

  return (
    <div className="fixed top-4 right-6 z-50">
      <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
    </div>
  )
}

import { useState, useEffect, useCallback, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import {
  Mail, ExternalLink, Briefcase, Award, Code, Globe, Zap,
  Github, FolderGit2, Star, Terminal, List, ArrowUp, Mic,
  FileText, GitFork, MapPin, ChevronLeft, ChevronRight,
  Headphones, Video, Image, Presentation, Quote, MessageSquareQuote,
} from 'lucide-react'
import { translations, seo } from './i18n'
import { getTechIcon } from './tech-icons'

// ---------------------------------------------------------------------------
// Utility hooks
// ---------------------------------------------------------------------------

function useHydrated() {
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => setHydrated(true), [])
  return hydrated
}


// ---------------------------------------------------------------------------
// BeamPill — animated glowing pill around a word
// ---------------------------------------------------------------------------

const HEAL_PARTICLES = [
  { char: '+', left: '10%', delay: '0s', dur: '2.8s', size: '24px' },
  { char: '·', left: '30%', delay: '0.6s', dur: '2.2s', size: '20px' },
  { char: '✦', left: '55%', delay: '1.2s', dur: '3s', size: '18px' },
  { char: '0', left: '75%', delay: '0.3s', dur: '2.5s', size: '22px' },
  { char: '+', left: '90%', delay: '1.8s', dur: '2.6s', size: '20px' },
  { char: '1', left: '20%', delay: '2.1s', dur: '2.4s', size: '22px' },
  { char: '·', left: '65%', delay: '0.9s', dur: '3.2s', size: '18px' },
  { char: '✦', left: '45%', delay: '1.5s', dur: '2.7s', size: '20px' },
]

function BeamPill({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated()
  return (
    <span className={`relative inline-block pl-0 pr-0 ${hydrated ? 'beam-pill' : ''}`}>
      <span className="relative z-10">{children}</span>
      {hydrated && HEAL_PARTICLES.map((p, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none"
          style={{
            left: p.left,
            bottom: '50%',
            fontSize: p.size,
            color: '#4ade80',
            opacity: 0,
            animation: `heal-float ${p.dur} ease-out ${p.delay} infinite`,
          }}
          aria-hidden="true"
        >
          {p.char}
        </span>
      ))}
    </span>
  )
}

// ---------------------------------------------------------------------------
// useHeroStyles — inject CSS animation once, avoids hydration mismatch
// ---------------------------------------------------------------------------

const HERO_STYLES_ID = 'hero-beam-styles'
function useHeroStyles() {
  useEffect(() => {
    if (document.getElementById(HERO_STYLES_ID)) return
    const style = document.createElement('style')
    style.id = HERO_STYLES_ID
    style.textContent = `
      @keyframes blink { 0%, 100% { opacity: 1 } 50% { opacity: 0 } }
      @keyframes heal-float {
        0% { opacity: 0; transform: translateY(0) scale(0.6); }
        12% { opacity: 0.25; }
        40% { opacity: 0.15; }
        100% { opacity: 0; transform: translateY(-65px) scale(0.2); }
      }
      @property --beam-angle {
        syntax: '<angle>';
        inherits: false;
        initial-value: 0deg;
      }
      @keyframes beam-spin {
        0% { --beam-angle: 0deg; }
        100% { --beam-angle: 360deg; }
      }
      .beam-pill::before {
        content: '';
        position: absolute;
        inset: 2px -7px -5px -7px;
        border-radius: 9999px;
        padding: 2px;
        background: conic-gradient(
          from var(--beam-angle),
          transparent 0%,
          transparent 82%,
          rgba(74, 222, 128, 0.05) 86%,
          rgba(74, 222, 128, 0.15) 89%,
          rgba(74, 222, 128, 0.35) 92%,
          rgba(74, 222, 128, 0.6) 95%,
          rgba(74, 222, 128, 0.9) 98%,
          #4ade80 100%,
          transparent 100%
        );
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        animation: beam-spin 2s linear infinite;
      }
    `
    document.head.appendChild(style)
  }, [])
}

// ---------------------------------------------------------------------------
// GridSnakes — subtle animated trails on the dot grid (hero only)
// ---------------------------------------------------------------------------

const GRID = 24
const SNAKE_COUNT = 3
const SNAKE_LENGTH = 8
const TICK_MS = 180
const DIRS: [number, number][] = [[1, 0], [-1, 0], [0, 1], [0, -1]]

function GridSnakes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    if (!parent) return

    const resize = () => {
      canvas.width = parent.clientWidth
      canvas.height = parent.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const cols = () => Math.floor(canvas.width / GRID)
    const rows = () => Math.floor(canvas.height / GRID)

    type Snake = { trail: [number, number][]; dir: [number, number] }
    const snakes: Snake[] = Array.from({ length: SNAKE_COUNT }, () => {
      const x = Math.floor(Math.random() * cols())
      const y = Math.floor(Math.random() * rows())
      return { trail: [[x, y]], dir: DIRS[Math.floor(Math.random() * 4)] }
    })

    const tick = () => {
      const c = cols()
      const r = rows()

      for (const snake of snakes) {
        if (Math.random() < 0.3) {
          snake.dir = DIRS[Math.floor(Math.random() * 4)]
        }
        const [hx, hy] = snake.trail[snake.trail.length - 1]
        let nx = hx + snake.dir[0]
        let ny = hy + snake.dir[1]

        if (nx < 0) nx = c - 1
        if (nx >= c) nx = 0
        if (ny < 0) ny = r - 1
        if (ny >= r) ny = 0

        snake.trail.push([nx, ny])
        if (snake.trail.length > SNAKE_LENGTH) snake.trail.shift()
      }

      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const snake of snakes) {
        for (let i = 0; i < snake.trail.length; i++) {
          const [gx, gy] = snake.trail[i]
          const alpha = ((i + 1) / snake.trail.length) * 0.5
          ctx.beginPath()
          ctx.arc(gx * GRID + GRID / 2, gy * GRID + GRID / 2, 1.5, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0, 217, 255, ${alpha})`
          ctx.fill()
        }
      }
    }

    const interval = setInterval(tick, TICK_MS)
    return () => { clearInterval(interval); window.removeEventListener('resize', resize) }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-[1]" />
}

// ---------------------------------------------------------------------------
// useTypewriterRotation — cycles through role strings with typewriter effect
// ---------------------------------------------------------------------------

function useTypewriterRotation(
  roles: readonly string[],
  { typeSpeed = 80, deleteSpeed = 60, pauseAfterType = 2000, pauseAfterDelete = 300 } = {}
) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayText, setDisplayText] = useState(roles[0])
  const [isDeleting, setIsDeleting] = useState(false)
  const currentRole = roles[roleIndex]

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayText === currentRole) {
      timeout = setTimeout(() => setIsDeleting(true), pauseAfterType)
    } else if (isDeleting && displayText === '') {
      timeout = setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length)
        setIsDeleting(false)
      }, pauseAfterDelete)
    } else if (isDeleting) {
      timeout = setTimeout(() => {
        const words = displayText.trimEnd().split(' ')
        words.pop()
        setDisplayText(words.length > 0 ? words.join(' ') + ' ' : '')
      }, deleteSpeed)
    } else {
      timeout = setTimeout(() => {
        setDisplayText(currentRole.slice(0, displayText.length + 1))
      }, typeSpeed)
    }

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole, roles, typeSpeed, deleteSpeed, pauseAfterType, pauseAfterDelete])

  return { displayText, roleIndex, isDeleting }
}

// ---------------------------------------------------------------------------
// HomeToc — sticky sidebar / mobile drawer table of contents
// ---------------------------------------------------------------------------

const HOME_TOC_SECTIONS = [
  { id: 'experience', label: 'Experience' },
  { id: 'recommendations', label: 'Recommendations' },
  { id: 'awards', label: 'Awards' },
  { id: 'speaking', label: 'Speaking' },
  { id: 'opensource', label: 'Open Source' },
  { id: 'tech', label: 'Skills & Stack' },
  { id: 'contact', label: 'Contact' },
] as const

function HomeToc() {
  const [hasRevealed, setHasRevealed] = useState(false)
  const [visible, setVisible] = useState(false)
  const [activeId, setActiveId] = useState('')
  const [tocOpen, setTocOpen] = useState(false)

  useEffect(() => {
    const check = () => {
      const trigger = document.getElementById('experience')
      if (!trigger) return
      const show = trigger.getBoundingClientRect().top <= 100
      setVisible(show)
      if (show && !hasRevealed) setHasRevealed(true)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [hasRevealed])

  useEffect(() => {
    if (!hasRevealed) return
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50
      if (atBottom) {
        setActiveId(HOME_TOC_SECTIONS[HOME_TOC_SECTIONS.length - 1].id)
        return
      }
      const threshold = window.innerHeight * 0.4
      let current = ''
      for (const s of HOME_TOC_SECTIONS) {
        const el = document.getElementById(s.id)
        if (el && el.getBoundingClientRect().top <= threshold) current = s.id
      }
      if (current) setActiveId(current)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [hasRevealed])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (!el) return
    setTocOpen(false)
    const isLast = id === HOME_TOC_SECTIONS[HOME_TOC_SECTIONS.length - 1].id
    const top = isLast
      ? document.documentElement.scrollHeight - window.innerHeight
      : el.getBoundingClientRect().top + window.scrollY - 96
    requestAnimationFrame(() => { window.scrollTo({ top, behavior: 'instant' }) })
  }, [])

  const activeIdx = HOME_TOC_SECTIONS.findIndex(s => s.id === activeId)
  const lastIdx = HOME_TOC_SECTIONS.length - 1
  const progressFrac = activeIdx >= 0 ? activeIdx / lastIdx : 0

  const tocNav = (
    <nav aria-label="Table of contents" className="relative">
      <div className="absolute left-[5.5px] top-[14px] w-px bg-border" style={{ height: 'calc(100% - 28px)' }} />
      <motion.div
        className="absolute left-[5.5px] top-[14px] w-px bg-primary origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: progressFrac }}
        style={{ height: 'calc(100% - 28px)' }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      />
      <ul className="relative space-y-1">
        {HOME_TOC_SECTIONS.map((section, i) => {
          const isActive = activeId === section.id
          const isPast = i <= activeIdx
          return (
            <li key={section.id} className="flex items-center gap-3">
              <motion.span
                className={`relative z-10 w-3 h-3 rounded-full border-2 shrink-0 transition-colors duration-300 ${
                  isActive ? 'border-primary bg-primary shadow-[0_0_8px_rgba(var(--primary-rgb),0.4)]'
                  : isPast ? 'border-primary/50 bg-card'
                  : 'border-border bg-card'
                }`}
                animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
                transition={{ duration: 0.3 }}
              />
              <button
                onClick={() => scrollTo(section.id)}
                className={`text-left text-[13px] tracking-wide py-1 transition-all duration-300 ${
                  isActive ? 'text-primary font-semibold translate-x-0.5'
                  : isPast ? 'text-foreground/70'
                  : 'text-muted-foreground/60 hover:text-foreground/80'
                }`}
              >
                {section.label}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Desktop: sticky sidebar */}
          <motion.div
            initial={hasRevealed ? { opacity: 0, x: -12 } : false}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden 2xl:block fixed top-24 left-[max(1rem,calc(50%-46rem))] w-48 max-h-[calc(100vh-8rem)] overflow-visible z-30"
          >
            {tocNav}
          </motion.div>

          {/* Mobile: floating button + drawer */}
          <motion.button
            initial={hasRevealed ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            onClick={() => setTocOpen(o => !o)}
            className="2xl:hidden fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
            aria-label="Toggle table of contents"
          >
            <List className="w-5 h-5" />
          </motion.button>
          {tocOpen && (
            <>
              <div className="2xl:hidden fixed inset-0 bg-background/60 backdrop-blur-sm z-40" onClick={() => setTocOpen(false)} />
              <div className="2xl:hidden fixed bottom-20 right-6 z-50 w-64 max-h-[70vh] overflow-y-auto bg-card border border-border rounded-xl shadow-xl p-4">
                {tocNav}
              </div>
            </>
          )}
        </>
      )}
    </AnimatePresence>
  )
}

// ---------------------------------------------------------------------------
// AnimatedSection — fade-in on scroll with intersection observer
// ---------------------------------------------------------------------------

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const [ref, setRef] = useState<HTMLElement | null>(null)
  const [isInView, setIsInView] = useState(false)
  const [detected, setDetected] = useState(false)
  const hydrated = useHydrated()
  const wasAboveFold = useRef(false)

  useEffect(() => {
    if (!ref) return

    let firstCallback = true
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (firstCallback) {
          firstCallback = false
          if (entry.isIntersecting) wasAboveFold.current = true
          setDetected(true)
        }
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )
    observer.observe(ref)
    return () => observer.disconnect()
  }, [ref])

  return (
    <motion.div
      ref={setRef}
      initial={false}
      animate={
        !hydrated || !detected
          ? false
          : isInView
            ? { opacity: 1, y: 0 }
            : { opacity: 0, y: 40 }
      }
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ---------------------------------------------------------------------------
// Section heading helper
// ---------------------------------------------------------------------------

function SectionHeading({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 className="font-display text-2xl font-semibold mb-8 flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
        {icon}
      </div>
      {children}
    </h2>
  )
}

// ---------------------------------------------------------------------------
// Artefacts Carousel — fetches manifest.json, renders draggable card strip
// ---------------------------------------------------------------------------

const ARTEFACTS_BASE = 'https://artefacts.netdevautomate.dev'
const ARTEFACT_ICONS: Record<string, React.ReactNode> = {
  audio: <Headphones className="w-3 h-3" />,
  video: <Video className="w-3 h-3" />,
  infographic: <Image className="w-3 h-3" />,
  slides: <Presentation className="w-3 h-3" />,
}

interface ArtefactRepo {
  name: string
  title: string
  artefacts: string[]
  updated: string
}

function useArtefacts() {
  const [repos, setRepos] = useState<ArtefactRepo[]>([])
  useEffect(() => {
    fetch(`${ARTEFACTS_BASE}/manifest.json`)
      .then(r => r.json())
      .then((d: { repos: ArtefactRepo[] }) => setRepos(d.repos))
      .catch(() => {})
  }, [])
  return repos
}

function ArtefactsCarousel() {
  const repos = useArtefacts()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const autoplayRef = useRef<ReturnType<typeof setInterval>>(undefined)

  const checkScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    checkScroll()
    el.addEventListener('scroll', checkScroll, { passive: true })
    window.addEventListener('resize', checkScroll, { passive: true })
    return () => {
      el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [repos, checkScroll])

  // Auto-advance every 4s, pause on hover/touch
  useEffect(() => {
    const el = scrollRef.current
    if (!el || repos.length === 0) return
    const start = () => {
      autoplayRef.current = setInterval(() => {
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 4) {
          el.scrollTo({ left: 0, behavior: 'smooth' })
        } else {
          el.scrollBy({ left: 320, behavior: 'smooth' })
        }
      }, 4000)
    }
    const stop = () => clearInterval(autoplayRef.current)
    start()
    el.addEventListener('pointerenter', stop)
    el.addEventListener('pointerleave', start)
    return () => { stop(); el.removeEventListener('pointerenter', stop); el.removeEventListener('pointerleave', start) }
  }, [repos])

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 320, behavior: 'smooth' })
  }

  if (repos.length === 0) return null

  return (
    <div className="relative group/carousel">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg flex items-center gap-2">
          <Terminal className="w-4 h-4 text-primary" />
          {t.artefacts.title}
        </h3>
        <a
          href={t.artefacts.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1"
        >
          View all
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
      <p className="text-sm text-muted-foreground mb-5">{t.artefacts.desc}</p>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-2 px-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
      >
        {repos.map((repo) => (
          <a
            key={repo.name}
            href={`${ARTEFACTS_BASE}/${repo.name}/artefacts/`}
            target="_blank"
            rel="noopener noreferrer"
            className="snap-start shrink-0 w-[280px] rounded-xl bg-card border border-border hover:border-accent/50 transition-all duration-300 overflow-hidden group/card hover:shadow-lg hover:shadow-accent/5"
          >
            {/* Thumbnail */}
            <div className="relative w-full h-[160px] bg-muted/50 overflow-hidden">
              {repo.artefacts.includes('infographic') && (
                <img
                  src={`${ARTEFACTS_BASE}/${repo.name}/artefacts/infographic.png`}
                  alt={`${repo.title} infographic`}
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/card:scale-105"
                  loading="lazy"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4">
              <h4 className="font-semibold text-sm mb-2 group-hover/card:text-accent transition-colors truncate">
                {repo.title}
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {repo.artefacts.map((type) => (
                  <span
                    key={type}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium bg-accent/10 text-accent border border-accent/20"
                  >
                    {ARTEFACT_ICONS[type]}
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Navigation arrows */}
      {canScrollLeft && (
        <button
          onClick={() => scroll(-1)}
          className="absolute left-0 top-[calc(50%+20px)] -translate-y-1/2 -translate-x-3 w-9 h-9 rounded-full bg-card/90 border border-border shadow-lg flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-accent/10 hover:border-accent/40 z-10"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      )}
      {canScrollRight && (
        <button
          onClick={() => scroll(1)}
          className="absolute right-0 top-[calc(50%+20px)] -translate-y-1/2 translate-x-3 w-9 h-9 rounded-full bg-card/90 border border-border shadow-lg flex items-center justify-center opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-200 hover:bg-accent/10 hover:border-accent/40 z-10"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      )}

      {/* Fade edges */}
      {canScrollLeft && <div className="absolute left-0 top-[60px] bottom-2 w-8 bg-gradient-to-r from-background to-transparent pointer-events-none z-[5]" />}
      {canScrollRight && <div className="absolute right-0 top-[60px] bottom-2 w-8 bg-gradient-to-l from-background to-transparent pointer-events-none z-[5]" />}
    </div>
  )
}

// ---------------------------------------------------------------------------
// App
// ---------------------------------------------------------------------------

const t = translations

function App() {
  useLocation() // keep router context active
  const hydrated = useHydrated()
  useHeroStyles()
  const { displayText: roleText, roleIndex } = useTypewriterRotation(t.greetingRoles)

  // SEO
  useEffect(() => {
    document.title = seo.title
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute('content', seo.description)
    } else {
      const newMeta = document.createElement('meta')
      newMeta.name = 'description'
      newMeta.content = seo.description
      document.head.appendChild(newMeta)
    }
  }, [])

  return (
    <main className="min-h-screen bg-background bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      {/* Skip navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:font-medium focus:shadow-lg"
      >
        Skip to content
      </a>

      <HomeToc />

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <header id="main-content" className="relative overflow-hidden">
        <GridSnakes />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-accent/5 to-transparent" />
        <div
          className="absolute top-0 right-[max(0px,calc(50%-40rem))] w-[600px] h-[600px] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3 hidden sm:block animate-[hero-glow_8s_ease-in-out_infinite]"
          style={{ backgroundColor: 'hsl(var(--hero-orb-primary))' }}
        />
        <div
          className="absolute bottom-0 left-[max(0px,calc(50%-40rem))] w-[550px] h-[550px] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3 hidden sm:block animate-[hero-glow_11s_ease-in-out_infinite_reverse]"
          style={{ backgroundColor: 'hsl(var(--hero-orb-accent))' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-32">
          <div className="flex flex-col items-center text-center gap-6">
            <motion.div
              initial={hydrated ? { opacity: 0, y: 20 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-lg text-muted-foreground mb-2">
                Hi, I'm <span className="text-gradient-theme font-semibold">Andy Taylor</span>
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 leading-tight">
                <span className="text-gradient-theme">{hydrated ? roleText : t.greetingRoles[0]}</span>
                {hydrated && (
                  <span
                    className="inline-block w-[3px] h-[0.85em] bg-primary ml-1 rounded-sm translate-y-[2px]"
                    style={{ animation: 'blink 1s step-end infinite' }}
                  />
                )}
                <br />
                {t.greeting} <BeamPill>{t.role}</BeamPill>
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">{t.heroTagline}</p>
            </motion.div>

            {/* Role pills */}
            <motion.div
              initial={hydrated ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              {t.greetingRoles.map((role, i) => (
                <span
                  key={role}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-sm ${
                    hydrated && i === roleIndex
                      ? 'border border-[#20d6ee] bg-[#20d6ee]/15 text-foreground scale-105'
                      : 'border border-[#20d6ee]/30 bg-background/80 text-muted-foreground'
                  }`}
                >
                  {role}
                </span>
              ))}
            </motion.div>

            {/* Location */}
            <motion.p
              initial={hydrated ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-1.5 text-sm text-muted-foreground"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              {t.location}
            </motion.p>
          </div>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* Summary                                                              */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative py-16 md:py-20">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--background)) 25%, hsl(var(--background)) 75%, transparent 100%)',
        }} />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <h2 className="font-display text-2xl font-semibold mb-6 text-center">{t.summary.title}</h2>
            <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-10">
              {t.summary.text}
            </p>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {t.summary.cards.map((card, i) => (
              <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                <div className="p-5 rounded-xl bg-card border border-border text-center hover:border-primary/30 transition-colors">
                  <p className="font-semibold text-sm mb-1">{card.title}</p>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Experience                                                           */}
      {/* ------------------------------------------------------------------ */}
      <section id="experience" className="py-16 md:py-24 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 2000px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={<Briefcase className="w-5 h-5 text-primary" />}>
              {t.experience.title}
            </SectionHeading>
          </AnimatedSection>

          {/* Core Competencies preamble */}
          <AnimatedSection delay={0.1}>
            <div className="mb-12 p-6 rounded-2xl bg-card/50">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-3xl mx-auto">
                {t.coreCompetencies.items.map((item, i) => (
                  <div
                    key={i}
                    className="p-3 sm:p-4 rounded-xl bg-background/50 border border-border hover:border-accent/30 transition-colors group"
                  >
                    <div className="flex items-center sm:items-start gap-2 sm:mb-1 sm:min-h-[2.5rem]">
                      <Zap className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-sm font-semibold group-hover:text-accent transition-colors leading-tight">{item.title}</span>
                    </div>
                    <p className="text-sm text-muted-foreground pl-6 hidden sm:block">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* Timeline */}
          {t.experience.jobs.map((job, i) => (
            <AnimatedSection key={i} delay={0.1 * Math.min(i, 3)}>
              <div className="mb-10 relative pl-8 border-l-2 border-border">
                <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-background" />
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mb-1">
                  <h3 className="font-display text-xl font-bold">{job.company}</h3>
                  <span className="text-sm text-muted-foreground">{job.location}</span>
                  {'isEarlierCareer' in job && job.isEarlierCareer && (
                    <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">Earlier career</span>
                  )}
                </div>
                <p className="text-primary font-medium mb-1">{job.role}</p>
                <p className="text-sm text-muted-foreground mb-3">{job.period}</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {job.highlights.map((h, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <span className="text-primary mt-1 shrink-0">•</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Recommendations                                                      */}
      {/* ------------------------------------------------------------------ */}
      <section id="recommendations" className="py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 500px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={<MessageSquareQuote className="w-5 h-5 text-primary" />}>
              {t.recommendations.title}
            </SectionHeading>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-5">
            {t.recommendations.items.map((rec, i) => (
              <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                <div className="h-full p-6 rounded-2xl bg-card border border-border hover:border-primary/20 transition-colors relative">
                  <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" aria-hidden="true" />
                  <blockquote className="text-sm text-muted-foreground leading-relaxed mb-4 relative z-10">
                    &ldquo;{rec.quote}&rdquo;
                  </blockquote>
                  <div className="border-t border-border pt-3 mt-auto">
                    <p className="font-semibold text-sm">{rec.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{rec.title}</p>
                    <p className="text-xs text-primary/70 mt-1">{rec.context} &middot; {rec.date}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Awards                                                               */}
      {/* ------------------------------------------------------------------ */}
      <section id="awards" className="py-16 md:py-24 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 400px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={<Award className="w-5 h-5 text-primary" />}>
              {t.awards.title}
            </SectionHeading>
          </AnimatedSection>
          <div className="space-y-3">
            {t.awards.items.map((award, i) => (
              <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                <div className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors">
                  <Award className="w-6 h-6 text-primary shrink-0" />
                  <div>
                    <span className="font-semibold">{award.title}</span>
                    <span className="text-muted-foreground text-sm"> — {award.org} ({award.year})</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Speaking                                                             */}
      {/* ------------------------------------------------------------------ */}
      <section id="speaking" className="py-16 md:py-24 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={<Mic className="w-5 h-5 text-primary" />}>
              {t.speaking.title}
            </SectionHeading>
          </AnimatedSection>
          <div className="space-y-3">
            {t.speaking.items.map((talk, i) => (
              <AnimatedSection key={i} delay={0.1 * (i + 1)}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group">
                  <span className="text-xs font-mono text-primary font-medium shrink-0 pt-0.5">{talk.year}</span>
                  <div className="flex-1">
                    <p className="font-semibold group-hover:text-primary transition-colors mb-0.5">{talk.title}</p>
                    <p className="text-sm text-muted-foreground">{talk.event}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Open Source                                                          */}
      {/* ------------------------------------------------------------------ */}
      <section id="opensource" className="py-16 md:py-24" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 800px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-8">
              <SectionHeading icon={<FolderGit2 className="w-5 h-5 text-primary" />}>
                {t.openSource.title}
              </SectionHeading>
              <a
                href={`https://${t.openSource.githubLink}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                {t.openSource.githubLink.split('/').pop()}
              </a>
            </div>
          </AnimatedSection>

          {/* Terraform PRs */}
          <AnimatedSection delay={0.1}>
            <div className="mb-8 p-6 rounded-2xl bg-card border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Terminal className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold mb-1">{t.openSource.terraform.title}</h3>
                  <p className="text-sm text-muted-foreground">{t.openSource.terraform.desc}</p>
                </div>
              </div>
              <div className="space-y-2">
                {t.openSource.terraform.items.map((pr, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/40">
                    <GitFork className="w-4 h-4 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-0.5">
                        <span className="font-mono text-xs text-primary">{pr.pr}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                          pr.status.toLowerCase().includes('merged')
                            ? 'bg-success/10 text-success'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {pr.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{pr.feature}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>

          {/* AWS Samples + Community Impact — side by side */}
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={0.2}>
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-accent/20">
                <div className="flex items-start gap-3 mb-3">
                  <Star className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                  <h3 className="font-display font-bold">{t.openSource.awsSamples.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.openSource.awsSamples.desc}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={0.3}>
              <div className="h-full p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/20">
                <div className="flex items-start gap-3 mb-3">
                  <ArrowUp className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <h3 className="font-display font-bold">{t.openSource.communityImpact.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{t.openSource.communityImpact.desc}</p>
              </div>
            </AnimatedSection>
          </div>

          {/* Blog Posts */}
          <AnimatedSection delay={0.15} className="mt-10">
            <h3 className="font-display font-semibold text-lg mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4 text-primary" />
              {t.blogPosts.title}
            </h3>
            <div className="space-y-3">
              {t.blogPosts.items.map((post, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium group-hover:text-primary transition-colors flex items-center gap-1.5"
                      >
                        {post.title}
                        <ExternalLink className="w-3 h-3 shrink-0" aria-hidden="true" />
                      </a>
                      <span className="text-xs text-muted-foreground shrink-0">{post.date}</span>
                    </div>
                    {post.coAuthors && (
                      <p className="text-xs text-muted-foreground mt-1">Co-authored with {post.coAuthors}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Artefacts Carousel */}
          <AnimatedSection delay={0.2} className="mt-10">
            <ArtefactsCarousel />
          </AnimatedSection>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Skills & Tech Stack                                                  */}
      {/* ------------------------------------------------------------------ */}
      <section id="tech" className="py-16 md:py-24 bg-muted/30" style={{ contentVisibility: 'auto', containIntrinsicSize: 'auto 600px' }}>
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <SectionHeading icon={<Code className="w-5 h-5 text-primary" />}>
              {t.skills.title}
            </SectionHeading>
          </AnimatedSection>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Languages + soft skills */}
            <AnimatedSection delay={0.1}>
              <h3 className="font-display font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                {t.skills.languages}
              </h3>
              <div className="space-y-3 mb-8">
                <div className="flex justify-between items-center">
                  <span>English</span>
                  <span className="text-sm text-primary font-medium">{t.skills.native}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>{t.skills.english}</span>
                  <span className="text-sm text-muted-foreground">{t.skills.technical}</span>
                </div>
              </div>

              <h3 className="font-display font-semibold mb-4">{t.skills.soft}</h3>
              <div className="flex flex-wrap gap-2">
                {t.skills.softSkills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 rounded-full text-sm bg-accent/10 text-accent border border-accent/20 hover:bg-accent/20 transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedSection>

            {/* Tech stack grid */}
            <AnimatedSection delay={0.2} className="md:col-span-3">
              <h3 className="font-display font-semibold mb-4">{t.techStack.title}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.techStack.categories.map((cat) => (
                  <div key={cat.name} className="p-4 rounded-xl bg-card border border-border">
                    <span className="text-xs font-medium text-primary uppercase tracking-wide">{cat.name}</span>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {cat.items.map((item) => {
                        const icon = getTechIcon(item)
                        return (
                          <span key={item} className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs bg-muted text-foreground">
                            {icon && (
                              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 shrink-0" fill={icon.color} aria-hidden="true">
                                <path d={icon.path} />
                              </svg>
                            )}
                            {item}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>

          {/* Interests */}
          <AnimatedSection delay={0.3} className="mt-12">
            <div className="p-6 rounded-2xl bg-card/50 border border-border">
              <h3 className="font-display font-semibold mb-3">{t.interests.title}</h3>
              <p className="text-muted-foreground">{t.interests.text}</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Contact / CTA footer                                                 */}
      {/* ------------------------------------------------------------------ */}
      <footer id="contact" className="relative py-16 md:py-24">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(90deg, transparent 0%, hsl(var(--background)) 25%, hsl(var(--background)) 75%, transparent 100%)',
        }} />
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <AnimatedSection>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              {t.cta.title}
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              {t.cta.desc}
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`mailto:${t.email}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium hover:brightness-110 hover:shadow-lg hover:shadow-primary/25 active:brightness-95 transition-all duration-200"
              >
                <Mail className="w-4 h-4" />
                {t.cta.contact}
              </a>
              <a
                href="https://linkedin.com/in/andytaylornetdev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
              >
                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z"/>
                </svg>
                LinkedIn
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a
                href="https://github.com/andytaylor823"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
              >
                <Github className="w-4 h-4" />
                GitHub
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
              <a
                href={t.artefacts.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-primary/50 transition-colors duration-200 hover:bg-primary/5"
              >
                <Terminal className="w-4 h-4" />
                Artefacts
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          </AnimatedSection>
          <p className="mt-12 text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Andy Taylor
            <span className="mx-2 text-border">|</span>
            Forked from{' '}
            <a
              href="https://santifer.io"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              santifer.io
            </a>
            {' '}by Santiago Fernández de Valderrama Aparicio
          </p>
        </div>
      </footer>
    </main>
  )
}

export default App

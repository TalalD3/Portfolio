import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  Download,
  Film,
  Mail,
  Menu,
  Palette,
  Send,
  Sparkles,
  X,
} from 'lucide-react'
import {
  SiDavinciresolve,
  SiElectron,
  SiFlutter,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiReact,
  SiTelegram,
} from 'react-icons/si'

const navLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

// REPLACE: hero portrait
const publicAsset = (path) => `${import.meta.env.BASE_URL}${path}`
const heroPortrait = publicAsset('images/talal hero.jpg')
const heroPortraitPhone = publicAsset('images/talal hero - phone.jpg')

const tools = [
  { label: 'React', icon: SiReact },
  { label: 'Next.js', icon: SiNextdotjs },
  { label: 'Node.js', icon: SiNodedotjs },
  { label: 'MongoDB', icon: SiMongodb },
  { label: 'PostgreSQL', icon: SiPostgresql },
  { label: 'Electron', icon: SiElectron },
  { label: 'Flutter', icon: SiFlutter },
  { label: 'Python', icon: SiPython },
  { label: 'JavaScript', icon: SiJavascript },
  { label: 'PHP', icon: SiPhp },
  { label: 'Git', icon: SiGit },
  { label: 'Telegram Bot API', icon: SiTelegram },
  { label: 'Photoshop', icon: Palette },
  { label: 'After Effects', icon: Film },
  { label: 'DaVinci Resolve', icon: SiDavinciresolve },
  { label: 'Sony Vegas', icon: Film },
  { label: 'AI / OpenAI', icon: SiOpenai },
]

const services = [
  {
    title: 'Web Development',
    icon: Code2,
    text: 'Full-stack web & SaaS apps with React, Next.js and Node - from dashboards to e-commerce platforms.',
  },
  {
    title: 'Graphic Design',
    icon: Palette,
    text: 'Brand visuals, posters, product mockups and ad creatives crafted in Photoshop.',
  },
  {
    title: 'Video Editing',
    icon: Film,
    text: 'Promo videos, reels and edits with After Effects, DaVinci Resolve and Sony Vegas.',
  },
]

const projects = [
  {
    title: 'BUYTECH E-Commerce Platform',
    tagline: 'Full-stack multilingual commerce system',
    description:
      'My largest e-commerce build: a Next.js 14 App Router platform for a gaming hardware store, with multilingual ar/en/fr storefront routing, a protected admin dashboard, product and order management, analytics, uploads, validations, integrations, tracking pixels and a MongoDB domain model built for real catalog operations.',
    highlights: [
      'Storefront supports Arabic, English and French with locale-aware routing, centralized translations, middleware protection and RTL-ready customer flows.',
      'Admin dashboard manages products, orders, categories, delivery data, analytics, settings, content and integrations from a protected management area.',
      'Architecture uses Next.js 14, NextAuth v4 with JWT, MongoDB + Mongoose models, server actions, REST API route handlers and @/* path aliases.',
      'Operational tooling includes Tailwind CSS, shadcn/ui, Mantine, React Hook Form, Zod, Uploadthing, Google Sheets export, Nodemailer, Facebook/TikTok Pixel and Telegram notifications.',
    ],
    tags: ['Next.js 14', 'MongoDB', 'NextAuth', 'Tailwind CSS', 'shadcn/ui', 'Uploadthing'],
    images: [
      publicAsset('images/buytech-storefront-showcase.jpg'),
      publicAsset('images/buytech-admin-showcase.jpg'),
    ],
  },
  {
    title: 'Managit',
    tagline: 'Offline-first stock manager',
    description:
      'A bilingual Arabic/English business desktop app for wholesale teams. Managit brings inventory, purchasing, production, sales, contacts, debts, payments, invoices, expenses, deliveries, reports, barcode workflows and role-based access into one local-first system, with optional Supabase cloud mode and desktop-to-cloud sync.',
    highlights: [
      'Inventory modules calculate live stock, average unit cost, COGS, profit, stock value and low-stock alerts from purchases, sales and production batches.',
      'Operations cover purchases, manufacturing batches, selling, deliveries, client/supplier balances, debts, receipt-numbered payments, invoices, expenses and PDF reports.',
      'Barcode support includes USB scanners, phone-as-scanner over local WiFi, camera/photo decoding and barcode label generation for printing.',
      'Platform features include Electron + React + Vite, local SQLite storage, owner/worker permissions, activity log, licensing, settings and full RTL support.',
    ],
    tags: ['React.js', 'Electron', 'SQLite', 'Supabase', 'Barcode'],
    images: [
      publicAsset('images/managit-dashboard-showcase.jpg'),
      publicAsset('images/managit-deliveries-showcase.jpg'),
    ],
  },
  {
    title: 'Telegram SaaS Bot',
    tagline: 'Automated product-poster generator',
    description:
      'A multi-tenant Telegram system where a master bot spins up personalized sub-bots for individual resellers. Each bot auto-generates product posters with watermark logo, retail and wholesale price, quantity and contact number, while every reseller runs their own bot from one central engine.',
    tags: ['Python', 'Telegram Bot API', 'Multi-tenant'],
    images: [
      // REPLACE: Telegram SaaS Bot screenshot
      'https://images.unsplash.com/photo-1611746872915-64382b5c76da?auto=format&fit=crop&w=1400&q=85',
    ],
  },
  {
    title: 'PC Configurator & Billing System',
    tagline: 'Custom-build tool',
    description:
      'An interactive PC configurator with live total-price calculation and one-click PDF invoice generation. Store logo, QR code, contact info, full parts list and client name are baked into every invoice.',
    tags: ['JavaScript', 'HTML', 'CSS', 'Database'],
    images: [
      // REPLACE: PC Configurator & Billing System screenshot
      'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=1400&q=85',
    ],
  },
]

const stats = [
  "Master's in CS",
  'Full-Stack',
  'Available for freelance',
  'Arabic / French / English',
]

function smoothScrollTo(hash) {
  const target = document.querySelector(hash)
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function Reveal({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.7, ease: 'easeOut', delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ButtonLink({ href, children, variant = 'primary', className = '' }) {
  const base =
    'group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]'
  const styles =
    variant === 'primary'
      ? 'border border-[#C2A878] bg-[#C2A878] text-[#0B0B0B] hover:bg-transparent hover:text-[#EDEAE3]'
      : 'border border-white/15 text-[#EDEAE3] hover:border-[#C2A878] hover:text-[#C2A878]'

  return (
    <a
      href={href}
      onClick={(event) => {
        if (href.startsWith('#')) {
          event.preventDefault()
          smoothScrollTo(href)
        }
      }}
      className={`${base} ${styles} ${className}`}
    >
      {children}
    </a>
  )
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const onNavClick = (event, href) => {
    event.preventDefault()
    setOpen(false)
    smoothScrollTo(href)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition duration-300 ${
        scrolled
          ? 'border-b border-white/10 bg-[#0B0B0B]/78 shadow-2xl shadow-black/20 backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <a
          href="#home"
          onClick={(event) => onNavClick(event, '#home')}
          className="font-serif text-2xl text-[#EDEAE3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]"
        >
          talal<span className="text-[#C2A878]">.</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(event) => onNavClick(event, link.href)}
              className="nav-link text-sm text-[#9A958C] transition hover:text-[#EDEAE3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:block">
          <ButtonLink href="#contact" variant="secondary" className="px-4 py-2">
            Let's Talk
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-[#EDEAE3] transition hover:border-[#C2A878] md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="border-t border-white/10 bg-[#0B0B0B]/95 px-5 pb-5 backdrop-blur-xl md:hidden"
          >
            <div className="mx-auto flex max-w-7xl flex-col gap-1 pt-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(event) => onNavClick(event, link.href)}
                  className="rounded-xl px-3 py-3 text-[#EDEAE3] transition hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
              <ButtonLink href="#contact" className="mt-3 w-full">
                Let's Talk
              </ButtonLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function Hero() {
  const reduceMotion = useReducedMotion()
  const heroItems = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[#0B0B0B] pt-24"
    >
      <div className="absolute inset-0">
        <img
          src={heroPortraitPhone}
          alt="Cinematic split-light portrait of Talal Douibi"
          className="absolute inset-0 h-full w-full object-cover object-right sm:hidden"
        />
        <img
          src={heroPortrait}
          alt="Cinematic split-light portrait of Talal Douibi"
          className="absolute inset-0 hidden h-full w-full object-cover object-[68%_center] sm:block"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(11,11,11,0.99)_0%,rgba(11,11,11,0.92)_32%,rgba(11,11,11,0.58)_62%,rgba(11,11,11,0.24)_100%)] sm:bg-[linear-gradient(90deg,rgba(11,11,11,0.98)_0%,rgba(11,11,11,0.88)_26%,rgba(11,11,11,0.54)_54%,rgba(11,11,11,0.22)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0.28)_0%,rgba(11,11,11,0.04)_45%,#0B0B0B_100%)]" />
        <div className="absolute left-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_18%_28%,rgba(194,168,120,0.11),transparent_38%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      </div>

      <motion.div
        initial={reduceMotion ? false : 'hidden'}
        animate={reduceMotion ? undefined : 'show'}
        transition={{ staggerChildren: 0.12, delayChildren: 0.15 }}
        className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 sm:px-8"
      >
        <motion.p
          variants={heroItems}
          className="mb-6 text-xs font-semibold uppercase tracking-[0.34em] text-[#C2A878]"
        >
          Full-stack developer · Designer · Video editor
        </motion.p>
        <motion.h1
          variants={heroItems}
          className="max-w-[46rem] font-serif text-[clamp(3.8rem,13vw,9.5rem)] font-medium leading-[0.83] text-[#EDEAE3]"
        >
          I build & design
          <span className="block italic text-[#C2A878]">digital experiences.</span>
        </motion.h1>
        <motion.p
          variants={heroItems}
          className="mt-7 max-w-2xl text-base leading-8 text-[#B8B2A8] sm:text-lg"
        >
          Web development, graphic design, and video editing - crafting clean, fast,
          beautiful products that help brands stand out.
        </motion.p>
        <motion.div variants={heroItems} className="mt-10 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="#work">
            View My Work <ArrowRight size={16} />
          </ButtonLink>
          <ButtonLink href="#contact" variant="secondary">
            Let's Talk
          </ButtonLink>
          <a
            href={publicAsset('talal-douibi-cv.pdf')}
            download
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-[#EDEAE3] transition hover:border-[#C2A878] hover:text-[#C2A878] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]"
          >
            Download CV <Download size={16} />
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}

function TechMarquee() {
  const marqueeItems = [...tools, ...tools]

  return (
    <section className="border-y border-white/10 bg-[#141414]" aria-label="Tools and technologies">
      <div className="marquee group flex overflow-hidden py-5">
        <div className="marquee-track flex min-w-max items-center gap-4 pr-4">
          {marqueeItems.map((tool, index) => {
            const Icon = tool.icon
            return (
              <div
                key={`${tool.label}-${index}`}
                className="flex h-12 min-w-max items-center gap-3 rounded-full border border-white/10 bg-[#0B0B0B]/70 px-5 text-[#9A958C] transition hover:border-[#C2A878]/60 hover:text-[#C2A878]"
              >
                <Icon size={18} />
                <span className="text-sm font-medium">{tool.label}</span>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section-spacing bg-[#0B0B0B]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal>
          <SectionHeading eyebrow="Services" title="What I" italic="Do" />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={index * 0.08}>
                <article className="group h-full rounded-xl border border-white/10 bg-[#141414] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#C2A878]/50">
                  <div className="mb-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-[#C2A878] transition group-hover:bg-[#C2A878] group-hover:text-[#0B0B0B]">
                    <Icon size={21} />
                  </div>
                  <h3 className="font-serif text-3xl text-[#EDEAE3]">{service.title}</h3>
                  <p className="mt-4 leading-7 text-[#9A958C]">{service.text}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function SectionHeading({ eyebrow, title, italic }) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#C2A878]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-[clamp(2.7rem,7vw,5.8rem)] leading-none text-[#EDEAE3]">
        {title} <span className="italic text-[#C2A878]">{italic}</span>
      </h2>
    </div>
  )
}

function SelectedWork() {
  const [activeProject, setActiveProject] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const reduceMotion = useReducedMotion()

  const project = projects[activeProject]

  const goToProject = useCallback((nextIndex) => {
    setActiveProject((current) => {
      const resolved =
        typeof nextIndex === 'function'
          ? nextIndex(current)
          : nextIndex
      return (resolved + projects.length) % projects.length
    })
    setImageIndex(0)
  }, [])

  const next = useCallback(() => goToProject((current) => current + 1), [goToProject])
  const previous = useCallback(() => goToProject((current) => current - 1), [goToProject])

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') previous()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [next, previous])

  const imageMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 60 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -60 },
        transition: { duration: 0.5, ease: 'easeInOut' },
      }

  const textMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: 20 },
        transition: { duration: 0.5, ease: 'easeInOut', delay: 0.06 },
      }

  return (
    <section id="work" className="section-spacing border-y border-white/10 bg-[#101010]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Portfolio" title="Selected" italic="Work" />
          <div className="flex gap-3">
            <CarouselButton label="Previous project" onClick={previous}>
              <ArrowLeft size={18} />
            </CarouselButton>
            <CarouselButton label="Next project" onClick={next}>
              <ArrowRight size={18} />
            </CarouselButton>
          </div>
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-xl border border-white/10 bg-[#0B0B0B]">
          <AnimatePresence mode="wait">
            <motion.article
              key={activeProject}
              drag={reduceMotion ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.18}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) next()
                if (info.offset.x > 70) previous()
              }}
              className="grid"
            >
              <motion.div {...imageMotion} className="relative aspect-[16/10] min-h-[250px] overflow-hidden bg-[#141414] sm:aspect-[16/8]">
                <img
                  src={project.images[imageIndex]}
                  alt={`${project.title} project screenshot`}
                  className="h-full w-full object-cover opacity-82"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,11,11,0)_40%,rgba(11,11,11,0.82)_100%)]" />
                <div className="absolute bottom-5 left-5 flex gap-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Show screenshot ${index + 1} for ${project.title}`}
                      onClick={() => setImageIndex(index)}
                      className={`h-2 rounded-full transition ${
                        index === imageIndex ? 'w-8 bg-[#C2A878]' : 'w-2 bg-white/35 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>

              <motion.div {...textMotion} className="p-6 sm:p-9 lg:p-11">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-[#C2A878]">
                  {project.tagline}
                </p>
                <h3 className="mt-4 font-serif text-[clamp(2.2rem,5vw,4.6rem)] leading-none text-[#EDEAE3]">
                  {project.title}
                </h3>
                <p className="mt-6 max-w-4xl text-base leading-8 text-[#B8B2A8]">
                  {project.description}
                </p>
                {project.highlights && (
                  <ul className="mt-7 grid gap-3 text-sm leading-6 text-[#D6D0C7] md:grid-cols-2">
                    {project.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3"
                      >
                        {highlight}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-8 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-[#D6D0C7]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="mt-7 flex justify-center gap-3">
          {projects.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`Show ${item.title}`}
              onClick={() => goToProject(index)}
              className={`h-2.5 rounded-full transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878] ${
                index === activeProject ? 'w-10 bg-[#C2A878]' : 'w-2.5 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function CarouselButton({ children, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-[#EDEAE3] transition hover:border-[#C2A878] hover:text-[#C2A878] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]"
    >
      {children}
    </button>
  )
}

function About() {
  return (
    <section id="about" className="section-spacing bg-[#0B0B0B]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow="About" title="Built With" italic="Range" />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xl leading-9 text-[#D6D0C7]">
            I'm Talal Douibi, a full-stack developer and digital creative based in Setif,
            Algeria. I'm finishing a Master's in Computer Science (Data Engineering & Web
            Technologies) and I build SaaS platforms, e-commerce systems and desktop apps -
            then handle the visuals and video too. I work in Arabic, French and English.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            {stats.map((stat) => (
              <span
                key={stat}
                className="rounded-full border border-white/10 bg-[#141414] px-4 py-2 text-sm text-[#D6D0C7]"
              >
                {stat}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function ClosingCta() {
  const repeated = useMemo(() => Array.from({ length: 16 }, (_, index) => index), [])

  return (
    <section className="overflow-hidden border-y border-white/10 bg-[#141414]">
      <div className="marquee group border-b border-white/10 py-3">
        <div className="marquee-track flex min-w-max items-center gap-8 pr-8">
          {repeated.map((item) => (
            <span
              key={item}
              className="font-serif text-3xl uppercase italic text-[#C2A878]"
            >
              Let's Talk ·
            </span>
          ))}
        </div>
      </div>
      <Reveal className="mx-auto max-w-5xl px-5 py-24 text-center sm:px-8">
        <h2 className="font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.9] text-[#EDEAE3]">
          Let's make your
          <span className="block italic text-[#C2A878]">project shine.</span>
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-[#9A958C]">
          Need a polished website, SaaS interface, visual campaign, or launch video? Bring
          the idea - I will help turn it into something clean, fast, and memorable.
        </p>
        <ButtonLink href="#contact" className="mt-10">
          Start a Project <Sparkles size={16} />
        </ButtonLink>
      </Reveal>
    </section>
  )
}

function Contact() {
  const [status, setStatus] = useState('idle')
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!accessKey) {
      setStatus('error')
      return
    }

    const form = event.currentTarget
    setStatus('sending')

    try {
      const formData = new FormData(form)
      formData.append('access_key', accessKey)
      formData.append('subject', 'New message from talal portfolio')

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        form.reset()
        return
      }

      setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  return (
    <footer id="contact" className="bg-[#0B0B0B]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <a href="#home" className="font-serif text-3xl text-[#EDEAE3]">
            talal<span className="text-[#C2A878]">.</span>
          </a>
          <p className="mt-5 max-w-sm leading-7 text-[#9A958C]">
            Full-stack developer & digital creative - Setif, Algeria.
          </p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <a
              href="https://github.com/TalalD3"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-3 text-[#D6D0C7] transition hover:text-[#C2A878] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]"
            >
              <SiGithub size={18} /> github.com/TalalD3
            </a>
            <a
              href="mailto:talaldouibi36@gmail.com"
              className="inline-flex items-center gap-3 text-[#D6D0C7] transition hover:text-[#C2A878] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878]"
            >
              <Mail size={18} /> talaldouibi36@gmail.com
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-sm text-[#D6D0C7]">
                Name
                <input
                  name="name"
                  required
                  className="rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-[#EDEAE3] outline-none transition placeholder:text-[#68645E] focus:border-[#C2A878]"
                  placeholder="Your name"
                />
              </label>
              <label className="grid gap-2 text-sm text-[#D6D0C7]">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-[#EDEAE3] outline-none transition placeholder:text-[#68645E] focus:border-[#C2A878]"
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="grid gap-2 text-sm text-[#D6D0C7]">
              Message
              <textarea
                name="message"
                required
                rows="6"
                className="resize-none rounded-xl border border-white/10 bg-[#141414] px-4 py-3 text-[#EDEAE3] outline-none transition placeholder:text-[#68645E] focus:border-[#C2A878]"
                placeholder="Tell me about the project"
              />
            </label>
            <button
              type="submit"
              disabled={status === 'sending'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#C2A878] bg-[#C2A878] px-5 py-3 text-sm font-semibold text-[#0B0B0B] transition hover:bg-transparent hover:text-[#EDEAE3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2A878] disabled:cursor-not-allowed disabled:opacity-60 sm:w-max"
            >
              <Mail size={16} />{' '}
              {status === 'sending' ? 'Sending…' : 'Send Message'} <Send size={15} />
            </button>
            {status === 'success' && (
              <p className="text-sm text-[#8BC48A]">Message sent — I&apos;ll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-sm text-[#E08A8A]">
                {accessKey
                  ? 'Something went wrong. Try again or email me directly.'
                  : 'Form not configured yet — add your Web3Forms key (see .env.example) or email me directly.'}
              </p>
            )}
          </form>
        </Reveal>
      </div>
      <div className="border-t border-white/10 px-5 py-6 text-center text-sm text-[#77716A]">
        © 2026 Talal Douibi. All rights reserved.
      </div>
    </footer>
  )
}

function App() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0B0B0B] text-[#EDEAE3]">
      <div className="noise-overlay" aria-hidden="true" />
      <Navbar />
      <Hero />
      <TechMarquee />
      <Services />
      <SelectedWork />
      <About />
      <ClosingCta />
      <Contact />
    </main>
  )
}

export default App

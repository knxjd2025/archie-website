import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  BrainCircuit,
  Building2,
  Calculator,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronRight,
  CloudSun,
  DollarSign,
  FileText,
  Globe,
  HardHat,
  Headset,
  Heart,
  Layers,
  LayoutDashboard,
  LineChart,
  Mail,
  MapPin,
  Megaphone,
  Mic,
  Phone,
  PlayCircle,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

/* ───────── constants ───────── */

const TOOLS = [
  { name: 'CRM', icon: Users, color: 'from-blue-500 to-blue-700', desc: 'Track every lead, customer and deal in one place. Automated follow-ups, pipeline stages, and built-in calling keep your sales moving.' , link: '/features/crm' },
  { name: 'Networking', icon: Globe, color: 'from-emerald-500 to-emerald-700', desc: 'Build referral partnerships with insurance agents, realtors and contractors. Automated introductions and shared lead boards.', link: '/features/networking' },
  { name: 'Sales Coach', icon: Target, color: 'from-amber-500 to-amber-700', desc: 'AI-powered call scoring, objection handling tips, and real-time coaching so every rep closes like your best rep.', link: '/features/sales-coach' },
  { name: 'Prospector', icon: Search, color: 'from-violet-500 to-violet-700', desc: 'Pinpoint neighborhoods hit by recent storms, filter by roof age and insurance carrier, and auto-generate door-knock lists.', link: '/features/prospector' },
  { name: 'Interior Pro', icon: Layers, color: 'from-pink-500 to-pink-700', desc: 'Manage interior restoration projects — water mitigation, drywall, paint, and flooring — with dedicated workflows.', link: '/features/interior-pro' },
  { name: 'MyCanvass', icon: CloudSun, color: 'from-cyan-500 to-cyan-700', desc: 'Storm tracking + canvassing in one view. See live hail maps, assign territories, and track door-knock results in real time.', link: '/features/mycanvass' },
  { name: 'Production Hub', icon: HardHat, color: 'from-orange-500 to-orange-700', desc: 'Schedule crews, track material orders, manage sub-contractors and keep every job on time from tear-off to final inspection.', link: '/features/production-hub' },
  { name: 'Roof Care', icon: Shield, color: 'from-teal-500 to-teal-700', desc: 'Offer maintenance plans, automate annual inspection reminders, and generate recurring revenue from past customers.', link: '/features/roof-care' },
  { name: 'Finance Command', icon: DollarSign, color: 'from-green-500 to-green-700', desc: 'Track revenue, expenses, commissions and profit per job. QuickBooks sync and real-time cash-flow dashboards.', link: '/features/finance-command' },
  { name: 'Blueprint Analyzer', icon: FileText, color: 'from-red-500 to-red-700', desc: 'Upload roof blueprints and satellite images. AI calculates measurements, generates material lists and accurate estimates in minutes.', link: '/features/blueprint-analyzer' },
];

const PAIN_POINTS = [
  { pain: 'Juggling spreadsheets, sticky notes and 6 different apps', solve: 'One unified platform replaces them all' },
  { pain: 'Leads slipping through the cracks after a storm', solve: 'Automated follow-up sequences capture every opportunity' },
  { pain: 'No visibility into crew schedules or job status', solve: 'Real-time production dashboard with GPS and photo updates' },
  { pain: 'Writing estimates by hand or in clunky software', solve: 'AI generates accurate estimates from a single roof photo' },
  { pain: 'Cash flow surprises at the end of the month', solve: 'Live financial dashboards with profit-per-job tracking' },
];

const WHY_WE_BUILT = [
  { icon: Wrench, title: 'Born on the Roof', desc: 'Archie was created by a roofing contractor who was tired of juggling spreadsheets, sticky notes, and a half-dozen disconnected apps just to run one company.' },
  { icon: Layers, title: 'Too Many Tools, Too Little Time', desc: 'One app for CRM, another for estimates, another for scheduling, another for finances — none of them talked to each other. Sound familiar?' },
  { icon: BrainCircuit, title: 'AI That Gets Roofing', desc: 'We built purpose-driven AI that understands roofing workflows — from photo-based inspections to voice-powered job scheduling.' },
  { icon: Rocket, title: 'One Platform, Everything Connected', desc: 'Archie brings every part of your roofing business into a single platform so nothing falls through the cracks and you can focus on what matters — roofing.' },
];

const FREE_TOOLS = [
  { name: 'Instant Roof Estimate', icon: Calculator, desc: 'Get a ballpark estimate for any roof replacement in under 60 seconds. Just enter your address.', link: '/resources/instant-estimate', cta: 'Try Free Estimator' },
  { name: 'Live Weather Radar', icon: CloudSun, desc: 'Track storms and hail in real time across every US county. Set alerts for your service area.', link: '/resources/weather-radar', cta: 'Open Radar' },
  { name: 'Free Roofing CRM', icon: Users, desc: 'All reports & AI features unlocked. Full CRM and all business tools — free forever. 5 jobs/mo, 2 roof + 2 measurement + 2 storm reports/mo.', link: '/resources/free-crm', cta: 'Start Free CRM' },
];

const RESOURCES = [
  { title: 'The Complete Roofing Business Guide', desc: 'Everything you need to start, run and scale a roofing company in 2026.', link: '/resources/complete-roofing-guide', tag: 'Guide' },
  { title: 'Insurance Claims Playbook', desc: 'Step-by-step process for filing, supplementing and closing insurance claims faster.', link: '/resources/insurance-claims-guide', tag: 'Playbook' },
  { title: 'Storm Damage Assessment Handbook', desc: 'How to identify, document and sell storm-damage roof repairs like a pro.', link: '/resources/storm-damage-guide', tag: 'Handbook' },
  { title: 'Roofing Materials Comparison Guide', desc: 'Asphalt, metal, tile, slate — costs, lifespan, pros & cons for every material type.', link: '/resources/materials-guide', tag: 'Guide' },
];

const TOP_CITIES = [
  'Dallas','Houston','Denver','Atlanta','Phoenix','Nashville','Charlotte','Tampa','Orlando','Chicago',
  'San Antonio','Austin','Oklahoma City','Minneapolis','St. Louis','Indianapolis','Columbus','Kansas City','Raleigh','Memphis',
];

const INTEGRATIONS = ['Google Calendar','Gmail','QuickBooks','Twilio','Stripe','NOAA Weather','Xactimate'];

/* ───────── animation helpers ───────── */
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };
const stagger = { visible: { transition: { staggerChildren: 0.08 } } };

/* ───────── component ───────── */
export default function HomePage() {
  const [email, setEmail] = useState('');

  return (
    <>
      {/* ── SEO / AEO Meta ── */}
      <Helmet>
        <title>Archie — The AI-Powered Operating System for Roofing Businesses</title>
        <meta name="description" content="Replace 10+ disconnected tools with Archie — one AI-powered platform for CRM, estimates, crew management, sales coaching, storm tracking, finances and more. Built by a roofer, for roofers." />
        <meta name="keywords" content="roofing software, roofing CRM, roofing business management, AI roofing, roof estimate software, storm tracking roofing, roofing production management, roofing sales tool, roofing app, Archie roofing" />
        <link rel="canonical" href="https://archie.now" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archie.now" />
        <meta property="og:title" content="Archie — The AI-Powered Operating System for Roofing Businesses" />
        <meta property="og:description" content="Replace 10+ disconnected tools with one AI-powered platform. From first knock to final payment — Archie runs your entire roofing operation." />
        <meta property="og:image" content="https://archie.now/og-home.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Archie — AI Roofing Platform" />
        <meta name="twitter:description" content="One platform. 10 tools. Zero busywork. Archie is the AI-powered operating system built for roofing companies." />
        <meta name="twitter:image" content="https://archie.now/og-home.png" />

        {/* AEO / Structured Data */}
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'SoftwareApplication',
          name: 'Archie',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://app.archie.now',
          description: 'AI-powered all-in-one roofing business management platform with CRM, estimates, crew management, storm tracking, sales coaching and more.',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free plan available — no credit card required' },
          featureList: 'CRM, AI Estimates, Production Management, Sales Coach, Storm Tracking, Finance Dashboard, Voice Assistant, Roof Inspections, Crew Management, Blueprint Analyzer',
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            { '@type': 'Question', name: 'What is Archie?', acceptedAnswer: { '@type': 'Answer', text: 'Archie is an AI-powered, all-in-one business management platform designed specifically for roofing companies. It replaces 10+ disconnected tools — CRM, estimates, production management, sales coaching, storm tracking and more — with a single platform.' }},
            { '@type': 'Question', name: 'How much does Archie cost?', acceptedAnswer: { '@type': 'Answer', text: 'Archie offers a free-forever plan with all reports and AI features unlocked, full CRM and all business tools, 5 jobs per month, and 2 roof + 2 measurement + 2 storm reports per month. Paid plans start at $99/month and scale with your team size. No credit card is required to get started.' }},
            { '@type': 'Question', name: 'Does Archie work with QuickBooks?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Archie integrates natively with QuickBooks Online to sync invoices, expenses and payments automatically.' }},
            { '@type': 'Question', name: 'What is Aria?', acceptedAnswer: { '@type': 'Answer', text: 'Aria is Archie\'s built-in AI voice assistant. You can ask Aria to pull up customer info, schedule jobs, generate estimates, check weather, and more — all by voice.' }},
          ]
        })}</script>

        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Archie',
          url: 'https://archie.now',
          logo: 'https://archie.now/logo.png',
          sameAs: ['https://twitter.com/archieroofing','https://linkedin.com/company/archie-roofing','https://facebook.com/archieroofing'],
          contactPoint: { '@type': 'ContactPoint', telephone: '+1-800-ARCHIE', contactType: 'sales', areaServed: 'US' },
        })}</script>
      </Helmet>

      {/* ═══════════════════  1. HERO  ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-hero min-h-screen flex items-center">
        {/* animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-archie-orange/5 blur-3xl animate-pulse-slow" />
          <div className="absolute top-1/2 -right-60 w-[500px] h-[500px] rounded-full bg-archie-accent/5 blur-3xl animate-pulse-slow" style={{ animationDelay: '1.5s' }} />
          <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-3xl animate-float" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* copy */}
            <motion.div initial="hidden" animate="visible" variants={stagger}>
              <motion.div variants={fadeUp} transition={{ duration: 0.6 }}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white/10 text-archie-orange border border-archie-orange/20 mb-6">
                  <Sparkles className="w-3.5 h-3.5" /> AI-Powered Platform
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white leading-[1.08] tracking-tight"
              >
                The Operating System for{' '}
                <span className="text-gradient">Roofing Businesses</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mt-6 text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed"
              >
                Replace 10+ disconnected tools with one AI-powered platform. From first knock to final payment — Archie runs your entire roofing operation.
              </motion.p>

              <motion.div variants={fadeUp} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-wrap gap-4">
                <CTAButton href="https://app.archie.now" size="lg" icon={Rocket}>
                  Start Free Today
                </CTAButton>
                <CTAButton variant="secondary" size="lg" href="/features" icon={PlayCircle}>
                  See All Features
                </CTAButton>
              </motion.div>

              <motion.p variants={fadeUp} transition={{ duration: 0.6, delay: 0.4 }} className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                Built by a roofer, for roofers — <strong className="text-white">the all-in-one platform for roofing contractors</strong>
              </motion.p>
            </motion.div>

            {/* App Screenshot */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
                {/* title bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border-b border-white/10">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                  <span className="ml-3 text-xs text-gray-400 font-mono">app.archie.now</span>
                </div>

                {/* Screenshot placeholder — replace src with real app screenshot */}
                <div className="relative bg-archie-navy aspect-[4/3] flex items-center justify-center">
                  <img
                    src="/screenshots/dashboard.png"
                    alt="Archie roofing CRM dashboard showing leads, jobs, and revenue tracking"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden absolute inset-0 flex-col items-center justify-center text-center p-8">
                    <LayoutDashboard className="w-16 h-16 text-archie-orange/40 mb-4" />
                    <p className="text-white/40 text-sm font-medium">App Screenshot</p>
                    <p className="text-white/20 text-xs mt-1">Place dashboard.png in /public/screenshots/</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  2. SOCIAL PROOF BAR  ═══════════════════ */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* integration logos */}
          <p className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Integrated with tools you already use</p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-12">
            {INTEGRATIONS.map((name) => (
              <span key={name} className="text-sm font-semibold text-gray-400 hover:text-archie-dark transition-colors">{name}</span>
            ))}
          </div>

          {/* feature highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { val: '10+', label: 'Integrated Tools' },
              { val: 'AI', label: 'Powered Inspections' },
              { val: 'Voice', label: 'Assistant Built In' },
              { val: '50', label: 'States — Works Nationwide' },
            ].map((s) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <p className="text-3xl sm:text-4xl font-extrabold text-gradient">{s.val}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════  3. PROBLEM / SOLUTION  ═══════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Why Archie"
            title="Sound Familiar?"
            subtitle="Running a roofing company shouldn't require duct-taping a dozen apps together."
          />

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mt-4">
            {/* pain */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
              <h3 className="text-lg font-bold text-red-500 flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 text-red-500 text-xs font-black">✕</span>
                Without Archie
              </h3>
              {PAIN_POINTS.map((p, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="flex gap-3 items-start bg-white rounded-xl border border-red-100 p-4 shadow-sm">
                  <span className="mt-0.5 w-5 h-5 rounded-full bg-red-100 text-red-400 flex items-center justify-center shrink-0 text-xs font-bold">{i + 1}</span>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.pain}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* solution */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger} className="space-y-4">
              <h3 className="text-lg font-bold text-green-600 flex items-center gap-2 mb-2">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-600 text-xs font-black">✓</span>
                With Archie
              </h3>
              {PAIN_POINTS.map((p, i) => (
                <motion.div key={i} variants={fadeUp} transition={{ duration: 0.4 }} className="flex gap-3 items-start bg-white rounded-xl border border-green-100 p-4 shadow-sm">
                  <CheckCircle2 className="mt-0.5 w-5 h-5 text-green-500 shrink-0" />
                  <p className="text-gray-700 text-sm leading-relaxed font-medium">{p.solve}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  4. 10 TOOLS SHOWCASE  ═══════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="All-In-One Platform"
            title="10 Powerful Tools. One Subscription."
            subtitle="Everything your roofing business needs — from first knock to final payment."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5"
          >
            {TOOLS.map((t) => (
              <motion.a
                key={t.name}
                href={t.link}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group relative rounded-2xl border border-gray-100 bg-white p-5 shadow-sm hover:shadow-xl hover:border-archie-orange/30 transition-all duration-300"
              >
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                  <t.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1.5">{t.name}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{t.desc}</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-semibold text-archie-orange opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn More <ArrowRight className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  5. AI FEATURES SPOTLIGHT  ═══════════════════ */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Artificial Intelligence"
            title="AI That Actually Understands Roofing"
            subtitle="Not generic AI bolted on — purpose-built intelligence trained on millions of roofing data points."
            light
          />

          {/* AI Inspections */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="text-archie-orange font-bold text-sm uppercase tracking-widest">AI Roof Inspections</span>
              <h3 className="text-3xl font-extrabold text-white mt-2 mb-6">From Photo to Full Report in Seconds</h3>
              <div className="space-y-5">
                {[
                  { step: '1', icon: Camera, title: 'Upload a Photo', desc: 'Snap a photo from the ground, a drone, or upload a satellite image.' },
                  { step: '2', icon: BrainCircuit, title: 'AI Analyzes the Roof', desc: 'Our model detects damage type, affected area, material condition and remaining lifespan.' },
                  { step: '3', icon: FileText, title: 'Get a Detailed Report', desc: 'Receive a professional inspection report with measurements, photos, and a recommended scope of work.' },
                ].map((s) => (
                  <div key={s.step} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-full bg-archie-orange/20 flex items-center justify-center shrink-0">
                      <s.icon className="w-5 h-5 text-archie-orange" />
                    </div>
                    <div>
                      <p className="font-bold text-white">{s.title}</p>
                      <p className="text-sm text-gray-400">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-archie-orange flex items-center justify-center">
                  <BrainCircuit className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-bold text-sm">AI Inspection Report</span>
                <span className="ml-auto text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full font-bold">COMPLETE</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  { label: 'Damage Type', val: 'Hail Impact' },
                  { label: 'Severity', val: 'Moderate' },
                  { label: 'Affected Area', val: '~34 sq ft' },
                  { label: 'Roof Age', val: '~12 years' },
                ].map((d) => (
                  <div key={d.label} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <span className="text-[10px] text-gray-500 uppercase tracking-wider">{d.label}</span>
                    <p className="text-sm font-bold text-white mt-0.5">{d.val}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                <span className="text-[10px] text-gray-500 uppercase tracking-wider">Recommendation</span>
                <p className="text-sm text-gray-300 mt-1">Full replacement recommended. Multiple impact marks with granule loss exceeding manufacturer threshold. Estimated cost: <strong className="text-white">$14,200 – $16,800</strong></p>
              </div>
            </motion.div>
          </div>

          {/* Voice Assistant Aria */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-archie-orange to-archie-accent flex items-center justify-center shadow-lg">
                  <Mic className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">Aria</p>
                  <p className="text-[11px] text-gray-400">AI Voice Assistant</p>
                </div>
                <span className="ml-auto flex items-center gap-1.5 text-[11px] text-green-400 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /> Listening
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { user: true, text: '"Aria, what jobs do I have today?"' },
                  { user: false, text: 'You have 3 jobs today: tear-off at 1842 Elm (Crew A, 8 AM), inspection at 290 Oak (you, 11 AM), and a follow-up estimate at the Thompson residence at 2 PM.' },
                  { user: true, text: '"Move the Thompson estimate to Friday at 10."' },
                  { user: false, text: 'Done. I\'ve rescheduled the Thompson estimate to Friday at 10 AM and sent them a confirmation text.' },
                ].map((m, i) => (
                  <div key={i} className={`flex ${m.user ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm ${m.user ? 'bg-archie-orange text-white rounded-br-md' : 'bg-white/10 text-gray-200 rounded-bl-md'}`}>
                      {m.text}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="order-1 lg:order-2"
            >
              <span className="text-archie-orange font-bold text-sm uppercase tracking-widest">Voice Assistant</span>
              <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">Meet Aria — Your AI Business Partner</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">Aria lives inside Archie and understands roofing. Ask her to schedule jobs, pull up customer info, generate estimates, check the weather forecast, or run sales reports — all hands-free.</p>
              <ul className="space-y-3">
                {[
                  'Schedule and reschedule jobs by voice',
                  'Instant customer lookup and history',
                  'Generate estimates without touching a keyboard',
                  'Real-time weather and storm alerts',
                  'Daily briefings and sales performance summaries',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-gray-300">
                    <CheckCircle2 className="w-4 h-4 text-archie-orange mt-0.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* AI Estimates */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-archie-orange font-bold text-sm uppercase tracking-widest">AI Estimates</span>
            <h3 className="text-3xl font-extrabold text-white mt-2 mb-4">Accurate Estimates in Under 60 Seconds</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">Archie cross-references satellite measurements, local material costs, labor rates and insurance pricing to generate professional estimates your customers can approve on the spot.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                { icon: Zap, text: 'Instant roof measurements' },
                { icon: DollarSign, text: 'Region-specific pricing' },
                { icon: FileText, text: 'Branded PDF proposals' },
                { icon: Mail, text: 'One-click send & e-sign' },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300">
                  <f.icon className="w-4 h-4 text-archie-orange" />
                  {f.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  6. WHY WE BUILT ARCHIE  ═══════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Our Story"
            title="Why We Built Archie"
            subtitle="Archie was born out of real frustration on real rooftops — not in a Silicon Valley boardroom."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            variants={stagger}
            className="grid md:grid-cols-2 gap-6"
          >
            {WHY_WE_BUILT.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-archie-orange" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  7. ROI CALCULATOR  ═══════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="ROI Calculator"
            title="See How Much Time & Money Archie Saves You"
            subtitle="Estimated savings based on industry averages and typical roofing operations."
          />

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: Calendar, val: '22 hrs/week', label: 'Potential Time Saved', desc: 'Automated scheduling, follow-ups and reporting can free up over 22 hours per week for a typical team.' },
              { icon: TrendingUp, val: '35%', label: 'More Leads Captured', desc: 'Automated lead capture and follow-up sequences help close the gap so fewer opportunities slip through.' },
              { icon: DollarSign, val: '$148K', label: 'Potential Revenue Gain', desc: 'Industry studies show that streamlined operations can drive six-figure revenue gains in the first year.' },
              { icon: BarChart3, val: '3.2x', label: 'Estimated ROI', desc: 'Based on time savings and efficiency gains, the estimated return on investment is over 3x in year one.' },
            ].map((c) => (
              <div key={c.label} className="text-center p-6 rounded-2xl border border-gray-100 hover:border-archie-orange/30 hover:shadow-lg transition-all">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-archie-orange/10 flex items-center justify-center">
                  <c.icon className="w-7 h-7 text-archie-orange" />
                </div>
                <p className="text-3xl font-extrabold text-gradient">{c.val}</p>
                <p className="font-bold text-gray-900 mt-1">{c.label}</p>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </motion.div>

          <div className="text-center mt-10">
            <CTAButton href="https://app.archie.now" icon={Rocket}>
              Start Saving Today — Free
            </CTAButton>
          </div>
        </div>
      </section>

      {/* ═══════════════════  8. FREE TOOLS  ═══════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Free Tools"
            title="Try These Tools — Completely Free"
            subtitle="No sign-up required. Use them right now."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-6"
          >
            {FREE_TOOLS.map((ft) => (
              <motion.a
                key={ft.name}
                href={ft.link}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-archie-orange/30 transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4 group-hover:bg-archie-orange/20 transition-colors">
                  <ft.icon className="w-6 h-6 text-archie-orange" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{ft.name}</h3>
                <p className="text-sm text-gray-500 leading-relaxed mb-4">{ft.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-archie-orange group-hover:gap-2.5 transition-all">
                  {ft.cta} <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  9. RESOURCES  ═══════════════════ */}
      <section className="bg-white py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Roofing Resources"
            title="Learn from the Best in Roofing"
            subtitle="Guides, playbooks and articles written by industry experts."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {RESOURCES.map((r) => (
              <motion.a
                key={r.title}
                href={r.link}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className="group rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <div className="h-36 bg-gradient-to-br from-archie-navy to-archie-blue flex items-center justify-center">
                  <BookOpen className="w-10 h-10 text-white/40 group-hover:text-white/70 transition-colors" />
                </div>
                <div className="p-5">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-archie-orange/10 text-archie-orange mb-2">{r.tag}</span>
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-archie-orange transition-colors text-sm">{r.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{r.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════  10. CITY / LOCAL  ═══════════════════ */}
      <section className="bg-gray-50 py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Local Coverage"
            title="Archie Works in Your City"
            subtitle="Serving roofing professionals in every major metro. Find your city below."
          />

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* CSS map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] rounded-2xl bg-gradient-to-br from-archie-navy to-archie-blue overflow-hidden border border-white/10 shadow-xl"
            >
              {/* stylized US outline dots */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg viewBox="0 0 200 130" className="w-full h-full p-6 opacity-20" fill="none" stroke="white" strokeWidth="0.5">
                  <path d="M20,45 Q30,20 60,25 Q80,15 100,22 Q130,18 150,28 Q170,25 180,35 Q185,50 178,60 Q175,75 165,80 Q155,90 140,88 Q120,95 100,90 Q80,95 60,85 Q40,80 30,70 Q18,60 20,45 Z" />
                </svg>
              </div>
              {/* animated pings */}
              {[
                { top: '32%', left: '25%' },
                { top: '55%', left: '72%' },
                { top: '40%', left: '50%' },
                { top: '62%', left: '38%' },
                { top: '28%', left: '65%' },
                { top: '48%', left: '82%' },
                { top: '70%', left: '55%' },
                { top: '35%', left: '40%' },
              ].map((pos, i) => (
                <div
                  key={i}
                  className="absolute"
                  style={{ top: pos.top, left: pos.left }}
                >
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-archie-orange opacity-75" style={{ animationDelay: `${i * 0.4}s` }} />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-archie-orange shadow-lg shadow-archie-orange/40" />
                  </span>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 text-white text-xs font-semibold bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
                <span className="text-archie-orange font-bold">Available</span> nationwide across all 50 states
              </div>
            </motion.div>

            {/* city links */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              <div className="grid grid-cols-2 gap-2">
                {TOP_CITIES.map((city) => (
                  <motion.a
                    key={city}
                    href={`/cities/${city.toLowerCase().replace(/\s+/g, '-')}`}
                    variants={fadeUp}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-gray-100 text-sm font-medium text-gray-700 hover:border-archie-orange/30 hover:text-archie-orange hover:shadow-sm transition-all"
                  >
                    <MapPin className="w-4 h-4 text-archie-orange shrink-0" />
                    Roofing Software — {city}
                  </motion.a>
                ))}
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Don't see your city?{' '}
                <a href="/cities" className="text-archie-orange font-semibold hover:underline">
                  View all locations <ChevronRight className="inline w-3 h-3" />
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════  11. FINAL CTA  ═══════════════════ */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 lg:py-28">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-archie-orange/5 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-archie-accent/5 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Sparkles className="w-10 h-10 text-archie-orange mx-auto mb-4" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Ready to Transform Your Roofing Business?
            </h2>
            <p className="mt-4 text-lg text-gray-300 max-w-xl mx-auto">
              Be among the first to transform your roofing business with the all-in-one AI platform.
            </p>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.location.href = `https://app.archie.now/signup?email=${encodeURIComponent(email)}`;
              }}
              className="mt-8 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@roofingcompany.com"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-archie-orange/50 text-sm"
              />
              <CTAButton type="submit" size="lg" icon={Rocket}>
                Start Free Today
              </CTAButton>
            </form>

            <p className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-400">
              <Shield className="w-4 h-4" />
              Start free — no credit card required
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Free forever</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> No credit card</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Cancel anytime</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-green-400" /> Setup in 5 minutes</span>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

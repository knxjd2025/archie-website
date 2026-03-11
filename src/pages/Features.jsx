import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Camera, Mic, FileText, CloudLightning, GraduationCap,
  HardHat, Users, Search, DollarSign, ArrowRight, CheckCircle2, XCircle,
  ChevronDown, Zap, Shield, Clock, BarChart3, Star
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const tools = [
  {
    icon: LayoutDashboard, name: 'Roofing CRM', slug: '/features/crm',
    desc: 'The most comprehensive roofing CRM ever built. Manage leads, jobs, invoices, estimates, calendars, documents, insurance claims, e-signatures, automations, inventory, maps, reports, photos, team chat, SMS, email, supplements, and change orders all from one dashboard designed exclusively for roofing contractors.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: Camera, name: 'AI Roof Inspections', slug: '/features/ai-roof-inspections',
    desc: 'Upload roof photos and receive professional, branded inspection reports in minutes. Archie uses a advanced AI system to detect shingle damage, hail impacts, wind lift, ponding, flashing failures, and more. Reports include Good/Better/Best repair recommendations with NOAA storm data integration.',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Mic, name: 'Aria Voice Assistant', slug: '/features/voice-assistant',
    desc: 'Meet Aria, your AI-powered voice assistant powered by the Aria AI Assistant. Issue 35+ voice commands hands-free from the roof, the truck, or the office. Create leads, schedule jobs, generate estimates, check weather, log notes, and navigate your CRM entirely by voice.',
    color: 'from-purple-500 to-violet-600',
  },
  {
    icon: FileText, name: 'AI Estimates', slug: '/features/estimates',
    desc: 'Generate accurate roofing estimates with AI assistance. Archie calculates materials, labor, waste factors, and tax automatically. Send polished estimates via public links, collect e-signatures, and convert to invoices with one click. Supports shingle, metal, flat, tile, and specialty roofing systems.',
    color: 'from-orange-500 to-amber-600',
  },
  {
    icon: CloudLightning, name: 'Storm Intelligence', slug: '/features/storm-tool',
    desc: 'MyCanvass storm tracking integrates real-time NOAA data for hail, wind, tornado, and severe weather events. Generate storm reports, manage canvassing territories, and connect storm data directly to insurance claims. Know exactly where to canvass before your competitors.',
    color: 'from-cyan-500 to-blue-600',
  },
  {
    icon: GraduationCap, name: 'AI Sales Coach', slug: '/features/sales-coach',
    desc: 'Train your sales team with AI-driven coaching. Structured training tracks, realistic phone practice with AI homeowners, a curated script library, quiz-based certifications, and performance analytics help your reps close more deals and reduce ramp-up time.',
    color: 'from-pink-500 to-rose-600',
  },
  {
    icon: HardHat, name: 'Production Hub', slug: '/features/production',
    desc: 'Manage crews, track GPS time, dispatch jobs, coordinate subcontractors, and run QC inspections from a centralized production board. The crew mobile portal supports English and Spanish, giving your field teams everything they need on-site without confusion.',
    color: 'from-yellow-500 to-orange-600',
  },
  {
    icon: Users, name: 'Referral Network', slug: '/features/networking',
    desc: 'Build and manage referral relationships with insurance agents, realtors, property managers, and trade partners. Track referral sources, score partner value, automate thank-you workflows, and measure which relationships generate the most revenue for your roofing business.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Search, name: 'Prospector', slug: '/features/prospector',
    desc: 'Find new leads before anyone else with permit-based prospecting powered by the Shovels API. Search recent roofing permits, analyze market intelligence, build targeted outreach campaigns, and identify neighborhoods with aging roofs that need replacement.',
    color: 'from-red-500 to-pink-600',
  },
  {
    icon: DollarSign, name: 'Finance Command', slug: '/features/finance',
    desc: 'Take control of your roofing company finances. Track cash flow, manage collections, monitor job profitability in real time, calculate sales commissions automatically, and measure Days Sales Outstanding. Finance Command gives owners the visibility they need to scale profitably.',
    color: 'from-emerald-500 to-green-600',
  },
];

const comparisonRows = [
  { feature: 'Roofing-Specific CRM', archie: true, jobber: false, acculynx: true, roofr: false },
  { feature: 'Roof Measurements Included (others charge $20+ each)', archie: true, jobber: false, acculynx: false, roofr: 'Paid' },
  { feature: 'AI Roof Inspection Reports', archie: true, jobber: false, acculynx: false, roofr: true },
  { feature: 'Voice Assistant (35+ Commands)', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'AI-Powered Estimates', archie: true, jobber: true, acculynx: true, roofr: true },
  { feature: 'NOAA Storm Data Integration', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'AI Sales Coaching & Training', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'GPS Crew Time Tracking', archie: true, jobber: true, acculynx: false, roofr: false },
  { feature: 'Spanish Crew Portal', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'Permit-Based Lead Prospecting', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'Finance & DSO Tracking', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'Referral Network Management', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'Insurance Claims Management', archie: true, jobber: false, acculynx: true, roofr: false },
  { feature: 'E-Signatures Built In', archie: true, jobber: false, acculynx: true, roofr: true },
  { feature: 'Blueprint Analyzer', archie: true, jobber: false, acculynx: false, roofr: false },
  { feature: 'Archie AI System (Proprietary)', archie: true, jobber: false, acculynx: false, roofr: false },
];

const faqs = [
  { q: 'What is Archie and who is it for?', a: 'Archie is an all-in-one AI-powered operating system built exclusively for roofing contractors. Whether you are a one-truck operation or a multi-state enterprise, Archie provides every tool you need to manage leads, close sales, run production, and grow profitably. It is designed for roofing company owners, sales managers, production managers, and office administrators.' },
  { q: 'How many tools does Archie include?', a: 'Archie includes 10 integrated tools: a full Roofing CRM, AI Roof Inspections, Aria Voice Assistant, AI Estimates, Storm Intelligence (MyCanvass), AI Sales Coach, Production Hub, Referral Network, Prospector, and Finance Command. Every tool is purpose-built for roofing workflows and connects seamlessly with the others.' },
  { q: 'How is Archie different from Jobber or AccuLynx?', a: 'Unlike generic field service tools like Jobber, Archie is built exclusively for roofing. Unlike AccuLynx, Archie includes AI roof inspections, a voice assistant, AI sales coaching, permit-based lead prospecting, and storm intelligence. Archie replaces five to seven separate subscriptions with one platform that actually understands roofing.' },
  { q: 'Does Archie work for storm restoration and insurance roofing?', a: 'Absolutely. Archie was designed with storm restoration in mind. The Storm Intelligence tool integrates real-time NOAA data, the CRM has full insurance claims management with supplement tracking, and AI roof inspections generate reports formatted for insurance adjusters.' },
  { q: 'Can I use Archie on my phone from the job site?', a: 'Yes. Archie is fully mobile-responsive, and the Aria voice assistant lets you operate the system hands-free from the roof, the truck, or anywhere in the field. The crew mobile portal also works on any smartphone and supports both English and Spanish.' },
  { q: 'How does AI improve my roofing business?', a: 'Archie uses artificial intelligence in six core areas: generating inspection reports from photos, creating accurate estimates, coaching your sales team, analyzing storm data for canvassing, finding leads via permit data, and enabling voice-controlled CRM access. AI is designed to dramatically reduce the time your team spends on administrative tasks.' },
  { q: 'Is my data secure with Archie?', a: 'Yes. Archie uses enterprise-grade encryption, role-based access controls, and secure cloud infrastructure. Your customer data, financial records, and business intelligence are protected with SOC 2-level security practices. Data is backed up continuously and you maintain full ownership of your information.' },
  { q: 'How long does it take to set up Archie?', a: 'Most roofing companies are fully operational on Archie within 48 hours. Our onboarding team migrates your existing data, configures your workflows, and trains your team. The intuitive interface means most users are comfortable within a single day of usage.' },
  { q: 'Does Archie integrate with QuickBooks or other accounting software?', a: 'Yes. Archie integrates with QuickBooks, Xero, and other popular accounting platforms. Invoices, payments, and financial data sync automatically, eliminating double-entry and keeping your books accurate in real time.' },
  { q: 'Can Archie help me generate more leads?', a: 'Yes, in multiple ways. The Prospector tool finds homeowners with recent roofing permits and aging roofs. Storm Intelligence identifies neighborhoods hit by hail or wind. The Referral Network tracks partner relationships. And AI Estimates with public links convert more website visitors into booked appointments.' },
  { q: 'What kind of roofing companies is Archie built for?', a: 'Archie is designed for residential roofers, commercial roofing contractors, storm restoration companies, multi-branch operations, and specialty roofing businesses. Whether you are a solo operator or a large enterprise, Archie scales to fit your workflow.' },
  { q: 'Does Archie offer a free plan?', a: 'Yes. Archie offers a free plan that is free forever — not a trial. It includes all reports and AI features unlocked, full CRM and all business tools, 5 jobs per month, 2 roof reports, 2 measurement reports, and 2 storm reports per month. No credit card required.' },
];

function Cell({ ok }) {
  if (ok === 'Paid') return <span className="text-xs font-semibold text-amber-500 block text-center">$20+/ea</span>;
  return ok ? (
    <CheckCircle2 className="w-5 h-5 text-emerald-400 mx-auto" />
  ) : (
    <XCircle className="w-5 h-5 text-gray-600 mx-auto" />
  );
}

function FAQItem({ q, a }) {
  return (
    <details className="group border border-white/10 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer select-none text-white font-semibold text-lg hover:bg-white/5 transition-colors">
        {q}
        <ChevronDown className="w-5 h-5 text-archie-orange shrink-0 group-open:rotate-180 transition-transform" />
      </summary>
      <div className="px-6 pb-6 text-gray-300 leading-relaxed">{a}</div>
    </details>
  );
}

export default function Features() {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Archie is the all-in-one AI-powered operating system for roofing contractors. 10 integrated tools including CRM, AI inspections, voice assistant, estimates, storm intelligence, sales coaching, production management, referral networking, lead prospecting, and financial tracking.',
    url: 'https://archie.now/features',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free plan available' },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Roofing Software Features | 10 AI-Powered Tools for Roofers | Archie</title>
        <meta name="description" content="Explore Archie's 10 integrated roofing tools: CRM, AI roof inspections, voice assistant, AI estimates, storm intelligence, sales coaching, production hub, referral network, lead prospector, and finance tracking. Built for roofers, by roofers." />
        <meta name="keywords" content="roofing software features, roofing CRM, AI roof inspection, roofing voice assistant, roofing estimate software, storm tracking roofing, roofing sales training, roofing production management, roofing lead generation, roofing finance software" />
        <link rel="canonical" href="https://archie.now/features" />
        <meta property="og:title" content="Archie Features - 10 AI-Powered Roofing Tools" />
        <meta property="og:description" content="The most comprehensive roofing platform ever built. 10 tools, one subscription. Manage your entire roofing business with AI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://archie.now/features" />
        <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
            10 Tools. One Platform. Zero Compromises.
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight max-w-4xl mx-auto">
            Every Tool Your Roofing Business <span className="text-gradient">Will Ever Need</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Archie combines CRM, AI inspections, voice control, estimates, storm tracking, sales coaching, production management, referral networking, lead prospecting, and financial analytics into one powerful platform built exclusively for roofing professionals.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Zap}>Start Free Today</CTAButton>
            <CTAButton href="#tools" variant="secondary" size="lg">Explore All Tools</CTAButton>
          </motion.div>
        </div>
      </section>

      {/* App Screenshot */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="/screenshots/crm-dashboard.png"
              alt="Archie roofing platform dashboard screenshot"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { val: '10', label: 'Integrated Tools', icon: LayoutDashboard },
              { val: '35+', label: 'Voice Commands', icon: Mic },
              { val: '6', label: 'AI-Powered Features', icon: Star },
              { val: '2 min', label: 'AI Inspection Reports', icon: Clock },
            ].map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex flex-col items-center">
                <s.icon className="w-8 h-8 text-archie-orange mb-2" />
                <span className="text-4xl font-extrabold text-archie-dark">{s.val}</span>
                <span className="text-gray-500 mt-1">{s.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="The Complete Toolkit" title="10 AI-Powered Tools for Modern Roofers" subtitle="Each tool is purpose-built for roofing workflows and seamlessly integrates with every other tool in the platform." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {tools.map((t, i) => (
              <motion.div key={t.slug} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <Link to={t.slug} className="group block bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-archie-orange/40 transition-all duration-300 h-full">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${t.color} flex items-center justify-center mb-5`}>
                    <t.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-archie-orange transition-colors">{t.name}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{t.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-archie-orange font-semibold text-sm group-hover:gap-3 transition-all">
                    Learn More <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Replace 5-7 Subscriptions With One</h2>
          <p className="mt-4 text-lg text-white/80">Stop paying for Jobber + AccuLynx + Roofr + CompanyCam + SalesRabbit separately. Archie does it all.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Start Your Free Account</CTAButton>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Why Archie Wins" title="Feature Comparison: Archie vs. Competitors" subtitle="See how Archie stacks up against Jobber, AccuLynx, and Roofr across the features that matter most to roofing contractors." />
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[640px] text-left">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="py-4 pr-4 text-archie-dark font-bold">Feature</th>
                  <th className="py-4 px-4 text-center text-archie-orange font-bold">Archie</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-semibold">Jobber</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-semibold">AccuLynx</th>
                  <th className="py-4 px-4 text-center text-gray-500 font-semibold">Roofr</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((r, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3.5 pr-4 text-archie-dark font-medium">{r.feature}</td>
                    <td className="py-3.5 px-4"><Cell ok={r.archie} /></td>
                    <td className="py-3.5 px-4"><Cell ok={r.jobber} /></td>
                    <td className="py-3.5 px-4"><Cell ok={r.acculynx} /></td>
                    <td className="py-3.5 px-4"><Cell ok={r.roofr} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Why AI Matters */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="The AI Advantage" title="Why AI-Powered Roofing Software Matters in 2026" subtitle="Roofing companies that adopt AI tools close more deals, reduce overhead, and scale faster than competitors still using spreadsheets and whiteboards." light />
          <div className="grid md:grid-cols-3 gap-8 mt-4">
            {[
              { icon: Zap, title: 'Speed', text: 'AI generates inspection reports in 2 minutes, estimates in 30 seconds, and answers customer questions instantly via Aria. Speed wins in roofing sales.' },
              { icon: Shield, title: 'Accuracy', text: 'Archie AI analysis catches damage that human inspectors miss. AI estimates use regional material pricing and precise waste calculations for better margins.' },
              { icon: BarChart3, title: 'Intelligence', text: 'Storm data, permit records, and market analytics give you actionable intelligence to canvass the right neighborhoods at the right time.' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <item.icon className="w-10 h-10 text-archie-orange mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Questions & Answers" title="Frequently Asked Questions About Archie" subtitle="Everything roofers ask before switching to the most powerful roofing platform available." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Ready to Run Your Roofing Business on Archie?</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Replace your patchwork of tools with one AI-powered platform built exclusively for roofing. Start free, upgrade when you are ready.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Zap}>Create Free Account</CTAButton>
            <CTAButton href="/pricing" variant="secondary" size="lg">View Pricing</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  Bot,
  BrainCircuit,
  Calendar,
  Check,
  ChevronRight,
  CloudLightning,
  Crown,
  DollarSign,
  FileText,
  Headset,
  Layers,
  LayoutDashboard,
  LineChart,
  MapPin,
  Megaphone,
  Mic,
  Minus,
  Phone,
  Plus,
  Rocket,
  Search,
  Shield,
  Sparkles,
  Star,
  Target,
  TrendingUp,
  Users,
  X,
  Zap,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

/* ───────── helpers ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const DISCOUNT = 0.25;

function annual(monthly) {
  return +(monthly * (1 - DISCOUNT)).toFixed(2);
}

function formatPrice(n) {
  if (Number.isInteger(n)) return n;
  return n.toFixed(2).replace(/\.00$/, '');
}

/* ───────── plan data ───────── */

const PLANS = [
  {
    name: 'Free',
    monthly: 0,
    users: '1 user',
    reports: '5 jobs/mo',
    desc: 'All reports & AI features unlocked. Full CRM and business tools — free forever.',
    highlights: ['All reports & AI features unlocked', 'Full CRM and all business tools', '5 jobs per month', '2 roof reports/mo', '2 measurement reports/mo', '2 storm reports/mo', 'Document storage (500 MB)', 'Mobile access', 'Email support'],
    cta: 'Start Free',
    href: 'https://app.archie.now',
    popular: false,
    color: 'border-gray-200',
  },
  {
    name: 'Solo',
    monthly: 99,
    users: '1 user',
    reports: '30 roof / 30 meas. / 30 storm',
    desc: 'Full platform access for the one-person roofing operation.',
    highlights: ['Everything in Free', 'Unlimited contacts & pipelines', 'AI estimating & damage assessment', 'Built-in calling & SMS', 'Payment processing', 'QuickBooks integration', 'Phone support'],
    cta: 'Start Solo',
    href: 'https://app.archie.now',
    popular: false,
    color: 'border-blue-200',
  },
  {
    name: 'Team',
    monthly: 299,
    users: '5 users',
    extraUser: 49,
    reports: '200 roof / 200 meas. / 200 storm',
    desc: 'Built for growing companies. Manage crews, sales reps, and operations.',
    highlights: ['Everything in Solo', '5 users included (+$49/extra)', 'Sales Coach AI', 'Crew management & GPS tracking', 'Commission tracking', 'Profit per job analytics', 'Financial dashboards', 'Subcontractor management', 'Priority support (3 training sessions)'],
    cta: 'Start Team',
    href: 'https://app.archie.now',
    popular: true,
    color: 'border-archie-orange',
  },
  {
    name: 'Enterprise',
    monthly: null,
    users: 'Unlimited users',
    reports: 'Unlimited reports',
    desc: 'Custom-tailored for large operations. White-label ready.',
    highlights: ['Everything in Team', 'Unlimited users & reports', 'White-labeling & custom branding', 'Dedicated account manager', 'Custom integrations & API', 'Unlimited training & onboarding', 'SLA & uptime guarantees', '99.9% SLA'],
    cta: 'Contact Sales',
    href: 'https://app.archie.now/contact',
    popular: false,
    color: 'border-purple-200',
  },
];

/* ───────── feature comparison ───────── */

const FEATURE_COMPARISON = [
  { category: 'CRM & Sales', features: [
    { name: 'Lead management', free: true, solo: true, team: true, enterprise: true },
    { name: 'Contact database', free: '100', solo: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Sales pipelines', free: '1', solo: '3', team: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Email templates', free: '5', solo: '25', team: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Automated follow-ups', free: false, solo: true, team: true, enterprise: true },
    { name: 'Built-in calling', free: false, solo: true, team: true, enterprise: true },
    { name: 'SMS messaging', free: false, solo: true, team: true, enterprise: true },
    { name: 'Custom fields', free: false, solo: true, team: true, enterprise: true },
    { name: 'Lead scoring', free: false, solo: false, team: true, enterprise: true },
    { name: 'Territory management', free: false, solo: false, team: true, enterprise: true },
  ]},
  { category: 'AI & Intelligence', features: [
    { name: 'Roof reports', free: '2/mo', solo: '30/mo', team: '200/mo', enterprise: 'Unlimited' },
    { name: 'Measurement reports', free: '2/mo', solo: '30/mo', team: '200/mo', enterprise: 'Unlimited' },
    { name: 'Storm reports', free: '2/mo', solo: '30/mo', team: '200/mo', enterprise: 'Unlimited' },
    { name: 'AI damage assessment', free: true, solo: true, team: true, enterprise: true },
    { name: 'AI estimating', free: true, solo: true, team: true, enterprise: true },
    { name: 'Sales Coach AI', free: false, solo: false, team: true, enterprise: true },
    { name: 'Call transcription & analysis', free: false, solo: false, team: true, enterprise: true },
    { name: 'Predictive lead scoring', free: false, solo: false, team: true, enterprise: true },
    { name: 'Custom AI models', free: false, solo: false, team: false, enterprise: true },
  ]},
  { category: 'Production & Operations', features: [
    { name: 'Job tracking (Kanban)', free: true, solo: true, team: true, enterprise: true },
    { name: 'Calendar & scheduling', free: true, solo: true, team: true, enterprise: true },
    { name: 'Photo & document upload', free: '500 MB', solo: '10 GB', team: '100 GB', enterprise: 'Unlimited' },
    { name: 'Material ordering', free: false, solo: true, team: true, enterprise: true },
    { name: 'Crew management', free: false, solo: false, team: true, enterprise: true },
    { name: 'GPS crew tracking', free: false, solo: false, team: true, enterprise: true },
    { name: 'Subcontractor management', free: false, solo: false, team: true, enterprise: true },
    { name: 'Inspection checklists', free: false, solo: true, team: true, enterprise: true },
    { name: 'Permit tracking', free: false, solo: true, team: true, enterprise: true },
  ]},
  { category: 'Finance & Billing', features: [
    { name: 'Basic invoicing', free: true, solo: true, team: true, enterprise: true },
    { name: 'Online payment processing', free: false, solo: true, team: true, enterprise: true },
    { name: 'QuickBooks integration', free: false, solo: true, team: true, enterprise: true },
    { name: 'Financing options (GreenSky)', free: false, solo: true, team: true, enterprise: true },
    { name: 'Commission tracking', free: false, solo: false, team: true, enterprise: true },
    { name: 'Profit per job analytics', free: false, solo: false, team: true, enterprise: true },
    { name: 'Cash flow dashboards', free: false, solo: false, team: true, enterprise: true },
    { name: 'Multi-entity accounting', free: false, solo: false, team: false, enterprise: true },
  ]},
  { category: 'Support & Administration', features: [
    { name: 'Mobile app (iOS & Android)', free: true, solo: true, team: true, enterprise: true },
    { name: 'Email support', free: true, solo: true, team: true, enterprise: true },
    { name: 'Phone support', free: false, solo: true, team: true, enterprise: true },
    { name: 'Live chat support', free: false, solo: true, team: true, enterprise: true },
    { name: 'Onboarding training', free: false, solo: '1 session', team: '3 sessions', enterprise: 'Unlimited' },
    { name: 'Dedicated account manager', free: false, solo: false, team: false, enterprise: true },
    { name: 'Custom integrations / API', free: false, solo: false, team: false, enterprise: true },
    { name: 'White-labeling', free: false, solo: false, team: false, enterprise: true },
    { name: 'SSO / SAML', free: false, solo: false, team: false, enterprise: true },
    { name: 'SLA guarantee', free: false, solo: false, team: '99.5%', enterprise: '99.9%' },
  ]},
];

/* ───────── add-ons ───────── */

const ADDONS = [
  { name: 'Canvas (MyCanvass)', price: '$19/mo', desc: 'Storm tracking + canvassing maps. See live hail data, assign territories, track door-knocks in real time.', icon: MapPin },
  { name: 'Sales Coach', price: '$49/mo', desc: 'AI-powered call scoring, real-time objection handling tips, and performance analytics for every sales rep.', icon: Target },
  { name: 'Storm Intelligence', price: '$99/mo', desc: 'Real-time NOAA storm data, automated hail alerts for your service area, and neighborhood damage reports.', icon: CloudLightning },
  { name: 'Supplements', price: '$99/mo + $10/each', desc: 'AI-generated insurance supplement documents. Maximize claim payouts with data-backed line items.', icon: FileText },
  { name: 'AI Receptionist', price: '$99/mo + $0.29/min', desc: 'AI-powered phone answering that books appointments, qualifies leads, and never misses a call. 24/7 coverage.', icon: Phone, comingSoon: true },
];

/* ───────── prospector ───────── */

const PROSPECTOR_PLANS = [
  { name: 'Starter', price: 999, leads: '250 leads/mo', highlights: ['Property data enrichment', 'Roof age filtering', 'Insurance carrier data', 'CSV export', 'Email support'] },
  { name: 'Growth', price: 1999, leads: '1,000 leads/mo', highlights: ['Everything in Starter', 'Storm overlay data', 'Auto-assign territories', 'CRM integration', 'Phone support'] },
  { name: 'Scale', price: 3499, leads: '2,500 leads/mo', highlights: ['Everything in Growth', 'Predictive scoring', 'Multi-territory management', 'API access', 'Dedicated CSM'] },
];

/* ───────── FAQ ───────── */

const FAQ_DATA = [
  { q: 'Can I start for free?', a: 'Yes. The Free plan is free forever — not a trial. You get all reports and AI features unlocked, full CRM and business tools, 5 jobs per month, 2 roof reports, 2 measurement reports, and 2 storm reports per month. No credit card required.' },
  { q: 'What happens when I upgrade or downgrade?', a: 'Upgrades take effect immediately with prorated billing. Downgrades take effect at the end of your current billing cycle. All your data is preserved regardless of plan changes.' },
  { q: 'How does annual billing work?', a: 'Annual plans are billed once per year at a 25% discount versus monthly pricing. For example, Team is $299/mo monthly or $224.25/mo billed annually ($2,691/year vs $3,588/year — you save $897).' },
  { q: 'Can I add more users to the Team plan?', a: 'Yes. The Team plan includes 5 users. Additional users are $49/month each (or $36.75/month on annual billing). There is no limit to the number of users you can add.' },
  { q: 'What counts as a report?', a: 'Reports are counted separately as roof reports, measurement reports, and storm reports. A single roof report can include measurements and storm data — but if a roof report has measurements AND storm data turned on, it counts as 3 reports (1 roof + 1 measurement + 1 storm). So the free plan\'s 2 roof reports + 2 measurement reports + 2 storm reports = 6 total report credits.' },
  { q: 'Do add-ons require a specific plan?', a: 'Add-ons are available on any paid plan (Solo, Team, or Enterprise). They cannot be added to the Free plan. Each add-on is billed monthly regardless of your plan billing cycle.' },
  { q: 'Is Prospector included in the Team plan?', a: 'No. Prospector is a standalone product with its own pricing. It can be used independently or alongside any Archie plan. Prospector leads integrate directly with your Archie CRM if you have both.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex, Discover), ACH bank transfers, and wire transfers for annual Enterprise contracts.' },
  { q: 'Is there a contract or commitment?', a: 'Monthly plans have no contract and can be cancelled anytime. Annual plans are paid upfront for the year. Enterprise plans may have custom terms. There are no setup fees or cancellation fees.' },
  { q: 'Can I get a demo before committing?', a: 'Absolutely. You can either sign up for the Free plan to try it yourself, or book a guided demo with our team. We will walk you through the platform tailored to your specific business needs.' },
  { q: 'Do you offer discounts for larger teams?', a: 'Yes. Teams with 10+ users qualify for volume discounts. Enterprise plans are custom-priced based on your needs. Contact our sales team for a personalized quote.' },
  { q: 'What integrations are included?', a: 'Paid plans include QuickBooks, Google Workspace, Outlook, EagleView, CompanyCam, and more. Enterprise plans add custom API access and the ability to build proprietary integrations.' },
  { q: 'How secure is my data?', a: 'We use 256-bit AES encryption at rest and in transit, SOC 2 Type II compliance, daily backups, and US-based data centers. Enterprise plans add SSO/SAML, custom data retention policies, and a 99.9% SLA.' },
  { q: 'Can I white-label Archie for my company?', a: 'Yes, on the Enterprise plan. White-labeling includes your company logo, custom domain, branded reports, and customer-facing materials — all powered by Archie behind the scenes.' },
  { q: 'What if I need help migrating from another tool?', a: 'We offer free data migration assistance on Team and Enterprise plans. Our team will import your contacts, jobs, and documents from your current system. Solo plan users can self-serve via CSV import.' },
];

/* ───────── component ───────── */

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function renderCell(value) {
    if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
    if (value === false) return <X className="w-5 h-5 text-gray-300 mx-auto" />;
    return <span className="text-sm text-gray-700 font-medium">{value}</span>;
  }

  return (
    <>
      <Helmet>
        <title>Pricing | Archie Roofing Software</title>
        <meta name="description" content="Simple, transparent pricing for Archie roofing software. Start free, upgrade as you grow. Plans for solo roofers, teams, and enterprises." />
        <link rel="canonical" href="https://archie.now/pricing" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/3 w-96 h-96 bg-archie-orange rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/3 w-80 h-80 bg-purple-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Pricing
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Simple, Transparent <span className="text-gradient">Pricing</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Start free. Upgrade when you're ready. No hidden fees, no surprises.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="py-20 bg-archie-light">
        <div className="max-w-6xl mx-auto px-6">
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-14">
            <span className={`text-sm font-semibold ${!isAnnual ? 'text-archie-dark' : 'text-gray-400'}`}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className={`relative w-14 h-7 rounded-full transition-colors cursor-pointer ${isAnnual ? 'bg-archie-orange' : 'bg-gray-300'}`}
            >
              <motion.div
                className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-md"
                animate={{ left: isAnnual ? '1.75rem' : '0.125rem' }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={`text-sm font-semibold ${isAnnual ? 'text-archie-dark' : 'text-gray-400'}`}>
              Annual <span className="text-emerald-500 font-bold">(Save 25%)</span>
            </span>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PLANS.map((plan, i) => {
              const price = plan.monthly === null ? null : isAnnual ? annual(plan.monthly) : plan.monthly;
              const monthlyFull = plan.monthly;
              const annualSavings = plan.monthly ? Math.round(plan.monthly * 12 * DISCOUNT) : 0;

              return (
                <motion.div
                  key={plan.name}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-40px' }}
                  className={`relative bg-white rounded-2xl border-2 shadow-sm hover:shadow-xl transition-shadow p-6 flex flex-col ${plan.color} ${plan.popular ? 'ring-2 ring-archie-orange/50' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                      <span className="bg-archie-orange text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg shadow-archie-orange/30">
                        Most Popular
                      </span>
                    </div>
                  )}

                  <h3 className="text-xl font-bold text-archie-dark">{plan.name}</h3>
                  <p className="text-sm text-gray-500 mt-1 mb-5">{plan.desc}</p>

                  <div className="mb-5">
                    {price !== null ? (
                      <>
                        <div className="flex items-end gap-1">
                          <span className="text-4xl font-extrabold text-archie-dark">${formatPrice(price)}</span>
                          <span className="text-gray-400 text-sm mb-1">/mo</span>
                        </div>
                        {isAnnual && monthlyFull > 0 && (
                          <div className="mt-1">
                            <span className="text-sm text-gray-400 line-through">${monthlyFull}/mo</span>
                            <span className="text-sm text-emerald-500 font-semibold ml-2">Save ${annualSavings}/yr</span>
                          </div>
                        )}
                        {!isAnnual && monthlyFull > 0 && (
                          <p className="text-xs text-gray-400 mt-1">or ${formatPrice(annual(monthlyFull))}/mo billed annually</p>
                        )}
                      </>
                    ) : (
                      <div className="flex items-end gap-1">
                        <span className="text-4xl font-extrabold text-archie-dark">Custom</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4 mb-5 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {plan.users}</span>
                    <span className="flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> {plan.reports}</span>
                  </div>

                  <ul className="space-y-2.5 mb-8 flex-1">
                    {plan.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-600">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <CTAButton
                    href={plan.href}
                    variant={plan.popular ? 'primary' : 'secondary'}
                    className="w-full"
                    iconRight={ArrowRight}
                  >
                    {plan.cta}
                  </CTAButton>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Detailed Feature Comparison ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Feature Comparison"
            title="Every Feature, Side by Side"
            subtitle="See exactly what's included in each plan."
          />

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[700px]">
                <thead>
                  <tr className="bg-gradient-hero text-white">
                    <th className="px-6 py-5 text-sm font-bold w-[30%]">Feature</th>
                    <th className="px-4 py-5 text-sm font-bold text-center">Free</th>
                    <th className="px-4 py-5 text-sm font-bold text-center">Solo</th>
                    <th className="px-4 py-5 text-sm font-bold text-center">
                      <span className="inline-block bg-archie-orange px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider mb-1">Popular</span><br />
                      Team
                    </th>
                    <th className="px-4 py-5 text-sm font-bold text-center">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {FEATURE_COMPARISON.map((group) => (
                    <>
                      <tr key={group.category}>
                        <td colSpan={5} className="px-6 py-3 bg-gray-50 text-xs font-bold text-gray-500 uppercase tracking-wider">
                          {group.category}
                        </td>
                      </tr>
                      {group.features.map((f) => (
                        <tr key={f.name} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                          <td className="px-6 py-3.5 text-sm text-gray-700">{f.name}</td>
                          <td className="px-4 py-3.5 text-center">{renderCell(f.free)}</td>
                          <td className="px-4 py-3.5 text-center">{renderCell(f.solo)}</td>
                          <td className="px-4 py-3.5 text-center bg-archie-orange/[0.03]">{renderCell(f.team)}</td>
                          <td className="px-4 py-3.5 text-center">{renderCell(f.enterprise)}</td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── Add-Ons ── */}
      <section className="py-20 bg-archie-light">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Add-Ons"
            title="Supercharge Your Plan"
            subtitle="Available on any paid plan. Add or remove anytime."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ADDONS.map((addon, i) => (
              <motion.div
                key={addon.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="relative bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-6"
              >
                {addon.comingSoon && (
                  <span className="absolute top-4 right-4 bg-purple-100 text-purple-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    Coming Soon
                  </span>
                )}
                <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4">
                  <addon.icon className="w-6 h-6 text-archie-orange" />
                </div>
                <h3 className="text-lg font-bold text-archie-dark mb-1">{addon.name}</h3>
                <p className="text-archie-orange font-bold text-sm mb-3">{addon.price}</p>
                <p className="text-gray-500 text-sm leading-relaxed">{addon.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Prospector Standalone ── */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <SectionHeading
            label="Prospector"
            title="Standalone Lead Generation"
            subtitle="Pinpoint storm-damaged neighborhoods. Use independently or with your Archie CRM."
          />

          <div className="grid md:grid-cols-3 gap-6">
            {PROSPECTOR_PLANS.map((plan, i) => (
              <motion.div
                key={plan.name}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-gradient-hero rounded-2xl border border-white/10 p-6 flex flex-col"
              >
                <h3 className="text-xl font-bold text-white">{plan.name}</h3>
                <p className="text-archie-orange text-sm font-semibold mt-1 mb-4">{plan.leads}</p>

                <div className="mb-6">
                  <div className="flex items-end gap-1">
                    <span className="text-4xl font-extrabold text-white">${plan.price.toLocaleString()}</span>
                    <span className="text-gray-400 text-sm mb-1">/mo</span>
                  </div>
                </div>

                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                      <Check className="w-4 h-4 text-archie-orange shrink-0 mt-0.5" />
                      {h}
                    </li>
                  ))}
                </ul>

                <CTAButton href="https://app.archie.now" variant="secondary" className="w-full" iconRight={ArrowRight}>
                  Get Started
                </CTAButton>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-archie-light">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            label="FAQ"
            title="Pricing Questions"
            subtitle="Everything you need to know about Archie pricing."
          />

          <div className="space-y-3">
            {FAQ_DATA.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-archie-dark pr-4">{item.q}</span>
                    {isOpen ? <Minus className="w-5 h-5 text-archie-orange shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 shrink-0" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Rocket className="w-12 h-12 mx-auto text-archie-orange mb-6" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Start Free Today
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              No credit card required. Free forever. All reports and AI features unlocked. Upgrade when you're ready to grow.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg" iconRight={ArrowRight}>
                Start Free Now
              </CTAButton>
              <CTAButton href="https://app.archie.now/contact" variant="secondary" size="lg">
                Talk to Sales
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

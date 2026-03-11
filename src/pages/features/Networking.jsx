import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, ArrowRight, Zap, ChevronDown, CheckCircle2, Shield, Home,
  Handshake, BarChart3, Star, Target, Heart, Gift, Mail, TrendingUp,
  Award, DollarSign, Bell, UserPlus
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const partnerTypes = [
  { icon: Shield, title: 'Insurance Agents', desc: 'Build referral relationships with property insurance agents who encounter roof claims daily. Track which agents send you the most leads, measure close rates from agent referrals, and automate thank-you notes after every closed deal. Agent partnerships are one of the most valuable lead sources for storm restoration companies.' },
  { icon: Home, title: 'Real Estate Agents', desc: 'Realtors need reliable roofers for pre-listing repairs, buyer inspection issues, and investor rehabs. Build relationships with top-producing agents in your market. Track referrals by agent, send automated updates on job progress, and generate referral fee reports.' },
  { icon: Handshake, title: 'Trade Partners', desc: 'HVAC, solar, gutter, siding, and painting contractors encounter roofing needs on their jobs. Create reciprocal referral relationships with complementary trades. Track cross-referrals in both directions and identify which trade partnerships generate the most mutual revenue.' },
  { icon: UserPlus, title: 'Property Managers', desc: 'Property management companies manage hundreds of roofs and need reliable roofing partners for maintenance, repairs, and replacements. Build ongoing relationships by tracking their properties, providing priority service, and delivering consistent quality documentation.' },
];

const features = [
  { icon: BarChart3, title: 'Referral Tracking', desc: 'Every lead is tagged with its referral source. Track which partners send leads, how those leads convert, and the total revenue generated per partner. See referral trends over time and identify your most valuable relationships.' },
  { icon: Star, title: 'Partner Scoring', desc: 'Automatically score referral partners based on lead volume, lead quality, conversion rate, and revenue generated. A-tier partners get priority attention, while C-tier relationships may need nurturing or deprioritization.' },
  { icon: Heart, title: 'Automated Thank-Yous', desc: 'When a referred lead becomes a closed job, automatically send a thank-you email, text, or gift card to the referring partner. Customize the thank-you workflow for different partner tiers and referral values.' },
  { icon: Gift, title: 'Referral Incentives', desc: 'Set up referral fee structures for different partner types. Track owed referral fees, generate payment reports, and ensure every partner gets compensated accurately. Supports flat fees, percentage-based fees, and tiered structures.' },
  { icon: Mail, title: 'Partner Communication', desc: 'Dedicated communication tools for partner updates. Send status updates on referred leads, share job completion photos, and deliver quarterly performance summaries. Keep partners engaged and informed so they keep sending you business.' },
  { icon: TrendingUp, title: 'Revenue Attribution', desc: 'See exactly how much revenue each referral partner has generated for your business over any time period. Compare partner channels against paid advertising, door knocking, and other lead sources to understand your true cost per acquisition.' },
];

const faqs = [
  { q: 'What is the Referral Network in Archie?', a: 'The Referral Network is a relationship management tool that helps roofing contractors build, track, and optimize referral partnerships with insurance agents, real estate agents, trade partners, property managers, and other referral sources. It tracks every referred lead from source to closed revenue and automates partner communication.' },
  { q: 'Why are referral relationships important for roofing companies?', a: 'Referral leads generally close at a higher rate than cold leads and tend to cost less than paid advertising leads. Insurance agent referrals are especially valuable for storm restoration companies. Building and maintaining strong referral partnerships is one of the most cost-effective growth strategies for roofing businesses.' },
  { q: 'How does referral tracking work?', a: 'When you create a lead in Archie, you can tag it with the referral source and specific partner. As the lead moves through your pipeline, the referral source stays attached. When the job closes, Archie automatically calculates the revenue attributed to that partner and updates the partner scorecard.' },
  { q: 'What is partner scoring?', a: 'Partner scoring is an automated ranking system that evaluates each referral partner based on four factors: number of referrals sent, quality of those referrals (measured by conversion rate), total revenue generated, and consistency over time. Partners are ranked A through D, helping you focus time on your most valuable relationships.' },
  { q: 'Can I automate thank-you messages to referral partners?', a: 'Yes. Configure automated workflows that send thank-you emails, text messages, or trigger gift card deliveries when a referred lead closes. You can set different thank-you workflows based on partner tier, referral value, or partner type.' },
  { q: 'How do I manage referral fees and commissions?', a: 'Set up referral fee structures for each partner: flat fee per referral, percentage of job revenue, or tiered rates based on volume. Archie tracks owed referral fees, marks them as paid, and generates payment reports for your accounting team.' },
  { q: 'Can I track referrals from insurance agents specifically?', a: 'Yes. Insurance agents are a dedicated partner type with specialized tracking. See which agents send the most claims referrals, which insurance carriers they represent, and the close rate and average revenue from their referrals. This data helps you focus relationship-building on the agents who drive the most business.' },
  { q: 'How does the Referral Network integrate with the CRM?', a: 'Referral data is fully integrated with the CRM. Partner profiles are stored as contacts, referral source tags follow leads through the pipeline, and revenue attribution appears in financial reports. You can filter the CRM by referral source to see all leads, jobs, and revenue from a specific partner.' },
  { q: 'Can I send quarterly reports to my referral partners?', a: 'Yes. Generate and send professional quarterly summary reports to your referral partners showing how many leads they sent, how many closed, and the total value of the relationship. These reports reinforce the value of the partnership and encourage continued referrals.' },
  { q: 'Is the Referral Network available on the free plan?', a: 'Basic referral tracking is available on the free plan. Advanced features like partner scoring, automated thank-yous, referral fee management, and revenue attribution reports are available on Pro and Enterprise plans.' },
];

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

export default function Networking() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie Referral Network',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Referral network management for roofing contractors. Track referral relationships with insurance agents, realtors, trade partners, and property managers. Includes partner scoring, automated thank-yous, referral fee tracking, and revenue attribution.',
    url: 'https://archie.now/features/networking',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>Roofing Referral Network Management | Track Partners & Revenue | Archie</title>
        <meta name="description" content="Build and manage referral relationships with insurance agents, realtors, and trade partners. Track referral sources, score partner value, automate thank-yous, and measure revenue attribution. The referral engine for roofing companies." />
        <meta name="keywords" content="roofing referral management, referral tracking software roofing, insurance agent referrals roofing, realtor referrals roofing, roofing partner management, referral network software" />
        <link rel="canonical" href="https://archie.now/features/networking" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(34,197,94,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Referral Network: <span className="text-gradient">Relationships That Pay</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Build and manage referral partnerships with insurance agents, realtors, property managers, and trade partners. Track every referral from source to closed revenue. Score partner value and automate the relationship workflows that keep referrals flowing.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={Users}>Build Your Network</CTAButton>
              <CTAButton href="#partners" variant="secondary" size="lg">See Partner Types</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Built for Roofers */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-archie-dark">Built for Roofers, by a Roofer</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Track four partner types, attribute every dollar of referral revenue, and automate the relationship workflows that keep your best lead source flowing. Referral leads are among the highest-converting leads in the roofing industry.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" icon={Users}>See It In Action</CTAButton>
          </div>
        </div>
      </section>

      {/* Partner Types */}
      <section id="partners" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Partner Types" title="Four Referral Channels Every Roofer Should Manage" subtitle="Each partner type requires a different approach. Archie gives you the tools to manage all four effectively." light />
          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            {partnerTypes.map((p, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-green-500/30 transition-colors">
                <p.icon className="w-10 h-10 text-green-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-gray-400 leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Network Features" title="Tools to Build and Nurture Referral Relationships" subtitle="From initial partner onboarding to automated revenue attribution, Archie manages the entire referral lifecycle." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {features.map((f, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <f.icon className="w-10 h-10 text-green-500 mb-4" />
                <h3 className="text-xl font-bold text-archie-dark mb-3">{f.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Your Best Leads Come From People Who Trust You</h2>
          <p className="mt-4 text-lg text-white/80">Referral leads are among the highest-quality leads in roofing. Start building a referral engine that grows on autopilot.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Build Your Network Free</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Network FAQ" title="Frequently Asked Questions About Referral Management" subtitle="How to build, track, and optimize referral relationships for your roofing company." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Stop Leaving Referral Revenue on the Table</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Most roofing companies track referrals in spreadsheets or not at all. Archie turns your referral network into a measurable, optimizable growth channel.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Users}>Start Tracking Referrals</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

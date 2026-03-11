import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, ArrowRight, Zap, ChevronDown, CheckCircle2, MapPin,
  FileText, Target, BarChart3, Mail, TrendingUp, Database, Home,
  Calendar, Filter, Globe, Users, DollarSign, Clock
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const capabilities = [
  { icon: FileText, title: 'Permit Search', desc: 'Search recent roofing permits filed with local building departments via the Shovels API. Find homeowners who pulled permits for roof work, indicating properties with active or recently completed roofing needs. Filter by permit date, location, and contractor name.' },
  { icon: Database, title: 'Market Intelligence', desc: 'Analyze your local market with permit data trends. See how many roofing permits are filed per month, which neighborhoods have the most activity, and who your competitors are working for. Use data to plan marketing and sales territory strategies.' },
  { icon: Mail, title: 'Outreach Campaigns', desc: 'Build targeted outreach lists from permit data and property records. Create direct mail, email, or door-knocking campaigns aimed at homeowners with aging roofs, recent storm damage, or active roofing permits. Personalize messaging based on property data.' },
  { icon: Home, title: 'Aging Roof Detection', desc: 'Identify properties with roofs that are approaching or past their expected lifespan. Cross-reference property age, last permit date, and roofing material type to find neighborhoods where roof replacements are statistically overdue.' },
  { icon: MapPin, title: 'Geographic Targeting', desc: 'Draw target zones on the map and search for roofing opportunities within specific neighborhoods, zip codes, or custom-drawn boundaries. Focus your prospecting efforts on the highest-potential areas of your service territory.' },
  { icon: Filter, title: 'Advanced Filtering', desc: 'Filter prospects by permit date range, property type (residential/commercial), roof age, last sale date, property value, and distance from your office. Narrow down large datasets to the most promising leads for your specific business.' },
];

const shovelsFeatures = [
  'Real-time access to building permit databases across thousands of US jurisdictions',
  'Roofing-specific permit identification filtering out irrelevant construction permits',
  'Contractor name search reveals which competitors are winning jobs in your market',
  'Permit timeline tracking shows seasonal trends and market velocity in your area',
  'Property owner information linked to permit records for outreach targeting',
  'Historical permit data reveals properties with aging roofs that have not been replaced',
  'API integration means data flows directly into Archie CRM as prospecting leads',
  'Daily data updates ensure you see new permits within 24 hours of filing',
];

const faqs = [
  { q: 'What is the Prospector tool in Archie?', a: 'The Prospector is a lead generation tool that uses building permit data from the Shovels API to find roofing opportunities in your market. Search for recent roofing permits, identify properties with aging roofs, analyze market trends, and build targeted outreach campaigns. It gives you leads that no other lead source provides.' },
  { q: 'Where does the permit data come from?', a: 'Permit data comes from the Shovels API, which aggregates building permit records from thousands of local building departments across the United States. Shovels processes permit filings daily, so you see new permits within 24 hours. The data includes permit type, filing date, property address, contractor name, and property owner information.' },
  { q: 'How do roofing permits help me find leads?', a: 'Roofing permits reveal active market opportunities in several ways. Properties with recent permits may need additional work or future maintenance. Properties with old permits have roofs approaching end of life. Permits filed by competitors show which neighborhoods are active. And properties that never filed permits but are old enough to need replacement represent untapped opportunities.' },
  { q: 'Can I see which contractors are winning permits in my area?', a: 'Yes. The Prospector shows contractor names on roofing permits. This lets you see which competitors are active in which neighborhoods, how many permits they pull per month, and where market share opportunities exist. Use this intelligence to focus your marketing and sales efforts strategically.' },
  { q: 'How does geographic targeting work?', a: 'Draw custom boundaries on the interactive map to define your search area. The Prospector returns all roofing permits and property data within that boundary. You can save geographic areas for repeated searches and combine geographic filters with date ranges, property types, and roof age filters.' },
  { q: 'What kind of outreach campaigns can I create?', a: 'Build campaigns targeted at specific property groups: homeowners with 15+ year old roofs, properties in storm-affected zip codes, neighborhoods with high permit activity, or owners of properties that recently sold. Campaigns can be executed via direct mail, email, door knocking, or phone. Campaign lists export directly from the Prospector.' },
  { q: 'How do Prospector leads get into my CRM?', a: 'Select prospects from your search results and import them directly into the Archie CRM as leads. Property details, owner information, and permit history are automatically attached to the lead record. From there, the lead follows your normal pipeline workflow with automated follow-ups and status tracking.' },
  { q: 'Can I identify properties with aging roofs?', a: 'Yes. The Prospector cross-references property records with permit filing dates to estimate roof age. Properties where the last roofing permit is 15, 20, or 25+ years old are flagged as aging roof candidates. This is one of the most effective prospecting strategies because these homeowners are statistically likely to need a replacement soon.' },
  { q: 'Is the Prospector available in all US markets?', a: 'The Shovels API covers thousands of jurisdictions across the United States, but coverage varies by region. Major metropolitan areas and most suburban counties have strong coverage. Some rural jurisdictions may have limited data. Check coverage for your specific market on the free plan.' },
  { q: 'How much does the Prospector cost?', a: 'The Prospector is included in Archie Pro and Enterprise plans. Search credits are allocated monthly based on your plan tier. Free plans include a limited number of searches to test the feature. Additional search credits can be purchased as needed.' },
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

export default function Prospector() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie Prospector',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Lead generation tool for roofing contractors using building permit data from the Shovels API. Search roofing permits, identify aging roofs, analyze market intelligence, and build targeted outreach campaigns.',
    url: 'https://archie.now/features/prospector',
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
        <title>Roofing Lead Prospector | Permit Search & Market Intelligence | Archie</title>
        <meta name="description" content="Find roofing leads with permit data from the Shovels API. Search recent roofing permits, identify aging roofs, analyze competitors, and build outreach campaigns. The smartest lead generation tool for roofing contractors." />
        <meta name="keywords" content="roofing lead generation, roofing permit search, roofing prospecting tool, find roofing leads, roofing market intelligence, Shovels API roofing, aging roof leads, roofing outreach campaigns" />
        <link rel="canonical" href="https://archie.now/features/prospector" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(239,68,68,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Prospector: <span className="text-gradient">Find Leads Before Anyone Else</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Search roofing permits, identify properties with aging roofs, analyze your local market, and build targeted outreach campaigns. Powered by the Shovels API with data from thousands of building departments across the United States.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={Search}>Start Prospecting Free</CTAButton>
              <CTAButton href="#capabilities" variant="secondary" size="lg">See Capabilities</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Preview */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="/screenshots/prospector.png"
              alt="Archie Prospector screenshot"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Capabilities" title="Six Ways to Find Roofing Leads No One Else Has" subtitle="The Prospector gives you access to data-driven leads that your competitors are not even looking for." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {capabilities.map((c, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-red-500/30 transition-colors">
                <c.icon className="w-10 h-10 text-red-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{c.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shovels API */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading label="Powered by Shovels" title="Building Permit Intelligence at Your Fingertips" subtitle="The Shovels API aggregates permit data from thousands of US jurisdictions, giving you lead intelligence no other roofing platform offers." align="left" />
              <ul className="space-y-3 mt-6">
                {shovelsFeatures.map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-square rounded-2xl bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 flex items-center justify-center">
              <div className="text-center">
                <Database className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <p className="text-archie-dark text-xl font-semibold">Shovels API</p>
                <p className="text-gray-500 mt-2">Thousands of permit jurisdictions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Your Next 100 Leads Are Already in the Data</h2>
          <p className="mt-4 text-lg text-white/80">Every day, roofing permits are filed and roofs are aging. The Prospector helps you find these opportunities before your competition.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Start Finding Leads</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Prospector FAQ" title="Frequently Asked Questions About Lead Prospecting" subtitle="How permit data and market intelligence help roofing companies generate leads smarter, not harder." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Prospect Smarter. Close Faster. Grow Bigger.</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">The Prospector turns public permit data into your private lead pipeline. Start prospecting with Archie today.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Search}>Start Prospecting Free</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

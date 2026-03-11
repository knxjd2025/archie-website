import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Camera, Upload, Cpu, FileText, ArrowRight, Zap, ChevronDown, CheckCircle2,
  CloudLightning, ShieldCheck, Eye, Layers, AlertTriangle, BarChart3,
  Clock, Star, Target, Smartphone
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const steps = [
  { icon: Camera, title: 'Capture Photos', desc: 'Take photos of the roof from the ground, ladder, or drone. Archie works with any camera quality including smartphone photos. Capture close-ups of damage, wide shots of the roof plane, and detail shots of flashing, vents, and penetrations.' },
  { icon: Upload, title: 'Upload to Archie', desc: 'Upload photos directly from your phone or drag and drop from your computer. Photos are automatically organized, GPS-tagged, and timestamped. You can upload as few as 4 photos or as many as 50 for a comprehensive analysis.' },
  { icon: Cpu, title: 'Archie AI Analysis', desc: 'Archie runs your photos through its proprietary AI system for comprehensive analysis. The Archie AI evaluates shingle condition, flashing integrity, gutter status, hail impacts, wind lift, granule loss, and moisture intrusion all in a single pass.' },
  { icon: FileText, title: 'Branded Report Generated', desc: 'In under 2 minutes, Archie produces a professional, branded inspection report with your company logo, colors, and contact information. The report includes damage findings, severity ratings, repair recommendations, cost estimates, and supporting storm data from NOAA.' },
];

const damageTypes = [
  { icon: AlertTriangle, name: 'Hail Damage', desc: 'Detects bruising, dents, cracked shingles, and granule displacement caused by hailstones. Identifies impact patterns across roof planes and correlates findings with NOAA hail event data.' },
  { icon: CloudLightning, name: 'Wind Damage', desc: 'Identifies lifted, curled, creased, and missing shingles from high-wind events. Maps wind damage patterns to determine directional consistency and storm attribution for insurance claims.' },
  { icon: Eye, name: 'Wear & Aging', desc: 'Assesses overall shingle condition including granule loss, thermal cracking, cupping, and organic deterioration. Estimates remaining useful life and recommends replacement timelines.' },
  { icon: Layers, name: 'Flashing & Penetrations', desc: 'Evaluates flashings around chimneys, skylights, vents, and wall transitions. Detects rust, separation, improper installation, and sealant failure that cause active or potential leaks.' },
  { icon: Target, name: 'Flat Roof Issues', desc: 'Analyzes TPO, EPDM, and modified bitumen systems for ponding, membrane tears, seam failures, blister formation, and improper drainage. Includes commercial flat roof terminology.' },
  { icon: ShieldCheck, name: 'Structural Concerns', desc: 'Flags sagging decking, ridge line deformities, and visible structural issues that require immediate attention. Differentiates between cosmetic issues and structural safety concerns.' },
];

const faqs = [
  { q: 'How does the AI roof inspection work?', a: 'Upload photos of the roof to Archie. The Archie AI System analyzes the images for structural assessment and damage detection simultaneously. The system cross-references findings with NOAA storm data for your location and generates a branded professional report in under 2 minutes.' },
  { q: 'How many photos do I need to upload?', a: 'A minimum of 4 photos is recommended for a basic inspection: one overview shot and three close-ups of different roof areas. For comprehensive reports suitable for insurance claims, upload 15-30 photos covering all roof planes, close-ups of damage, flashings, penetrations, gutters, and ground-level shots. More photos produce more detailed and accurate reports.' },
  { q: 'What types of damage can the AI detect?', a: 'The AI detects hail impacts, wind lift, missing shingles, granule loss, thermal cracking, curling, cupping, flashing failures, ponding, membrane tears, sealant deterioration, rust, moss growth, algae staining, improper installations, sagging decking, and structural deformities. It also identifies different roofing materials and their condition.' },
  { q: 'Can I use the reports for insurance claims?', a: 'Yes. Reports are specifically formatted to support insurance claims. They include detailed damage descriptions with industry terminology, photo evidence with annotations, severity ratings, NOAA storm data correlation, and repair cost estimates. Many adjusters accept Archie reports as professional inspection documentation.' },
  { q: 'What is the Archie AI System?', a: 'Archie uses a proprietary AI system purpose-built for roofing inspections. It performs rapid structural assessment, material identification, and detailed damage detection with advanced image recognition. The system is continuously trained on roofing-specific data to produce accurate, professional-grade reports.' },
  { q: 'How does NOAA storm data integrate with inspections?', a: 'When you create an inspection, Archie queries NOAA databases for historical storm events at that property address. Hail size, wind speed, tornado proximity, and severe weather alerts are included in the report. This data helps establish storm causation for insurance claims and shows adjusters that damage is weather-related, not wear.' },
  { q: 'What are Good/Better/Best recommendations?', a: 'Each report includes three-tiered repair recommendations. Good represents the minimum necessary repair. Better includes upgrades like impact-resistant shingles or improved underlayment. Best is a premium option with top-tier materials and extended warranties. This gives homeowners clear choices and helps your sales team present options effectively.' },
  { q: 'Can I brand the reports with my company information?', a: 'Yes. Every report features your company logo, brand colors, phone number, website, and license information. The homeowner receives a professional document that looks like it was produced by your company, not a third-party tool. This builds trust and reinforces your brand during the sales process.' },
  { q: 'How accurate is the AI compared to a human inspector?', a: 'The Archie AI System is designed to identify a wide range of damage types and often catches subtle issues like early-stage granule loss or micro-cracking that human inspectors may miss. However, AI inspections are designed to supplement, not replace, professional inspections. They are ideal for initial assessments, pre-qualification, and documentation support.' },
  { q: 'Can I use drone photos for AI inspections?', a: 'Absolutely. Drone photos often produce the best results because they provide overhead angles that show damage patterns across the entire roof. Archie works with photos from DJI, Skydio, and other popular drone platforms. Combine drone overview shots with handheld close-ups for the most comprehensive reports.' },
  { q: 'How fast is the report generated?', a: 'Most reports are generated in 60 to 120 seconds after upload. The Archie AI analysis and report formatting happen automatically. You can review the report on-site with the homeowner immediately after uploading photos, giving you a significant advantage over competitors who take days to produce inspection reports.' },
  { q: 'Does it work for commercial flat roofs?', a: 'Yes. The AI is trained on TPO, EPDM, modified bitumen, built-up roofing, metal panel, and standing seam systems in addition to residential shingle, tile, and metal roofing. Commercial reports use appropriate terminology and identify issues specific to low-slope and flat roof systems.' },
  { q: 'Can I share reports with homeowners?', a: 'Yes. Reports can be shared via email, text message, or a public link. Homeowners can view the full branded report on any device without creating an account. Reports include interactive elements that let homeowners explore damage findings and recommendation details.' },
  { q: 'What is the cost per inspection report?', a: 'AI inspection reports are available on all plans, including the free plan. The free plan includes 2 roof reports, 2 measurement reports, and 2 storm reports per month. A single roof report with measurements and storm data turned on counts as 3 reports (1 roof + 1 measurement + 1 storm). Paid plans include higher report limits. The cost per report is a fraction of what you would pay a third-party inspection company, and reports are generated in minutes instead of days.' },
  { q: 'How does this help me close more sales?', a: 'Showing a homeowner a professional, branded inspection report with detailed damage findings, storm data, and repair options during your first visit creates immediate credibility. The Good/Better/Best format naturally leads to upselling. Homeowners trust data-backed recommendations, which can help improve your close rate over time.' },
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

export default function AIRoofInspections() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie AI Roof Inspections',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'AI-powered roof inspection report generator. Upload roof photos and receive branded professional inspection reports with damage detection, storm data integration, and Good/Better/Best repair recommendations in under 2 minutes.',
    url: 'https://archie.now/features/ai-roof-inspections',
    featureList: 'AI damage detection, NOAA storm data, branded reports, Good/Better/Best recommendations, insurance documentation, hail detection, wind damage analysis',
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
        <title>AI Roof Inspection Reports | Archie AI Damage Detection | Archie</title>
        <meta name="description" content="Generate professional AI-powered roof inspection reports in under 2 minutes. The Archie AI System detects hail damage, wind damage, and wear. NOAA storm data integration. Branded reports with Good/Better/Best recommendations for roofing contractors." />
        <meta name="keywords" content="AI roof inspection, roof inspection report, AI damage detection, hail damage detection, roofing inspection software, automated roof inspection, drone roof inspection AI, roof condition report" />
        <link rel="canonical" href="https://archie.now/features/ai-roof-inspections" />
        <meta property="og:title" content="AI Roof Inspection Reports by Archie" />
        <meta property="og:description" content="Upload photos, get a branded inspection report in 2 minutes. Archie AI detects hail, wind, and wear damage with NOAA storm data." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              AI Roof Inspections <span className="text-gradient">in Under 2 Minutes</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Upload roof photos and receive a professional, branded inspection report with AI-detected damage, NOAA storm data, and Good/Better/Best repair recommendations. Powered by the Archie AI System that catches what human eyes miss.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={Camera}>Try AI Inspections Free</CTAButton>
              <CTAButton href="#how-it-works" variant="secondary" size="lg">See How It Works</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Report Preview */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-video rounded-2xl bg-gradient-to-br from-emerald-900 to-teal-900 border border-gray-200 shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <FileText className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
              <p className="text-white text-xl font-semibold">AI Inspection Report Preview</p>
              <p className="text-gray-400 mt-2">Branded report with damage findings and recommendations</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="How It Works" title="From Photos to Professional Report in 4 Steps" subtitle="The entire process takes less than 2 minutes. Upload photos on-site and show the homeowner results before you leave." light />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
            {steps.map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 h-full">
                  <div className="w-12 h-12 rounded-full bg-archie-orange/20 flex items-center justify-center mb-5">
                    <span className="text-archie-orange font-extrabold text-lg">{i + 1}</span>
                  </div>
                  <s.icon className="w-10 h-10 text-emerald-400 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
                </div>
                {i < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 text-archie-orange text-2xl">&rarr;</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Archie AI System */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Archie AI System" title="Purpose-Built AI for Roofing Inspections" subtitle="The Archie AI System combines structural analysis with deep damage detection in a single, powerful inspection engine built specifically for roofing contractors." />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-archie-dark rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-blue-500/20 flex items-center justify-center mb-5">
                <Zap className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Structural Analysis</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">Lightning-fast structural analysis identifies roofing materials, evaluates overall condition, assesses flashing and penetration integrity, and flags obvious damage in seconds.</p>
              <ul className="space-y-2 text-gray-400">
                {['Material identification (shingle, metal, tile, flat)', 'Structural assessment and safety flags', 'Flashing and penetration evaluation', 'Gutter and drainage analysis', 'Overall condition scoring'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-1" />{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-archie-dark rounded-2xl p-8">
              <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center mb-5">
                <Eye className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Deep Damage Detection</h3>
              <p className="text-gray-300 mb-4 leading-relaxed">Advanced image recognition examines individual shingles for micro-damage, identifies hail impact patterns, and detects subtle wind effects that even experienced inspectors sometimes miss.</p>
              <ul className="space-y-2 text-gray-400">
                {['Hail impact pattern analysis', 'Granule loss and micro-cracking', 'Wind crease and lift detection', 'Age-related deterioration assessment', 'Moisture intrusion indicator identification'].map((item, i) => (
                  <li key={i} className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-1" />{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Damage Types */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Damage Detection" title="What the AI Can Detect on Your Roof" subtitle="Archie is trained on hundreds of thousands of roof images spanning every material type, climate zone, and damage category." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {damageTypes.map((d, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                <d.icon className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{d.name}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storm Data */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading label="Storm Data" title="NOAA Weather Integration" subtitle="Every inspection report automatically includes historical storm data for the property location." align="left" />
              <ul className="space-y-4 mt-6">
                {[
                  'Hail event history with stone size, date, and proximity to the property address',
                  'Wind speed records from nearby weather stations correlated to damage timing',
                  'Tornado path data showing proximity and intensity for properties in affected areas',
                  'Severe thunderstorm warnings that establish storm causation for insurance claims',
                  'Historical weather overlay that proves damage is storm-related, not normal wear',
                  'Automatically links NOAA data to specific damage findings in the inspection report',
                ].map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <CloudLightning className="w-5 h-5 text-archie-orange shrink-0 mt-1" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-square rounded-2xl bg-gradient-to-br from-cyan-900 to-blue-900 flex items-center justify-center">
              <div className="text-center">
                <CloudLightning className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
                <p className="text-white text-xl font-semibold">NOAA Storm Data</p>
                <p className="text-gray-400 mt-2">Integrated in every report</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Good/Better/Best */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Recommendations" title="Good / Better / Best Repair Options" subtitle="Every report includes three tiers of repair recommendations so homeowners can choose the option that fits their budget and goals." light />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              { tier: 'Good', color: 'border-blue-500 bg-blue-500/10', accent: 'text-blue-400', desc: 'Minimum necessary repairs to address identified damage. Standard materials, basic warranties. Ideal for budget-conscious homeowners or properties being prepared for sale. Meets code requirements and stops active damage progression.', items: ['Standard 3-tab or architectural shingles', 'Synthetic underlayment', 'Standard manufacturer warranty', 'Code-compliant installation'] },
              { tier: 'Better', color: 'border-archie-orange bg-archie-orange/10', accent: 'text-archie-orange', desc: 'Enhanced repairs with upgraded materials for improved durability and longevity. Better insulation, improved ventilation, and mid-tier shingle options. The most popular choice for homeowners planning to stay in their home.', items: ['Premium architectural shingles', 'Ice and water shield at eaves', 'Enhanced ridge ventilation', 'Extended workmanship warranty', 'Upgraded drip edge and flashing'] },
              { tier: 'Best', color: 'border-emerald-500 bg-emerald-500/10', accent: 'text-emerald-400', desc: 'Premium installation with top-tier materials, maximum protection, and the longest warranties available. Includes impact-resistant shingles, full system approach, and enhanced structural components. Ideal for long-term homeowners in storm-prone areas.', items: ['Impact-resistant Class 4 shingles', 'Full synthetic underlayment system', 'Premium ventilation package', 'Lifetime manufacturer warranty', 'Extended 10-year workmanship guarantee', 'Insurance discount documentation'] },
            ].map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`border-2 ${t.color} rounded-2xl p-8`}>
                <h3 className={`text-2xl font-extrabold ${t.accent} mb-4`}>{t.tier}</h3>
                <p className="text-gray-300 leading-relaxed mb-6 text-sm">{t.desc}</p>
                <ul className="space-y-2">
                  {t.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-400 text-sm">
                      <CheckCircle2 className={`w-4 h-4 ${t.accent} shrink-0 mt-0.5`} />{item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Close More Deals With AI-Powered Inspections</h2>
          <p className="mt-4 text-lg text-white/80">Show homeowners professional, data-backed evidence on the first visit. Built for roofers, by a roofer.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Generate Your First Report</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Inspection FAQ" title="Frequently Asked Questions About AI Roof Inspections" subtitle="Everything you need to know about using AI to generate professional roof inspection reports." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Turn Roof Photos Into Revenue</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Stop spending hours writing inspection reports by hand. Let AI do it in 2 minutes while you focus on selling the job.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Camera}>Start Free AI Inspections</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

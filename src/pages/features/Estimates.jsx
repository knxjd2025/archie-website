import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FileText, ArrowRight, Zap, ChevronDown, CheckCircle2, Calculator,
  Send, PenTool, DollarSign, BarChart3, Layers, Clock, Globe,
  Smartphone, RefreshCw, Package, Users
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const workflowSteps = [
  { icon: Calculator, title: 'Enter Job Details', desc: 'Input roof measurements, select materials, and choose the roofing system. Archie calculates squares, waste factor, ridge caps, starter strips, drip edge, underlayment, nails, and every accessory automatically based on roof geometry and local building codes.' },
  { icon: Layers, title: 'AI Material Calculation', desc: 'The AI engine applies regional pricing, manufacturer specifications, and accurate waste percentages. It knows that a hip roof wastes more material than a gable roof. It accounts for complexity, pitch multipliers, and tear-off requirements.' },
  { icon: DollarSign, title: 'Price & Review', desc: 'Review the estimate with itemized materials, labor costs, overhead, profit margin, and tax. Adjust any line item. Save estimate templates for common job types like 30-square architectural shingle replacements or flat roof overlays.' },
  { icon: Send, title: 'Send to Customer', desc: 'Send the estimate via email, SMS, or a branded public link. Customers view a professional, mobile-friendly estimate page. They can review scope, ask questions via built-in chat, and approve the estimate online.' },
  { icon: PenTool, title: 'E-Signature Collection', desc: 'Customers sign the estimate electronically on any device. No account creation required. Signed estimates are automatically stored, the lead status updates to "Contract Signed," and you can convert to a job with one click.' },
  { icon: RefreshCw, title: 'Convert to Job & Invoice', desc: 'Approved estimates convert to active jobs instantly. Material lists feed into inventory. Scheduling prompts appear for the install date. When the job is complete, generate an invoice from the approved estimate with no re-entry required.' },
];

const features = [
  { icon: Calculator, title: 'AI Material Calculator', desc: 'Calculates shingle squares, underlayment rolls, drip edge linear footage, ridge cap bundles, starter strips, nails per square, pipe boots, and every component needed for a complete roofing system. Adjusts for roof pitch, complexity, and waste.' },
  { icon: Globe, title: 'Public Estimate Links', desc: 'Every estimate gets a unique, shareable URL. Homeowners click the link to view a beautifully branded estimate page with your logo, colors, and scope details. No login required. Works on any device.' },
  { icon: PenTool, title: 'Built-In E-Signatures', desc: 'Legally binding electronic signatures collected directly on the estimate page. Supports multiple signers, initials, and date stamps. Signed documents are automatically archived in the job folder.' },
  { icon: Layers, title: 'Good/Better/Best Options', desc: 'Present up to three tiers on a single estimate so homeowners can compare options. 3-tab vs. architectural vs. impact-resistant. Standard vs. premium underlayment. Each option shows the price difference clearly.' },
  { icon: Package, title: 'Material Templates', desc: 'Save estimate templates for your most common job types. 30-square rip and replace, flat roof overlay, gutter install, siding replacement. Templates pre-fill materials, labor, and pricing for fast estimate creation.' },
  { icon: BarChart3, title: 'Margin & Profit Tracking', desc: 'See your estimated profit margin in real time as you build the estimate. Track actual vs. estimated costs when the job is complete. Identify which job types deliver the best margins for your company.' },
  { icon: Users, title: 'Multi-Signer Support', desc: 'Both spouses need to sign? No problem. Send estimates that require multiple signatures. Each signer receives their own e-signature link and can sign independently. The estimate is not approved until all required signatures are collected.' },
  { icon: Smartphone, title: 'Mobile-First Design', desc: 'Create estimates from your phone in the field. The mobile interface is optimized for speed with large buttons, smart defaults, and voice input via Aria. Generate and send a professional estimate during the homeowner conversation.' },
];

const faqs = [
  { q: 'How does AI help create roofing estimates?', a: 'Archie uses AI to calculate material quantities based on roof measurements, pitch, and complexity. It applies regional material pricing, calculates accurate waste percentages based on roof geometry, and suggests appropriate labor hours based on the system type. This reduces estimation time from 30 minutes to under 5 minutes while improving accuracy.' },
  { q: 'What roofing systems does the estimator support?', a: 'Archie supports asphalt shingles (3-tab and architectural), metal roofing (standing seam and corrugated), flat roofing (TPO, EPDM, modified bitumen), tile (concrete and clay), cedar shake, slate, and synthetic roofing materials. Each system has specific material calculations and labor rates.' },
  { q: 'Can customers view and sign estimates online?', a: 'Yes. Every estimate generates a unique public link that customers can access on any device without creating an account. The estimate page displays your company branding, detailed scope of work, material specifications, pricing, and an e-signature field for instant approval.' },
  { q: 'How do e-signatures work?', a: 'When a customer clicks the estimate link, they can review the full scope and click to sign electronically. The signature is legally binding under the ESIGN Act. Signed documents are timestamped, IP-logged, and automatically stored in the job folder. You receive an instant notification when the estimate is signed.' },
  { q: 'Can I present multiple options on one estimate?', a: 'Yes. The Good/Better/Best format lets you present up to three options on a single estimate. This is proven to increase average job value because homeowners often choose the middle or premium option when they can see the value difference compared to the basic option.' },
  { q: 'Does the estimator account for waste and pitch multipliers?', a: 'Yes. Archie automatically applies waste percentages based on roof complexity: 10% for simple gable roofs, 15% for hip roofs, and up to 20% for complex multi-faceted roofs. Pitch multipliers adjust material quantities and labor hours for steep slopes.' },
  { q: 'Can I save estimate templates?', a: 'Yes. Create templates for your most common job types with pre-filled materials, labor rates, and pricing. When creating a new estimate, select a template and adjust only what is unique to the specific job. Templates save significant time for companies doing repetitive job types.' },
  { q: 'How does the estimate convert to a job?', a: 'When an estimate is signed, click the "Convert to Job" button. The job record is created with all estimate details, material lists, pricing, and customer information pre-populated. The job appears on your production board, and scheduling prompts help you set the install date.' },
  { q: 'Can I generate invoices from estimates?', a: 'Yes. Approved estimates convert to invoices with one click. The invoice pulls in all line items, pricing, tax, and customer information. You can adjust for change orders or progress billing before sending the invoice via email or public link.' },
  { q: 'Does it integrate with supplier pricing?', a: 'Archie supports manual pricing updates and can be configured with your negotiated distributor pricing. When material prices change, update them in one place and all future estimates automatically use the new pricing. Historical estimates retain their original pricing for accurate records.' },
  { q: 'How accurate are the AI material calculations?', a: 'AI calculations use industry-standard formulas for waste, pitch multipliers, and accessory quantities to produce accurate material takeoffs. For complex roofs, you can adjust any calculated quantity manually before sending the estimate.' },
  { q: 'Can I track which estimates get signed and which do not?', a: 'Yes. Archie tracks estimate conversion rates by salesperson, lead source, estimate amount, and job type. You can see which estimates are pending, viewed, signed, or declined. Automated follow-up reminders can be sent to customers who have not responded within a configurable time period.' },
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

export default function Estimates() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie AI Estimates',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'AI-assisted roofing estimate software with material calculations, public estimate links, e-signatures, Good/Better/Best options, and one-click conversion to jobs and invoices.',
    url: 'https://archie.now/features/estimates',
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
        <title>AI Roofing Estimate Software | E-Signatures & Public Links | Archie</title>
        <meta name="description" content="Create accurate roofing estimates with AI-powered material calculations. Send via public links, collect e-signatures, present Good/Better/Best options, and convert to jobs with one click. Supports shingle, metal, flat, and tile roofing systems." />
        <meta name="keywords" content="roofing estimate software, roofing estimator, AI roofing estimates, roofing e-signature, roofing proposal software, roofing bid software, roofing material calculator" />
        <link rel="canonical" href="https://archie.now/features/estimates" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(249,115,22,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              AI-Powered Roofing Estimates <span className="text-gradient">That Close Deals</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Generate accurate estimates in minutes with AI material calculations. Send professional proposals via public links, collect e-signatures, and convert to jobs with one click. The fastest path from inspection to signed contract.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={FileText}>Create Your First Estimate</CTAButton>
              <CTAButton href="#workflow" variant="secondary" size="lg">See the Workflow</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Screenshot */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="/screenshots/crm-estimates.png"
              alt="Archie Estimates screenshot"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Workflow" title="From Measurements to Signed Contract in 6 Steps" subtitle="The entire estimate workflow is designed to minimize time and maximize professionalism. Every step flows into the next." />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
            {workflowSteps.map((s, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="relative border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="w-10 h-10 rounded-full bg-archie-orange/10 flex items-center justify-center mb-4">
                  <span className="text-archie-orange font-extrabold">{i + 1}</span>
                </div>
                <s.icon className="w-8 h-8 text-archie-orange mb-4" />
                <h3 className="text-lg font-bold text-archie-dark mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Estimate Features" title="Everything You Need to Win More Bids" subtitle="Archie estimates are designed to impress homeowners, save you time, and increase your close rate." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {features.map((f, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <f.icon className="w-9 h-9 text-archie-orange mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Public Links Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading label="Public Links" title="Professional Estimates Customers Can View Anywhere" subtitle="Every estimate gets a unique URL that showcases your brand and makes it easy for homeowners to approve." align="left" />
              <ul className="space-y-4 mt-6">
                {[
                  'Branded estimate page with your company logo, colors, and contact information',
                  'Mobile-optimized layout that looks great on phones, tablets, and desktops',
                  'Detailed scope of work with material specifications and quantities',
                  'Good/Better/Best comparison view when multiple options are presented',
                  'Built-in chat so homeowners can ask questions directly on the estimate page',
                  'One-click e-signature approval without creating an account',
                  'Automatic SMS and email notifications when the estimate is viewed or signed',
                ].map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 border border-orange-200 flex items-center justify-center">
              <div className="text-center">
                <Globe className="w-16 h-16 text-archie-orange mx-auto mb-4" />
                <p className="text-archie-dark text-xl font-semibold">Public Estimate Page</p>
                <p className="text-gray-500 mt-2">yourcompany.archie.now/estimate/abc123</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Faster Estimates. Higher Close Rates. Bigger Margins.</h2>
          <p className="mt-4 text-lg text-white/80">Spend less time building estimates and more time closing deals. Built for roofers, by a roofer.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Start Estimating Free</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Estimates FAQ" title="Frequently Asked Questions About Archie Estimates" subtitle="Everything roofers want to know about AI-powered estimate creation, e-signatures, and public estimate links." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Stop Losing Deals to Slow Estimates</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">The first roofer to deliver a professional estimate has a serious advantage. With Archie, that roofer is you.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={FileText}>Create Free Estimates</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

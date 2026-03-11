import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  HardHat, ArrowRight, Zap, ChevronDown, CheckCircle2, MapPin,
  Clock, Users, Clipboard, Truck, BarChart3, Calendar, Smartphone,
  Shield, Globe, Settings, Eye, FileText, Star
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const modules = [
  { icon: Users, title: 'Crew Management', desc: 'Organize crews by specialty: shingle, metal, flat, gutters, siding. Track crew members, skill levels, certifications, and availability. Assign the right crew to the right job based on job type, complexity, and proximity.' },
  { icon: MapPin, title: 'GPS Time Tracking', desc: 'Crews clock in and out from the job site with GPS verification. Track actual hours worked per job with location proof. Eliminate time card fraud and get accurate labor cost data for job profitability analysis.' },
  { icon: Calendar, title: 'Dispatch Board', desc: 'Drag-and-drop dispatch board shows every crew, every job, and every day. See availability, schedule installs, manage material deliveries, and adjust assignments when weather or crew availability changes.' },
  { icon: Truck, title: 'Subcontractor Management', desc: 'Manage subcontractor crews alongside your W-2 teams. Track sub assignments, hours, pay rates, and performance. Store COI certificates, W-9 forms, and subcontractor agreements in organized digital folders.' },
  { icon: Clipboard, title: 'QC Inspections', desc: 'Digital quality control checklists for every job type. Inspectors complete QC forms on their phone with photos, notes, and pass/fail ratings. QC results are attached to the job record and visible to production managers in real time.' },
  { icon: Smartphone, title: 'Crew Mobile Portal', desc: 'A simplified mobile interface designed for field crews. Crew members see their assigned jobs, clock in/out, view job details, upload photos, and complete daily logs. Available in English and Spanish with large buttons optimized for gloved hands.' },
];

const portalFeatures = [
  'Job details including address, scope of work, and special instructions',
  'GPS clock-in and clock-out with automatic time tracking',
  'Material checklist showing what should be on the truck',
  'Photo upload for before, during, and after documentation',
  'Daily log for notes, issues, and weather delays',
  'QC checklist completion with photo requirements',
  'Full Spanish language support for bilingual teams',
  'Works on any smartphone browser without app installation',
  'Large touch targets designed for use with work gloves',
  'Offline capability for areas with poor cell service',
];

const faqs = [
  { q: 'What is the Production Hub in Archie?', a: 'The Production Hub is a centralized production management system within Archie. It includes crew management, GPS time tracking, a visual dispatch board, subcontractor management, digital QC inspections, and a mobile crew portal. It gives production managers full visibility and control over every active job.' },
  { q: 'How does GPS time tracking work?', a: 'Crew members clock in and out through the mobile crew portal. When they clock in, their GPS location is recorded to verify they are at the correct job site. This provides accurate labor hours per job, prevents time card fraud, and feeds into job profitability calculations automatically.' },
  { q: 'Does the crew portal work in Spanish?', a: 'Yes. The crew mobile portal is fully bilingual with English and Spanish language support. Crew members can switch languages in their profile settings. All job details, checklists, instructions, and daily log forms are available in both languages.' },
  { q: 'How does the dispatch board work?', a: 'The dispatch board is a drag-and-drop visual scheduler. Each row represents a crew, and columns represent days. Drag jobs onto crew rows to assign them. The board shows crew availability, job duration, and conflicts. Color coding indicates job status: scheduled, in progress, completed, or delayed.' },
  { q: 'Can I manage subcontractors through Archie?', a: 'Yes. Create subcontractor profiles with contact information, specialty, pay rates, and insurance details. Assign subs to jobs, track their hours, and manage payments. Store COI certificates and W-9 forms digitally. Subcontractors can access the crew portal to see their assigned jobs.' },
  { q: 'What does the QC inspection process look like?', a: 'Production managers or dedicated inspectors open the QC checklist on their phone at the job site. The checklist includes items specific to the job type: flashing installation, drip edge, ridge cap alignment, pipe boot sealing, and cleanup. Each item is rated pass/fail with photo documentation. Completed QC reports are attached to the job record.' },
  { q: 'Can I track job profitability in real time?', a: 'Yes. GPS time tracking provides actual labor hours, material costs come from estimates, and subcontractor charges are tracked per job. The Production Hub shows estimated vs. actual costs in real time so you can identify problems before they eat your margin.' },
  { q: 'Does the crew portal require an app download?', a: 'No. The crew portal is a web-based application that works in any mobile browser. Crew members access it via a URL or QR code. No app store download is required, which simplifies deployment across large or rotating crews.' },
  { q: 'How do I handle weather delays?', a: 'When weather disrupts the schedule, use the dispatch board to drag jobs to new dates. Affected crew members see updated schedules in their portal immediately. You can add weather delay notes to job records for documentation and track how many days were lost to weather per month.' },
  { q: 'Can crew members upload photos from the job site?', a: 'Yes. The crew portal includes a photo upload feature. Crew members can take and upload photos tagged as before, during, or after. Photos are GPS-stamped, timestamped, and automatically organized in the job folder for production manager review.' },
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

export default function Production() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie Production Hub',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Production management platform for roofing contractors with crew management, GPS time tracking, dispatch board, subcontractor management, QC inspections, and bilingual crew mobile portal.',
    url: 'https://archie.now/features/production',
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
        <title>Roofing Production Management Software | Crew GPS Tracking | Archie</title>
        <meta name="description" content="Manage roofing crews, track GPS time, dispatch jobs, coordinate subcontractors, and run QC inspections from one production board. Bilingual crew portal in English and Spanish. Built for roofing production managers." />
        <meta name="keywords" content="roofing production management, crew management roofing, GPS time tracking roofers, roofing dispatch board, roofing QC inspection, subcontractor management roofing, crew portal Spanish roofing" />
        <link rel="canonical" href="https://archie.now/features/production" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(245,158,11,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Production Hub: <span className="text-gradient">Run Crews Like Clockwork</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Crew management, GPS time tracking, dispatch board, subcontractor coordination, QC inspections, and a bilingual mobile crew portal. Everything your production team needs to deliver quality roofs on time and on budget.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={HardHat}>Start Managing Production</CTAButton>
              <CTAButton href="#modules" variant="secondary" size="lg">See All Modules</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dispatch Board Preview */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="/screenshots/crm-jobs.png"
              alt="Archie Production Hub screenshot"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Production Modules" title="Six Integrated Modules for Roofing Production" subtitle="Every module connects to the CRM, estimates, and financial tracking so your production data flows seamlessly across the platform." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {modules.map((m, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-yellow-500/30 transition-colors">
                <m.icon className="w-10 h-10 text-yellow-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{m.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Crew Portal */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 flex items-center justify-center">
              <div className="text-center">
                <Smartphone className="w-16 h-16 text-yellow-600 mx-auto mb-4" />
                <p className="text-archie-dark text-xl font-semibold">Crew Mobile Portal</p>
                <p className="text-gray-500 mt-2">English & Spanish / No App Required</p>
              </div>
            </motion.div>
            <div>
              <SectionHeading label="Crew Portal" title="A Mobile Portal Built for Crews, Not Salespeople" subtitle="Your field crews need different tools than your office staff. The crew portal gives them exactly what they need, nothing more." align="left" />
              <ul className="space-y-3 mt-6">
                {portalFeatures.map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Quality Roofs Start With Organized Production</h2>
          <p className="mt-4 text-lg text-white/80">Organized production means more jobs completed on time, fewer callbacks, and healthier margins. Built for roofers, by a roofer.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Organize Your Production</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Production FAQ" title="Frequently Asked Questions About the Production Hub" subtitle="Everything production managers want to know about managing crews, scheduling, and quality control with Archie." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">From Chaos to Clockwork</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Replace whiteboards, group texts, and paper time cards with one production platform that keeps every crew, job, and inspection on track.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={HardHat}>Start Production Hub</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

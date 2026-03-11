import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Users, Briefcase, FileText, Calendar, FolderOpen,
  ShieldCheck, Mail, PenTool, Zap, Package, Map, BarChart3, Camera,
  MessageCircle, MessageSquare, FileStack, FilePlus2, ArrowRight,
  CheckCircle2, ChevronDown, Clock, Star, Target, Database, Search
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

const modules = [
  { icon: Users, name: 'Lead Management', desc: 'Capture leads from web forms, phone calls, referrals, and door knocks. Track every lead through your sales pipeline with custom stages, automated follow-ups, and lead scoring that prioritizes your hottest opportunities.' },
  { icon: Briefcase, name: 'Job Management', desc: 'Manage every roofing job from first contact to final payment. Track job status, assign teams, manage timelines, store documents, and monitor profitability all in one place. Supports residential, commercial, and storm restoration workflows.' },
  { icon: FileText, name: 'Invoicing', desc: 'Create professional invoices in seconds. Supports progress billing, deposit invoicing, and final payment collection. Integrate with QuickBooks and accept credit card, ACH, and check payments directly through Archie.' },
  { icon: FileStack, name: 'Estimates', desc: 'Build accurate estimates with AI-assisted material calculations, regional pricing, and waste factors. Send beautiful estimate PDFs or shareable links. Customers can approve and e-sign without creating an account.' },
  { icon: Calendar, name: 'Calendar & Scheduling', desc: 'Drag-and-drop scheduling for sales appointments, inspections, installations, and follow-ups. Sync with Google Calendar, Outlook, and iCal. Automated reminders help reduce no-shows.' },
  { icon: FolderOpen, name: 'Document Management', desc: 'Store and organize contracts, insurance paperwork, permits, warranties, photos, and manufacturer documentation. Folder templates auto-create the right structure for every job type.' },
  { icon: ShieldCheck, name: 'Insurance Claims', desc: 'Track insurance claims from initial filing through supplement and payment. Store adjuster contacts, Xactimate estimates, claim numbers, and approval status. Generate claim documentation packages with one click.' },
  { icon: Mail, name: 'Unified Inbox', desc: 'One inbox for email, SMS, and internal messages. See every conversation with a customer in chronological order. Reply from the CRM and never miss a follow-up. Filter by contact, job, or message type.' },
  { icon: PenTool, name: 'E-Signatures', desc: 'Collect legally binding e-signatures on estimates, contracts, change orders, and completion certificates. Customers sign on any device. Signed documents are automatically stored in the job folder.' },
  { icon: Zap, name: 'Automations', desc: 'Set up rules that trigger automatically: send a text when a lead is created, email an invoice when a job is completed, assign a task when an inspection is scheduled, and hundreds of other workflow automations.' },
  { icon: Package, name: 'Inventory Tracking', desc: 'Track material inventory across warehouses and trucks. Know exactly how many squares of shingles, rolls of felt, and boxes of nails you have. Set reorder alerts and link inventory usage to specific jobs.' },
  { icon: Map, name: 'Map View', desc: 'See all your leads, jobs, and crew locations on an interactive map. Plan efficient routes for sales reps, identify geographic clusters, and visualize your service territory coverage.' },
  { icon: BarChart3, name: 'Reports & Analytics', desc: 'Real-time dashboards for sales performance, revenue, close rates, average job value, lead sources, and production efficiency. Export reports to PDF or CSV. Schedule automated weekly reports to your inbox.' },
  { icon: Camera, name: 'Photo Management', desc: 'Capture and organize job photos with automatic GPS tagging, timestamps, and job association. Before, during, and after folders keep your documentation organized for insurance claims and customer presentations.' },
  { icon: MessageCircle, name: 'Team Chat', desc: 'Built-in team messaging keeps your office, sales, and production teams connected. Create channels for departments, jobs, or topics. Share files, photos, and voice notes without leaving the platform.' },
  { icon: MessageSquare, name: 'SMS & Email Campaigns', desc: 'Send individual or bulk messages to leads and customers. Pre-built templates for follow-ups, appointment reminders, review requests, and referral asks. Track open rates, click rates, and reply rates.' },
  { icon: FilePlus2, name: 'Supplements', desc: 'Manage insurance supplement requests from creation through approval. Track supplement amounts, adjuster responses, and approval timelines. Link supplements to the original claim and job record automatically.' },
  { icon: FileText, name: 'Change Orders', desc: 'Create and track change orders when job scope changes. Capture the reason, additional cost, customer approval, and impact on timeline. Change orders automatically update the job total and invoice.' },
  { icon: Target, name: 'Sales Pipeline', desc: 'Customizable kanban-style pipeline boards let you visualize where every deal stands. Drag deals between stages, set stage-specific automations, and forecast revenue based on pipeline stage probabilities.' },
  { icon: Database, name: 'Contact Database', desc: 'Store unlimited contacts with detailed profiles: property details, communication history, job history, referral source, notes, and custom fields. Smart search finds any contact in milliseconds.' },
];

const genericCrmIssues = [
  'Generic CRMs do not understand roofing job stages like inspection, approval, material order, and install',
  'They lack insurance claims tracking, Xactimate integration, and supplement management',
  'No built-in support for roofing-specific documents like scope sheets, moisture surveys, and warranty registrations',
  'Cannot calculate roofing material quantities, waste factors, or regional pricing',
  'Missing crew management features like GPS time tracking and Spanish-language support',
  'No storm data integration to connect weather events to damaged properties',
  'Photo management is generic and does not organize by before, during, and after stages',
  'Reporting does not include roofing KPIs like close rate by lead source, average replacement revenue, or supplement recovery rate',
];

const faqs = [
  { q: 'What makes Archie different from other roofing CRMs?', a: 'Archie is not just a CRM. It is a complete operating system with 20+ integrated modules and AI capabilities. Unlike AccuLynx or JobNimbus, Archie includes AI roof inspections, a voice assistant, AI sales coaching, storm intelligence, and lead prospecting all built into one platform. You do not need to bolt on additional software.' },
  { q: 'Can I import my data from AccuLynx, JobNimbus, or Jobber?', a: 'Yes. Archie supports data migration from all major roofing platforms including AccuLynx, JobNimbus, Jobber, RoofSnap, and even spreadsheets. Our onboarding team handles the migration for you, typically completing it within 24-48 hours with full data validation.' },
  { q: 'How does lead management work in Archie?', a: 'Leads can be captured from web forms, phone calls, referrals, door knocking, storm canvassing, and the Prospector tool. Each lead is automatically scored and routed through your customized pipeline. Automated follow-up sequences ensure no lead falls through the cracks.' },
  { q: 'Does Archie support insurance claims management?', a: 'Yes, extensively. Archie tracks claims from initial filing through payment, including adjuster contacts, Xactimate estimates, claim numbers, approval status, and supplements. You can generate complete claim documentation packages with photos, inspection reports, and scope details in one click.' },
  { q: 'Can I send estimates and collect e-signatures through Archie?', a: 'Absolutely. Create estimates with AI assistance, send them via branded public links, and collect legally binding e-signatures. Customers do not need to create an account. Signed estimates automatically convert to jobs, and you can generate invoices from approved estimates with one click.' },
  { q: 'How does the calendar and scheduling work?', a: 'The calendar supports drag-and-drop scheduling for inspections, sales appointments, installations, and follow-ups. It syncs with Google Calendar, Outlook, and iCal. Automated reminders via SMS and email reduce no-shows. You can view by day, week, month, or team member.' },
  { q: 'What reporting and analytics are available?', a: 'Archie provides 25+ built-in report templates covering sales performance, revenue trends, close rates by lead source, average job value, production efficiency, supplement recovery rates, aging invoices, and team leaderboards. Custom reports can be built and scheduled for automatic delivery.' },
  { q: 'Does Archie have a mobile app?', a: 'Archie is a fully responsive web application that works on any mobile browser. The Aria voice assistant provides hands-free access from the field. Crew members access a dedicated mobile portal optimized for on-site use, available in English and Spanish.' },
  { q: 'Can I manage multiple branches or offices?', a: 'Yes. Archie supports multi-branch operations with branch-level data separation, consolidated reporting, and cross-branch lead routing. Enterprise plans include custom role hierarchies, regional dashboards, and dedicated account management.' },
  { q: 'How does inventory tracking work for roofing materials?', a: 'Track shingles, underlayment, flashing, nails, ridge caps, and all other materials across warehouses and trucks. Link material usage to specific jobs for accurate job costing. Set minimum stock alerts and generate purchase orders when inventory runs low.' },
  { q: 'What automation capabilities does the CRM offer?', a: 'Archie supports trigger-based automations: when a lead is created, send a welcome text. When a job is approved, create a material order task. When an invoice is paid, send a review request. You can build custom workflows with conditions, delays, and multiple actions.' },
  { q: 'Is there a limit on contacts or jobs?', a: 'Free plans include up to 50 contacts. Paid plans offer unlimited contacts, jobs, estimates, invoices, and document storage. There are no per-user fees for crew members accessing the mobile portal.' },
  { q: 'How does Archie handle document management?', a: 'Every job gets an auto-generated folder structure. Upload contracts, permits, warranties, photos, inspection reports, and insurance paperwork. Documents are searchable, shareable, and linked to the relevant job and contact records. Supports PDF, Word, Excel, and image formats.' },
  { q: 'Can I customize the sales pipeline stages?', a: 'Yes. You can create unlimited pipeline boards with custom stages that match your sales process. Common configurations include stages for new lead, appointment set, inspection complete, estimate sent, contract signed, material ordered, scheduled, and installed.' },
  { q: 'Does the CRM support email and SMS marketing?', a: 'Yes. Send individual or bulk messages via email and SMS. Use pre-built templates or create your own. Track open rates, click rates, and responses. Automated sequences can be triggered by lead status changes, time delays, or custom events.' },
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

export default function CRM() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie Roofing CRM',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'The most comprehensive CRM built exclusively for roofing contractors. 20+ modules including lead management, job tracking, invoicing, estimates, calendar, insurance claims, e-signatures, automations, and more.',
    url: 'https://archie.now/features/crm',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free plan with up to 50 contacts' },
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
        <title>Best Roofing CRM Software in 2026 | 20+ Modules | Archie</title>
        <meta name="description" content="Archie's roofing CRM includes 20+ modules: lead management, job tracking, invoicing, estimates, calendar, insurance claims, e-signatures, automations, inventory, map view, reports, photo management, team chat, SMS/email, supplements, and change orders. Free plan available." />
        <meta name="keywords" content="roofing CRM, roofing CRM software, best CRM for roofers, roofing business management software, roofing contractor CRM, roofing lead management, roofing job tracking, roofing invoice software" />
        <link rel="canonical" href="https://archie.now/features/crm" />
        <meta property="og:title" content="Archie Roofing CRM - 20+ Modules Built for Roofers" />
        <meta property="og:description" content="The most comprehensive CRM ever built for roofing contractors. Manage leads, jobs, invoices, insurance claims, and 16 more modules from one platform." />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(59,130,246,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              The Roofing CRM That <span className="text-gradient">Actually Gets Roofing</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              20+ purpose-built modules designed for how roofing businesses actually work. From the first knock to the final payment, Archie manages every step of your roofing operation without the hacks and workarounds you have been settling for.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={Zap}>Start Free CRM</CTAButton>
              <CTAButton href="#modules" variant="secondary" size="lg">See All 20+ Modules</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Screenshot */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-video rounded-2xl bg-gradient-to-br from-archie-dark to-archie-navy border border-gray-200 shadow-2xl overflow-hidden relative flex items-center justify-center">
            <img
              src="/screenshots/crm-dashboard.png"
              alt="Archie CRM dashboard with leads, jobs, calendar, and pipeline management"
              className="w-full h-full object-cover absolute inset-0"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="text-center relative z-10">
              <LayoutDashboard className="w-16 h-16 text-archie-orange mx-auto mb-4" />
              <p className="text-white text-xl font-semibold">Archie CRM Dashboard</p>
              <p className="text-gray-400 mt-2">Place crm-dashboard.png in /public/screenshots/</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="20+ Modules" title="Every Module in the Archie Roofing CRM" subtitle="Each module integrates seamlessly with the others. Data flows automatically between leads, jobs, estimates, invoices, and claims." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
            {modules.map((m, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 hover:border-archie-orange/30 transition-all duration-300">
                <m.icon className="w-10 h-10 text-archie-orange mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{m.name}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">20+ Modules. One Login. Zero Headaches.</h2>
          <p className="mt-4 text-lg text-white/80">Stop juggling spreadsheets, sticky notes, and five different apps. Run everything from Archie.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Try It Free</CTAButton>
          </div>
        </div>
      </section>

      {/* Why Roofing-Specific CRM */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Built for Roofing" title="Why Roofers Need a Roofing-Specific CRM" subtitle="Generic CRMs like Salesforce, HubSpot, and Jobber were not designed for the roofing industry. Here is what they get wrong." />
          <div className="grid md:grid-cols-2 gap-12 mt-8">
            <div>
              <h3 className="text-2xl font-bold text-archie-dark mb-6">Problems with Generic CRMs</h3>
              <ul className="space-y-4">
                {genericCrmIssues.map((issue, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-red-100 text-red-500 flex items-center justify-center shrink-0 mt-0.5 text-sm font-bold">&times;</span>
                    <span className="text-gray-600 leading-relaxed">{issue}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-archie-dark mb-6">How Archie Solves It</h3>
              <ul className="space-y-4">
                {[
                  'Custom pipeline stages match roofing workflows: knock, inspect, estimate, approve, order, install, collect',
                  'Full insurance claims module with supplement tracking, adjuster contacts, and Xactimate integration',
                  'Roofing-specific document templates for scope sheets, moisture surveys, and warranty registrations',
                  'AI calculates shingle squares, waste factors, ridge caps, drip edge, and labor hours automatically',
                  'Crew portal with GPS time tracking, daily logs, and bilingual English/Spanish interface',
                  'NOAA storm data integration links hail and wind events to specific properties in your database',
                  'Photo management organizes images by before, during, and after with GPS coordinates and timestamps',
                  'Roofing KPI dashboards track close rate by lead source, average replacement value, supplement success rate, and DSO',
                ].map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Comparison" title="Archie CRM vs. Generic CRMs" subtitle="A direct comparison of what you get with Archie versus using Salesforce, HubSpot, Jobber, or AccuLynx for your roofing business." light />
          <div className="overflow-x-auto mt-8">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="py-4 pr-4 text-white font-bold">Capability</th>
                  <th className="py-4 px-4 text-center text-archie-orange font-bold">Archie</th>
                  <th className="py-4 px-4 text-center text-gray-400 font-semibold">Generic CRMs</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {[
                  ['Roofing pipeline stages', 'Built-in', 'Custom setup needed'],
                  ['Insurance claims tracking', 'Full module', 'Not available'],
                  ['Material quantity calculator', 'AI-powered', 'Not available'],
                  ['Storm data integration', 'NOAA real-time', 'Not available'],
                  ['Crew GPS time tracking', 'Included', 'Third-party add-on'],
                  ['Bilingual crew portal', 'English & Spanish', 'English only'],
                  ['E-signatures', 'Built-in', 'DocuSign add-on ($$$)'],
                  ['Photo management', 'Roofing-specific', 'Basic file storage'],
                  ['Roofing KPI reports', '25+ templates', 'Build from scratch'],
                  ['Onboarding time', '48 hours', '2-6 weeks'],
                  ['Price', 'Starts free', '$50-300+/user/mo'],
                ].map(([feature, archie, generic], i) => (
                  <tr key={i} className="border-b border-white/10">
                    <td className="py-3 pr-4 text-gray-300">{feature}</td>
                    <td className="py-3 px-4 text-center text-emerald-400 font-medium">{archie}</td>
                    <td className="py-3 px-4 text-center text-gray-500">{generic}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="CRM FAQ" title="Frequently Asked Questions About Archie CRM" subtitle="Answers to the top questions roofing contractors ask about switching to Archie." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Your Roofing CRM Should Understand Roofing</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Stop forcing your roofing business into a generic CRM. Archie was built from the ground up for roofing contractors. Start free today.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Zap}>Start Your Free CRM</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

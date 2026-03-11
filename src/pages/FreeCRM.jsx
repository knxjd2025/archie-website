import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Calendar,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  DollarSign,
  FileText,
  HardHat,
  Headset,
  Layers,
  LayoutDashboard,
  LineChart,
  Lock,
  Mail,
  MapPin,
  Megaphone,
  Mic,
  Minus,
  Phone,
  Plus,
  Rocket,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Target,
  TrendingUp,
  Upload,
  UserPlus,
  Users,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

/* ───────── constants ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

const INCLUDED = [
  { icon: UserPlus, title: 'Lead Management', desc: 'Capture, track, and nurture every lead from first contact to signed contract with automated pipelines.' },
  { icon: ClipboardList, title: 'Job Tracking', desc: 'Monitor every job from inspection to final payment. Visual Kanban boards, status updates, and crew assignments.' },
  { icon: Calendar, title: 'Calendar & Scheduling', desc: 'Integrated calendar for appointments, inspections, and crew scheduling. Syncs with Google and Outlook.' },
  { icon: FileText, title: 'Document Storage', desc: 'Upload contracts, photos, inspection reports, and insurance docs. Everything attached to the right job.' },
  { icon: Sparkles, title: 'All Reports & AI Unlocked', desc: 'All AI features unlocked. 2 roof reports, 2 measurement reports, and 2 storm reports per month (6 total report credits). 5 jobs per month.' },
  { icon: Smartphone, title: 'Mobile Access', desc: 'Full CRM access from any device. Update jobs, snap photos, and call leads right from the field.' },
];

const COMPARISON_FEATURES = [
  { category: 'CRM & Sales', features: [
    { name: 'Lead management', free: true, solo: true, team: true, enterprise: true },
    { name: 'Contact database', free: '100 contacts', solo: 'Unlimited', team: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Pipeline management', free: '1 pipeline', solo: '3 pipelines', team: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Email templates', free: '5 templates', solo: '25 templates', team: 'Unlimited', enterprise: 'Unlimited' },
    { name: 'Automated follow-ups', free: false, solo: true, team: true, enterprise: true },
    { name: 'Built-in calling', free: false, solo: true, team: true, enterprise: true },
    { name: 'SMS messaging', free: false, solo: true, team: true, enterprise: true },
    { name: 'Custom fields', free: false, solo: true, team: true, enterprise: true },
  ]},
  { category: 'AI & Reports', features: [
    { name: 'Roof reports', free: '2/mo', solo: '30/mo', team: '200/mo', enterprise: 'Unlimited' },
    { name: 'Measurement reports', free: '2/mo', solo: '30/mo', team: '200/mo', enterprise: 'Unlimited' },
    { name: 'Storm reports', free: '2/mo', solo: '30/mo', team: '200/mo', enterprise: 'Unlimited' },
    { name: 'AI damage assessment', free: true, solo: true, team: true, enterprise: true },
    { name: 'Sales Coach AI', free: false, solo: false, team: true, enterprise: true },
    { name: 'AI estimating', free: true, solo: true, team: true, enterprise: true },
  ]},
  { category: 'Production & Operations', features: [
    { name: 'Job tracking', free: true, solo: true, team: true, enterprise: true },
    { name: 'Calendar & scheduling', free: true, solo: true, team: true, enterprise: true },
    { name: 'Crew management', free: false, solo: false, team: true, enterprise: true },
    { name: 'Material ordering', free: false, solo: true, team: true, enterprise: true },
    { name: 'Subcontractor management', free: false, solo: false, team: true, enterprise: true },
    { name: 'GPS crew tracking', free: false, solo: false, team: true, enterprise: true },
  ]},
  { category: 'Finance & Billing', features: [
    { name: 'Basic invoicing', free: true, solo: true, team: true, enterprise: true },
    { name: 'Payment processing', free: false, solo: true, team: true, enterprise: true },
    { name: 'QuickBooks integration', free: false, solo: true, team: true, enterprise: true },
    { name: 'Commission tracking', free: false, solo: false, team: true, enterprise: true },
    { name: 'Profit per job analytics', free: false, solo: false, team: true, enterprise: true },
    { name: 'Financial dashboards', free: false, solo: false, team: true, enterprise: true },
  ]},
  { category: 'Support & Extras', features: [
    { name: 'Document storage', free: '500 MB', solo: '10 GB', team: '100 GB', enterprise: 'Unlimited' },
    { name: 'Mobile app access', free: true, solo: true, team: true, enterprise: true },
    { name: 'Email support', free: true, solo: true, team: true, enterprise: true },
    { name: 'Phone support', free: false, solo: true, team: true, enterprise: true },
    { name: 'Dedicated account manager', free: false, solo: false, team: false, enterprise: true },
    { name: 'White-labeling', free: false, solo: false, team: false, enterprise: true },
    { name: 'Custom integrations', free: false, solo: false, team: false, enterprise: true },
    { name: 'Onboarding training', free: false, solo: '1 session', team: '3 sessions', enterprise: 'Unlimited' },
  ]},
];

const VALUE_PROPS = [
  { icon: Zap, title: 'Purpose-Built for Roofers', desc: 'Not a generic CRM with a roofing skin. Every feature is designed for roofing workflows -- from lead capture to final payment.' },
  { icon: Shield, title: 'No Hidden Fees', desc: 'The free plan is free forever. No credit card required, no surprise charges. All reports and AI features are unlocked from day one.' },
  { icon: Rocket, title: 'Up and Running in Minutes', desc: 'Import your contacts, set up your pipeline, and start managing jobs today. No lengthy onboarding or training required.' },
];

const FAQ_DATA = [
  { q: 'Is the free CRM really free forever?', a: 'Yes. The Free plan is free forever — not a trial. You get all reports and AI features unlocked, full CRM and all business tools, 5 jobs per month, 2 roof reports, 2 measurement reports, and 2 storm reports per month. No credit card required.' },
  { q: 'What\'s the catch?', a: 'There isn\'t one. The free plan includes all reports and AI features. It has limits on jobs (5/month), report credits (2 roof + 2 measurement + 2 storm per month), contacts (100), and storage (500 MB). We believe once you see the value, you\'ll want to upgrade for higher limits.' },
  { q: 'Do I need a credit card to sign up?', a: 'No. The free plan requires no credit card and no payment information. Just create your account and start using it immediately.' },
  { q: 'Can I upgrade later?', a: 'Absolutely. You can upgrade to Solo, Team, or Enterprise at any time from your account settings. All your data carries over seamlessly.' },
  { q: 'How many users can use the free plan?', a: 'The free plan supports 1 user. If you need multiple users, the Team plan starts at $299/month and includes 5 users, with additional users at $49/month each.' },
  { q: 'Can I import my existing contacts?', a: 'Yes. You can import contacts via CSV file on any plan, including the free tier (up to the 100 contact limit). Paid plans support unlimited contacts.' },
  { q: 'Is my data secure?', a: 'Yes. We use bank-level 256-bit encryption, SOC 2 compliance, and regular security audits. Your data is backed up daily and stored in secure US-based data centers.' },
  { q: 'Does it integrate with other tools?', a: 'The free plan includes basic integrations. Paid plans add QuickBooks, Google Workspace, Outlook, EagleView, and more. Enterprise plans support custom API integrations.' },
  { q: 'Can I use it on my phone?', a: 'Yes. Archie has a fully responsive web app and native mobile apps for iOS and Android. Update jobs, call leads, and snap photos from the field.' },
  { q: 'What happens to my data if I cancel?', a: 'Since the free plan is free, there\'s nothing to cancel. If you downgrade from a paid plan, you keep access to free-tier features and your data remains intact.' },
  { q: 'How is Archie different from other roofing CRMs?', a: 'Archie is built exclusively for roofing contractors. Every feature — from AI roof reports to storm tracking to production management — is designed for how roofers actually work. We\'re not a generic CRM with a roofing skin.' },
  { q: 'Can I try paid features before upgrading?', a: 'Contact our team for a guided demo of any paid features. We\'ll walk you through the platform and show you exactly how the advanced tools work for your specific business.' },
];

/* ───────── component ───────── */

export default function FreeCRM() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', employees: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function handleChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFormErrors((p) => ({ ...p, [e.target.name]: '' }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email is required';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.company.trim()) errors.company = 'Company is required';
    if (!form.employees) errors.employees = 'Please select team size';
    if (Object.keys(errors).length) return setFormErrors(errors);
    setSubmitted(true);
  }

  function renderCell(value) {
    if (value === true) return <Check className="w-5 h-5 text-emerald-500 mx-auto" />;
    if (value === false) return <X className="w-5 h-5 text-gray-300 mx-auto" />;
    return <span className="text-sm text-gray-700 font-medium">{value}</span>;
  }

  return (
    <>
      <Helmet>
        <title>Free Roofing CRM | Archie</title>
        <meta name="description" content="Get a free roofing CRM forever. Lead management, job tracking, calendar, documents, and AI reports — built exclusively for roofing contractors." />
        <link rel="canonical" href="https://archie.now/free-crm" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-archie-orange rounded-full blur-[120px]" />
          <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-emerald-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-emerald-500/10 text-emerald-400">
              No Credit Card Required
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Get a Free Roofing CRM <span className="text-gradient">&mdash; Forever</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Not a trial. Not a gimmick. Full CRM access with lead management, job tracking, scheduling, and AI reports. Built for roofers, free forever.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="#signup" size="lg" iconRight={ArrowRight}>
                Activate Free CRM
              </CTAButton>
              <CTAButton href="#comparison" variant="secondary" size="lg">
                Compare Plans
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-20 bg-archie-light">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="What You Get"
            title="Everything You Need to Run Your Roofing Business"
            subtitle="The free plan isn't watered down. It's a real CRM built for real roofers."
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {INCLUDED.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-shadow p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-archie-orange" />
                </div>
                <h3 className="text-lg font-bold text-archie-dark mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison Table ── */}
      <section id="comparison" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Compare Plans"
            title="Find the Right Plan for Your Business"
            subtitle="Start free and upgrade as you grow. Every plan includes our core roofing CRM."
          />

          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-gradient-hero text-white">
                    <th className="px-6 py-5 text-sm font-bold w-[30%]">Feature</th>
                    <th className="px-4 py-5 text-sm font-bold text-center">
                      Free<br /><span className="text-emerald-400 text-xs font-normal">$0/mo</span>
                    </th>
                    <th className="px-4 py-5 text-sm font-bold text-center">
                      Solo<br /><span className="text-archie-orange text-xs font-normal">$99/mo</span>
                    </th>
                    <th className="px-4 py-5 text-sm font-bold text-center">
                      <span className="inline-block bg-archie-orange px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider mb-1">Popular</span><br />
                      Team<br /><span className="text-archie-orange text-xs font-normal">$299/mo</span>
                    </th>
                    <th className="px-4 py-5 text-sm font-bold text-center">
                      Enterprise<br /><span className="text-gray-400 text-xs font-normal">Custom</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON_FEATURES.map((group) => (
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

      {/* ── Lead Capture ── */}
      <section id="signup" className="py-20 bg-archie-light">
        <div className="max-w-lg mx-auto px-6">
          <SectionHeading
            label="Get Started"
            title="Activate Your Free CRM"
            subtitle="Fill out the form below to create your free Archie account."
          />

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                      { name: 'email', label: 'Work Email', type: 'email', placeholder: 'john@roofingco.com' },
                      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 123-4567' },
                      { name: 'company', label: 'Company Name', type: 'text', placeholder: 'Smith Roofing LLC' },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                        <input
                          name={f.name}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.name]}
                          onChange={handleChange}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-archie-orange/50 focus:border-archie-orange transition"
                        />
                        {formErrors[f.name] && <p className="mt-1 text-xs text-red-500">{formErrors[f.name]}</p>}
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Number of Employees</label>
                      <select
                        name="employees"
                        value={form.employees}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-archie-orange/50 focus:border-archie-orange transition appearance-none cursor-pointer"
                      >
                        <option value="">Select team size...</option>
                        <option value="1">Just me</option>
                        <option value="2-5">2 - 5 employees</option>
                        <option value="6-10">6 - 10 employees</option>
                        <option value="11-25">11 - 25 employees</option>
                        <option value="26-50">26 - 50 employees</option>
                        <option value="50+">50+ employees</option>
                      </select>
                      {formErrors.employees && <p className="mt-1 text-xs text-red-500">{formErrors.employees}</p>}
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-gradient-cta text-white font-semibold rounded-xl px-6 py-3.5 hover:brightness-110 transition-all cursor-pointer shadow-lg shadow-archie-orange/25"
                    >
                      Activate My Free CRM
                    </button>

                    <p className="text-xs text-center text-gray-400 flex items-center justify-center gap-1">
                      <Lock className="w-3 h-3" /> No credit card required. Free forever.
                    </p>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl shadow-xl border border-emerald-100 p-10 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-archie-dark mb-2">You're In!</h3>
                <p className="text-gray-500 mb-6">Your free CRM account is being set up. Check your email for login instructions.</p>
                <CTAButton href="https://app.archie.now" iconRight={ArrowRight}>
                  Go to My CRM
                </CTAButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Why Roofers Choose Archie ── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            label="Why Archie"
            title="Built Different. Built for Roofers."
            subtitle="A CRM that actually understands the roofing business."
          />

          <div className="grid md:grid-cols-3 gap-8">
            {VALUE_PROPS.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="bg-gray-50 rounded-2xl border border-gray-100 p-6"
              >
                <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4">
                  <item.icon className="w-6 h-6 text-archie-orange" />
                </div>
                <h3 className="text-lg font-bold text-archie-dark mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
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
            title="Frequently Asked Questions"
            subtitle="Everything you need to know about the free CRM."
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
              Activate Your Free CRM Today
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Get full CRM access with no credit card. No trial. Free forever.
            </p>
            <CTAButton href="https://app.archie.now" size="lg" iconRight={ArrowRight}>
              Start Free Now
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}

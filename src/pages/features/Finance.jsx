import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  DollarSign, ArrowRight, Zap, ChevronDown, CheckCircle2, TrendingUp,
  BarChart3, Clock, AlertCircle, PieChart, Calculator, CreditCard,
  FileText, Users, Target, Shield, Wallet, Receipt
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const modules = [
  { icon: TrendingUp, title: 'Cash Flow Dashboard', desc: 'See your cash position at a glance: money in, money out, and projected cash flow for the next 30, 60, and 90 days. The dashboard pulls data from invoices, payments, expenses, and scheduled payroll to give owners a clear picture of financial health without waiting for monthly accounting reports.' },
  { icon: AlertCircle, title: 'Collections Management', desc: 'Track outstanding invoices, aging balances, and collection status. Automated payment reminders send at configurable intervals: 3 days past due, 7 days, 14 days, and 30 days. See which customers owe money, how old each balance is, and take action before receivables become bad debt.' },
  { icon: PieChart, title: 'Job Profitability', desc: 'Monitor estimated vs. actual costs for every job in real time. Track material costs, labor hours (from GPS time tracking), subcontractor charges, and overhead allocation. See profit margin percentage and dollar amount before the job is complete so you can correct course if costs are running over budget.' },
  { icon: Calculator, title: 'Commission Calculator', desc: 'Automatically calculate sales commissions based on your commission structure. Supports flat rate per job, percentage of revenue, percentage of profit, tiered rates, and split commissions for team sales. Commission reports are generated for each pay period with full job-level detail.' },
  { icon: Clock, title: 'DSO Tracking', desc: 'Days Sales Outstanding measures how quickly you collect payment after invoicing. Archie tracks DSO at the company level, by customer segment, and by payment method. Lowering DSO is one of the fastest ways to improve cash flow for roofing companies that extend net-30 or net-60 terms.' },
  { icon: Receipt, title: 'Expense Tracking', desc: 'Log business expenses by category: materials, labor, vehicle, insurance, marketing, and overhead. Attach receipts via photo upload. Expenses link to specific jobs for accurate profitability tracking or remain as general overhead for company-level reporting.' },
];

const kpis = [
  { metric: 'Revenue', desc: 'Total revenue closed this month, quarter, and year. Compare against goals and prior periods.' },
  { metric: 'Average Job Value', desc: 'Mean revenue per completed job. Track trends to ensure you are not underpricing.' },
  { metric: 'Gross Profit Margin', desc: 'Revenue minus direct costs (materials + labor) as a percentage. Target: 40-55%.' },
  { metric: 'Net Profit Margin', desc: 'Revenue minus all costs including overhead. Target: 10-20% for healthy roofing companies.' },
  { metric: 'Days Sales Outstanding', desc: 'Average days between invoicing and payment collection. Target: under 30 days.' },
  { metric: 'Collection Rate', desc: 'Percentage of invoiced revenue that is actually collected. Target: 98%+.' },
  { metric: 'Cost Per Lead', desc: 'Total marketing spend divided by leads generated, broken down by lead source.' },
  { metric: 'Revenue Per Employee', desc: 'Total revenue divided by headcount. Benchmark for operational efficiency.' },
];

const faqs = [
  { q: 'What is Finance Command in Archie?', a: 'Finance Command is a financial dashboard and management tool built specifically for roofing company owners and CFOs. It provides real-time visibility into cash flow, collections, job profitability, sales commissions, and Days Sales Outstanding without requiring accounting expertise or waiting for monthly financial statements.' },
  { q: 'How does cash flow tracking work?', a: 'The cash flow dashboard aggregates data from across Archie: outstanding invoices show expected incoming cash, scheduled expenses and payroll show expected outflows, and recent payment history establishes collection patterns. The dashboard projects cash flow for 30, 60, and 90 days, helping owners plan for slow periods and growth investments.' },
  { q: 'Can Archie calculate sales commissions automatically?', a: 'Yes. Configure your commission structure once, and Archie calculates commissions for every closed job automatically. Supported structures include flat rate per job, percentage of revenue, percentage of gross profit, tiered rates based on volume, and split commissions for team sales. Commission reports are generated for each pay period.' },
  { q: 'What is Days Sales Outstanding and why does it matter?', a: 'DSO measures the average number of days between when you send an invoice and when you receive payment. A high DSO means you are financing your customers operations with your cash. For roofing companies, target DSO under 30 days. Archie tracks DSO automatically and helps you identify slow-paying customers and invoice aging trends.' },
  { q: 'How does job profitability tracking work?', a: 'Each job has an estimated budget from the approved estimate. As the job progresses, actual costs are tracked: GPS time tracking feeds labor hours, material purchases are logged, and subcontractor charges are recorded. The profitability dashboard shows estimated vs. actual costs in real time, with a running profit margin percentage.' },
  { q: 'Does Finance Command replace my accounting software?', a: 'No. Finance Command is designed to complement your accounting software (QuickBooks, Xero, etc.), not replace it. It provides operational financial intelligence that accounting software does not offer: real-time job profitability, commission calculations, DSO tracking, and roofing-specific KPIs. Financial data syncs with your accounting platform for tax and compliance purposes.' },
  { q: 'Can I track collections and overdue invoices?', a: 'Yes. The collections module shows all outstanding invoices, organized by aging category: current, 1-30 days, 31-60 days, 61-90 days, and 90+ days overdue. Automated payment reminders can be configured at each interval. You can see total outstanding receivables and identify which customers need follow-up.' },
  { q: 'What financial reports can I generate?', a: 'Finance Command includes reports for revenue summary, job profitability, commission statements, aging receivables, cash flow projections, expense breakdowns, cost per lead by source, and revenue per employee. Reports can be exported to PDF or CSV and scheduled for automatic weekly or monthly delivery.' },
  { q: 'How does expense tracking integrate with job profitability?', a: 'When you log an expense, you can assign it to a specific job or leave it as general overhead. Job-assigned expenses feed directly into the job profitability calculation alongside labor costs and subcontractor charges. This gives you a true picture of what each job actually cost versus the estimate.' },
  { q: 'Is Finance Command available on the free plan?', a: 'Basic financial dashboards including revenue tracking and simple invoicing are available on the free plan. Advanced features like commission calculations, DSO tracking, job profitability analytics, and automated collections are available on Pro and Enterprise plans.' },
  { q: 'Can I set financial goals and track progress?', a: 'Yes. Set monthly, quarterly, and annual revenue goals. The Finance Command dashboard shows progress toward goals with visual progress bars and pace indicators. You can also set targets for profit margin, DSO, and close rate, with alerts when metrics fall below target thresholds.' },
  { q: 'How does this help me scale my roofing company?', a: 'Scaling without financial visibility is the number one cause of roofing company failure. Finance Command gives you real-time data on whether your growth is profitable, which job types deliver the best margins, how quickly you collect cash, and whether your cost structure supports expansion. Data-driven decisions replace gut feelings.' },
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

export default function Finance() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie Finance Command',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Financial management dashboard for roofing contractors. Track cash flow, collections, job profitability, sales commissions, DSO, and roofing-specific KPIs in real time. Built for roofing company owners and financial managers.',
    url: 'https://archie.now/features/finance',
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
        <title>Roofing Finance Software | Cash Flow, Commissions & DSO | Archie</title>
        <meta name="description" content="Take control of your roofing company finances. Track cash flow, manage collections, monitor job profitability, calculate commissions, and measure DSO in real time. Finance Command gives roofing owners the visibility they need to scale profitably." />
        <meta name="keywords" content="roofing finance software, roofing cash flow management, roofing job profitability, roofing commission calculator, DSO tracking roofing, roofing collections management, roofing financial dashboard" />
        <link rel="canonical" href="https://archie.now/features/finance" />
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
              Finance Command: <span className="text-gradient">See Every Dollar</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Real-time cash flow, collections management, job profitability tracking, automatic commission calculations, and DSO monitoring. Finance Command gives roofing company owners the financial visibility they need to grow profitably and avoid the cash crunches that kill growing companies.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={DollarSign}>Get Financial Clarity</CTAButton>
              <CTAButton href="#modules" variant="secondary" size="lg">See All Modules</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="/screenshots/crm-invoices.png"
              alt="Archie Finance Command screenshot"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Modules */}
      <section id="modules" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Finance Modules" title="Six Financial Tools Built for Roofing Companies" subtitle="Each module pulls live data from your CRM, estimates, invoices, time tracking, and expenses for real-time financial intelligence." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {modules.map((m, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-emerald-500/30 transition-colors">
                <m.icon className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{m.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Roofing KPIs" title="Eight Financial Metrics Every Roofing Owner Should Track" subtitle="Finance Command calculates and displays these KPIs automatically. No spreadsheets. No manual calculations. Just real-time numbers." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {kpis.map((k, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-bold text-archie-dark mb-2">{k.metric}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{k.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why It Matters */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Why It Matters" title="The Number One Reason Roofing Companies Fail" subtitle="It is not lack of leads or bad crews. It is lack of financial visibility. Companies grow revenue but lose money because they cannot see their numbers in real time." light />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              { icon: AlertCircle, title: 'Cash Crunch', desc: 'Growing companies often run out of cash even while revenue is increasing. Material costs, payroll, and subcontractor payments are due before customers pay their invoices. Without cash flow projections, owners are blindsided by shortfalls.' },
              { icon: PieChart, title: 'Margin Erosion', desc: 'Without job-level profitability tracking, it is impossible to know which jobs make money and which lose money. Material waste, scope creep, and underestimated labor hours silently eat margins. Finance Command catches these issues in real time.' },
              { icon: Clock, title: 'Slow Collections', desc: 'Every day an invoice goes unpaid costs your company money. High DSO means you are financing your customers operations. Automated collection workflows and aging reports keep receivables moving and cash flowing into your bank account.' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <item.icon className="w-10 h-10 text-emerald-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Revenue Is Vanity. Profit Is Sanity. Cash Is King.</h2>
          <p className="mt-4 text-lg text-white/80">Finance Command gives you all three in real time. Know your numbers. Grow with confidence.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Get Financial Clarity</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Finance FAQ" title="Frequently Asked Questions About Finance Command" subtitle="Everything roofing company owners want to know about financial tracking, profitability, and cash flow management." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Grow Profitably or Do Not Grow at All</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Finance Command is included with Archie Pro and Enterprise. Start tracking the numbers that determine whether your roofing company thrives or just survives.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={DollarSign}>Start Finance Command</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  BookOpen, ChevronDown, ChevronRight, CheckCircle, AlertTriangle,
  DollarSign, Users, TrendingUp, Shield, Wrench, BarChart3,
  Building2, FileText, Phone, Target, Lightbulb, ArrowRight,
  Clock, Award, MapPin, Scale, Megaphone, Calculator, Layers
} from 'lucide-react';
import CTAButton from '../../components/CTAButton';
import SectionHeading from '../../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tocSections = [
  { id: 'starting', title: '1. Starting a Roofing Business', icon: Building2 },
  { id: 'licensing', title: '2. Licensing Requirements by State', icon: FileText },
  { id: 'insurance', title: '3. Insurance Needs', icon: Shield },
  { id: 'building-crew', title: '4. Building Your Crew', icon: Users },
  { id: 'marketing', title: '5. Marketing Strategies', icon: Megaphone },
  { id: 'pricing', title: '6. Pricing Your Work', icon: Calculator },
  { id: 'cash-flow', title: '7. Managing Cash Flow', icon: DollarSign },
  { id: 'scaling', title: '8. Scaling Operations', icon: TrendingUp },
  { id: 'technology', title: '9. Technology Tools', icon: Layers },
  { id: 'mistakes', title: '10. Common Mistakes', icon: AlertTriangle },
  { id: 'faq', title: 'Frequently Asked Questions', icon: Lightbulb },
];

const faqs = [
  {
    q: 'How much does it cost to start a roofing business?',
    a: 'Starting a roofing business typically costs between $10,000 and $150,000 depending on your location and scale. A basic startup with hand tools, a used truck, insurance, and licensing can be done for $10,000-$25,000. A mid-level startup with newer equipment, a trailer, marketing budget, and working capital runs $25,000-$75,000. A fully equipped operation with multiple trucks, full crew, office space, and comprehensive marketing costs $75,000-$150,000+. The largest expenses are typically insurance ($5,000-$15,000/year), a work truck ($15,000-$40,000), tools and equipment ($3,000-$10,000), and licensing/bonding ($500-$5,000).'
  },
  {
    q: 'Do I need a contractor\'s license to start a roofing business?',
    a: 'Requirements vary significantly by state. States like California, Arizona, and Nevada require specific roofing contractor licenses with exams covering trade knowledge and business law. Other states like Texas and Indiana do not have statewide licensing but may have local city or county requirements. Even in states without licensing, you typically need a business license, workers\' compensation insurance, and may need to register with the state. Always check both state and local municipality requirements before starting.'
  },
  {
    q: 'How much can a roofing business owner make?',
    a: 'Roofing business owner income varies widely based on company size, market, and management efficiency. A small owner-operator typically earns $50,000-$100,000 per year. A mid-size company owner with 2-5 crews can earn $100,000-$250,000. Owners of large roofing companies with 10+ crews and strong systems can earn $250,000-$1,000,000+. Net profit margins for well-run roofing companies typically range from 8% to 20% after all expenses. Storm restoration contractors in active hail markets often see higher revenues but also higher overhead costs.'
  },
  {
    q: 'What insurance do I need for a roofing business?',
    a: 'Essential insurance for roofing businesses includes: General Liability Insurance ($1M-$2M coverage, costs $3,000-$8,000/year), Workers\' Compensation Insurance (required in almost every state, costs $15-$30 per $100 of payroll for roofing), Commercial Auto Insurance ($1,500-$3,000/year per vehicle), Inland Marine/Tools & Equipment Insurance ($500-$1,500/year), and an Umbrella Policy for additional liability coverage ($1,000-$3,000/year). Some clients and general contractors also require you to carry Professional Liability (Errors & Omissions) insurance. Total annual insurance costs for a small roofing company typically run $15,000-$40,000.'
  },
  {
    q: 'How do I find roofing customers?',
    a: 'The most effective customer acquisition channels for roofers include: door knocking (especially after storms), Google Business Profile optimization and Google Ads (capturing "roofer near me" searches), referral programs with existing customers, partnerships with real estate agents and insurance adjusters, Facebook and Instagram advertising targeting homeowners, yard signs and vehicle wraps for local visibility, HomeAdvisor/Angi leads (though ROI varies), community involvement and sponsorships, and direct mail campaigns in target neighborhoods. Most successful roofing companies use a multi-channel approach and track cost-per-lead for each channel to optimize spending.'
  },
  {
    q: 'What is the average profit margin for a roofing company?',
    a: 'The average net profit margin for roofing companies is 6-10%, but well-managed companies regularly achieve 15-25%. Gross profit margins (revenue minus direct costs like materials and labor) typically range from 35-50%. The gap between gross and net profit comes from overhead expenses including insurance, vehicles, office costs, marketing, and administrative salaries. To improve margins, focus on accurate estimating to avoid underbidding, efficient job scheduling to maximize crew productivity, strong purchasing relationships for material discounts, minimizing waste and callbacks, and using technology to reduce administrative overhead.'
  },
  {
    q: 'How do I price a roofing job?',
    a: 'Roofing job pricing follows this general formula: Materials Cost + Labor Cost + Overhead Allocation + Profit Margin = Bid Price. Measure the roof accurately (in squares, where 1 square = 100 sq ft). Calculate materials including shingles, underlayment, flashing, drip edge, vents, nails, and waste factor (typically 10-15%). Add labor costs based on crew size, expected time, and pay rates. Add your overhead allocation (usually 15-25% of direct costs) and your desired profit margin (10-20%). For insurance restoration work, pricing follows Xactimate or similar estimating software pricing databases. Always include line items for tear-off, disposal, and any necessary repairs to decking or structural elements.'
  },
  {
    q: 'Should I focus on residential or commercial roofing?',
    a: 'Most new roofing businesses start residential because the barrier to entry is lower, jobs are smaller and faster, and there is more consistent demand. Commercial roofing offers larger jobs and longer-term contracts but requires more capital, specialized knowledge (TPO, EPDM, built-up roofing), and often specific certifications from manufacturers. Many successful companies start residential and add commercial capabilities after 3-5 years. Consider your market: suburban areas favor residential, while cities with many flat-roof commercial buildings present commercial opportunities. Some contractors specialize in multi-family (apartments, condos) as a middle ground.'
  },
  {
    q: 'How many crews do I need to scale my roofing business?',
    a: 'Start with one crew of 4-6 workers and add crews as demand grows. A single residential crew can typically complete 2-4 tear-off and re-roofs per week depending on roof size and complexity. Revenue per crew averages $500,000-$1,000,000 annually. Before adding a second crew, ensure you have consistent lead flow, strong project management systems, and a reliable crew leader. Most roofing companies find that scaling from 1 to 3 crews is the hardest transition because it requires the owner to shift from working on roofs to managing the business. Having 3+ crews typically requires a dedicated office manager, production manager, and sales team.'
  },
  {
    q: 'What tools and equipment do I need to start a roofing business?',
    a: 'Essential roofing tools include: nail guns (framing and roofing), air compressor (minimum 6-gallon), extension ladders (28-ft and 40-ft), roof jacks and planks, magnetic nail sweepers, chalk lines, utility knives, pry bars and shingle removers, tarps and safety equipment (harnesses, anchors, hard hats), a work truck or van, and a dump trailer for tear-off debris. Total initial tool investment: $3,000-$10,000. As you grow, add a materials delivery truck, scaffolding, a portable generator, and specialized equipment for metal or flat roofing if you offer those services.'
  },
  {
    q: 'How do I handle roofing insurance claims?',
    a: 'Insurance restoration work involves inspecting storm-damaged roofs, documenting damage, helping homeowners file claims, meeting with insurance adjusters, and negotiating fair settlement amounts. Key steps: become proficient in Xactimate estimating software, learn to identify all types of storm damage (hail, wind, falling debris), document everything with photos and measurements, understand the supplement process for items adjusters miss, and build relationships with local adjusters. Insurance work can be very profitable but has longer payment cycles (30-90 days) and requires strong cash flow management. Archie\'s AI tools can automate much of the documentation and claims process.'
  },
  {
    q: 'What is the best CRM for roofing companies?',
    a: 'A good roofing CRM should handle lead tracking, appointment scheduling, estimating, contract management, production scheduling, and customer communication. Popular options include Archie (AI-powered, built specifically for roofers with integrated estimating and storm tools), JobNimbus, AccuLynx, Roofr, and HousecallPro. Key features to look for: mobile app for field use, integration with Xactimate, photo documentation, automated follow-ups, production boards, and financial reporting. Archie stands out by combining CRM functionality with AI-powered roof measurements, voice assistants, and automated claims processing in one platform.'
  },
  {
    q: 'How do I train new roofers?',
    a: 'Training new roofers involves both safety training and technical skills. Start with OSHA 10-hour construction safety training, fall protection training, and your company\'s safety protocols. Technical training should cover proper shingle installation techniques, flashing installation, ventilation principles, underlayment application, and how to identify and repair decking damage. Pair new hires with experienced crew members for at least 2-4 weeks of on-the-job training. Consider manufacturer certification programs (GAF Master Elite, CertainTeed SELECT ShingleMaster) which provide training materials and can be competitive advantages. Document all training for insurance and liability purposes.'
  },
  {
    q: 'How do I get manufacturer certifications?',
    a: 'Major shingle manufacturers offer contractor certification programs. GAF Master Elite certification (top 2% of roofers) requires 7+ years in business, proper licensing and insurance, strong reputation, and commitment to ongoing training. CertainTeed SELECT ShingleMaster requires attendance at their training program and meeting quality standards. Owens Corning Preferred Contractor requires similar qualifications. Benefits include extended warranty offerings (25-50 year manufacturer-backed warranties), marketing support, lead referrals, and credibility with homeowners. These certifications can significantly increase close rates and allow you to charge premium pricing.'
  },
  {
    q: 'What are the biggest challenges facing roofing companies today?',
    a: 'The top challenges include: labor shortages (finding and retaining skilled roofers), rising material costs and supply chain disruptions, increasing insurance costs, regulatory changes in insurance claims (assignment of benefits restrictions), competition from storm chasers and low-quality competitors, managing cash flow during slow seasons, keeping up with technology, and meeting increasingly complex building codes. Successful companies address these challenges through competitive compensation, strong company culture, diversified services, technology adoption, and building financial reserves during peak seasons.'
  },
  {
    q: 'How do I manage seasonal fluctuations in roofing?',
    a: 'Roofing is inherently seasonal in most markets. Strategies to manage fluctuations include: offering interior services or maintenance programs during slow months, building cash reserves during peak season (save 3-6 months of overhead), diversifying into commercial or multi-family work which is less seasonal, offering gutter installation, siding, and window services, running winter promotions with slight discounts, focusing on estimates and sales during slow periods to build a backlog for spring, and reducing crew size strategically while retaining your best workers with guaranteed hours or retention bonuses.'
  },
  {
    q: 'Should I buy or lease work trucks?',
    a: 'Both options have merit. Buying makes sense if you have the capital, plan to keep vehicles 5+ years, and want to build equity. Used trucks (2-3 years old) offer the best value. Leasing makes sense for newer companies conserving cash, provides predictable monthly expenses, and includes maintenance in some plans. Most successful roofing companies use a mix: own their primary trucks and lease newer additions. Consider a truck\'s tax implications too - both purchase (depreciation) and lease payments are tax-deductible. A reliable work truck is essential; breakdowns cost far more in lost productivity than higher vehicle payments.'
  },
  {
    q: 'How important is online presence for roofers?',
    a: 'Extremely important. Over 90% of homeowners research contractors online before calling. Essential elements include: a professional website with before/after photos, a fully optimized Google Business Profile with 50+ reviews, consistent NAP (Name, Address, Phone) across all directories, active social media presence (especially Facebook for local reach), and a review generation system. Companies with 100+ Google reviews and 4.5+ star ratings typically see 3-5x more leads than those without. Invest in professional photography of completed projects and encourage every satisfied customer to leave a review.'
  },
  {
    q: 'What is Xactimate and do I need it?',
    a: 'Xactimate is the industry-standard estimating software used by insurance companies to price property damage repairs. If you do any insurance restoration work, Xactimate proficiency is essential. Insurance adjusters write their estimates in Xactimate, and your supplements need to be in the same format. Xactimate uses local pricing databases updated monthly and includes line items for every aspect of roofing work. A license costs approximately $200-$350/month. Learning Xactimate well - including proper line item selection, waste factors, and overhead & profit inclusion - can mean tens of thousands of dollars in additional revenue per claim through proper supplementing.'
  },
  {
    q: 'How do I handle customer complaints and warranty claims?',
    a: 'Handle complaints promptly and professionally - your reputation depends on it. Respond within 24 hours, schedule an inspection within 48-72 hours, and document everything with photos. For legitimate warranty issues, fix them quickly at your cost and use it as an opportunity to strengthen the customer relationship. For issues outside your warranty scope, explain clearly why and offer a fair price for the repair. Track all warranty claims to identify patterns (recurring issues may indicate installation problems that need addressing). A strong warranty program and responsive service generate referrals - the cheapest source of new business. Include clear warranty terms in every contract.'
  },
  {
    q: 'What are the tax implications of running a roofing business?',
    a: 'Key tax considerations include: choosing the right business structure (LLC or S-Corp can save significant self-employment taxes at higher income levels), tracking all deductible expenses including vehicle mileage, tools, insurance, marketing, and home office, understanding quarterly estimated tax payments to avoid penalties, depreciating equipment and vehicles (Section 179 deduction allows immediate expensing of qualifying purchases), properly classifying workers as employees vs. subcontractors (misclassification carries heavy penalties), collecting and remitting sales tax on materials in applicable states, and maintaining clean financial records. Work with a CPA experienced in construction businesses - they typically save more than they cost through tax optimization strategies.'
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      className="border border-gray-200 rounded-xl overflow-hidden"
      initial={false}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
      >
        <span className="font-semibold text-archie-dark pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-archie-orange shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="px-5 pb-5 text-gray-600 leading-relaxed"
        >
          {a}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function RoofingGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Complete Guide to Running a Roofing Business in 2025",
    "description": "Everything you need to know about starting, running, and scaling a roofing business. Covers licensing, insurance, marketing, pricing, hiring, technology, and more.",
    "author": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "publisher": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "datePublished": "2025-01-15",
    "dateModified": "2025-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://archie.now/resources/roofing-guide" },
    "image": "https://archie.now/images/roofing-guide-hero.jpg"
  };

  return (
    <>
      <Helmet>
        <title>The Complete Guide to Running a Roofing Business in 2025 | Archie</title>
        <meta name="description" content="The definitive guide for roofing contractors. Learn how to start, manage, and scale a profitable roofing business with expert advice on licensing, insurance, marketing, pricing, and technology." />
        <meta name="keywords" content="roofing business guide, start roofing company, roofing contractor tips, roofing business plan, roofing marketing, roofing pricing, roofing insurance, roofing CRM" />
        <link rel="canonical" href="https://archie.now/resources/roofing-guide" />
        <meta property="og:title" content="The Complete Guide to Running a Roofing Business in 2025" />
        <meta property="og:description" content="Everything you need to start, run, and scale a profitable roofing company. Expert advice from industry veterans." />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://archie.now/resources/roofing-guide" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Comprehensive Resource
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              The Complete Guide to Running a <span className="text-gradient">Roofing Business</span> in 2025
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Everything you need to know about starting, managing, and scaling a profitable roofing company — from licensing and insurance to marketing, technology, and beyond.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 35 min read</span>
              <span>|</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> Updated March 2025</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-archie-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-archie-dark mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-archie-orange" /> Table of Contents
            </h2>
            <nav className="grid sm:grid-cols-2 gap-3">
              {tocSections.map(s => (
                <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-archie-orange/5 transition-colors group">
                  <s.icon className="w-5 h-5 text-archie-orange shrink-0" />
                  <span className="text-gray-700 group-hover:text-archie-orange transition-colors font-medium">{s.title}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Starting */}
      <section id="starting" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">1. Starting a Roofing Business</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              The roofing industry in the United States generates over <strong>$56 billion in annual revenue</strong> and employs more than 250,000 workers. With an aging housing stock, increasing severe weather events, and ongoing new construction, demand for roofing services continues to grow steadily. Starting a roofing business can be one of the most lucrative paths in the trades — but it requires careful planning, adequate capital, and a commitment to quality and safety.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Developing Your Business Plan</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Before you install your first shingle, you need a solid business plan. This does not need to be a 50-page document, but it should clearly define your target market, services, competitive advantages, financial projections, and growth strategy. A well-thought-out business plan serves as your roadmap and is essential if you plan to secure financing.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your business plan should address several key areas. First, define your service area — most residential roofing companies operate within a 30-50 mile radius of their base. Second, determine your service offerings: will you focus on residential re-roofing, new construction, storm restoration, commercial roofing, or a combination? Third, analyze your competition — visit competitor websites, check their Google reviews, understand their pricing, and identify gaps in the market you can fill.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Choosing Your Business Structure</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Most roofing businesses start as either an LLC (Limited Liability Company) or an S-Corporation. An LLC provides personal liability protection, meaning your personal assets are protected if your business is sued. It is simple to set up and maintain, with pass-through taxation (business income is reported on your personal tax return). An S-Corporation provides similar liability protection but can offer tax advantages at higher income levels by allowing you to pay yourself a reasonable salary and take additional profits as distributions, which are not subject to self-employment tax.
            </p>
            <p className="text-gray-600 leading-relaxed mb-6">
              A sole proprietorship is the simplest structure but offers no liability protection — a significant risk in roofing where job-site accidents and property damage are real possibilities. Consult with a business attorney and CPA to determine the best structure for your situation. The cost to form an LLC ranges from $50-$500 depending on your state.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Startup Costs Breakdown</h3>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { item: 'Business registration & licensing', cost: '$500 - $5,000' },
                  { item: 'Insurance (first year)', cost: '$8,000 - $25,000' },
                  { item: 'Work truck (used)', cost: '$15,000 - $35,000' },
                  { item: 'Dump trailer', cost: '$5,000 - $12,000' },
                  { item: 'Tools & equipment', cost: '$3,000 - $10,000' },
                  { item: 'Marketing & website', cost: '$2,000 - $8,000' },
                  { item: 'Working capital (3 months)', cost: '$10,000 - $30,000' },
                  { item: 'Office/admin setup', cost: '$1,000 - $3,000' },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center bg-white p-3 rounded-lg">
                    <span className="text-gray-700 font-medium">{r.item}</span>
                    <span className="text-archie-orange font-bold whitespace-nowrap ml-2">{r.cost}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                <span className="text-archie-dark font-bold text-lg">Total Estimated Range</span>
                <span className="text-archie-orange font-bold text-lg">$44,500 - $128,000</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Securing Financing</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              If you do not have sufficient capital to self-fund, several financing options exist. SBA (Small Business Administration) microloans offer up to $50,000 with favorable terms for new businesses. Traditional bank lines of credit provide flexible access to working capital. Equipment financing allows you to purchase trucks and tools with the equipment itself as collateral. Some roofing supply distributors offer credit terms (net-30 or net-60) to established accounts, which helps manage cash flow once you are operational. Avoid high-interest options like merchant cash advances, which can trap new businesses in debt cycles.
            </p>

            <div className="bg-archie-dark rounded-xl p-6 my-8">
              <p className="text-archie-orange font-bold text-lg mb-2">Pro Tip</p>
              <p className="text-gray-300 leading-relaxed">
                Start lean. Many successful roofing companies started with the owner, one helper, a used truck, and basic tools. Invest in quality insurance and marketing before buying the newest equipment. You can always upgrade your tools and vehicles as revenue grows, but cutting corners on insurance or marketing will cost you far more in the long run.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Licensing */}
      <section id="licensing" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">2. Licensing Requirements by State</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Contractor licensing requirements in the United States vary dramatically from state to state, and even between cities within the same state. Failing to obtain proper licensing can result in fines of $500 to $10,000 or more, inability to pull permits, voided customer warranties, and even criminal charges in some jurisdictions. Understanding and complying with your local requirements is non-negotiable.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">States Requiring Specific Roofing Contractor Licenses</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              The following states require a specific contractor or roofing license at the state level: Alabama, Alaska, Arizona, Arkansas, California, Connecticut, Delaware, Florida, Georgia, Hawaii, Idaho, Iowa, Kentucky (if over $10,000), Louisiana, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Montana, Nebraska, Nevada, New Mexico, North Carolina, North Dakota, Oklahoma, Oregon, Rhode Island, South Carolina, Tennessee, Utah, Vermont, Virginia, Washington, West Virginia, and Wisconsin.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              Each state has its own specific requirements, which may include passing a trade exam covering roofing knowledge, passing a business and law exam, providing proof of insurance (general liability and workers' compensation), posting a surety bond (typically $10,000-$25,000), demonstrating experience (usually 2-4 years of verified work experience), completing continuing education requirements, and paying licensing fees ($100-$600 annually).
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">States Without Statewide Licensing</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              States like Texas, Indiana, Missouri, New Hampshire, Maine, Vermont, Wyoming, Colorado, Kansas, South Dakota, and New York do not require statewide contractor licensing. However, this does not mean you can operate without any license. Most cities and counties within these states have their own registration or licensing requirements. For example, Texas has no state license, but Houston, Dallas, Austin, San Antonio, and most other municipalities require local registration, proof of insurance, and sometimes bonding.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Key Licensing Considerations</h3>
            <div className="space-y-4 mb-6">
              {[
                'Always check both state AND local (city/county) requirements',
                'Keep all licenses current — set renewal reminders 60 days before expiration',
                'Display your license number on all marketing materials, proposals, and contracts',
                'Some states require separate licenses for residential and commercial work',
                'If working in multiple states, you may need a license in each state',
                'Many states have reciprocity agreements — your license in one state may expedite licensing in another',
                'Home improvement licenses may be separate from contractor licenses in some states',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-archie-orange shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-archie-navy rounded-xl p-6 my-8 border border-archie-blue/30">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-400 shrink-0 mt-1" />
                <div>
                  <p className="text-yellow-400 font-bold mb-2">Warning: Unlicensed Work</p>
                  <p className="text-gray-300 leading-relaxed">
                    Operating without required licensing puts your business at serious risk. In addition to fines, homeowners may be able to void contracts, sue for damages, or file complaints that result in cease-and-desist orders. Insurance claims can also be denied if the installing contractor was not properly licensed. The short-term savings of avoiding licensing are never worth the long-term risk.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Insurance */}
      <section id="insurance" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">3. Insurance Needs</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Insurance is the single most important investment you will make in your roofing business. Roofing is classified as one of the highest-risk construction trades, which means insurance costs are higher but also more critical. A single uninsured accident can bankrupt your company, and operating without proper coverage can result in losing your license, facing lawsuits, and even criminal prosecution in some states.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">General Liability Insurance</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              General liability (GL) insurance protects your business if you damage a client's property, if a third party is injured because of your work, or if you face a lawsuit related to your services. For roofing contractors, a minimum policy of $1,000,000 per occurrence and $2,000,000 aggregate is standard. Many commercial clients and general contractors require $2,000,000 per occurrence. Annual premiums typically range from $3,000 to $8,000 for a small to mid-size residential roofing company, depending on your claims history, revenue, and location.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Workers' Compensation Insurance</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Workers' compensation is required in 49 states (Texas is the only exception where it is optional, though strongly recommended). For roofing, workers' comp rates are among the highest of any trade, typically $15-$30 per $100 of payroll. This means that for a crew member earning $50,000/year, your workers' comp premium would be $7,500-$15,000 for that one employee alone. Rates vary by state, your experience modification rate (EMR), and your safety record. Maintaining a strong safety program and clean claims history can significantly reduce your EMR and premiums over time.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Additional Coverage Types</h3>
            <div className="space-y-4 mb-6">
              {[
                { title: 'Commercial Auto Insurance', desc: 'Covers your work vehicles. Personal auto policies do not cover commercial use. Costs $1,500-$3,000 per vehicle annually.' },
                { title: 'Inland Marine Insurance', desc: 'Covers tools and equipment in transit or stored at job sites. A policy covering $25,000-$50,000 in tools typically costs $500-$1,500/year.' },
                { title: 'Umbrella/Excess Liability', desc: 'Provides additional coverage above your GL and auto limits. A $1M umbrella policy typically costs $1,000-$3,000/year and is invaluable for catastrophic claims.' },
                { title: 'Professional Liability (E&O)', desc: 'Covers errors in your work, design recommendations, or professional advice. Increasingly required for commercial roofing projects.' },
                { title: 'Builder\'s Risk Insurance', desc: 'Covers materials and work in progress on job sites. Important for new construction and large commercial projects.' },
                { title: 'Cyber Liability Insurance', desc: 'Protects customer data stored in your CRM and business systems. Becoming increasingly important as businesses digitize operations.' },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-bold text-archie-dark mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-6 mt-8">
              <h4 className="font-bold text-archie-dark mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-archie-orange" />
                How Archie Helps With Insurance Management
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Archie's platform helps you track insurance policies, expiration dates, and coverage limits. Get automated reminders before renewals, store digital copies of all certificates, and quickly generate certificates of insurance (COIs) when requested by clients or general contractors.
              </p>
              <CTAButton href="https://app.archie.now" size="sm" className="mt-4">
                Try Archie Free <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Building Your Crew */}
      <section id="building-crew" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">4. Building Your Crew</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              The labor shortage in roofing is real and ongoing. The Bureau of Labor Statistics reports that the construction industry needs to attract an estimated 546,000 new workers annually to meet demand. For roofing specifically, the average age of a roofer is increasing, and fewer young workers are entering the trade. Building and retaining a skilled crew is perhaps the biggest competitive advantage you can develop.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Where to Find Workers</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Successful recruiting strategies include referrals from existing crew members (offer $500-$1,000 bonuses for successful hires), job postings on Indeed, Craigslist, and Facebook groups for construction workers, partnerships with local trade schools and vocational programs, apprenticeship programs that train workers from scratch, reaching out to roofing supply houses where experienced roofers shop, attending local job fairs and community events, and recruiting from related trades (siding, framing, general laborers) who want to learn roofing. The most effective approach is building a reputation as a great employer — word spreads quickly in the trades.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Compensation and Retention</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Roofing labor is typically paid per hour or per square (100 sq ft). In 2025, experienced roofers earn $20-$35/hour ($40,000-$72,000/year) depending on the market. Crew leaders and foremen earn $28-$45/hour ($58,000-$94,000/year). To retain quality workers, consider offering above-market pay for top performers, performance bonuses (speed and quality metrics), health insurance or health insurance stipends (a major differentiator in roofing), retirement benefits (even a simple IRA match), paid time off during slow seasons, consistent year-round work, tool allowances, and a strong safety culture that shows you value their well-being.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Employee vs. Subcontractor: The Critical Distinction</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Misclassifying workers as independent contractors (1099) when they should be employees (W-2) is one of the most common and costly mistakes in roofing. The IRS, state labor departments, and workers' compensation boards have been cracking down on misclassification with increasing penalties. Generally, if you control when, where, and how someone works, provide their tools and materials, and they work exclusively or primarily for you, they are an employee. Penalties for misclassification include back taxes, penalties of 1.5% of wages paid plus interest, back workers' comp premiums with penalties, state labor department fines, and potential lawsuits from the workers themselves for unpaid benefits.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Building a Strong Safety Culture</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Roofing is consistently among the most dangerous occupations in the United States, with falls being the leading cause of death in the construction industry. OSHA requires fall protection for any work at heights above 6 feet. Implement a comprehensive safety program that includes daily toolbox talks, mandatory personal fall arrest systems (harnesses, lanyards, anchors), proper ladder use training, heat illness prevention protocols, regular equipment inspections, and a documented safety manual with written policies. Beyond being the right thing to do, a strong safety record directly reduces your workers' compensation premiums through your experience modification rate (EMR).
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Marketing */}
      <section id="marketing" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">5. Marketing Strategies</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Marketing is the lifeblood of a roofing company. The most skilled roofing crew in the world will go out of business without consistent lead flow. The most successful roofing companies invest 5-10% of their revenue in marketing and treat it as a non-negotiable business expense, not a discretionary cost. A diversified marketing strategy ensures you are not dependent on any single lead source.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Google Business Profile (Essential)</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your Google Business Profile (formerly Google My Business) is arguably the single most important marketing asset for a local roofing company. When homeowners search "roofer near me" or "roof repair [city name]," Google shows the local map pack — and your GBP listing determines whether you appear there. Optimize your profile by completing every field (business description, services, service areas, hours), posting weekly updates with project photos, responding to every review within 24 hours, adding photos regularly (aim for 100+ photos), using the Q&A section to answer common questions, and keeping your category set to "Roofing Contractor" as the primary category. Companies with 100+ reviews and 4.5+ star ratings dominate the local map pack and generate the majority of organic local leads.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Search Engine Optimization (SEO)</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Your website needs to rank for searches like "roofing company [city]," "roof replacement [city]," "storm damage repair [city]," and related terms. Focus on creating location-specific service pages for each city you serve, building quality backlinks from local directories, news sites, and industry publications, ensuring your site loads fast (under 3 seconds) and is mobile-friendly, publishing helpful blog content regularly (aim for 2-4 posts monthly), and maintaining consistent NAP (Name, Address, Phone number) across all online listings. SEO is a long-term strategy that typically takes 3-6 months to show results but provides the highest ROI of any marketing channel over time.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Paid Advertising (Google Ads & Facebook)</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Google Ads captures high-intent searches — people actively looking for a roofer right now. Cost-per-click for roofing keywords ranges from $15-$75 depending on your market. A well-optimized campaign should achieve a cost-per-lead of $50-$150. Google Local Services Ads (LSA) are particularly effective for roofers, featuring a "Google Guaranteed" badge and pay-per-lead pricing. Facebook and Instagram ads work differently — they interrupt people's scrolling with your message. They are excellent for building brand awareness, promoting seasonal specials, and retargeting website visitors. Facebook ads typically cost $30-$100 per lead for roofing and work best for storm damage outreach and neighborhood-targeted campaigns.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Door Knocking and Canvassing</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Despite being "old school," door knocking remains one of the most effective lead generation methods in roofing, especially after storms. A skilled door knocker can generate 3-8 appointments per day. Keys to successful canvassing include targeting recently storm-affected neighborhoods, leading with free inspections rather than sales pitches, using visual aids showing damage examples, leaving professional door hangers when no one is home, following up systematically, and always being professional, respectful, and never pushy. Many of the largest roofing companies in the country were built primarily on door knocking during storm seasons.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Referral Programs</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Referrals convert at 60-70% (compared to 10-20% for cold leads) and cost a fraction of other marketing channels. Create a structured referral program: offer $200-$500 for every referral that results in a signed contract, make it easy for customers to refer (provide referral cards, send follow-up emails with shareable links), and thank customers publicly (with permission) when they refer business. Also build referral partnerships with real estate agents, property managers, insurance agents, home inspectors, and other contractors (siding, windows, gutters) who serve the same homeowner demographic.
            </p>

            <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-6 mt-8">
              <h4 className="font-bold text-archie-dark mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-archie-orange" />
                How Archie Supercharges Your Marketing
              </h4>
              <p className="text-gray-600 leading-relaxed">
                Archie's Prospector tool uses AI to identify homes in your area that are likely due for a new roof based on age, satellite imagery, and property data. Combined with the built-in CRM that automates follow-ups, Archie helps you generate and convert more leads with less effort.
              </p>
              <CTAButton href="https://app.archie.now" size="sm" className="mt-4">
                Explore Archie Prospector <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Pricing */}
      <section id="pricing" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">6. Pricing Your Work</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Accurate pricing is the difference between a profitable roofing business and one that struggles. The two most common pricing mistakes are underpricing (not accounting for all costs, which eats into profits) and overpricing (losing bids and market share). The key is understanding your true costs and applying consistent markup formulas.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Understanding Your Costs</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Every roofing job has three categories of costs. <strong>Direct costs</strong> include materials (shingles, underlayment, flashing, nails, vents, drip edge, ice and water shield), labor (crew wages, workers' comp on those wages), equipment rental, and dumpster/disposal fees. <strong>Overhead costs</strong> include insurance premiums, office expenses, vehicle costs, marketing, software subscriptions, administrative salaries, and all other costs of running the business that are not tied to a specific job. <strong>Profit</strong> is what remains after all costs — your return on investment for the risk, capital, and effort you put into the business.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">The Pricing Formula</h3>
            <div className="bg-archie-navy rounded-xl p-6 mb-6">
              <p className="text-gray-300 font-mono text-center text-lg mb-4">
                Bid Price = (Materials + Labor + Equipment) / (1 - Overhead% - Profit%)
              </p>
              <p className="text-gray-400 text-sm">
                Example: If your direct costs are $8,000, overhead is 20%, and desired profit is 15%, your bid would be: $8,000 / (1 - 0.20 - 0.15) = $8,000 / 0.65 = <strong className="text-archie-orange">$12,308</strong>
              </p>
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Average Pricing by Job Type (2025)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-gray-300">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-3 pr-4">Job Type</th>
                    <th className="py-3 pr-4">Average Cost</th>
                    <th className="py-3">Per Square</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {[
                    ['3-Tab Shingle Reroof', '$6,000 - $10,000', '$300 - $450'],
                    ['Architectural Shingle Reroof', '$8,000 - $15,000', '$350 - $550'],
                    ['Metal Roof (Standing Seam)', '$15,000 - $35,000', '$700 - $1,200'],
                    ['Flat Roof (TPO/EPDM)', '$8,000 - $16,000', '$400 - $700'],
                    ['Tile Roof (Clay/Concrete)', '$20,000 - $50,000', '$800 - $1,800'],
                    ['Slate Roof', '$25,000 - $75,000', '$1,000 - $3,000'],
                    ['Roof Repair (avg)', '$300 - $1,500', 'N/A'],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-800">
                      <td className="py-3 pr-4 font-medium">{row[0]}</td>
                      <td className="py-3 pr-4 text-archie-orange">{row[1]}</td>
                      <td className="py-3">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-gray-400 text-sm mt-4 mb-8">
              * Prices vary significantly by region, roof complexity, accessibility, and local material costs. These are national averages for standard residential projects.
            </p>

            <div className="bg-archie-navy rounded-xl p-6 border border-archie-blue/30">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-archie-orange" />
                Archie's AI-Powered Estimating
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Archie generates instant, accurate roof measurements using satellite imagery and AI. Combined with local material pricing and your custom labor rates, you can produce professional estimates in minutes instead of hours — right from your phone on the first visit.
              </p>
              <CTAButton href="https://app.archie.now" size="sm" className="mt-4">
                Try Instant Estimates <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Cash Flow */}
      <section id="cash-flow" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">7. Managing Cash Flow</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Cash flow is the number one reason roofing companies fail. You can be profitable on paper and still go bankrupt if you cannot manage the timing of money in and money out. Roofing has inherent cash flow challenges: you often need to purchase materials and pay crews before receiving final payment from customers or insurance companies. Understanding and proactively managing cash flow is essential to survival and growth.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Payment Structure Best Practices</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              For retail (non-insurance) work, collect a deposit upon contract signing — typically 30-50% of the total job cost. This covers your material purchases and initial labor. Collect the balance upon completion. Some companies use a three-payment structure: 33% deposit, 33% at material delivery, and 34% upon completion. For insurance restoration work, the payment structure is different: the homeowner typically pays their deductible, the insurance company pays the actual cash value (ACV) upfront, and the recoverable depreciation is paid upon completion and documentation. Insurance payments can take 30-90 days, making cash management even more critical.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Key Cash Flow Strategies</h3>
            <div className="space-y-4 mb-6">
              {[
                'Maintain a cash reserve of at least 3 months of fixed overhead costs',
                'Invoice immediately upon job completion — every day you delay billing costs you money',
                'Negotiate net-30 or net-60 terms with material suppliers to delay outgoing payments',
                'Use credit cards with cashback or rewards for material purchases, but pay them off monthly',
                'Track accounts receivable weekly and follow up on past-due invoices within 3 days',
                'Avoid taking on too many jobs at once — overextending strains cash flow and quality',
                'Build a line of credit with your bank BEFORE you need it — it is much harder to get when you are already cash-strapped',
                'Consider financing options like equipment loans instead of large cash outlays',
                'Separate your personal and business finances completely — use a dedicated business checking account',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Understanding Your Break-Even Point</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Every roofing company has a monthly break-even point — the amount of revenue needed to cover all fixed costs before any profit is generated. Calculate this by totaling all monthly overhead expenses (insurance, rent, salaries, vehicle payments, marketing, software, etc.) and dividing by your gross profit margin. For example, if monthly overhead is $25,000 and your average gross profit margin is 40%, your break-even revenue is $25,000 / 0.40 = $62,500/month. Knowing this number helps you plan staffing, marketing spend, and pricing decisions throughout the year.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Scaling */}
      <section id="scaling" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">8. Scaling Operations</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Scaling a roofing company is fundamentally different from running a small operation. The skills that made you a successful one-crew operator — technical expertise, personal customer relationships, hands-on project management — can actually hold you back when trying to grow. Scaling requires a shift from doing the work to building systems and teams that do the work.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">The Growth Phases</h3>
            <div className="space-y-6 mb-8">
              {[
                {
                  phase: 'Phase 1: Owner-Operator ($0 - $500K)',
                  desc: 'You are the salesperson, project manager, and often on the roof yourself. Focus on building a reputation, collecting reviews, and perfecting your craft. Hire helpers and develop at least one person who can lead a crew.'
                },
                {
                  phase: 'Phase 2: Small Company ($500K - $1.5M)',
                  desc: 'You step off the roof and focus on sales, estimating, and management. You have 1-2 crews with crew leaders. This is the hardest transition — you need to trust others with quality and customer relationships. Hire a part-time office manager.'
                },
                {
                  phase: 'Phase 3: Mid-Size ($1.5M - $5M)',
                  desc: 'Add dedicated sales team, production manager, and full-time office staff. Systems become critical — CRM, production scheduling, financial reporting. Multiple crews require standardized processes for quality control.'
                },
                {
                  phase: 'Phase 4: Large Company ($5M+)',
                  desc: 'Executive leadership team, department managers, HR processes, scalable marketing. The owner focuses on strategy, culture, and key relationships. Consider opening additional markets or service areas.'
                },
              ].map((p, i) => (
                <div key={i} className="bg-archie-navy rounded-xl p-6 border border-archie-blue/20">
                  <h4 className="font-bold text-archie-orange mb-2">{p.phase}</h4>
                  <p className="text-gray-300">{p.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Systems That Enable Scale</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              You cannot scale what you cannot systematize. The critical systems to build include: a CRM that tracks every lead from first contact through completion and beyond, standardized estimating processes so any salesperson produces consistent bids, documented installation procedures and quality checklists, a production board that shows every active job's status at a glance, financial dashboards showing real-time revenue, expenses, and profit by job, automated customer communication (appointment reminders, completion notifications, review requests), and recruiting systems that continuously attract qualified workers. Building these systems takes time and investment but is essential for growth beyond $1M in revenue.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 9: Technology */}
      <section id="technology" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">9. Technology Tools</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              The roofing industry has historically been slow to adopt technology, but that is changing rapidly. Companies that leverage modern tools consistently outperform those that rely on paper-based processes, manual spreadsheets, and phone calls. Technology is no longer optional — it is a competitive necessity. Here are the key technology categories every roofing company should invest in.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Customer Relationship Management (CRM)</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              A CRM is the central nervous system of your business. It tracks every lead, customer interaction, estimate, contract, and job from start to finish. Without a CRM, leads fall through the cracks, follow-ups are missed, and you have no visibility into your sales pipeline. Look for a CRM built specifically for roofing that includes mobile access for field sales, integration with estimating tools, automated text and email follow-ups, production scheduling and job tracking, photo documentation, and reporting on conversion rates and revenue.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Aerial Measurement and Estimating</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Gone are the days when you needed to climb every roof to measure it. Satellite and drone-based measurement tools provide accurate roof dimensions, pitch calculations, and waste factors within minutes. This technology saves hours per estimate and improves accuracy. AI-powered measurement tools can identify roof features like valleys, hips, ridges, vents, and skylights automatically, producing detailed reports that feed directly into your estimating software.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Weather and Storm Tracking</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              For storm restoration contractors, real-time weather data and hail tracking are essential. Tools that map hail swaths, track severe weather events, and identify affected neighborhoods give you a significant first-mover advantage. Being able to canvass affected areas within 24-48 hours of a storm event dramatically increases your lead conversion rates.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Financial and Accounting Software</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              At minimum, use QuickBooks or similar accounting software to track income, expenses, and tax obligations. As you grow, consider construction-specific accounting software that handles job costing, work-in-progress reporting, and progress billing. Accurate financial tracking is the foundation of good business decisions — you cannot improve what you do not measure.
            </p>

            <div className="bg-gradient-hero rounded-2xl p-8 mt-10">
              <h3 className="text-2xl font-bold text-white mb-4">Archie: The All-in-One Platform for Roofers</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Instead of juggling 5-10 different tools, Archie combines CRM, AI-powered roof measurements, estimating, storm tracking, voice assistant, sales coaching, production management, and financial tools in one platform built exclusively for roofing contractors.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {[
                  'AI Roof Measurements in seconds',
                  'Built-in CRM with automation',
                  'Real-time storm tracking & hail maps',
                  'Voice-powered job updates',
                  'AI Sales Coach for your team',
                  'Instant professional estimates',
                  'Production scheduling boards',
                  'Financial dashboards & reporting',
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300">
                    <CheckCircle className="w-4 h-4 text-archie-orange shrink-0" />
                    <span className="text-sm">{f}</span>
                  </div>
                ))}
              </div>
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 10: Common Mistakes */}
      <section id="mistakes" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">10. Common Mistakes to Avoid</h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              Learning from others' mistakes is far cheaper than making them yourself. Here are the most common and costly mistakes that roofing business owners make, along with how to avoid them.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'Underbidding to Win Jobs',
                  desc: 'New contractors often price too low to beat competitors. This leads to thin or negative margins, cutting corners on quality, and a race to the bottom that is unsustainable. Know your numbers, price for profit, and compete on value — not price.'
                },
                {
                  title: 'Skipping the Business Side',
                  desc: 'Many roofers are excellent tradespeople but neglect the business fundamentals: bookkeeping, marketing, customer service, and systems. The best roofer who cannot manage a business will struggle, while a decent roofer with strong business skills will thrive.'
                },
                {
                  title: 'Growing Too Fast Without Systems',
                  desc: 'Adding crews, trucks, and salespeople without proper management systems leads to chaos, quality issues, cash flow crises, and reputational damage. Scale deliberately — ensure each growth phase is stable before moving to the next.'
                },
                {
                  title: 'Not Tracking Finances Properly',
                  desc: 'If you do not track costs per job, you have no idea which jobs are profitable and which are losing money. Many roofers discover too late that their most popular service was actually losing them money when all costs were properly allocated.'
                },
                {
                  title: 'Ignoring Online Reputation',
                  desc: 'In 2025, your online reputation IS your reputation. Not asking for reviews, not responding to negative reviews, and having a poor web presence costs you leads you will never know about. Make review generation a systematic part of every completed job.'
                },
                {
                  title: 'Misclassifying Employees',
                  desc: 'Using 1099 subcontractors when workers should be W-2 employees saves money in the short term but carries enormous risk. IRS audits, state labor department investigations, and workers comp audits can result in penalties that exceed the original tax savings many times over.'
                },
                {
                  title: 'Neglecting Safety',
                  desc: 'Every shortcut on safety is a potential life-altering event for a worker and a business-ending liability for you. OSHA penalties can reach $156,259 per willful violation. Invest in safety training, equipment, and culture from day one.'
                },
                {
                  title: 'Not Having Written Contracts',
                  desc: 'Verbal agreements are lawsuits waiting to happen. Every job should have a detailed written contract specifying scope, materials, timeline, payment terms, warranty, and change order procedures. A good contract protects both you and your customer.'
                },
              ].map((m, i) => (
                <div key={i} className="bg-archie-navy rounded-xl p-6 border border-archie-blue/20">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-archie-orange shrink-0 mt-1" />
                    <div>
                      <h4 className="font-bold text-white mb-2">{m.title}</h4>
                      <p className="text-gray-300 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="bg-archie-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Answers to the most common questions about running a roofing business."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Take Your Roofing Business to the Next Level?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Archie gives you the AI-powered tools to manage leads, create instant estimates, track storms, coach your sales team, and run your entire operation from one platform.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton href="/pricing" variant="secondary" size="lg">
                View Pricing
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

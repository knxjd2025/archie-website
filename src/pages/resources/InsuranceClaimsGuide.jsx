import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  FileText, ChevronDown, CheckCircle, AlertTriangle, Shield,
  ClipboardCheck, Camera, DollarSign, Users, MessageSquare,
  ArrowRight, Clock, Award, Search, Scale, Phone, Zap,
  BookOpen, Target, BarChart3, FileCheck
} from 'lucide-react';
import CTAButton from '../../components/CTAButton';
import SectionHeading from '../../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tocSections = [
  { id: 'how-claims-work', title: '1. How Insurance Claims Work', icon: Shield },
  { id: 'claim-process', title: '2. Step-by-Step Claim Process', icon: ClipboardCheck },
  { id: 'working-adjusters', title: '3. Working With Adjusters', icon: Users },
  { id: 'supplements', title: '4. Supplements & Xactimate', icon: FileText },
  { id: 'common-mistakes', title: '5. Common Claim Mistakes', icon: AlertTriangle },
  { id: 'documentation', title: '6. Documentation Requirements', icon: Camera },
  { id: 'archie-automation', title: '7. How Archie Automates Claims', icon: Zap },
  { id: 'faq', title: 'Frequently Asked Questions', icon: MessageSquare },
];

const faqs = [
  {
    q: 'How long does a roofing insurance claim take from start to finish?',
    a: 'A typical roofing insurance claim takes 30-90 days from initial filing to final payment. The timeline breaks down roughly as follows: filing the claim and getting an adjuster assigned (3-7 days), adjuster inspection (7-21 days after filing), initial estimate and payment (7-14 days after inspection), supplement review and approval (14-45 days), and recoverable depreciation payment after completion (14-30 days after submitting completion documentation). Complex claims involving multiple supplements, disputes, or public adjusters can take 6-12 months. The contractor who stays organized and follows up consistently will get claims resolved faster.'
  },
  {
    q: 'What is the difference between ACV and RCV?',
    a: 'ACV (Actual Cash Value) is the depreciated value of your roof at the time of the loss — essentially what your old roof was worth accounting for age and wear. RCV (Replacement Cost Value) is the full cost to replace the damaged roof with new, equivalent materials. Most homeowners have RCV policies, meaning the insurance company pays the ACV upfront and holds back "recoverable depreciation." Once the work is completed and documented, the homeowner can claim the depreciation amount to receive the full RCV payment. Some older or less expensive policies are ACV-only, meaning the homeowner only receives the depreciated value and must pay the difference out of pocket.'
  },
  {
    q: 'What is recoverable depreciation?',
    a: 'Recoverable depreciation is the difference between the Replacement Cost Value (RCV) and the Actual Cash Value (ACV) of a claim. The insurance company holds this amount back from the initial payment and releases it after the work is completed and the contractor submits completion documentation (final invoice, photos, lien waiver). For example, if an RCV estimate is $12,000 and ACV is $8,500, the recoverable depreciation is $3,500. The homeowner receives $8,500 minus their deductible initially, and the $3,500 is released after the roof is installed. Some policies have non-recoverable depreciation, meaning that portion is never paid — always check the policy.'
  },
  {
    q: 'Can I charge more than the insurance estimate?',
    a: 'You can and should charge the fair cost for the work, but the proper way to handle this is through the supplement process. If the insurance estimate does not cover all necessary work items, you submit a supplement with documentation showing why additional items are needed. Insurance companies are obligated to pay for all covered damages at fair market prices. Charging the homeowner out-of-pocket for amounts that should be covered by insurance — without first attempting a supplement — does a disservice to the homeowner. Conversely, billing for work not performed or inflating claims is insurance fraud and carries criminal penalties.'
  },
  {
    q: 'What is a supplement and when should I file one?',
    a: 'A supplement is a request for additional payment on an insurance claim for items that were missed, underpriced, or not included in the original adjuster estimate. You should file a supplement when the adjuster missed legitimate damage, when code upgrades are required but not included, when hidden damage is discovered during tear-off (rotten decking, damaged structural members), when the estimate does not include required items like drip edge, ice and water shield, or proper ventilation, or when material or labor costs in Xactimate do not reflect actual local costs. Supplements are a normal and expected part of the claims process — most claims require at least one supplement.'
  },
  {
    q: 'What should I do if the adjuster and I disagree on the scope of damage?',
    a: 'First, document your position thoroughly with photos, videos, measurements, and manufacturer specifications. Request a re-inspection with a different adjuster or a supervisor. If disagreement persists, the homeowner can invoke their appraisal clause (found in most policies), which involves each side hiring an appraiser and selecting a neutral umpire to resolve the dispute. The homeowner can also hire a public adjuster to represent their interests. Filing a complaint with the state Department of Insurance is an option if the carrier is acting in bad faith. Throughout any dispute, maintain professionalism, communicate in writing, and keep detailed records of all interactions.'
  },
  {
    q: 'How do I handle overhead and profit (O&P) on insurance claims?',
    a: 'Overhead and Profit (O&P) is a standard line item in Xactimate, typically 10% overhead and 10% profit (20% total) added to the claim amount. Insurance companies are generally required to pay O&P when a general contractor is managing the project and coordinating multiple trades. Many carriers initially deny O&P, claiming it is only owed when three or more trades are involved. However, most state regulations and court precedents support O&P payment when the contractor is providing project management, quality control, warranty, and liability coverage. Document your role in managing the project, and supplement for O&P if it is not included in the initial estimate. This can add $1,500-$3,000+ to a typical residential claim.'
  },
  {
    q: 'What is Xactimate and why is it important for insurance claims?',
    a: 'Xactimate is the industry-standard estimating software used by 90%+ of insurance carriers to price property damage claims. Adjusters write their estimates in Xactimate, and supplements need to be submitted in Xactimate format to be reviewed and approved efficiently. The software uses localized pricing databases updated monthly, standardized line items for every construction task, and waste factors calculated by roof complexity. Learning to write accurate Xactimate estimates is one of the most valuable skills a roofing contractor can develop for insurance restoration work. Key skills include proper line item selection, understanding waste factors, knowing when to use additional line items for code upgrades, and including all required items that adjusters commonly miss.'
  },
  {
    q: 'Can homeowners choose their own contractor, or does the insurance company decide?',
    a: 'Homeowners have the absolute right to choose their own contractor in every state. Insurance companies cannot require homeowners to use a specific contractor or their "preferred vendor" network. While some carriers have preferred contractor programs, participation is always optional for the homeowner. Some carriers offer incentives like waived deductibles or extended warranties for using preferred contractors, but the homeowner is never obligated. As a contractor, educate homeowners about their right to choose and the potential conflicts of interest when insurance companies recommend contractors (preferred vendors may be incentivized to keep claim costs low).'
  },
  {
    q: 'What is assignment of benefits (AOB) and should I use it?',
    a: 'An Assignment of Benefits (AOB) is a legal document where the homeowner transfers their insurance claim rights to the contractor. This allows the contractor to deal directly with the insurance company, file supplements, and receive payment directly. AOB has been controversial and several states (notably Florida) have restricted or banned its use due to abuse. In states where AOB is legal, it can streamline the claims process but also increases your legal and financial exposure. Many contractors prefer to work with a direction-to-pay authorization instead, which directs the insurance company to pay the contractor without fully transferring claim rights. Consult with a local attorney before using AOBs.'
  },
  {
    q: 'How do I deal with a denied insurance claim?',
    a: 'Claim denials are common but often overturnable. First, review the denial letter carefully to understand the stated reason. Common denial reasons include: pre-existing damage, cosmetic damage exclusions, maintenance-related issues, policy exclusions, or the adjuster not finding sufficient damage. Next steps include: requesting a re-inspection with a senior adjuster, providing additional documentation (closer photos, independent engineering reports), having the homeowner file a complaint with the state insurance department, engaging a public adjuster to advocate on the homeowner\'s behalf, and as a last resort, the homeowner can consult an insurance attorney. About 30-40% of initially denied claims are ultimately approved through persistence and proper documentation.'
  },
  {
    q: 'What documentation do I need for an insurance claim?',
    a: 'Comprehensive documentation should include: overview photos of the entire roof from multiple angles, close-up photos of every area of damage with a reference object for scale (chalk circle, coin, or ruler), photos of interior damage (stains, leaks, damaged insulation), measurements of the roof and damaged areas, a detailed written inspection report, weather data confirming a storm event in the area, the homeowner\'s policy number and claim number, the adjuster\'s contact information and their estimate once provided, and your own Xactimate estimate with all line items. Documentation quality directly correlates with claim approval rates and supplement success.'
  },
  {
    q: 'How do I identify hail damage on a roof?',
    a: 'Hail damage on asphalt shingles appears as random, circular marks where granules have been displaced, exposing the dark mat underneath. The impacts are typically randomly spaced (not in a pattern), roughly similar in size, and spread across the roof face that was exposed to the storm direction. Check soft metals like gutters, flashing, and vents for dents — these confirm hail was large enough to cause damage. On wood shakes, look for splits along the grain with sharp edges (aged splits have weathered edges). On metal roofs, look for dents without cracked paint. Always document functional damage (affects performance) versus cosmetic damage (looks bad but does not affect function), as many policies exclude cosmetic-only damage.'
  },
  {
    q: 'What role does the homeowner play during the insurance claim?',
    a: 'The homeowner is the policyholder and all claim decisions ultimately require their involvement and consent. Their key responsibilities include: filing the initial claim with their insurance company, being present during the adjuster\'s inspection, reviewing and approving estimates and supplements, signing the contract with the chosen contractor, paying their deductible, endorsing insurance checks (which are typically made out to the homeowner and sometimes their mortgage company), and providing completion documentation to the insurance company to release recoverable depreciation. Educate homeowners about the process upfront so they understand their role and timeline expectations.'
  },
  {
    q: 'What happens if I find additional damage during tear-off?',
    a: 'Hidden damage discovered during tear-off is one of the most common reasons for supplements. When you uncover rotten or damaged decking, deteriorated underlayment, structural damage, or other issues not visible during the initial inspection, immediately stop work in that area, document the damage thoroughly with photos and video, call the homeowner and the insurance adjuster to report the finding, request a re-inspection or submit the documentation for a supplement, and get written approval before proceeding with the additional work. Most adjusters accept well-documented hidden damage supplements without issue, but do not proceed without approval or you risk not being paid for the additional work.'
  },
  {
    q: 'How do mortgage companies affect the insurance claim payment process?',
    a: 'When there is a mortgage on the property, insurance checks are typically made payable to both the homeowner and the mortgage company. The mortgage company has a financial interest in ensuring the property is properly repaired. Many mortgage companies require the check to be endorsed and sent to them, and they release funds in stages: an initial disbursement (usually 33-50% of the claim) after reviewing the contractor\'s contract and proof of insurance, additional disbursements as work progresses, and a final payment after an inspection confirms completion. This process can add 2-4 weeks to the payment timeline. Inform homeowners about this process upfront so they are not surprised when they cannot simply cash the insurance check.'
  },
  {
    q: 'Is it legal to waive or pay the homeowner\'s deductible?',
    a: 'No. Waiving or paying the homeowner\'s insurance deductible is illegal in most states and constitutes insurance fraud. It artificially inflates the claim amount because the estimate assumes the homeowner is paying their deductible. Penalties can include criminal charges, fines, loss of contractor license, and blacklisting by insurance companies. Some states have specific anti-rebating laws that prohibit any form of deductible waiver or incentive. If a homeowner cannot afford their deductible, you can offer a payment plan, but you cannot waive or absorb the deductible amount. Contractors who advertise "we pay your deductible" are engaging in fraud and should be avoided.'
  },
  {
    q: 'How do I handle emergency repairs before the insurance adjuster visits?',
    a: 'Homeowners are required by their insurance policy to mitigate further damage, which may include emergency tarping, boarding up windows, or temporary repairs. Document the damage thoroughly with photos and video BEFORE making any temporary repairs. Keep all receipts for materials used in emergency repairs. Bill emergency repairs as a separate line item. Inform the adjuster about the emergency repairs during their inspection. Insurance policies cover reasonable temporary repair costs, and these should be included in the claim. Do not make permanent repairs before the adjuster inspection, as this can complicate the claims process and result in denied coverage.'
  },
  {
    q: 'What are the most common items adjusters miss on roofing claims?',
    a: 'Adjusters frequently miss or exclude: starter strip and ridge cap shingles, drip edge replacement, proper waste factors (should be 10-15% for most roofs, higher for complex roofs), ice and water shield in valleys and at eaves, pipe jack flashing and boot replacements, step flashing at walls, chimney flashing and counter-flashing, damaged or missing attic ventilation, code upgrades required by local building codes, damaged gutters and downspouts, interior damage from leaks, detach-and-reset charges for satellite dishes, HVAC units, and solar panels, and overhead and profit. A thorough contractor identifies these missed items and submits supplements with proper documentation.'
  },
  {
    q: 'How do I build relationships with insurance adjusters?',
    a: 'Building professional relationships with adjusters can significantly improve your claims experience. Be present at every adjuster inspection. Be knowledgeable and professional — adjusters respect contractors who understand the claims process and Xactimate. Never be adversarial; approach differences as collaborative problem-solving. Provide thorough documentation that makes the adjuster\'s job easier. Follow up promptly and organize your supplements clearly. Respect their time and schedules. Remember that adjusters handle dozens of claims simultaneously — making their job easier makes you a preferred contractor. Over time, adjusters will learn to trust your assessments, which speeds up approvals and supplement processing.'
  },
  {
    q: 'What is the appraisal process and when should a homeowner invoke it?',
    a: 'The appraisal clause is found in most insurance policies and provides a dispute resolution mechanism when the homeowner and insurance company disagree on the value of a covered loss. Each side selects an appraiser, and the two appraisers select a neutral umpire. The appraisers independently assess the damage and try to agree. If they cannot, the umpire makes a binding decision. Appraisal is typically invoked when there is a significant gap (usually $2,000+) between the contractor\'s estimate and the insurance estimate that cannot be resolved through the supplement process. The cost is typically $500-$2,000 for the homeowner\'s appraiser. Appraisal addresses only the amount of loss — not whether damage is covered (which is a coverage dispute handled differently).'
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div className="border border-gray-200 rounded-xl overflow-hidden" initial={false}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors">
        <span className="font-semibold text-archie-dark pr-4">{q}</span>
        <ChevronDown className={`w-5 h-5 text-archie-orange shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="px-5 pb-5 text-gray-600 leading-relaxed">
          {a}
        </motion.div>
      )}
    </motion.div>
  );
}

export default function InsuranceClaimsGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Roofer's Complete Guide to Insurance Claims",
    "description": "Master the roofing insurance claims process. Learn how to work with adjusters, file supplements, use Xactimate, document damage, and maximize claim approvals.",
    "author": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "publisher": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "datePublished": "2025-01-20",
    "dateModified": "2025-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://archie.now/resources/insurance-claims-guide" },
  };

  return (
    <>
      <Helmet>
        <title>The Roofer's Complete Guide to Insurance Claims | Archie</title>
        <meta name="description" content="Master roofing insurance claims. Step-by-step guide to working with adjusters, filing supplements, Xactimate best practices, and maximizing claim approvals for roofing contractors." />
        <meta name="keywords" content="roofing insurance claims, Xactimate roofing, insurance supplements, working with adjusters, storm damage claims, roofing claim process, roof insurance" />
        <link rel="canonical" href="https://archie.now/resources/insurance-claims-guide" />
        <meta property="og:title" content="The Roofer's Complete Guide to Insurance Claims" />
        <meta property="og:description" content="Everything roofing contractors need to know about insurance claims, supplements, Xactimate, and working with adjusters." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Insurance Claims Resource
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              The Roofer's Complete Guide to <span className="text-gradient">Insurance Claims</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Master the insurance claims process from initial inspection through final payment. Learn to work with adjusters, write supplements, and maximize approvals.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 30 min read</span>
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

      {/* Section 1: How Claims Work */}
      <section id="how-claims-work" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">1. How Insurance Claims Work for Roofing</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Insurance restoration is one of the most profitable segments of the roofing industry, accounting for an estimated <strong>$12-15 billion annually</strong> in the United States. Understanding how insurance claims work is essential for any roofing contractor operating in storm-prone markets. This section provides a comprehensive overview of the insurance claims ecosystem and how roofing contractors fit into it.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">The Insurance Claims Ecosystem</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              A roofing insurance claim involves several parties, each with their own interests and roles. The <strong>homeowner (policyholder)</strong> owns the property, pays premiums, and has the right to file claims and choose their contractor. The <strong>insurance carrier</strong> underwrites the policy and is obligated to pay for covered losses at fair market value. The <strong>insurance adjuster</strong> (either a staff adjuster employed by the carrier or an independent adjuster contracted by the carrier) inspects the damage and writes the initial estimate. The <strong>roofing contractor</strong> inspects the damage, provides their own estimate, performs the work, and may file supplements for items not included in the adjuster's estimate. In some cases, a <strong>public adjuster</strong> (hired by the homeowner) may be involved to advocate for the homeowner's interests.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Types of Roofing Insurance Policies</h3>
            <div className="space-y-4 mb-6">
              {[
                {
                  title: 'Replacement Cost Value (RCV) Policies',
                  desc: 'The most common type for homeowners. Pays the full cost to replace the damaged roof with new, equivalent materials. Initial payment is the ACV (depreciated value), and recoverable depreciation is paid after work is completed. This is the most favorable policy type for both homeowners and contractors.'
                },
                {
                  title: 'Actual Cash Value (ACV) Policies',
                  desc: 'Pays only the depreciated value of the roof at the time of loss. For example, a 15-year-old roof with a 30-year warranty might receive only 50% of the replacement cost. The homeowner must pay the difference out of pocket. More common with older homes, rental properties, and budget insurance policies.'
                },
                {
                  title: 'Cosmetic Damage Exclusions',
                  desc: 'Increasingly common, these policy endorsements exclude coverage for damage that is cosmetic in nature (i.e., does not affect the functional performance of the roof). Hail dents that do not crack shingles may be denied under these exclusions. Always review the policy language before inspecting.'
                },
                {
                  title: 'Percentage Deductibles',
                  desc: 'Many policies in storm-prone states have wind/hail deductibles expressed as a percentage of the dwelling coverage rather than a flat dollar amount. A 2% deductible on a $300,000 home means a $6,000 deductible. This significantly affects the homeowner\'s out-of-pocket cost and whether filing a claim makes financial sense.'
                },
              ].map((p, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-5">
                  <h4 className="font-bold text-archie-dark mb-2">{p.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Understanding the Financial Flow</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Understanding how money flows through an insurance claim is critical for managing cash flow. Here is a typical example for a $15,000 RCV claim with a $1,000 deductible and a depreciation holdback of $3,000:
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                <div className="flex justify-between"><span className="text-gray-600">Total RCV (Replacement Cost)</span><span className="font-bold text-archie-dark">$15,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Less: Depreciation</span><span className="font-bold text-red-500">-$3,000</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-gray-600">Actual Cash Value (ACV)</span><span className="font-bold text-archie-dark">$12,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Less: Deductible</span><span className="font-bold text-red-500">-$1,000</span></div>
                <div className="flex justify-between border-t pt-2"><span className="text-gray-600">Initial Insurance Payment</span><span className="font-bold text-archie-orange">$11,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Homeowner Pays (Deductible)</span><span className="font-bold text-archie-dark">$1,000</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Recoverable Depreciation (after completion)</span><span className="font-bold text-archie-orange">$3,000</span></div>
                <div className="flex justify-between border-t-2 border-archie-orange pt-2"><span className="text-gray-700 font-bold">Total Contractor Payment</span><span className="font-bold text-archie-orange text-lg">$15,000</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Step-by-Step */}
      <section id="claim-process" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">2. Step-by-Step Claim Process</h2>

            <p className="text-gray-300 leading-relaxed mb-8">
              A successful insurance claim follows a predictable process. Mastering each step increases your approval rates, speeds up payment, and builds trust with homeowners. Here is the complete process from first contact to final payment.
            </p>

            <div className="space-y-6">
              {[
                {
                  step: 'Step 1: Initial Inspection',
                  content: 'Conduct a thorough inspection of the roof and property. Check all roof planes, ridges, hips, and valleys. Inspect gutters, downspouts, siding, window screens, and AC units for collateral damage. Document everything with photos — take 50-100+ photos per inspection. Note the age and condition of the existing roof, number of layers, and any pre-existing issues. Use a chalk circle to mark hail hits for photography. Provide the homeowner with a detailed inspection report explaining your findings.'
                },
                {
                  step: 'Step 2: Homeowner Files the Claim',
                  content: 'The homeowner (not the contractor) should file the claim with their insurance company. Coach them on what to say: "I had a contractor inspect my roof after the recent storm and they found damage consistent with hail/wind. I would like to file a claim." The homeowner should note their claim number, the adjuster\'s name and contact information, and the scheduled inspection date. Some contractors file claims on behalf of homeowners, but this can create complications — it is best practice for the homeowner to file.'
                },
                {
                  step: 'Step 3: Adjuster Inspection',
                  content: 'Always attend the adjuster\'s inspection. Meet the adjuster professionally, introduce yourself, and offer to walk the roof together. Point out damage you documented during your inspection. Be knowledgeable but not aggressive — the goal is collaborative. Share your photos and notes. If the adjuster uses a ladder, get on the roof with them. If they use a drone or satellite imagery, discuss your physical inspection findings. Take your own photos during the adjuster\'s visit to document what they inspected.'
                },
                {
                  step: 'Step 4: Review the Adjuster\'s Estimate',
                  content: 'Once the insurance company issues their estimate, review it line by line against your own assessment. Compare: Does it include all damaged roof planes? Are starter strip and ridge cap included? Is the waste factor appropriate? Are all flashings, drip edge, and boots included? Is ice and water shield included where code requires it? Are there detach-and-reset charges for items that must be temporarily removed? Is overhead and profit included? Note every discrepancy for your supplement.'
                },
                {
                  step: 'Step 5: Sign the Contract',
                  content: 'Present the homeowner with a detailed contract that specifies the scope of work, materials to be used, timeline, payment terms, and warranty. The contract amount should be based on the insurance estimate plus any approved supplements. Include a clause allowing for supplements as additional damage is discovered. Never start work without a signed contract and proof of insurance payment.'
                },
                {
                  step: 'Step 6: File Supplements',
                  content: 'Submit supplements for all items missing from the adjuster\'s estimate. Write supplements in Xactimate format with clear line items, pricing, and justification. Include supporting photos and documentation for each supplemented item. Follow up regularly — supplements that are not actively pursued often sit unprocessed for weeks.'
                },
                {
                  step: 'Step 7: Perform the Work',
                  content: 'Execute the work according to the approved scope, using the specified materials. Document the installation process with photos showing underlayment installation, flashing details, starter strip, and completed work. Note any hidden damage discovered during tear-off and follow the supplement process for additional items. Maintain a clean and safe job site.'
                },
                {
                  step: 'Step 8: Completion & Final Payment',
                  content: 'Upon completion, provide the homeowner with: completion photos, a final invoice matching the approved claim amount, a material warranty from the manufacturer, your workmanship warranty, and a lien waiver. The homeowner submits these documents to their insurance company to release the recoverable depreciation. Collect the homeowner\'s deductible if not already paid. Follow up on depreciation payment if not received within 30 days.'
                },
              ].map((s, i) => (
                <div key={i} className="bg-archie-navy rounded-xl p-6 border border-archie-blue/20">
                  <h3 className="text-xl font-bold text-archie-orange mb-3">{s.step}</h3>
                  <p className="text-gray-300 leading-relaxed">{s.content}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Working With Adjusters */}
      <section id="working-adjusters" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">3. Working With Adjusters</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Your relationship with insurance adjusters can make or break your insurance restoration business. Adjusters are professionals doing a difficult job — they typically handle 100-200 open claims simultaneously during storm season. The contractors who make adjusters' jobs easier and maintain professional relationships consistently get better results.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Types of Adjusters</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Staff Adjusters', desc: 'Full-time employees of the insurance company. They handle claims year-round and tend to be thorough and consistent. Building long-term relationships with staff adjusters in your market is valuable.' },
                { title: 'Independent Adjusters', desc: 'Contract adjusters hired by carriers during high-volume periods (storm season). They may be less familiar with local building codes and pricing. Quality varies significantly — some are excellent, others are rushed.' },
                { title: 'Public Adjusters', desc: 'Hired by homeowners to represent their interests. They typically charge 10-15% of the claim amount. They can be allies when dealing with difficult carriers but also complicate the process and reduce the homeowner\'s net payment.' },
              ].map((a, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-archie-dark mb-2">{a.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{a.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Best Practices for Adjuster Interactions</h3>
            <div className="space-y-3 mb-6">
              {[
                'Always be on time for scheduled inspections — adjusters have tight schedules and will move on if you are late',
                'Dress professionally and have business cards, a branded shirt, and a professional inspection report ready',
                'Be knowledgeable about the specific damage types, building codes, and manufacturer specifications',
                'Never be confrontational — disagreements should be handled calmly and backed with documentation',
                'Provide your own measurement report and damage documentation to supplement the adjuster\'s inspection',
                'Follow up with a written summary of what was discussed and agreed upon during the inspection',
                'If the adjuster misses damage, point it out respectfully with specific evidence',
                'Learn the adjuster\'s preferred communication method (email, phone, text) and use it consistently',
                'Build rapport — remember names, be courteous, and treat every interaction as a long-term relationship',
                'Never disparage an adjuster to the homeowner — this damages your professional reputation',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-archie-dark rounded-xl p-6 mt-8">
              <p className="text-archie-orange font-bold text-lg mb-2">Pro Tip</p>
              <p className="text-gray-300 leading-relaxed">
                Keep a spreadsheet of every adjuster you meet: their name, carrier, phone number, email, and notes about your interactions. Over time, this database becomes incredibly valuable. Adjusters who trust your work will approve claims faster, accept your supplements more readily, and even refer homeowners to you.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Supplements & Xactimate */}
      <section id="supplements" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">4. Supplements & Xactimate</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              The supplement process is where roofing contractors leave the most money on the table. Studies show that <strong>70-80% of initial adjuster estimates are missing legitimate line items</strong>, and the average supplement adds $1,500-$4,000 to a residential claim. Mastering supplements and Xactimate is arguably the highest-ROI skill a roofing contractor can develop for insurance restoration work.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">What is Xactimate?</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Xactimate is a software platform developed by Verisk that serves as the standard estimating tool for the property insurance industry. Over 90% of insurance carriers use Xactimate to write their estimates. The software contains a comprehensive database of construction line items with localized pricing that is updated monthly based on actual material costs, labor rates, and equipment costs in each geographic area.
            </p>
            <p className="text-gray-300 leading-relaxed mb-6">
              For roofing contractors doing insurance work, Xactimate proficiency means you can read and understand adjuster estimates, identify missing line items, write supplements in the same format adjusters use, and communicate in the same language as the insurance industry. Xactimate licenses cost approximately $200-$350/month, and the investment typically pays for itself on the first supplement you file.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Most Commonly Missed Line Items</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-8">
              {[
                'Starter strip shingles',
                'Ridge cap (high-profile)',
                'Drip edge (eave and rake)',
                'Ice and water shield (valleys, eaves)',
                'Step flashing at walls',
                'Counter-flashing at chimneys',
                'Pipe jack / boot replacement',
                'Attic ventilation (ridge vent, box vents)',
                'Proper waste factor (10-15%+)',
                'Overhead & Profit (O&P)',
                'Code upgrades (ventilation, ice shield)',
                'Detach & reset (satellite dishes, solar)',
                'Damaged decking replacement',
                'Felt / synthetic underlayment upgrade',
                'Gutter apron / flashing',
                'Valley metal replacement',
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 bg-archie-navy/50 rounded-lg p-3">
                  <FileCheck className="w-4 h-4 text-archie-orange shrink-0" />
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Writing Effective Supplements</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              A well-written supplement includes a clear cover letter explaining what is being supplemented and why, Xactimate-formatted line items with proper pricing, supporting documentation (photos, code references, manufacturer specifications), measurements and calculations supporting your quantities, and reference to any applicable building codes that require the supplemented items. Keep supplements professional, factual, and well-organized. Avoid emotional language or accusations. Present the facts and let the documentation speak for itself.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">The Overhead & Profit Battle</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Overhead and Profit (O&P) is one of the most contested items in roofing insurance claims. The standard Xactimate O&P is 10% overhead + 10% profit = 20% added to the total estimate. Insurance companies frequently deny O&P, claiming it is only owed when a general contractor coordinates three or more trades. However, numerous court decisions and state regulations support O&P payment when the contractor is performing general contracting duties including project management, quality control, scheduling, permits, and warranty coverage. On a $12,000 claim, O&P adds $2,400 — this is money you have already earned through your overhead costs and deserve as profit for managing the project.
            </p>

            <div className="bg-archie-navy rounded-xl p-6 border border-archie-blue/30 mt-8">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <Target className="w-5 h-5 text-archie-orange" />
                Archie's Supplement Tools
              </h4>
              <p className="text-gray-300 leading-relaxed">
                Archie's AI analyzes adjuster estimates and automatically identifies missing line items, generating supplement recommendations with proper Xactimate formatting. This feature alone can add thousands of dollars to each claim while saving hours of manual review.
              </p>
              <CTAButton href="https://app.archie.now" size="sm" className="mt-4">
                See Archie's AI in Action <ArrowRight className="w-4 h-4" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Common Mistakes */}
      <section id="common-mistakes" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">5. Common Claim Mistakes</h2>

            <p className="text-gray-600 leading-relaxed mb-8">
              Insurance claims mistakes cost roofing contractors thousands of dollars per claim and can damage relationships with homeowners and adjusters. Here are the most common errors and how to avoid them.
            </p>

            <div className="space-y-6">
              {[
                {
                  title: 'Not Attending the Adjuster Inspection',
                  desc: 'This is the single biggest mistake contractors make. When you are not present, the adjuster may miss damage, use incorrect measurements, or underestimate the scope. Being present allows you to point out damage, answer questions, and establish a professional relationship. Your absence almost guarantees a lower estimate and more supplements.',
                  fix: 'Block your calendar for every adjuster inspection. Treat it as the most important meeting of the day.'
                },
                {
                  title: 'Poor Documentation',
                  desc: 'Blurry photos, missing measurements, and incomplete inspection reports undermine your credibility and make supplements harder to approve. Adjusters and reviewers need clear evidence to justify approving additional funds.',
                  fix: 'Take 50-100+ high-resolution photos per inspection. Use a systematic approach: overview shots, mid-range shots, and close-ups of each damaged area with a reference object for scale.'
                },
                {
                  title: 'Not Filing Supplements',
                  desc: 'Many contractors accept the adjuster\'s estimate without reviewing it for missing items. This leaves an average of $1,500-$4,000 on the table per claim. Some contractors are intimidated by the supplement process or don\'t know how to use Xactimate.',
                  fix: 'Review every adjuster estimate line by line. File supplements for every legitimate missing item with proper documentation.'
                },
                {
                  title: 'Starting Work Before Claim Approval',
                  desc: 'Beginning work before the insurance company has approved the claim and issued payment puts you at financial risk. If the claim is denied or the homeowner changes their mind, you may not be paid for work already completed.',
                  fix: 'Wait for the initial insurance payment before scheduling the job. Collect the homeowner\'s deductible before or on the day of installation.'
                },
                {
                  title: 'Waiving the Deductible',
                  desc: 'Waiving or absorbing the homeowner\'s deductible is insurance fraud in most states. It artificially inflates the claim and exposes you to criminal penalties, license revocation, and carrier blacklisting.',
                  fix: 'Always collect the full deductible. If a homeowner cannot afford it, offer a payment plan but never waive it.'
                },
                {
                  title: 'Not Understanding the Policy',
                  desc: 'Every insurance policy is different. Assuming all policies work the same way leads to incorrect expectations and missteps. ACV vs. RCV, cosmetic exclusions, percentage deductibles, and policy limits all affect the claim.',
                  fix: 'Ask to review the relevant sections of the homeowner\'s policy before making commitments about what insurance will cover.'
                },
                {
                  title: 'Poor Follow-Up',
                  desc: 'Insurance claims require persistent follow-up. Supplements that are not tracked and followed up on can sit in review queues for months. Claims that stall often result in frustrated homeowners who cancel or choose another contractor.',
                  fix: 'Track every claim in your CRM with follow-up dates. Contact adjusters at least weekly on pending supplements.'
                },
              ].map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
                    <h4 className="font-bold text-archie-dark text-lg">{m.title}</h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-3">{m.desc}</p>
                  <div className="flex items-start gap-2 bg-green-50 rounded-lg p-3">
                    <CheckCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                    <p className="text-green-800 text-sm"><strong>Fix:</strong> {m.fix}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: Documentation */}
      <section id="documentation" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">6. Documentation Requirements</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Documentation is the backbone of every successful insurance claim. The quality and completeness of your documentation directly impacts claim approvals, supplement success rates, and the speed of payment. Think of documentation as building a legal case — you need clear, compelling evidence to support every dollar you are requesting.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Photo Documentation Standards</h3>
            <div className="space-y-4 mb-8">
              {[
                {
                  type: 'Overview Photos',
                  desc: 'Take photos of each roof plane from ground level and from the roof. Include all four sides of the property, the full roof from multiple angles, and the surrounding area showing potential sources of damage (trees, power lines).'
                },
                {
                  type: 'Damage Close-ups',
                  desc: 'Photograph each area of damage from 1-3 feet away. Include a reference object (chalk circle, coin, ruler) for scale. Ensure the image is sharp, well-lit, and clearly shows the damage. Mark hail hits with chalk circles before photographing.'
                },
                {
                  type: 'Collateral Damage',
                  desc: 'Photograph damage to gutters, downspouts, siding, window screens, fence posts, AC units, and any other property elements damaged by the same event. Collateral damage supports the claim by confirming storm severity.'
                },
                {
                  type: 'Test Squares',
                  desc: 'For hail claims, mark a 10x10 foot "test square" on the most impacted roof plane and count and photograph every hail hit within that area. This provides a standardized damage density measurement that adjusters use to determine if damage meets the threshold for replacement.'
                },
                {
                  type: 'Interior Damage',
                  desc: 'Photograph any interior evidence of roof failure: water stains, active leaks, damaged insulation, wet drywall, or mold growth. Interior damage strengthens the claim by demonstrating functional impact.'
                },
              ].map((p, i) => (
                <div key={i} className="bg-archie-navy rounded-lg p-5 border border-archie-blue/20">
                  <h4 className="font-bold text-archie-orange mb-2">{p.type}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Written Documentation</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Beyond photos, create a detailed written inspection report for every claim. This report should include the date and time of your inspection, weather conditions during your inspection, the estimated age and existing condition of the roof, roof type, material, and approximate square footage, detailed findings for each roof plane, descriptions of damage types and severity, your professional assessment of whether damage is storm-related versus maintenance-related, recommendations for repair versus replacement, and any safety concerns identified during the inspection. Use a standardized template so that every inspection is thorough and consistent. This report becomes part of the claim file and demonstrates your professionalism and expertise.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Weather Documentation</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Always include weather data confirming that a covered weather event occurred in the area. Sources include NOAA storm reports, local news coverage, hail maps from services like HailTrace or HailWatch, National Weather Service storm surveys, and SPC (Storm Prediction Center) storm reports. This data supports the claim by establishing that the damage was caused by a specific, dateable storm event — which is a coverage requirement.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Archie Automation */}
      <section id="archie-automation" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">7. How Archie Automates Insurance Claims</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Archie was built by roofers, for roofers — and insurance claims automation is at the heart of the platform. Here is how Archie transforms the claims process from a manual, time-consuming headache into a streamlined, profitable system.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: Camera,
                  title: 'AI Photo Documentation',
                  desc: 'Archie\'s AI automatically organizes inspection photos, identifies damage types, and generates detailed inspection reports. Simply take photos during your inspection and Archie does the rest — categorizing, labeling, and compiling everything into a professional report.'
                },
                {
                  icon: BarChart3,
                  title: 'Automated Supplement Detection',
                  desc: 'Upload an adjuster\'s estimate and Archie\'s AI instantly identifies missing line items, incorrect quantities, and underpaid items. It generates supplement requests in Xactimate-compatible format, saving hours of manual review per claim.'
                },
                {
                  icon: FileText,
                  title: 'Claim Tracking Dashboard',
                  desc: 'Track every claim from initial inspection through final payment on a visual dashboard. See claim status at a glance, get alerts for stalled claims, and never let a supplement fall through the cracks again.'
                },
                {
                  icon: DollarSign,
                  title: 'Revenue Forecasting',
                  desc: 'Archie tracks approved amounts, pending supplements, and expected depreciation payments to give you accurate revenue forecasts. Know exactly how much money is coming and when, so you can manage cash flow with confidence.'
                },
                {
                  icon: Search,
                  title: 'Storm Tracking Integration',
                  desc: 'Real-time hail and storm data integrated directly into your CRM. See which of your customers\' properties were in the storm path, and proactively reach out within hours of an event.'
                },
                {
                  icon: MessageSquare,
                  title: 'Automated Communication',
                  desc: 'Keep homeowners informed throughout the claims process with automated status updates via text and email. Reduce inbound calls asking "what\'s the status?" and improve customer satisfaction scores.'
                },
              ].map((f, i) => (
                <motion.div key={i} className="bg-gray-50 rounded-xl p-6" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <f.icon className="w-8 h-8 text-archie-orange mb-4" />
                  <h4 className="font-bold text-archie-dark mb-2">{f.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-hero rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Stop Leaving Money on the Table</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Archie's AI-powered supplement tool identifies missing line items and generates Xactimate-compatible documentation to help you capture every dollar you are owed. Start free today — free forever.
              </p>
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-archie-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Expert answers to the most common insurance claims questions for roofing contractors."
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
              Master Insurance Claims With Archie
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              From AI-powered damage documentation to automated supplement detection, Archie gives you the tools to process more claims, faster, and more profitably.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton href="/resources/storm-damage-guide" variant="secondary" size="lg">
                Storm Damage Guide
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

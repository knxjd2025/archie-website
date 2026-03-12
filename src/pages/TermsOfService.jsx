import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  ArrowLeft,
  ChevronRight,
  Shield,
  Scale,
  FileText,
  UserCheck,
  CreditCard,
  Mail,
  Brain,
  Lock,
  Database,
  AlertTriangle,
  Globe,
  Users,
  RefreshCw,
  Gavel,
  XCircle,
  Settings,
  ExternalLink,
} from 'lucide-react';

const sections = [
  { id: 'acceptance', title: 'Acceptance of Terms', icon: FileText },
  { id: 'description', title: 'Description of Service', icon: Zap },
  { id: 'registration', title: 'Account Registration & Eligibility', icon: UserCheck },
  { id: 'plans', title: 'Free and Paid Plans', icon: CreditCard },
  { id: 'use-of-information', title: 'Use of Information', icon: Mail },
  { id: 'ai-usage', title: 'AI Usage & Training', icon: Brain },
  { id: 'data-privacy', title: 'Data Privacy & Security', icon: Lock },
  { id: 'user-content', title: 'User Content & Data Ownership', icon: Database },
  { id: 'acceptable-use', title: 'Acceptable Use', icon: AlertTriangle },
  { id: 'third-party', title: 'Third-Party Integrations', icon: Globe },
  { id: 'liability', title: 'Limitation of Liability', icon: Shield },
  { id: 'indemnification', title: 'Indemnification', icon: Scale },
  { id: 'termination', title: 'Termination', icon: XCircle },
  { id: 'modifications', title: 'Modifications to Terms', icon: RefreshCw },
  { id: 'governing-law', title: 'Governing Law', icon: Gavel },
  { id: 'contact', title: 'Contact Information', icon: Settings },
];

function SidebarTOC({ activeSection }) {
  return (
    <nav className="hidden lg:block sticky top-24 w-64 shrink-0">
      <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5">
        <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">
          Table of Contents
        </h3>
        <ul className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-archie-orange/10 text-archie-orange font-medium'
                      : 'text-white/40 hover:text-white/70 hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{section.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

function Section({ id, title, icon: Icon, children }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5 }}
      className="scroll-mt-24 mb-12"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="w-9 h-9 rounded-xl bg-archie-orange/10 flex items-center justify-center">
          <Icon className="w-4.5 h-4.5 text-archie-orange" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
      </div>
      <div className="text-white/60 leading-relaxed space-y-4 text-[15px]">
        {children}
      </div>
    </motion.section>
  );
}

export default function TermsOfService() {
  const [activeSection, setActiveSection] = useState('acceptance');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0.1 }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Helmet>
        <title>Terms of Service | Archie</title>
        <meta
          name="description"
          content="Terms of Service for Archie, the AI-powered roofing business management platform by Kynex Pro. Read our terms governing use of archie.now and app.archie.now."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://archie.now/terms-of-service" />
        <meta property="og:title" content="Terms of Service | Archie" />
        <meta
          property="og:description"
          content="Terms of Service for Archie, the AI-powered roofing business management platform by Kynex Pro."
        />
        <meta property="og:url" content="https://archie.now/terms-of-service" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-archie-dark">
        {/* Header */}
        <div className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-archie-orange transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Scale className="w-8 h-8 text-archie-orange" />
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
                Legal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Terms of Service
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Please read these Terms of Service carefully before using Archie. By
              accessing or using our platform, you agree to be bound by these terms.
            </p>
            <p className="text-white/30 text-sm mt-4">
              Last updated: March 11, 2026
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex gap-12">
            <SidebarTOC activeSection={activeSection} />

            <div className="flex-1 min-w-0 max-w-3xl">
              {/* 1. Acceptance */}
              <Section id="acceptance" title="Acceptance of Terms" icon={FileText}>
                <p>
                  By accessing, browsing, or using the Archie platform available at{' '}
                  <strong className="text-white/80">archie.now</strong> and{' '}
                  <strong className="text-white/80">app.archie.now</strong> (collectively,
                  the "Service"), operated by Kynex Pro ("Company," "we," "us," or "our"),
                  you ("User," "you," or "your") acknowledge that you have read,
                  understood, and agree to be bound by these Terms of Service ("Terms"),
                  along with our{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-archie-orange hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  , which is incorporated herein by reference.
                </p>
                <p>
                  If you do not agree to these Terms, you must not access or use the
                  Service. Your continued use of the Service following the posting of any
                  changes to these Terms constitutes acceptance of those changes. These
                  Terms apply to all visitors, users, and others who access or use the
                  Service, including but not limited to roofing contractors, business
                  owners, employees, subcontractors, and any other authorized personnel.
                </p>
                <p>
                  If you are entering into these Terms on behalf of a company or other
                  legal entity, you represent that you have the authority to bind such
                  entity to these Terms. If you do not have such authority, or if you do
                  not agree with these Terms, you must not accept these Terms and may not
                  use the Service.
                </p>
              </Section>

              {/* 2. Description of Service */}
              <Section id="description" title="Description of Service" icon={Zap}>
                <p>
                  Archie is an AI-powered roofing business management platform designed to
                  streamline and enhance the operations of roofing contractors and
                  companies. The Service provides a comprehensive suite of tools
                  including, but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong className="text-white/80">Customer Relationship Management (CRM)</strong>{' '}
                    &mdash; Lead tracking, job management, invoicing, estimates, calendars,
                    document management, insurance claims processing, e-signatures,
                    automated workflows, inventory management, mapping, reporting, photo
                    management, team communication, SMS, email, supplements, and change
                    orders.
                  </li>
                  <li>
                    <strong className="text-white/80">AI Roof Inspections</strong> &mdash;
                    Automated roof damage detection and professional inspection report
                    generation using the Archie AI System analysis of uploaded roof
                    photographs.
                  </li>
                  <li>
                    <strong className="text-white/80">Aria Voice Assistant</strong> &mdash;
                    AI-powered voice command system enabling hands-free CRM operation,
                    lead creation, job scheduling, estimate generation, and more.
                  </li>
                  <li>
                    <strong className="text-white/80">AI Estimates</strong> &mdash;
                    Intelligent estimate generation with automated material calculations,
                    labor costing, waste factors, and tax computation.
                  </li>
                  <li>
                    <strong className="text-white/80">Storm Intelligence (MyCanvass)</strong>{' '}
                    &mdash; Real-time NOAA weather data integration for hail, wind,
                    tornado, and severe weather event tracking and canvassing territory
                    management.
                  </li>
                  <li>
                    <strong className="text-white/80">AI Sales Coach</strong> &mdash;
                    AI-driven sales training with structured tracks, simulated practice
                    calls, script libraries, certifications, and performance analytics.
                  </li>
                  <li>
                    <strong className="text-white/80">Production Hub</strong> &mdash; Crew
                    management, GPS time tracking, job dispatching, subcontractor
                    coordination, and quality control inspections.
                  </li>
                  <li>
                    <strong className="text-white/80">Finance Command</strong> &mdash; Cash
                    flow tracking, collections management, job profitability analysis,
                    commission calculations, and financial reporting.
                  </li>
                  <li>
                    <strong className="text-white/80">Referral Network & Prospector</strong>{' '}
                    &mdash; Referral partner management and permit-based lead prospecting
                    tools.
                  </li>
                </ul>
                <p>
                  The Service is provided on an "as is" and "as available" basis. We
                  reserve the right to modify, suspend, or discontinue any part of the
                  Service at any time, with or without notice.
                </p>
              </Section>

              {/* 3. Account Registration */}
              <Section id="registration" title="Account Registration & Eligibility" icon={UserCheck}>
                <p>
                  To access certain features of the Service, you must register for an
                  account. When registering, you agree to the following:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong className="text-white/80">Age Requirement:</strong> You must be
                    at least 18 years of age to create an account and use the Service. By
                    registering, you represent and warrant that you are at least 18 years
                    old.
                  </li>
                  <li>
                    <strong className="text-white/80">Accurate Information:</strong> You
                    agree to provide accurate, current, and complete information during the
                    registration process and to update such information as necessary to
                    keep it accurate, current, and complete.
                  </li>
                  <li>
                    <strong className="text-white/80">Account Security:</strong> You are
                    solely responsible for maintaining the confidentiality of your account
                    credentials, including your password. You agree to notify us
                    immediately of any unauthorized use of your account or any other breach
                    of security.
                  </li>
                  <li>
                    <strong className="text-white/80">Account Responsibility:</strong> You
                    are responsible for all activities that occur under your account,
                    whether or not authorized by you. Archie and Kynex Pro shall not be
                    liable for any loss or damage arising from your failure to comply with
                    these obligations.
                  </li>
                  <li>
                    <strong className="text-white/80">One Account Per User:</strong> Each
                    individual user should maintain only one account. Creating multiple
                    accounts to circumvent restrictions or abuse the Service is prohibited.
                  </li>
                </ul>
              </Section>

              {/* 4. Plans & Pricing */}
              <Section id="plans" title="Free and Paid Plans" icon={CreditCard}>
                <p>
                  Archie offers multiple subscription tiers to accommodate roofing
                  businesses of all sizes. Current plan offerings include:
                </p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="font-semibold text-white/80">Free Tier</span>
                    <span className="text-archie-orange font-bold">$0/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="font-semibold text-white/80">Solo Plan</span>
                    <span className="text-archie-orange font-bold">$99/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-white/[0.06]">
                    <span className="font-semibold text-white/80">Team Plan</span>
                    <span className="text-archie-orange font-bold">$299/mo</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="font-semibold text-white/80">Enterprise</span>
                    <span className="text-archie-orange font-bold">Custom</span>
                  </div>
                </div>
                <p>
                  <strong className="text-white/80">Annual Billing Discount:</strong>{' '}
                  Users who elect annual billing receive a 25% discount on the applicable
                  monthly rate. Annual subscriptions are billed as a single upfront payment
                  for the 12-month term.
                </p>
                <p>
                  <strong className="text-white/80">Add-Ons:</strong> Additional features,
                  modules, and capacity expansions may be available as paid add-ons to any
                  subscription tier. Pricing and availability of add-ons are subject to
                  change.
                </p>
                <p>
                  <strong className="text-white/80">Billing & Renewal:</strong>{' '}
                  Subscriptions automatically renew at the end of each billing cycle unless
                  cancelled prior to the renewal date. You authorize us to charge your
                  designated payment method for all recurring fees. All fees are
                  non-refundable except as expressly stated in these Terms or required by
                  applicable law.
                </p>
                <p>
                  <strong className="text-white/80">Price Changes:</strong> We reserve the
                  right to modify pricing at any time. Changes to subscription fees will
                  take effect at the start of the next billing cycle following notice to
                  you.
                </p>
              </Section>

              {/* 5. Use of Information - CRITICAL */}
              <Section id="use-of-information" title="Use of Information" icon={Mail}>
                <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-5 mb-4">
                  <p className="text-archie-orange font-semibold text-sm mb-2">
                    Important &mdash; Please Read Carefully
                  </p>
                  <p className="text-white/70 text-sm">
                    This section describes how we use the information you provide. By using
                    the Service, you expressly consent to the data practices described
                    below.
                  </p>
                </div>
                <p>
                  All information you provide to Archie, including but not limited to your
                  name, email address, phone number, company information, business data,
                  and usage data, may be used for both <strong className="text-white/80">
                  transactional</strong> and <strong className="text-white/80">marketing</strong>{' '}
                  purposes as described below:
                </p>
                <p>
                  <strong className="text-white/80">Transactional Use:</strong> Your
                  information will be used for service delivery, account management,
                  billing and payment processing, customer support, system notifications,
                  security alerts, and other communications necessary for the operation and
                  maintenance of your account and the Service.
                </p>
                <p>
                  <strong className="text-white/80">Marketing Use:</strong> Your
                  information may also be used for marketing purposes, including but not
                  limited to promotional emails about Archie features and updates, product
                  announcements, feature releases, industry news and best practices,
                  partner offers, event invitations, and other commercial communications
                  from Archie and Kynex Pro.
                </p>
                <p>
                  <strong className="text-white/80">Protection of Your Clients:</strong>{' '}
                  We will <strong className="text-white">NEVER</strong> send marketing
                  communications, promotional materials, or any form of direct marketing
                  directly to your clients, customers, or contacts stored within the Archie
                  platform. Your customer data within our CRM is used exclusively for your
                  business operations through the Service and will not be targeted by our
                  marketing efforts.
                </p>
                <p>
                  <strong className="text-white/80">Affiliate Marketing:</strong> Your
                  information may be used to present you with relevant affiliate offers
                  from roofing industry partners, including but not limited to material
                  suppliers, equipment manufacturers, insurance providers, financing
                  partners, and other service providers relevant to the roofing industry.
                  Affiliate marketing communications will be clearly identified as such.
                </p>
                <p>
                  <strong className="text-white/80">Training Purposes:</strong> Your
                  information, including usage patterns, feedback, and support interactions,
                  may be used for internal training purposes to improve our services,
                  train our customer support and success teams, and enhance the overall
                  quality of the Archie platform.
                </p>
                <p>
                  <strong className="text-white/80">Opt-Out Rights:</strong> You may opt
                  out of marketing communications at any time by using the unsubscribe link
                  in any marketing email, adjusting your notification preferences in your
                  account settings, or contacting us at{' '}
                  <a
                    href="mailto:support@kynexpro.com"
                    className="text-archie-orange hover:underline"
                  >
                    support@kynexpro.com
                  </a>
                  . Please note that transactional communications required for the
                  operation of your account and the Service cannot be opted out of while
                  your account remains active.
                </p>
                <p>
                  <strong className="text-white/80">No External Sharing:</strong> No
                  private or personally identifiable information will ever be sold, rented,
                  or shared with any third parties outside of Kynex Pro and Archie. We are
                  committed to keeping your information within our corporate family.
                </p>
              </Section>

              {/* 6. AI Usage & Training - CRITICAL */}
              <Section id="ai-usage" title="AI Usage & Training" icon={Brain}>
                <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-5 mb-4">
                  <p className="text-archie-orange font-semibold text-sm mb-2">
                    Important &mdash; AI Data Practices
                  </p>
                  <p className="text-white/70 text-sm">
                    This section describes how data from AI-powered features is used for
                    continued model training and improvement.
                  </p>
                </div>
                <p>
                  Archie incorporates artificial intelligence and machine learning
                  technologies across multiple features of the Service. By using any
                  AI-powered feature, you acknowledge and agree to the following:
                </p>
                <p>
                  <strong className="text-white/80">AI Training Data:</strong> All data
                  processed through AI features, including but not limited to AI Roof
                  Inspections, the Aria Voice Assistant, AI Estimates, the AI Sales Coach,
                  and the Blueprint Analyzer, may be used for continued AI model training,
                  improvement, and development. This includes photographs, voice
                  recordings, text inputs, calculation parameters, and interaction
                  patterns.
                </p>
                <p>
                  <strong className="text-white/80">AI Output Disclaimer:</strong>{' '}
                  AI-generated outputs, including but not limited to inspection reports,
                  damage assessments, cost estimates, sales recommendations, and weather
                  analyses, are provided as decision-support tools only. These outputs
                  should be verified by qualified roofing professionals before being relied
                  upon for business decisions, customer communications, or insurance claims.
                  Archie does not guarantee the accuracy, completeness, or suitability of
                  any AI-generated output.
                </p>
                <p>
                  <strong className="text-white/80">Anonymized & Aggregated Data:</strong>{' '}
                  We retain the right to use anonymized and aggregated AI interaction data
                  to improve our algorithms, develop new features, conduct research, and
                  publish industry insights. Anonymized data cannot be traced back to any
                  individual user or business.
                </p>
                <p>
                  <strong className="text-white/80">Privacy in AI Training:</strong> No
                  private or personally identifiable information will be shared with any
                  third parties outside of Archie and Kynex Pro for the purpose of AI
                  training. Where third-party AI infrastructure is used for service
                  delivery, only the minimum data necessary for processing is transmitted,
                  and such transmissions are governed by strict data processing agreements.
                </p>
                <p>
                  <strong className="text-white/80">Continuous Improvement:</strong> AI
                  usage data, including interaction logs, feedback signals, correction
                  patterns, and output quality metrics, will be available for and used in
                  continued AI training purposes to improve the accuracy, reliability, and
                  usefulness of all AI-powered features within the Service.
                </p>
              </Section>

              {/* 7. Data Privacy & Security */}
              <Section id="data-privacy" title="Data Privacy & Security" icon={Lock}>
                <p>
                  Archie and Kynex Pro are committed to protecting your data with
                  industry-leading security practices:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong className="text-white/80">Encryption:</strong> All data in
                    transit and at rest is protected with 256-bit SSL/TLS encryption.
                  </li>
                  <li>
                    <strong className="text-white/80">SOC 2 Compliance:</strong> Our
                    infrastructure and processes follow SOC 2 compliant practices for
                    security, availability, and confidentiality.
                  </li>
                  <li>
                    <strong className="text-white/80">No External Sharing:</strong> No
                    private or personally identifiable information will ever be shared
                    outside of Kynex Pro and Archie. Your data stays within our corporate
                    family.
                  </li>
                  <li>
                    <strong className="text-white/80">Regular Audits:</strong> We conduct
                    regular security audits, vulnerability assessments, and penetration
                    testing to maintain the integrity of our systems.
                  </li>
                  <li>
                    <strong className="text-white/80">Access Controls:</strong> Strict
                    role-based access controls, multi-factor authentication, and audit
                    logging are enforced across all systems.
                  </li>
                </ul>
                <p>
                  For complete details on our data practices, please review our{' '}
                  <Link
                    to="/privacy-policy"
                    className="text-archie-orange hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </p>
              </Section>

              {/* 8. User Content & Data Ownership */}
              <Section id="user-content" title="User Content & Data Ownership" icon={Database}>
                <p>
                  <strong className="text-white/80">Your Ownership:</strong> You retain
                  full ownership of all business data, customer records, documents,
                  photographs, and other content you upload, create, or store within the
                  Service ("User Content"). Archie does not claim ownership of your User
                  Content.
                </p>
                <p>
                  <strong className="text-white/80">License Grant:</strong> By uploading or
                  submitting User Content to the Service, you grant Archie and Kynex Pro
                  a non-exclusive, worldwide, royalty-free license to use, process, store,
                  reproduce, and display your User Content solely for the purposes of (a)
                  providing and operating the Service, (b) improving the Service and
                  developing new features, (c) AI model training and improvement as
                  described in the AI Usage & Training section, and (d) generating
                  anonymized and aggregated analytics and insights.
                </p>
                <p>
                  <strong className="text-white/80">Responsibility:</strong> You are solely
                  responsible for your User Content and represent and warrant that you have
                  all rights necessary to grant the license described above and that your
                  User Content does not infringe upon the intellectual property rights,
                  privacy rights, or any other rights of any third party.
                </p>
              </Section>

              {/* 9. Acceptable Use */}
              <Section id="acceptable-use" title="Acceptable Use" icon={AlertTriangle}>
                <p>You agree not to use the Service to:</p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    Violate any applicable local, state, national, or international law or
                    regulation.
                  </li>
                  <li>
                    Upload, transmit, or distribute any content that is unlawful, harmful,
                    threatening, abusive, harassing, defamatory, or otherwise
                    objectionable.
                  </li>
                  <li>
                    Impersonate any person or entity, or falsely state or misrepresent your
                    affiliation with any person or entity.
                  </li>
                  <li>
                    Attempt to reverse engineer, decompile, disassemble, or otherwise
                    attempt to derive the source code of the Service or any part thereof.
                  </li>
                  <li>
                    Use any automated means, including bots, scrapers, crawlers, or similar
                    tools, to access, collect data from, or interact with the Service
                    without our express written consent.
                  </li>
                  <li>
                    Interfere with or disrupt the integrity or performance of the Service
                    or the data contained therein.
                  </li>
                  <li>
                    Attempt to gain unauthorized access to the Service, other user
                    accounts, computer systems, or networks connected to the Service.
                  </li>
                  <li>
                    Use the Service for any purpose that is competitive with Archie or
                    Kynex Pro.
                  </li>
                  <li>
                    Resell, sublicense, or otherwise make the Service available to any
                    third party without our prior written consent.
                  </li>
                </ul>
                <p>
                  Violation of this Acceptable Use policy may result in immediate
                  suspension or termination of your account without prior notice or
                  refund.
                </p>
              </Section>

              {/* 10. Third-Party Integrations */}
              <Section id="third-party" title="Third-Party Integrations" icon={Globe}>
                <p>
                  The Service may integrate with or provide access to third-party
                  applications, services, and platforms, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong className="text-white/80">Google Services</strong> &mdash;
                    Google Calendar, Gmail, and Google Maps for scheduling, email, and
                    location services.
                  </li>
                  <li>
                    <strong className="text-white/80">Twilio</strong> &mdash; For SMS
                    messaging and voice communication features.
                  </li>
                  <li>
                    <strong className="text-white/80">Stripe</strong> &mdash; For secure
                    payment processing and billing.
                  </li>
                  <li>
                    <strong className="text-white/80">NOAA</strong> &mdash; For real-time
                    weather and storm data.
                  </li>
                  <li>
                    <strong className="text-white/80">Shovels API</strong> &mdash; For
                    permit-based prospecting data.
                  </li>
                </ul>
                <p>
                  Your use of any third-party service through Archie is governed by that
                  third party's own terms of service and privacy policy. Archie is not
                  responsible for the practices, content, or availability of any
                  third-party services. You acknowledge that your use of third-party
                  integrations may require you to agree to additional terms directly with
                  those providers.
                </p>
              </Section>

              {/* 11. Limitation of Liability */}
              <Section id="liability" title="Limitation of Liability" icon={Shield}>
                <p>
                  TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL
                  ARCHIE, KYNEX APPS, OR THEIR RESPECTIVE OFFICERS, DIRECTORS, EMPLOYEES,
                  AGENTS, PARTNERS, SUPPLIERS, OR LICENSORS BE LIABLE FOR ANY INDIRECT,
                  INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT
                  NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE
                  LOSSES, RESULTING FROM:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2 uppercase text-xs tracking-wide">
                  <li>Your access to or use of (or inability to access or use) the Service;</li>
                  <li>Any conduct or content of any third party on the Service;</li>
                  <li>Any content obtained from the Service;</li>
                  <li>
                    Unauthorized access, use, or alteration of your transmissions or
                    content;
                  </li>
                  <li>
                    Any AI-generated outputs, recommendations, or analyses provided through
                    the Service;
                  </li>
                  <li>
                    Any errors, inaccuracies, or omissions in roof inspection reports,
                    estimates, or other Service outputs.
                  </li>
                </ul>
                <p>
                  IN NO EVENT SHALL ARCHIE'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL
                  CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE EXCEED
                  THE GREATER OF (A) THE AMOUNT YOU HAVE PAID TO ARCHIE IN THE TWELVE (12)
                  MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED DOLLARS ($100.00).
                </p>
                <p>
                  THE LIMITATIONS OF THIS SECTION SHALL APPLY TO ANY THEORY OF LIABILITY,
                  WHETHER BASED ON WARRANTY, CONTRACT, STATUTE, TORT (INCLUDING
                  NEGLIGENCE), OR OTHERWISE, AND WHETHER OR NOT ARCHIE HAS BEEN INFORMED
                  OF THE POSSIBILITY OF ANY SUCH DAMAGE.
                </p>
              </Section>

              {/* 12. Indemnification */}
              <Section id="indemnification" title="Indemnification" icon={Scale}>
                <p>
                  You agree to defend, indemnify, and hold harmless Archie, Kynex Pro,
                  and their respective officers, directors, employees, agents, and
                  affiliates from and against any and all claims, damages, obligations,
                  losses, liabilities, costs, and expenses (including but not limited to
                  reasonable attorney's fees) arising from:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>Your use of and access to the Service;</li>
                  <li>Your violation of any term of these Terms;</li>
                  <li>
                    Your violation of any third-party right, including without limitation
                    any intellectual property, privacy, or proprietary right;
                  </li>
                  <li>
                    Any claim that your User Content caused damage to a third party;
                  </li>
                  <li>
                    Your reliance on any AI-generated output without appropriate
                    professional verification;
                  </li>
                  <li>
                    Any misrepresentation made by you in connection with these Terms or
                    your use of the Service.
                  </li>
                </ul>
                <p>
                  This defense and indemnification obligation will survive the termination
                  of these Terms and your use of the Service.
                </p>
              </Section>

              {/* 13. Termination */}
              <Section id="termination" title="Termination" icon={XCircle}>
                <p>
                  <strong className="text-white/80">Termination by You:</strong> You may
                  terminate your account at any time by contacting us at{' '}
                  <a
                    href="mailto:support@kynexpro.com"
                    className="text-archie-orange hover:underline"
                  >
                    support@kynexpro.com
                  </a>{' '}
                  or through the account settings within the Service. Upon termination,
                  your right to use the Service will immediately cease.
                </p>
                <p>
                  <strong className="text-white/80">Termination by Archie:</strong> We may
                  terminate or suspend your account and access to the Service immediately,
                  without prior notice or liability, for any reason, including but not
                  limited to a breach of these Terms, non-payment of fees, or if we
                  reasonably believe that your conduct may cause harm to Archie, our users,
                  or third parties.
                </p>
                <p>
                  <strong className="text-white/80">Data Export:</strong> Upon termination,
                  you will have a 30-day grace period to export your data from the
                  Service. During this period, you may request a full export of your User
                  Content in a standard, machine-readable format. After the 30-day period,
                  we reserve the right to permanently delete all data associated with your
                  account.
                </p>
                <p>
                  <strong className="text-white/80">Survival:</strong> Sections relating
                  to intellectual property, limitation of liability, indemnification, and
                  governing law shall survive termination of these Terms.
                </p>
              </Section>

              {/* 14. Modifications */}
              <Section id="modifications" title="Modifications to Terms" icon={RefreshCw}>
                <p>
                  We reserve the right to modify or replace these Terms at any time at our
                  sole discretion. If a revision is material, we will provide at least 30
                  days' notice prior to any new terms taking effect. Notice may be provided
                  by email to the address associated with your account, by prominent notice
                  within the Service, or by posting the revised Terms on our website.
                </p>
                <p>
                  What constitutes a material change will be determined at our sole
                  discretion. By continuing to access or use the Service after those
                  revisions become effective, you agree to be bound by the revised Terms.
                  If you do not agree to the new Terms, you must stop using the Service
                  and terminate your account.
                </p>
              </Section>

              {/* 15. Governing Law */}
              <Section id="governing-law" title="Governing Law" icon={Gavel}>
                <p>
                  These Terms shall be governed by and construed in accordance with the
                  laws of the United States of America, without regard to its conflict of
                  law provisions. Any legal action or proceeding arising under these Terms
                  shall be brought exclusively in the federal or state courts located
                  within the United States, and you hereby consent to the personal
                  jurisdiction and venue of such courts.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be
                  considered a waiver of those rights. If any provision of these Terms is
                  held to be invalid or unenforceable by a court, the remaining provisions
                  of these Terms will remain in effect.
                </p>
              </Section>

              {/* 16. Contact */}
              <Section id="contact" title="Contact Information" icon={Settings}>
                <p>
                  If you have any questions, concerns, or requests regarding these Terms of
                  Service, please contact us:
                </p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-2">
                  <p>
                    <strong className="text-white/80">Archie</strong>, operated by Kynex
                    Apps
                  </p>
                  <p>
                    Email:{' '}
                    <a
                      href="mailto:support@kynexpro.com"
                      className="text-archie-orange hover:underline"
                    >
                      support@kynexpro.com
                    </a>
                  </p>
                  <p>
                    Website:{' '}
                    <a
                      href="https://archie.now"
                      className="text-archie-orange hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      archie.now
                    </a>
                  </p>
                </div>
              </Section>

              {/* Accept CTA */}
              <div className="mt-16 pt-8 border-t border-white/[0.06]">
                <div className="bg-gradient-to-br from-archie-orange/10 to-transparent border border-archie-orange/20 rounded-2xl p-8 text-center">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Ready to Get Started?
                  </h3>
                  <p className="text-white/50 mb-6 max-w-md mx-auto">
                    By creating an account, you acknowledge that you have read and agree to
                    these Terms of Service and our Privacy Policy.
                  </p>
                  <a
                    href="https://app.archie.now"
                    className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-cta text-white font-semibold rounded-xl shadow-lg shadow-archie-orange/25 hover:shadow-xl hover:shadow-archie-orange/35 hover:brightness-110 transition-all duration-300"
                  >
                    I Accept &mdash; Start Using Archie
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-white/30 text-xs mt-4">
                    Also review our{' '}
                    <Link
                      to="/privacy-policy"
                      className="text-archie-orange/70 hover:text-archie-orange hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Zap,
  ArrowLeft,
  Shield,
  Eye,
  Database,
  Brain,
  Lock,
  Share2,
  UserCheck,
  Cookie,
  Baby,
  RefreshCw,
  Settings,
  ExternalLink,
  Server,
  Mail,
  Phone,
  Camera,
  Mic,
  FileText,
  CreditCard,
  BarChart3,
  MessageSquare,
  ChevronRight,
  XCircle,
} from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'Introduction', icon: Shield },
  { id: 'information-collected', title: 'Information We Collect', icon: Database },
  { id: 'google-data', title: 'Google Data Usage', icon: Mail },
  { id: 'how-we-use', title: 'How We Use Your Information', icon: Eye },
  { id: 'ai-data', title: 'AI Data Usage', icon: Brain },
  { id: 'data-protection', title: 'Data Protection & Security', icon: Lock },
  { id: 'data-sharing', title: 'Data Sharing', icon: Share2 },
  { id: 'your-rights', title: 'Your Rights', icon: UserCheck },
  { id: 'cookies', title: 'Cookies & Tracking', icon: Cookie },
  { id: 'children', title: "Children's Privacy", icon: Baby },
  { id: 'google-api-compliance', title: 'Google API Compliance', icon: ExternalLink },
  { id: 'changes', title: 'Changes to Privacy Policy', icon: RefreshCw },
  { id: 'contact', title: 'Contact', icon: Settings },
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

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState('introduction');

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
        <title>Privacy Policy | Archie</title>
        <meta
          name="description"
          content="Privacy Policy for Archie, the AI-powered roofing business management platform by Kynex Pro. Learn how we collect, use, and protect your data at archie.now and app.archie.now."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://archie.now/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | Archie" />
        <meta
          property="og:description"
          content="Privacy Policy for Archie, the AI-powered roofing business management platform by Kynex Pro."
        />
        <meta property="og:url" content="https://archie.now/privacy-policy" />
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
              <Shield className="w-8 h-8 text-archie-orange" />
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
                Legal
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4">
              Privacy Policy
            </h1>
            <p className="text-white/50 text-lg max-w-2xl">
              Your privacy matters to us. This policy explains how Archie and Kynex Pro
              collect, use, and protect your information.
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
              {/* 1. Introduction */}
              <Section id="introduction" title="Introduction" icon={Shield}>
                <p>
                  Archie, operated by Kynex Pro ("Company," "we," "us," or "our"), is
                  committed to protecting and respecting your privacy. This Privacy Policy
                  ("Policy") describes how we collect, use, store, and protect information
                  from users ("you" or "your") of the Archie platform, accessible at{' '}
                  <strong className="text-white/80">archie.now</strong> and{' '}
                  <strong className="text-white/80">app.archie.now</strong> (collectively,
                  the "Service").
                </p>
                <p>
                  This Policy applies to all information collected through the Service,
                  as well as any related services, sales, marketing, or events where we
                  reference this Policy. By using the Service, you consent to the data
                  practices described in this Policy. If you do not agree with the
                  practices described herein, please do not use the Service.
                </p>
                <p>
                  We encourage you to read this Policy in its entirety and to also review
                  our{' '}
                  <Link
                    to="/terms-of-service"
                    className="text-archie-orange hover:underline"
                  >
                    Terms of Service
                  </Link>
                  , which governs your use of the Service.
                </p>
              </Section>

              {/* 2. Information We Collect */}
              <Section id="information-collected" title="Information We Collect" icon={Database}>
                <p>
                  We collect several categories of information to provide, maintain, and
                  improve the Service. The types of information we collect include:
                </p>

                <div className="space-y-4">
                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <UserCheck className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">Account Information</h4>
                    </div>
                    <p>
                      When you create an account, we collect your full name, email address,
                      phone number, company name, business address, job title, and any
                      other information you voluntarily provide during registration or
                      profile setup.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">Business Data</h4>
                    </div>
                    <p>
                      Data you enter or generate through the Service, including customer
                      records, lead information, job details, project data, financial
                      records, invoices, estimates, photographs, documents, contracts,
                      insurance claim information, notes, and any other business-related
                      content stored in the platform.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <BarChart3 className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">Usage Data</h4>
                    </div>
                    <p>
                      Information about how you interact with the Service, including
                      feature usage patterns, click patterns, pages visited, session
                      duration, frequency of use, device information (device type, operating
                      system, browser type), IP address, general location data, and
                      referring URLs.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">AI Interaction Data</h4>
                    </div>
                    <p>
                      Data generated through your use of AI-powered features, including
                      voice commands and transcripts from the Aria Voice Assistant,
                      photographs uploaded for AI roof inspections, AI-generated inspection
                      reports and damage assessments, estimate calculation inputs and
                      outputs, sales coaching interactions, and blueprint analysis data.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Settings className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">Tool Usage Data</h4>
                    </div>
                    <p>
                      Information from your use of specific platform tools, including
                      estimate calculator inputs and parameters, weather and storm lookup
                      queries, CRM activity logs, production board interactions, referral
                      network management actions, prospector search criteria, and finance
                      module entries.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">Communication Data</h4>
                    </div>
                    <p>
                      Content and metadata of communications sent through the platform,
                      including emails composed and sent via integrated email features, SMS
                      messages sent through our Twilio integration, internal team chat
                      messages, and any communications with our support team.
                    </p>
                  </div>

                  <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <CreditCard className="w-4 h-4 text-archie-orange" />
                      <h4 className="font-semibold text-white/80">Payment Information</h4>
                    </div>
                    <p>
                      Payment and billing information is processed securely through Stripe,
                      our third-party payment processor. We do not directly store your full
                      credit card number on our servers. We retain transaction records,
                      billing addresses, and subscription details for account management
                      purposes.
                    </p>
                  </div>
                </div>
              </Section>

              {/* Google Data Usage */}
              <Section id="google-data" title="Google Data Usage" icon={Mail}>
                <p>
                  When you connect your Google account to Archie CRM, we access the following
                  Google data:
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Your Google email address, name, and profile photo</li>
                  <li>Your Gmail messages (to show your inbox inside the CRM)</li>
                  <li>Your Google Calendar events (to show your schedule inside the CRM)</li>
                </ul>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mt-4">
                  <h4 className="font-semibold text-white/80 mb-3">How We Use Google Data</h4>
                  <p className="mb-3">We use your Google data <strong className="text-white/80">ONLY</strong> to:</p>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Show your Gmail inbox inside the Archie CRM so you can read and send emails without leaving the app</li>
                    <li>Show your Google Calendar events so you can manage your schedule</li>
                    <li>Let you link emails to leads and jobs in the CRM</li>
                    <li>Optionally summarize emails using AI to help you work faster</li>
                  </ul>
                </div>

                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 mt-4">
                  <p className="text-red-400 font-semibold text-sm mb-2">
                    We Do NOT Use Your Google Data For:
                  </p>
                  <ul className="list-disc list-inside space-y-1.5 ml-2 text-white/70 text-sm">
                    <li>Advertising</li>
                    <li>Selling to third parties</li>
                    <li>Training AI models</li>
                    <li>Anything other than showing it to YOU inside the app</li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mt-4">
                  <h4 className="font-semibold text-white/80 mb-3">How We Store Google Data</h4>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Your Google login tokens (access token and refresh token) are stored in our secure database</li>
                    <li>Email metadata (subject, sender, date, snippet) may be cached temporarily to speed up your inbox</li>
                    <li>When you disconnect your Google account, ALL your Google data is deleted from our system immediately</li>
                    <li>We also tell Google to revoke your tokens so we can never access your account again</li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mt-4">
                  <h4 className="font-semibold text-white/80 mb-3">Who Can See Your Google Data</h4>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Only <strong className="text-white/80">YOU</strong> can see your own Google data (emails, calendar events)</li>
                    <li>Your company admin <strong className="text-white/80">CANNOT</strong> see your Gmail or Calendar data</li>
                    <li>We do NOT share your Google data with anyone outside of Archie CRM</li>
                    <li>AI email summaries are processed securely — only the email content is sent, no personal identifiers</li>
                  </ul>
                </div>

                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 mt-4">
                  <h4 className="font-semibold text-white/80 mb-3">Google Data Retention</h4>
                  <ul className="list-disc list-inside space-y-1.5 ml-2">
                    <li>Google data is kept only while your account is connected</li>
                    <li>When you disconnect Google or delete your Archie CRM account, all Google data is permanently deleted</li>
                    <li>Cached email metadata is deleted on disconnect</li>
                  </ul>
                </div>
              </Section>

              {/* 3. How We Use Your Information - CRITICAL */}
              <Section id="how-we-use" title="How We Use Your Information" icon={Eye}>
                <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-5 mb-4">
                  <p className="text-archie-orange font-semibold text-sm mb-2">
                    Important &mdash; Please Read Carefully
                  </p>
                  <p className="text-white/70 text-sm">
                    We use your information for both transactional and marketing purposes.
                    This section explains each use in detail.
                  </p>
                </div>

                <p>
                  <strong className="text-white/80">Transactional Purposes:</strong> We
                  use your information for essential service operations, including:
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Providing, operating, and maintaining the Service</li>
                  <li>Account creation, management, and authentication</li>
                  <li>Billing, payment processing, and subscription management</li>
                  <li>Customer support and technical assistance</li>
                  <li>System notifications, security alerts, and service updates</li>
                  <li>Fulfilling legal and regulatory obligations</li>
                </ul>

                <p>
                  <strong className="text-white/80">Marketing Purposes:</strong> We may
                  use your information for marketing communications, including:
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>Promotional emails about new and existing Archie features</li>
                  <li>Product updates and feature release announcements</li>
                  <li>Roofing industry news, insights, and market trends</li>
                  <li>Tips, best practices, and educational content for roofing businesses</li>
                  <li>Event invitations, webinars, and training opportunities</li>
                  <li>Surveys and requests for feedback to improve our services</li>
                </ul>

                <p>
                  <strong className="text-white/80">Affiliate Marketing:</strong> We may
                  use your information to present you with relevant affiliate offers from
                  roofing industry partners. These may include material suppliers and
                  distributors, equipment and tool manufacturers, insurance providers and
                  adjusters, financing and lending partners, software and technology
                  partners, and other service providers relevant to the roofing industry.
                  All affiliate communications will be clearly identified as such.
                </p>

                <p>
                  <strong className="text-white/80">Internal Training:</strong> Your usage
                  patterns, feedback, support interactions, and feature engagement data
                  help us improve our platform, train our customer support and success
                  teams, develop better onboarding processes, and enhance the overall user
                  experience.
                </p>

                <p>
                  <strong className="text-white/80">AI Training:</strong> Data from AI
                  features, including roof photographs, inspection results, voice
                  interactions, estimate calculations, sales coaching sessions, and
                  blueprint analyses, is used to continuously improve our AI models and
                  algorithms. This training process is essential to delivering increasingly
                  accurate and valuable AI-powered tools. See the AI Data Usage section
                  below for more details.
                </p>

                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 mt-4">
                  <p className="text-emerald-400 font-semibold text-sm mb-2">
                    Our Commitments to You
                  </p>
                  <ul className="space-y-2 text-white/70 text-sm">
                    <li className="flex items-start gap-2">
                      <Shield className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>
                        We will <strong className="text-white/90">NEVER</strong> send
                        marketing materials, promotional communications, or any form of
                        direct marketing to your clients, customers, or contacts stored
                        within the Archie CRM platform. Your customer data is exclusively
                        for your business operations.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Lock className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>
                        We will <strong className="text-white/90">NEVER</strong> sell,
                        rent, lease, or otherwise share your private or personally
                        identifiable information with any third parties outside of Kynex
                        Apps and Archie.
                      </span>
                    </li>
                  </ul>
                </div>
              </Section>

              {/* 4. AI Data Usage - CRITICAL */}
              <Section id="ai-data" title="AI Data Usage" icon={Brain}>
                <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-5 mb-4">
                  <p className="text-archie-orange font-semibold text-sm mb-2">
                    Important &mdash; AI Data Practices
                  </p>
                  <p className="text-white/70 text-sm">
                    Archie uses AI extensively. This section explains how data from AI
                    features is collected, processed, and used for continued improvement.
                  </p>
                </div>

                <p>
                  <strong className="text-white/80">Interaction Logging:</strong> All
                  interactions with AI-powered features are logged and may be used for
                  model improvement, quality assurance, and service enhancement. This
                  includes the inputs you provide (such as photos, voice commands, and
                  text queries) and the outputs generated by our AI systems (such as
                  inspection reports, estimates, and recommendations).
                </p>

                <p>
                  <strong className="text-white/80">Photo & Vision Data:</strong>{' '}
                  Photographs and images submitted for AI roof inspections, including
                  roof photos, damage documentation, and aerial imagery, may be used to
                  train and improve our computer vision models. This training helps
                  improve damage detection accuracy, material identification, and
                  condition assessment capabilities across the platform.
                </p>

                <p>
                  <strong className="text-white/80">Voice & Speech Data:</strong> Voice
                  interactions with the Aria Voice Assistant, including voice commands,
                  natural language queries, and conversational inputs, may be used to
                  improve speech recognition accuracy, command processing, natural
                  language understanding, and voice response quality.
                </p>

                <p>
                  <strong className="text-white/80">Output Quality Analysis:</strong>{' '}
                  AI-generated content, including inspection reports, damage assessments,
                  cost estimates, sales recommendations, and blueprint analyses, may be
                  analyzed and reviewed to improve output quality, accuracy, formatting,
                  and relevance. User corrections and feedback on AI outputs are
                  particularly valuable for this purpose.
                </p>

                <p>
                  <strong className="text-white/80">Anonymization:</strong> All AI
                  training processes use anonymized and aggregated data wherever possible.
                  We employ data anonymization techniques to remove or obfuscate
                  personally identifiable information before data is used in model
                  training pipelines. However, some raw data processing may be necessary
                  for certain AI functions to operate effectively.
                </p>

                <p>
                  <strong className="text-white/80">Third-Party AI Providers:</strong> No
                  personally identifiable information is shared with third-party AI
                  providers beyond what is strictly necessary for service delivery. Where
                  third-party AI infrastructure is used (for example, for natural language
                  processing or image analysis), data is transmitted under strict data
                  processing agreements that prohibit the third party from using your data
                  for their own purposes.
                </p>
              </Section>

              {/* 5. Data Protection & Security */}
              <Section id="data-protection" title="Data Protection & Security" icon={Lock}>
                <p>
                  We implement comprehensive security measures to protect your information
                  from unauthorized access, alteration, disclosure, or destruction:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <Lock className="w-5 h-5 text-archie-orange mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white/80 mb-1">256-bit SSL/TLS Encryption</h4>
                      <p className="text-sm">
                        All data transmitted between your device and our servers is
                        protected with industry-standard 256-bit SSL/TLS encryption. Data
                        at rest is also encrypted using AES-256 encryption.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <Shield className="w-5 h-5 text-archie-orange mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white/80 mb-1">SOC 2 Compliant Practices</h4>
                      <p className="text-sm">
                        Our infrastructure, processes, and controls follow SOC 2 compliant
                        practices for security, availability, processing integrity,
                        confidentiality, and privacy.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <Eye className="w-5 h-5 text-archie-orange mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white/80 mb-1">Regular Security Audits</h4>
                      <p className="text-sm">
                        We conduct regular security audits, vulnerability assessments, and
                        penetration testing by independent third-party security firms to
                        identify and remediate potential vulnerabilities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <Server className="w-5 h-5 text-archie-orange mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white/80 mb-1">US-Based Data Storage</h4>
                      <p className="text-sm">
                        All data is stored on secure, US-based servers with redundancy,
                        automated backups, and disaster recovery capabilities.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4">
                    <UserCheck className="w-5 h-5 text-archie-orange mt-0.5 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-white/80 mb-1">Access Controls & Authentication</h4>
                      <p className="text-sm">
                        Strict role-based access controls, multi-factor authentication,
                        session management, and comprehensive audit logging are enforced
                        across all systems and personnel access.
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* 6. Data Sharing */}
              <Section id="data-sharing" title="Data Sharing" icon={Share2}>
                <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-5 mb-4">
                  <p className="text-emerald-400 font-semibold text-sm mb-2">
                    Your Data Stays With Us
                  </p>
                  <p className="text-white/70 text-sm">
                    No private or personally identifiable information is ever shared outside
                    of Kynex Pro and Archie.
                  </p>
                </div>

                <p>
                  <strong className="text-white/80">We Do Not Sell Your Data:</strong> We
                  will never sell, rent, lease, or trade your personal information or
                  business data to any third party for any purpose, including marketing,
                  advertising, or data brokerage.
                </p>

                <p>
                  <strong className="text-white/80">We Do Not Share Private Information:</strong>{' '}
                  No private or personally identifiable information is shared with any
                  entity outside of Kynex Pro and Archie. Your data remains within our
                  corporate family at all times.
                </p>

                <p>
                  <strong className="text-white/80">Service Providers:</strong> Certain
                  third-party service providers receive only the minimum information
                  necessary to perform their specific services on our behalf:
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>
                    <strong className="text-white/70">Stripe</strong> receives payment
                    information necessary for billing and subscription management.
                  </li>
                  <li>
                    <strong className="text-white/70">Twilio</strong> receives phone
                    numbers and message content necessary for SMS and voice communications.
                  </li>
                  <li>
                    <strong className="text-white/70">Google</strong> receives calendar and
                    email data necessary for calendar sync and email integration features.
                  </li>
                </ul>
                <p>
                  All service providers are bound by data processing agreements that
                  restrict their use of your data to the specific services they provide
                  to us.
                </p>

                <p>
                  <strong className="text-white/80">Anonymized & Aggregated Statistics:</strong>{' '}
                  We may share anonymized, aggregated statistical data that cannot be
                  used to identify any individual user or business. This data may be used
                  for industry research, benchmarking, and published reports about roofing
                  industry trends.
                </p>

                <p>
                  <strong className="text-white/80">Legal Requirements:</strong> We may
                  disclose your information if required to do so by law, regulation, legal
                  process, or governmental request, or if we believe in good faith that
                  disclosure is necessary to protect our rights, protect your safety or the
                  safety of others, investigate fraud, or respond to a government request.
                </p>
              </Section>

              {/* 7. Your Rights */}
              <Section id="your-rights" title="Your Rights" icon={UserCheck}>
                <p>
                  You have several rights regarding your personal information and data
                  stored within the Service:
                </p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-archie-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Eye className="w-3.5 h-3.5 text-archie-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/80">Right to Access</h4>
                      <p className="text-sm">
                        You have the right to request access to the personal information
                        we hold about you. We will provide this information within 30 days
                        of a verified request.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-archie-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Database className="w-3.5 h-3.5 text-archie-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/80">Right to Export</h4>
                      <p className="text-sm">
                        You may export your data from the Service at any time in a
                        standard, machine-readable format through the platform's export
                        functionality or by contacting our support team.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-archie-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <XCircle className="w-3.5 h-3.5 text-archie-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/80">Right to Delete</h4>
                      <p className="text-sm">
                        You may request deletion of your account and associated data. Upon
                        account deletion, your data will be retained for a 30-day grace
                        period to allow for data export or account recovery. After 30 days,
                        all data will be permanently and irreversibly deleted from our
                        active systems. Some anonymized data may persist in backups for up
                        to 90 days.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-archie-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Mail className="w-3.5 h-3.5 text-archie-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/80">Right to Opt Out of Marketing</h4>
                      <p className="text-sm">
                        You may opt out of marketing communications at any time by clicking
                        the unsubscribe link in any marketing email, adjusting your
                        notification preferences in account settings, or contacting us
                        directly. Transactional communications required for service
                        operation cannot be opted out of.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-archie-orange/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Shield className="w-3.5 h-3.5 text-archie-orange" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white/80">California Residents (CCPA Rights)</h4>
                      <p className="text-sm">
                        If you are a California resident, you have additional rights under
                        the California Consumer Privacy Act (CCPA), including the right to
                        know what personal information is collected, the right to request
                        deletion of personal information, the right to opt out of the sale
                        of personal information (note: we do not sell personal information),
                        and the right to non-discrimination for exercising your CCPA
                        rights. To exercise any of these rights, please contact us at{' '}
                        <a
                          href="mailto:support@kynexpro.com"
                          className="text-archie-orange hover:underline"
                        >
                          support@kynexpro.com
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* 8. Cookies & Tracking */}
              <Section id="cookies" title="Cookies & Tracking" icon={Cookie}>
                <p>
                  We use cookies and similar tracking technologies to enhance your
                  experience, analyze usage, and deliver relevant content. The types of
                  cookies we use include:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-2">
                  <li>
                    <strong className="text-white/80">Essential/Session Cookies:</strong>{' '}
                    Required for the basic functionality of the Service, including
                    authentication, session management, security features, and load
                    balancing. These cookies are necessary and cannot be disabled.
                  </li>
                  <li>
                    <strong className="text-white/80">Analytics Cookies:</strong> Help us
                    understand how users interact with the Service by collecting usage
                    statistics, page views, feature engagement, and navigation patterns.
                    This data is used to improve the Service and user experience.
                  </li>
                  <li>
                    <strong className="text-white/80">Preference Cookies:</strong>{' '}
                    Remember your settings, preferences, language selections, and
                    customizations to provide a more personalized experience across
                    sessions.
                  </li>
                  <li>
                    <strong className="text-white/80">Marketing Cookies:</strong> May be
                    used to deliver relevant advertising and track the effectiveness of
                    marketing campaigns. These cookies help us understand which marketing
                    channels and messages are most effective.
                  </li>
                </ul>
                <p>
                  You can manage your cookie preferences through your browser settings.
                  Please note that disabling certain cookies may affect the functionality
                  of the Service.
                </p>
              </Section>

              {/* 9. Children's Privacy */}
              <Section id="children" title="Children's Privacy" icon={Baby}>
                <p>
                  The Service is not intended for individuals under the age of 18. We do
                  not knowingly collect personal information from children under 18 years
                  of age. If we become aware that we have collected personal information
                  from a child under 18, we will take immediate steps to delete such
                  information from our records.
                </p>
                <p>
                  If you are a parent or guardian and you believe that your child has
                  provided us with personal information, please contact us at{' '}
                  <a
                    href="mailto:support@kynexpro.com"
                    className="text-archie-orange hover:underline"
                  >
                    support@kynexpro.com
                  </a>{' '}
                  so that we can take appropriate action.
                </p>
              </Section>

              {/* Google API Compliance */}
              <Section id="google-api-compliance" title="Google API Compliance" icon={ExternalLink}>
                <div className="bg-archie-orange/5 border border-archie-orange/20 rounded-xl p-5 mb-4">
                  <p className="text-archie-orange font-semibold text-sm mb-2">
                    Google API Services User Data Policy
                  </p>
                  <p className="text-white/70 text-sm">
                    Archie CRM's use and transfer of information received from Google APIs
                    adheres to the{' '}
                    <a
                      href="https://developers.google.com/terms/api-services-user-data-policy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-archie-orange hover:underline"
                    >
                      Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
                  </p>
                </div>
                <p>
                  You can review and manage your Google permissions at any time by visiting{' '}
                  <a
                    href="https://myaccount.google.com/permissions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-archie-orange hover:underline"
                  >
                    myaccount.google.com/permissions
                  </a>
                  .
                </p>
              </Section>

              {/* 10. Changes */}
              <Section id="changes" title="Changes to Privacy Policy" icon={RefreshCw}>
                <p>
                  We may update this Privacy Policy from time to time to reflect changes
                  in our practices, technologies, legal requirements, or other factors. If
                  we make material changes to this Policy, we will notify you by:
                </p>
                <ul className="list-disc list-inside space-y-1.5 ml-2">
                  <li>
                    Sending an email notification to the address associated with your
                    account
                  </li>
                  <li>
                    Displaying a prominent notice within the Service
                  </li>
                  <li>
                    Posting the revised Policy on our website with an updated "Last
                    Updated" date
                  </li>
                </ul>
                <p>
                  We encourage you to review this Policy periodically. Your continued use
                  of the Service after any changes to this Policy constitutes your
                  acceptance of the updated Policy. If you do not agree with the revised
                  Policy, you should discontinue use of the Service.
                </p>
              </Section>

              {/* 11. Contact */}
              <Section id="contact" title="Contact" icon={Settings}>
                <p>
                  If you have any questions, concerns, or requests regarding this Privacy
                  Policy or our data practices, please contact us:
                </p>
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-2">
                  <p>
                    <strong className="text-white/80">Archie CRM</strong>, a product of Kynex Pro
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
                <p>
                  We aim to respond to all privacy-related inquiries within 30 business
                  days. For urgent security concerns, please include "URGENT" in your
                  email subject line.
                </p>
              </Section>

              {/* Back to Home CTA */}
              <div className="mt-16 pt-8 border-t border-white/[0.06]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-archie-orange transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                  </Link>
                  <Link
                    to="/terms-of-service"
                    className="inline-flex items-center gap-2 text-white/40 hover:text-archie-orange transition-colors"
                  >
                    Read our Terms of Service
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


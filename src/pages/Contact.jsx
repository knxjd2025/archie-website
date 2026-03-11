import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Mail, Phone, MapPin, Send, ChevronDown, Clock,
  ArrowRight, MessageSquare, CheckCircle, Users, Building2
} from 'lucide-react';
import CTAButton from '../components/CTAButton';
import SectionHeading from '../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const faqs = [
  {
    q: 'Is there a free plan?',
    a: 'Yes! Archie offers a free plan that is free forever — not a trial. You get all reports and AI features unlocked, full CRM and all business tools, 5 jobs per month, and 2 roof, 2 measurement, and 2 storm reports per month. No credit card required.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Most contractors are up and running within 30 minutes. Archie is designed to be intuitive with minimal setup required. Our onboarding team is available to help you import existing contacts, configure your account, and train your team — all at no extra charge.',
  },
  {
    q: 'Can I import my existing contacts and data?',
    a: 'Absolutely. Archie supports data import from CSV files, other CRM platforms (JobNimbus, AccuLynx, HousecallPro), and spreadsheets. Our team will assist with data migration to ensure nothing is lost in the transition.',
  },
  {
    q: 'Does Archie work on mobile devices?',
    a: 'Yes. Archie is fully mobile-optimized and works on any smartphone or tablet through your web browser. All features — including AI measurements, CRM, voice assistant, and estimating — work seamlessly on mobile devices in the field.',
  },
  {
    q: 'What kind of support does Archie offer?',
    a: 'Archie provides multiple support channels: live chat support during business hours, email support with 24-hour response time, phone support for urgent issues, an extensive knowledge base with video tutorials, and a community forum where contractors share tips and best practices. Enterprise customers receive a dedicated account manager.',
  },
  {
    q: 'Can Archie integrate with other tools I already use?',
    a: 'Archie integrates with popular tools used by roofing contractors, including QuickBooks for accounting, CompanyCam for photo documentation, Google Calendar for scheduling, and various email marketing platforms. We are continuously adding new integrations based on customer requests.',
  },
  {
    q: 'Is my data secure?',
    a: 'Data security is a top priority. Archie uses enterprise-grade encryption (AES-256) for all stored data, SSL/TLS encryption for data in transit, regular security audits, and SOC 2 compliant hosting infrastructure. Your business data, customer information, and financial records are fully protected.',
  },
  {
    q: 'How many users can I have on my account?',
    a: 'The number of users depends on your plan. All plans support multiple users with role-based access controls — so your sales team, production managers, and office staff each see only what they need. Contact us for enterprise pricing if you need 20+ users.',
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

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    employees: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In production, this would submit to an API endpoint
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Archie",
    "description": "Get in touch with Archie. Contact us for support, questions, or partnership inquiries.",
    "url": "https://archie.now/contact",
  };

  return (
    <>
      <Helmet>
        <title>Contact Archie | #1 AI-Powered Roofing Platform</title>
        <meta name="description" content="Contact Archie for support, questions, or partnership inquiries. Call us, email us, or fill out the form. We typically respond within 2 hours during business hours." />
        <link rel="canonical" href="https://archie.now/contact" />
        <meta property="og:title" content="Contact Archie | Get In Touch" />
        <meta property="og:description" content="Get in touch with Archie. Support, questions, and partnership inquiries." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Get in Touch
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Let's Talk About Growing Your <span className="text-gradient">Roofing Business</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Whether you want a demo, have a question, or just want to learn more about how Archie can help your roofing company — we are here.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="bg-archie-light py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact Info */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-2 space-y-8"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-archie-dark mb-4">Contact Information</h2>
                <p className="text-gray-600 leading-relaxed">
                  Reach out anytime. Our team typically responds within 2 hours during business hours and within 24 hours on weekends.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-archie-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-archie-dark">Email</h3>
                    <a href="mailto:hello@archie.now" className="text-archie-orange hover:underline font-medium">hello@archie.now</a>
                    <p className="text-gray-500 text-sm mt-1">We respond within 2 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-6 h-6 text-archie-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-archie-dark">Live Chat</h3>
                    <p className="text-gray-600">Available on <a href="https://app.archie.now" className="text-archie-orange hover:underline">app.archie.now</a></p>
                    <p className="text-gray-500 text-sm mt-1">Instant support during business hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-archie-orange" />
                  </div>
                  <div>
                    <h3 className="font-bold text-archie-dark">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 8:00 AM - 6:00 PM CT</p>
                    <p className="text-gray-500 text-sm mt-1">Weekend email support available</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="bg-archie-dark rounded-2xl p-6">
                <h3 className="font-bold text-white mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Start Free', href: 'https://app.archie.now' },
                    { label: 'View Pricing Plans', href: '/pricing' },
                    { label: 'Explore Features', href: '/features' },
                    { label: 'Read Our Blog', href: '/blog' },
                  ].map((link, i) => (
                    <a key={i} href={link.href} className="flex items-center gap-2 text-gray-300 hover:text-archie-orange transition-colors group">
                      <ArrowRight className="w-4 h-4 text-archie-orange group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <div className="bg-white rounded-2xl shadow-lg p-8">
                {submitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-archie-dark mb-3">Thank You!</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Your message has been received. A member of our team will reach out within 2 hours during business hours. We look forward to helping you grow your roofing business.
                    </p>
                    <CTAButton href="https://app.archie.now" size="md">
                      Start Free While You Wait <ArrowRight className="w-4 h-4" />
                    </CTAButton>
                  </div>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-archie-dark mb-2">Send Us a Message</h3>
                    <p className="text-gray-500 mb-6">Fill out the form below and we will get back to you quickly.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-archie-dark mb-1.5">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="John Smith"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-archie-dark mb-1.5">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@company.com"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-archie-dark mb-1.5">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            required
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="(555) 123-4567"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark placeholder:text-gray-400"
                          />
                        </div>
                        <div>
                          <label htmlFor="company" className="block text-sm font-medium text-archie-dark mb-1.5">
                            Company Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            id="company"
                            name="company"
                            required
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Smith Roofing LLC"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark placeholder:text-gray-400"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="employees" className="block text-sm font-medium text-archie-dark mb-1.5">
                          Number of Employees
                        </label>
                        <select
                          id="employees"
                          name="employees"
                          value={formData.employees}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark bg-white"
                        >
                          <option value="">Select team size</option>
                          <option value="1-5">1-5 employees</option>
                          <option value="6-15">6-15 employees</option>
                          <option value="16-30">16-30 employees</option>
                          <option value="31-50">31-50 employees</option>
                          <option value="51-100">51-100 employees</option>
                          <option value="100+">100+ employees</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-archie-dark mb-1.5">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your roofing business and how we can help..."
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark placeholder:text-gray-400 resize-none"
                        />
                      </div>

                      <CTAButton type="submit" size="lg" className="w-full" icon={Send}>
                        Send Message
                      </CTAButton>

                      <p className="text-gray-400 text-xs text-center">
                        By submitting this form, you agree to receive communications from Archie. We respect your privacy and will never share your information.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="FAQ"
            title="Common Questions"
            subtitle="Quick answers to the questions we hear most often."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to See Archie in Action?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Start free today and see why roofing contractors are switching to Archie. No credit card required. Free forever.
            </p>
            <CTAButton href="https://app.archie.now" size="lg">
              Start Free <ArrowRight className="w-5 h-5" />
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}

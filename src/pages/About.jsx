import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Target, Heart, Zap, Shield, Users, TrendingUp,
  ArrowRight, Lightbulb, Award, Globe, Wrench, BarChart3
} from 'lucide-react';
import CTAButton from '../components/CTAButton';
import SectionHeading from '../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

const values = [
  {
    icon: Target,
    title: 'Built for Roofers',
    description: 'Every feature is designed by people who understand the roofing business. We do not build generic tools — we build solutions that solve real problems roofing contractors face every day.',
  },
  {
    icon: Zap,
    title: 'AI That Works',
    description: 'We believe AI should save you time, not create more complexity. Our AI tools are practical, accurate, and designed to work in the field — on your phone, at the job site, in real time.',
  },
  {
    icon: Heart,
    title: 'Contractor Success First',
    description: 'Our success is measured by your success. We are not interested in vanity metrics — we care about how many more jobs you close, how much time we save you, and how much your business grows.',
  },
  {
    icon: Shield,
    title: 'Reliability & Trust',
    description: 'Your business depends on tools that work when you need them. We invest heavily in reliability, uptime, and data security because we know that downtime costs you money and credibility.',
  },
  {
    icon: Lightbulb,
    title: 'Continuous Innovation',
    description: 'The roofing industry is evolving, and so are we. We ship new features every week based on direct feedback from our contractor community. Your voice shapes what we build next.',
  },
  {
    icon: Users,
    title: 'Community Driven',
    description: 'Archie is more than a software platform — it is a community of roofing professionals sharing knowledge, best practices, and support. We grow together.',
  },
];

const milestones = [
  { year: '2023', event: 'Archie founded with a mission to modernize the roofing industry through AI technology' },
  { year: '2023', event: 'Launched AI-powered roof measurement tool, generating accurate measurements from satellite imagery' },
  { year: '2024', event: 'Released integrated CRM built specifically for roofing workflows and sales processes' },
  { year: '2024', event: 'Introduced real-time storm tracking and hail mapping for storm restoration contractors' },
  { year: '2024', event: 'Launched AI Voice Assistant for hands-free job updates and CRM interaction from the field' },
  { year: '2025', event: 'Released AI Sales Coach, Prospector, and Finance tools to complete the all-in-one platform' },
  { year: '2025', event: 'Launched free CRM tier to make professional roofing tools accessible to every contractor' },
];

const team = [
  { name: 'Coming Soon', role: 'CEO & Co-Founder', bio: 'Building the future of roofing technology.' },
  { name: 'Coming Soon', role: 'CTO & Co-Founder', bio: 'Engineering AI solutions for the trades.' },
  { name: 'Coming Soon', role: 'Head of Product', bio: 'Designing tools roofers actually want to use.' },
  { name: 'Coming Soon', role: 'Head of Customer Success', bio: 'Ensuring every contractor gets maximum value.' },
];

export default function About() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Archie",
    "url": "https://archie.now",
    "description": "Archie is the AI-powered operating system for roofing businesses. We help roofing contractors manage leads, create estimates, track storms, and run their operations from one platform.",
    "foundingDate": "2023",
    "sameAs": [],
  };

  return (
    <>
      <Helmet>
        <title>About Archie | AI-Powered Roofing Platform</title>
        <meta name="description" content="Learn about Archie, the AI-powered platform built for roofing contractors. Our mission is to empower roofing businesses with technology that saves time, wins more jobs, and drives growth." />
        <link rel="canonical" href="https://archie.now/about" />
        <meta property="og:title" content="About Archie | AI-Powered Roofing Platform" />
        <meta property="og:description" content="Empowering roofing contractors with AI-powered technology to grow their businesses." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              About Archie
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Empowering Roofers With <span className="text-gradient">AI-Powered Technology</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              We are building the operating system for the modern roofing business — combining AI, automation, and industry expertise to help contractors work smarter, close more jobs, and grow faster.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block mb-3 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
                  Our Mission
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-6">
                  Making Technology Accessible for Every Roofing Contractor
                </h2>
                <p className="text-gray-600 leading-relaxed mb-4">
                  The roofing industry generates over $56 billion annually and employs hundreds of thousands of hardworking professionals. Yet most roofing contractors still rely on paper estimates, manual follow-ups, and disconnected tools to run their businesses.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  We believe that should change. Every roofing contractor — whether a one-truck operation or a multi-state enterprise — deserves access to powerful technology that was previously only available to the largest companies. That is why we built Archie.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Archie is an AI-powered platform purpose-built for roofing. It is not a generic CRM with a roofing skin. It is not a tool built by people who have never been on a roof. It is a comprehensive operating system designed from the ground up by people who understand the roofing business inside and out.
                </p>
              </div>
              <div className="bg-archie-dark rounded-2xl p-8">
                <div className="space-y-6">
                  {[
                    { icon: BarChart3, stat: '$56B+', label: 'US roofing industry annual revenue' },
                    { icon: Users, stat: '250K+', label: 'Roofing workers in the United States' },
                    { icon: TrendingUp, stat: 'All-in-One', label: 'CRM, AI, estimates, and operations in one platform' },
                    { icon: Globe, stat: '50 States', label: 'Available to contractors nationwide' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-6 h-6 text-archie-orange" />
                      </div>
                      <div>
                        <p className="text-2xl font-extrabold text-white">{item.stat}</p>
                        <p className="text-gray-400 text-sm">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeading
              label="Our Story"
              title="Why We Built Archie"
              subtitle="The roofing industry deserves better technology. Here's how we got started."
              light
            />
            <div className="bg-archie-navy rounded-2xl p-8 border border-archie-blue/20">
              <p className="text-gray-300 leading-relaxed mb-4">
                Archie was born from a simple frustration: roofing contractors were spending more time on paperwork than on rooftops. Between juggling CRM spreadsheets, manually measuring roofs, chasing insurance supplements, and trying to keep up with storm events, the administrative burden was crushing — especially for small and mid-size operators without dedicated office staff.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                We saw an opportunity to change that. Advances in artificial intelligence, satellite imagery, and mobile technology had reached a point where truly transformative tools could be built — tools that could measure a roof from a phone in seconds, automatically detect missing items in an insurance estimate, track severe weather in real time, and even coach a sales rep through a pitch.
              </p>
              <p className="text-gray-300 leading-relaxed mb-4">
                But we knew that technology alone was not enough. The roofing industry is notoriously skeptical of software — and rightfully so. Too many tools have been built by people who have never stepped foot on a roof, and it shows. The interfaces are clunky, the features are generic, and the learning curve is steep.
              </p>
              <p className="text-gray-300 leading-relaxed">
                That is why we built Archie differently. We work directly with roofing contractors every single day. Their feedback shapes every feature, every interface decision, and every product priority. The result is a platform that feels like it was built by a roofer — because, in many ways, it was.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Journey"
            title="Building the Future of Roofing"
            subtitle="Key milestones in Archie's growth."
          />
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-archie-orange/20" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="flex items-start gap-6 pl-4"
                >
                  <div className="relative">
                    <div className="w-3 h-3 rounded-full bg-archie-orange ring-4 ring-archie-orange/20 shrink-0 mt-1.5 -ml-1.5" />
                  </div>
                  <div>
                    <span className="text-archie-orange font-bold text-sm">{m.year}</span>
                    <p className="text-gray-600 leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Values"
            title="What We Stand For"
            subtitle="The principles that guide everything we build and every decision we make."
            light
          />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                className="bg-archie-navy rounded-xl p-6 border border-archie-blue/20"
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4">
                  <v.icon className="w-6 h-6 text-archie-orange" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{v.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{v.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Our Team"
            title="The People Behind Archie"
            subtitle="A passionate team of builders, designers, and roofing industry experts."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={i}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-24 h-24 rounded-full bg-gradient-cta mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h4 className="font-bold text-archie-dark">{member.name}</h4>
                <p className="text-archie-orange text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Ready to Modernize Your Roofing Business?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Experience the all-in-one roofing platform with AI-powered tools, CRM, estimates, and operations management. Start free today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" size="lg">
                Contact Us
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  GraduationCap, ArrowRight, Zap, ChevronDown, CheckCircle2, Phone,
  BookOpen, Award, BarChart3, MessageSquare, Target, Brain, Users,
  TrendingUp, PlayCircle, FileText, Star, Clock, Layers
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const trainingTracks = [
  { icon: BookOpen, title: 'Door Knocking Fundamentals', desc: 'Master the art of the first impression. Approach strategies, opening lines, objection handling, and appointment setting techniques specifically for residential roofing door-to-door sales. Includes body language coaching and neighborhood strategy.' },
  { icon: Phone, title: 'Phone Sales Mastery', desc: 'Close deals over the phone with confidence. Scripts for inbound leads, outbound follow-ups, estimate reviews, and objection handling. Covers tonality, pacing, and urgency creation techniques that work for roofing sales conversations.' },
  { icon: Target, title: 'Inspection Presentation', desc: 'Turn every inspection into a signed contract. Learn how to present damage findings, explain insurance processes, present Good/Better/Best options, and overcome pricing objections on-site. Practice with realistic homeowner scenarios.' },
  { icon: FileText, title: 'Insurance Claims Process', desc: 'Understand the insurance claims process inside and out. Learn how to explain deductibles, supplementation, depreciation, and ACV vs. RCV to homeowners. Practice handling questions about the claims timeline and adjuster meetings.' },
  { icon: TrendingUp, title: 'Closing Techniques', desc: 'Advanced closing strategies for roofing sales. Assumptive closes, urgency creation, competitive positioning, and negotiation tactics. Role-play scenarios cover every common objection a roofing salesperson encounters.' },
  { icon: Users, title: 'Retail Sales Excellence', desc: 'Master retail roofing sales where there is no insurance claim. Learn to sell value over price, present financing options, build trust through education, and differentiate your company from low-bid competitors.' },
];

const features = [
  { icon: Phone, title: 'AI Phone Practice', desc: 'Practice sales calls with AI-powered homeowner simulations. The AI plays different homeowner personalities: skeptical, price-focused, comparison shopper, urgent, and indecisive. Get instant feedback on your pitch, objection handling, and closing technique after every practice session.' },
  { icon: BookOpen, title: 'Script Library', desc: 'Access a curated library of proven roofing sales scripts for every scenario. Door knocking intros, phone follow-ups, inspection presentations, estimate reviews, closing conversations, and objection rebuttals. Customize scripts to match your company voice and market.' },
  { icon: Award, title: 'Quizzes & Certifications', desc: 'Test knowledge retention with quizzes after every training module. Earn certifications that demonstrate competency in door knocking, phone sales, inspections, insurance, and closing. Track certification status for every team member.' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Track training progress, quiz scores, practice call ratings, and time invested for every sales rep. Identify knowledge gaps and assign targeted training. Compare team member performance and celebrate top performers.' },
  { icon: Brain, title: 'AI Feedback & Coaching', desc: 'After every practice session, the AI coach provides detailed feedback on what went well and what needs improvement. Suggestions include specific phrases to use, timing adjustments, and alternative approaches for handling objections.' },
  { icon: PlayCircle, title: 'Video Lessons', desc: 'Short, focused video lessons teach concepts before practice sessions. Each lesson is 5-10 minutes and covers one specific skill. Topics include reading body language, creating urgency, presenting damage photos, and explaining insurance processes.' },
];

const faqs = [
  { q: 'What is the Archie AI Sales Coach?', a: 'The AI Sales Coach is a training and practice platform built into Archie specifically for roofing sales professionals. It includes structured training tracks covering door knocking, phone sales, inspections, insurance, and closing. Sales reps practice with AI-simulated homeowner conversations and receive instant feedback on their performance.' },
  { q: 'How does AI phone practice work?', a: 'You start a practice call and the AI plays the role of a homeowner. The AI uses different personalities: some are skeptical, some are price-focused, some are comparison shopping. You practice your pitch, handle objections, and work toward the close. After the call, the AI provides detailed feedback on your approach, tone, and technique.' },
  { q: 'What training tracks are available?', a: 'Archie includes six core training tracks: Door Knocking Fundamentals, Phone Sales Mastery, Inspection Presentation, Insurance Claims Process, Closing Techniques, and Retail Sales Excellence. Each track contains multiple lessons, practice exercises, and certification quizzes.' },
  { q: 'Can I customize the scripts for my company?', a: 'Yes. The script library provides proven frameworks that you can customize with your company name, value propositions, pricing language, and market-specific details. Create custom scripts and share them across your sales team for consistency.' },
  { q: 'How do certifications work?', a: 'Each training track ends with a certification quiz. Sales reps must score 80% or higher to earn the certification. Certifications cover Door Knocking, Phone Sales, Inspection Mastery, Insurance Knowledge, and Advanced Closing. Managers can see which team members are certified in which areas.' },
  { q: 'Can I track which reps are completing training?', a: 'Yes. The manager dashboard shows training progress for every team member: lessons completed, practice calls logged, quiz scores, certifications earned, and total training hours. You can assign specific tracks to new hires and set deadlines for completion.' },
  { q: 'How long does it take to complete a training track?', a: 'Each training track takes approximately 4-6 hours to complete including video lessons, reading materials, practice calls, and the certification quiz. Most reps complete one track per week while working their normal sales schedule.' },
  { q: 'Is the training applicable to storm restoration and retail roofing?', a: 'Yes. The training covers both storm restoration sales (insurance claims, supplement negotiation, adjuster meetings) and retail roofing sales (value selling, financing presentations, competitive positioning). Separate tracks address the unique challenges of each sales type.' },
  { q: 'What kind of sales improvement can I expect?', a: 'Structured training with AI practice calls is designed to help your reps close more deals and ramp up faster. New hires benefit from a clear learning path instead of the traditional ride-along-only approach. The AI practice calls give reps confidence before they face real homeowners, so they are better prepared from day one.' },
  { q: 'Does the AI coach work for Spanish-speaking sales reps?', a: 'AI phone practice is currently available in English. Spanish language support is on the development roadmap. However, the script library can include Spanish-language scripts, and training track content can be supplemented with translated materials.' },
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

export default function SalesCoach() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie AI Sales Coach',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'AI-powered sales training platform for roofing professionals. Includes training tracks for door knocking, phone sales, inspections, insurance, and closing. Features AI phone practice, script library, quizzes, and certifications.',
    url: 'https://archie.now/features/sales-coach',
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
        <title>AI Sales Coaching for Roofers | Training, Scripts & Practice | Archie</title>
        <meta name="description" content="Train your roofing sales team with AI-powered coaching. Structured training tracks, realistic AI phone practice, curated script library, quizzes, and certifications. Help your reps close more deals and ramp up faster." />
        <meta name="keywords" content="roofing sales training, AI sales coach, roofing sales scripts, door knocking training roofers, roofing phone sales training, sales coaching software roofing, roofing sales certification" />
        <link rel="canonical" href="https://archie.now/features/sales-coach" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(236,72,153,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              AI Sales Coach: <span className="text-gradient">Train Reps That Close</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              Structured training tracks, AI-powered phone practice with simulated homeowners, a proven script library, and certification quizzes. Help new hires ramp up faster and give your entire team the tools to close more deals.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={GraduationCap}>Start Training Free</CTAButton>
              <CTAButton href="#tracks" variant="secondary" size="lg">See Training Tracks</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Screenshot */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <img
              src="/screenshots/sales-coach.png"
              alt="Archie Sales Coach screenshot"
              className="rounded-2xl shadow-2xl border border-gray-200 w-full"
              loading="lazy"
            />
          </motion.div>
        </div>
      </section>

      {/* Built for Roofers */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-archie-dark">Built for Roofers, by a Roofer</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Six training tracks, 100+ practice scenarios, and AI-powered feedback designed specifically for the roofing sales process. From door knocking to closing, Archie helps your team sharpen every skill that matters.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" icon={GraduationCap}>See It In Action</CTAButton>
          </div>
        </div>
      </section>

      {/* Training Tracks */}
      <section id="tracks" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Training Tracks" title="Six Structured Paths to Sales Mastery" subtitle="Each track builds specific skills through video lessons, reading materials, AI practice calls, and certification quizzes." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {trainingTracks.map((t, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-pink-500/30 transition-colors">
                <t.icon className="w-10 h-10 text-pink-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{t.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{t.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Phone Practice */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading label="AI Practice" title="Practice Sales Calls With AI Homeowners" subtitle="The AI plays realistic homeowner personas so your reps can practice before facing real prospects." align="left" />
              <ul className="space-y-4 mt-6">
                {[
                  'Skeptical homeowner who questions if they really have damage',
                  'Price shopper comparing your estimate to two other bids',
                  'Busy homeowner who keeps trying to end the conversation early',
                  'Insurance-savvy homeowner with detailed questions about the claims process',
                  'Elderly homeowner concerned about being taken advantage of',
                  'Spouse who needs to check with their partner before deciding',
                  'Homeowner who just had a bad experience with another roofer',
                  'First-time homeowner unfamiliar with roofing terminology',
                ].map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-pink-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-square rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50 border border-pink-200 flex items-center justify-center">
              <div className="text-center">
                <Phone className="w-16 h-16 text-pink-500 mx-auto mb-4" />
                <p className="text-archie-dark text-xl font-semibold">AI Phone Practice</p>
                <p className="text-gray-500 mt-2">Realistic homeowner simulations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Platform Features" title="Everything Your Sales Team Needs to Win" subtitle="A complete training platform that turns average reps into top closers and shortens the path from new hire to productive team member." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {features.map((f, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors">
                <f.icon className="w-9 h-9 text-pink-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Your Best Closer Was Trained, Not Born</h2>
          <p className="mt-4 text-lg text-white/80">Give every rep the tools to sell like your top performer. Start AI sales coaching today.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Start Training Free</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Sales Coach FAQ" title="Frequently Asked Questions About AI Sales Coaching" subtitle="Everything you need to know about training your roofing sales team with AI." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Build a Sales Team That Dominates</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">AI Sales Coach is included with Archie Pro and Enterprise plans. Start training your team today and close more roofs tomorrow.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={GraduationCap}>Start AI Coaching</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

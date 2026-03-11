import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Mic, ArrowRight, Zap, ChevronDown, CheckCircle2, Phone, MessageSquare,
  Calendar, FileText, CloudLightning, Camera, Users, MapPin, Clock,
  Search, Bell, Settings, Volume2, Headphones, Smartphone
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.06, duration: 0.5 } }),
};

const commandCategories = [
  {
    category: 'Lead Management',
    icon: Users,
    commands: [
      '"Hey Aria, create a new lead for John Smith at 123 Oak Street"',
      '"Aria, what leads came in today?"',
      '"Move the Johnson lead to appointment set"',
      '"Assign the new lead at Elm Street to Mike"',
      '"What is the status of the Baker lead?"',
    ],
  },
  {
    category: 'Scheduling',
    icon: Calendar,
    commands: [
      '"Schedule an inspection at 2pm tomorrow for the Martinez property"',
      '"What do I have on my calendar today?"',
      '"Reschedule the 3pm appointment to Friday"',
      '"Block off Thursday morning for production meetings"',
      '"Remind me to follow up with Mrs. Chen in 3 days"',
    ],
  },
  {
    category: 'Estimates & Jobs',
    icon: FileText,
    commands: [
      '"Create an estimate for a 30-square shingle replacement"',
      '"What is the total on the Williams estimate?"',
      '"Mark the Rodriguez job as material ordered"',
      '"How many open jobs do we have right now?"',
      '"Generate an invoice for the completed Henderson job"',
    ],
  },
  {
    category: 'Weather & Storms',
    icon: CloudLightning,
    commands: [
      '"What is the weather forecast for tomorrow?"',
      '"Were there any hail events in Dallas last week?"',
      '"Check wind speeds for our scheduled installs this week"',
      '"Pull up the storm report for zip code 75201"',
    ],
  },
  {
    category: 'Communication',
    icon: MessageSquare,
    commands: [
      '"Text Mrs. Johnson that we will arrive at 9am"',
      '"Read me my unread messages"',
      '"Send the team a note that production is on schedule"',
      '"Call the supplier about the shingle delivery"',
    ],
  },
  {
    category: 'Reporting',
    icon: Search,
    commands: [
      '"How much revenue did we close this month?"',
      '"What is our close rate this quarter?"',
      '"How many inspections did the team complete this week?"',
      '"Pull up the sales leaderboard"',
    ],
  },
  {
    category: 'Photos & Inspections',
    icon: Camera,
    commands: [
      '"Start an AI inspection for this property"',
      '"Add a note to the current inspection"',
      '"How many photos have I uploaded for this job?"',
    ],
  },
];

const useCases = [
  { icon: MapPin, title: 'On the Roof', desc: 'Hands are busy holding a ladder, taking photos, or examining damage. Use Aria to log notes, create leads, or start inspections without touching your phone. Safety first means voice-first when you are 30 feet up.' },
  { icon: Phone, title: 'Driving Between Jobs', desc: 'Use Aria while driving to check your schedule, get directions to the next appointment, dictate follow-up notes from the meeting you just left, or create tasks for your team. Eyes on the road, voice on Archie.' },
  { icon: Headphones, title: 'In the Office', desc: 'Multitask efficiently by using voice commands while reviewing paperwork, eating lunch, or walking between desks. Ask Aria for quick data pulls without navigating through screens.' },
  { icon: Smartphone, title: 'During Canvassing', desc: 'Going door to door? Create leads on the fly by speaking the homeowner name and address. Log door-knock results, schedule follow-ups, and check storm data for the neighborhood without stopping your pace.' },
];

const faqs = [
  { q: 'What is Aria and how does it work?', a: 'Aria is Archie\'s built-in AI voice assistant. You activate Aria by voice or button press, speak your command in natural language, and Aria executes it within the Archie platform. It understands context, handles follow-up questions, and works with every module in the CRM.' },
  { q: 'How many voice commands does Aria support?', a: 'Aria supports 35+ distinct command types spanning lead management, scheduling, estimates, job management, weather checks, communication, reporting, photo management, and system navigation. Because Aria uses natural language processing, you do not need to memorize exact phrases. Just speak naturally and Aria will understand.' },
  { q: 'Does Aria work offline or without internet?', a: 'Aria requires an internet connection because it processes voice commands in the cloud. However, the processing happens in real time with sub-second latency, so it feels instant even on a cellular connection. Wi-Fi or strong 4G/5G is recommended for the best experience.' },
  { q: 'Can Aria understand accents and industry terminology?', a: 'Yes. Aria is trained on roofing industry vocabulary including terms like soffit, fascia, drip edge, ice dam, Xactimate, supplement, architectural shingle, TPO, and hundreds of others. It handles a wide range of English accents and dialects with high accuracy.' },
  { q: 'Is my voice data private and secure?', a: 'Voice interactions are processed in real time and are not stored as audio recordings. The text transcript of your commands is logged for your reference and to improve accuracy, but audio files are not retained. All data transmission is encrypted.' },
  { q: 'Can I use Aria with Bluetooth earbuds or truck speakers?', a: 'Yes. Aria works with any Bluetooth audio device, including earbuds, truck stereo systems, and smart speakers. This makes it ideal for hands-free operation while driving or working on the roof with wireless earbuds.' },
  { q: 'Does Aria work for Spanish-speaking team members?', a: 'Aria currently supports English commands. Spanish language support is on the roadmap for a future release. However, the crew mobile portal already supports Spanish for non-voice interactions.' },
  { q: 'How does Aria compare to Siri or Google Assistant?', a: 'Unlike general-purpose assistants, Aria is purpose-built for roofing operations. It understands your CRM data, can create leads and estimates, check job statuses, and pull roofing-specific reports. Siri cannot create a roofing estimate or check your pipeline. Aria can.' },
  { q: 'Can I use Aria to send texts to customers?', a: 'Yes. Say "Text Mrs. Johnson that we will arrive at 9am tomorrow" and Aria will compose and send the message through Archie\'s built-in SMS system. You can also dictate emails and internal team messages.' },
  { q: 'What devices support Aria?', a: 'Aria works on any device with a microphone and web browser: smartphones, tablets, laptops, and desktops. It is optimized for mobile use since most voice commands happen in the field. iOS and Android browsers are both fully supported.' },
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

export default function VoiceAssistant() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Aria - Archie Voice Assistant',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Aria is Archie\'s AI-powered voice assistant for roofing contractors. Aria supports 35+ voice commands for managing leads, scheduling, estimates, weather, communication, and reporting hands-free from the field.',
    url: 'https://archie.now/features/voice-assistant',
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
        <title>Aria Voice Assistant for Roofing | 35+ Voice Commands | Archie</title>
        <meta name="description" content="Meet Aria, the AI voice assistant built for roofers. 35+ commands for lead management, scheduling, estimates, weather, and reporting. Go hands-free on the roof, in the truck, or at the office." />
        <meta name="keywords" content="roofing voice assistant, hands-free CRM, voice commands for roofers, AI assistant roofing, field service voice assistant, voice-controlled CRM" />
        <link rel="canonical" href="https://archie.now/features/voice-assistant" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Meet <span className="text-gradient">Aria</span>, Your AI Voice Assistant for Roofing
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              35+ voice commands let you manage your entire roofing business hands-free. Create leads, schedule inspections, generate estimates, check weather, and pull reports just by speaking. Powered by the Aria AI Assistant for natural, conversational interaction.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={Mic}>Try Aria Free</CTAButton>
              <CTAButton href="#commands" variant="secondary" size="lg">See All Commands</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Voice Visualization */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 shadow-xl shadow-purple-500/25 mb-8">
            <Volume2 className="w-16 h-16 text-white animate-pulse-slow" />
          </motion.div>
          <h2 className="text-3xl font-extrabold text-archie-dark">"Hey Aria, create a lead for the homeowner I just spoke with"</h2>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">Aria understands natural language. No memorizing commands. No rigid syntax. Just speak normally and Aria handles the rest.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Aria AI Assistant" title="How Aria Works Under the Hood" subtitle="Aria uses advanced conversational AI purpose-built for roofing to understand your commands and take action in real time." light />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              { icon: Mic, title: 'Voice Input', desc: 'Speak naturally through your phone microphone, Bluetooth earbuds, or truck speakers. Aria captures your voice input and processes it in real time. Latency is under 500 milliseconds for instant responsiveness.' },
              { icon: Settings, title: 'AI Processing', desc: 'Aria interprets your intent, maps it to the correct CRM action, and pulls relevant context from your Archie data. It understands roofing terminology, your contact names, job addresses, and schedule context.' },
              { icon: Bell, title: 'Action & Response', desc: 'Aria executes the command within Archie and confirms the action via voice response. Lead created, appointment scheduled, estimate generated, or data retrieved. Everything happens in real time with confirmation.' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <item.icon className="w-12 h-12 text-purple-400 mx-auto mb-5" />
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Commands */}
      <section id="commands" className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="35+ Commands" title="Everything You Can Do With Your Voice" subtitle="From creating leads to pulling revenue reports, Aria handles the most common roofing CRM actions so you never have to type on a small screen." />
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {commandCategories.map((cat, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-archie-dark">{cat.category}</h3>
                </div>
                <ul className="space-y-3">
                  {cat.commands.map((cmd, j) => (
                    <li key={j} className="text-gray-600 text-sm leading-relaxed bg-gray-50 rounded-lg px-4 py-3 italic">{cmd}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Use Cases" title="Where Roofers Use Aria Every Day" subtitle="Voice control is not a gimmick. It is a necessity for professionals who work with their hands, drive between jobs, and multitask all day." light />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {useCases.map((uc, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <uc.icon className="w-10 h-10 text-purple-400 mb-4" />
                <h3 className="text-lg font-bold text-white mb-3">{uc.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Your CRM Should Work as Hard as You Do</h2>
          <p className="mt-4 text-lg text-white/80">Aria lets you manage your roofing business without putting down your tools. Try it free today.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Activate Aria Free</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Voice Assistant FAQ" title="Frequently Asked Questions About Aria" subtitle="Everything you want to know about using voice commands to run your roofing business." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Go Hands-Free. Go Faster. Go Archie.</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Aria is included with every Archie account. Start using voice commands to manage your roofing business today.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={Mic}>Start Free With Aria</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

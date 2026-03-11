import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  CloudLightning, ArrowRight, Zap, ChevronDown, CheckCircle2, MapPin,
  Shield, Target, BarChart3, Calendar, FileText, AlertTriangle, Wind,
  Thermometer, Eye, Users, Clock, Layers, Search
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const weatherData = [
  { icon: CloudLightning, name: 'Hail Events', desc: 'Real-time and historical hail event data from NOAA including hail stone diameter, event location, date, time, and affected radius. Filter by stone size to focus on damage-producing events (1 inch or larger) in your service area.' },
  { icon: Wind, name: 'Wind Events', desc: 'Recorded wind speed data from weather stations across the country. Identify events with sustained winds or gusts above 60 mph that cause shingle lift, ridge cap damage, and structural issues. Track wind direction for damage pattern validation.' },
  { icon: AlertTriangle, name: 'Tornado Data', desc: 'Tornado path maps with EF scale ratings, path width, and path length. Properties within tornado paths have automatic damage indicators. Track tornado proximity for properties that may have secondary wind damage outside the direct path.' },
  { icon: Thermometer, name: 'Severe Thunderstorms', desc: 'Severe thunderstorm warnings and reports that establish storm activity in your area. Useful for documenting that storm conditions existed on specific dates for insurance claim support and adjuster negotiations.' },
];

const canvassingFeatures = [
  { icon: MapPin, title: 'Territory Mapping', desc: 'Draw canvassing territories on an interactive map. Assign territories to sales reps, track coverage, and prevent overlap. See which streets have been knocked and which are still available. Territory data syncs with the CRM map view for real-time visibility.' },
  { icon: Target, title: 'Pin Drops & Tracking', desc: 'Drop pins on properties as you canvass. Mark results for each door: not home, interested, appointment set, not interested. Pins are color-coded by status and visible to the entire team. Managers can see which reps are working and where.' },
  { icon: BarChart3, title: 'Canvassing Analytics', desc: 'Track doors knocked, contact rate, appointment set rate, and close rate by territory, rep, and time period. Identify which neighborhoods produce the best leads and which reps are most effective. Use data to optimize your canvassing strategy.' },
  { icon: Calendar, title: 'Route Planning', desc: 'Plan efficient canvassing routes that minimize driving time between neighborhoods. Prioritize streets based on storm severity, roof age, and prior contact history. Save routes for repeat canvassing trips.' },
];

const stormReportFeatures = [
  'Professional storm reports with NOAA data, maps, and property-specific findings',
  'Branded with your company logo and contact information for homeowner presentations',
  'Includes hail stone size, wind speeds, and severe weather dates for the property zip code',
  'Maps showing storm path in relation to the homeowner property address',
  'Damage probability scoring based on storm severity and proximity',
  'Print-ready PDF format for door-to-door canvassing handouts',
  'Digital sharing via email, SMS, or public link for remote lead follow-up',
  'Integrates with AI inspection reports for combined storm and damage documentation',
];

const faqs = [
  { q: 'What is MyCanvass and how does it help my roofing business?', a: 'MyCanvass is Archie\'s storm intelligence and canvassing tool. It integrates real-time NOAA weather data to show you exactly where hail, wind, and tornado events have occurred in your service area. Use this data to identify neighborhoods with storm damage, plan canvassing routes, generate storm reports for homeowners, and connect storm events to insurance claims.' },
  { q: 'Where does the storm data come from?', a: 'All storm data comes from NOAA (National Oceanic and Atmospheric Administration), the most authoritative source for weather event records in the United States. NOAA data includes storm reports from trained weather spotters, radar-estimated events, and official National Weather Service warnings. This data is the same source insurance companies and adjusters use.' },
  { q: 'How quickly does new storm data appear in Archie?', a: 'NOAA storm reports typically appear in Archie within 24-48 hours of the event. Severe weather warnings and watches appear in real time. This means you can begin canvassing neighborhoods within a day or two of a significant hail or wind event, before most competitors even know the storm occurred.' },
  { q: 'What hail size is significant for roofing damage?', a: 'Generally, hail stones of 1 inch (quarter size) or larger can damage asphalt shingles. Stones of 1.75 inches (golf ball size) cause significant damage to most roofing materials. Archie lets you filter storm events by hail size so you can focus on neighborhoods most likely to have actionable damage.' },
  { q: 'Can I create storm reports for homeowners?', a: 'Yes. Archie generates branded storm reports that include NOAA data for the homeowner property address: hail event dates and sizes, wind speeds, severe weather warnings, and storm path maps. These reports are powerful tools for door-to-door canvassing and help establish storm causation during insurance claim discussions.' },
  { q: 'How do storm reports help with insurance claims?', a: 'Insurance claims require proof that storm damage occurred and is attributable to a specific weather event. Archie storm reports provide NOAA-sourced evidence of hail size, wind speed, and storm dates for the property location. Adjusters recognize NOAA data as authoritative, which strengthens your claim documentation.' },
  { q: 'Can I manage canvassing territories in Archie?', a: 'Yes. Draw territories on the interactive map, assign them to sales reps, and track door-knocking progress in real time. See which streets have been covered, how many doors were knocked, and what the contact and appointment rates are for each territory and rep.' },
  { q: 'Does the storm tool work for areas outside the storm path?', a: 'Yes. Even properties not directly in the reported storm path can sustain damage from associated severe weather. Archie shows storm proximity and severity gradients, helping you assess damage probability for properties in the broader affected area. This is especially important for hail events where the damage zone can extend miles from the reported center.' },
  { q: 'Can I see historical storm data for my area?', a: 'Yes. Archie provides access to historical NOAA storm data going back several years. This is valuable for identifying properties that were hit by storms but never filed claims, contacting homeowners who may not realize they have damage, and understanding storm patterns in your market.' },
  { q: 'How does storm data connect to the Archie CRM?', a: 'Storm events link directly to property records in the CRM. When you create a lead from a storm-affected area, the relevant storm data is automatically attached to the lead record. This data flows through to inspection reports, estimates, and insurance claim documentation without any manual data entry.' },
  { q: 'Can I track competitor activity in storm areas?', a: 'While Archie does not track competitor movements, the speed advantage of real-time storm data means you can identify and canvass affected neighborhoods before most competitors are aware of the event. Being first on the scene after a storm is the single most important factor in storm restoration lead generation.' },
  { q: 'Is the storm tool available on mobile for field use?', a: 'Yes. The storm map, territory management, pin drops, and storm report generation all work on mobile devices. Sales reps in the field can check storm data, see their assigned territory, drop pins as they canvass, and generate storm reports to show homeowners during door-to-door visits.' },
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

export default function StormTool() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Archie Storm Intelligence - MyCanvass',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'Storm intelligence platform for roofing contractors integrating real-time NOAA data for hail, wind, tornado, and severe weather events. Includes canvassing territory management, storm report generation, and CRM integration.',
    url: 'https://archie.now/features/storm-tool',
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
        <title>Storm Intelligence & Canvassing Tool for Roofers | NOAA Data | Archie</title>
        <meta name="description" content="Track hail, wind, and tornado events with real-time NOAA data. Generate branded storm reports, manage canvassing territories, and connect storm data to insurance claims. The ultimate storm chasing tool for roofing contractors." />
        <meta name="keywords" content="roofing storm tracking, hail map for roofers, NOAA storm data roofing, storm chasing roofing, canvassing tool roofers, roofing storm reports, hail damage leads, storm restoration software" />
        <link rel="canonical" href="https://archie.now/features/storm-tool" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(6,182,212,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link to="/features" className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline">
              <ArrowRight className="w-4 h-4 rotate-180" /> All Features
            </Link>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Storm Intelligence: <span className="text-gradient">Know Where to Knock</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6 text-xl text-gray-300 leading-relaxed">
              MyCanvass integrates real-time NOAA data for hail, wind, and tornado events. Generate branded storm reports, manage canvassing territories, and connect storm data directly to insurance claims. Be the first roofer on the scene after every storm.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-8 flex flex-wrap gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={CloudLightning}>Access Storm Data Free</CTAButton>
              <CTAButton href="#weather-data" variant="secondary" size="lg">See What We Track</CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Storm Map Preview */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="aspect-video rounded-2xl bg-gradient-to-br from-cyan-900 to-blue-900 border border-gray-200 shadow-2xl flex items-center justify-center">
            <div className="text-center">
              <CloudLightning className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
              <p className="text-white text-xl font-semibold">Interactive Storm Map</p>
              <p className="text-gray-400 mt-2">Real-time NOAA hail, wind, and tornado data</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weather Data Types */}
      <section id="weather-data" className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="NOAA Integration" title="Four Types of Storm Data That Generate Leads" subtitle="Every data point comes directly from NOAA, the same source insurance companies and adjusters rely on for claim decisions." light />
          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            {weatherData.map((w, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-cyan-500/30 transition-colors">
                <w.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{w.name}</h3>
                <p className="text-gray-400 leading-relaxed">{w.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Storm Reports */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading label="Storm Reports" title="Branded Storm Reports for Every Door" subtitle="Generate professional storm reports that show homeowners exactly what weather events hit their neighborhood." align="left" />
              <ul className="space-y-4 mt-6">
                {stormReportFeatures.map((item, i) => (
                  <motion.li key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-gray-600 leading-relaxed">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-cyan-50 to-blue-50 border border-cyan-200 flex items-center justify-center">
              <div className="text-center">
                <FileText className="w-16 h-16 text-cyan-600 mx-auto mb-4" />
                <p className="text-archie-dark text-xl font-semibold">Storm Report</p>
                <p className="text-gray-500 mt-2">Branded PDF for homeowner presentations</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Canvassing */}
      <section className="bg-archie-dark py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Canvassing Management" title="Territory Management Built for Storm Chasers" subtitle="Plan, execute, and measure canvassing campaigns with precision. Know which doors to knock and track every interaction." light />
          <div className="grid sm:grid-cols-2 gap-8 mt-8">
            {canvassingFeatures.map((f, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <f.icon className="w-10 h-10 text-cyan-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claims Connection */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Claims Integration" title="Storm Data That Flows Into Insurance Claims" subtitle="When storm data connects to your CRM, inspection reports, and insurance claims, you build the strongest case possible for every claim." />
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            {[
              { icon: CloudLightning, title: 'Storm Event Attached', desc: 'When you create a lead in a storm-affected area, the relevant NOAA storm events are automatically attached to the lead record. Hail size, wind speed, event date, and proximity are all captured without manual entry.' },
              { icon: Eye, title: 'AI Inspection Correlation', desc: 'AI inspection reports reference the attached storm data to show that detected damage is consistent with the reported weather event. This correlation strengthens the insurance claim by connecting cause and effect with authoritative data.' },
              { icon: Shield, title: 'Claim Documentation Package', desc: 'Generate a complete claim package that includes the storm report, AI inspection findings, photos, and damage-weather correlation. Adjusters receive everything they need to process the claim efficiently, reducing back-and-forth and speeding up approvals.' },
            ].map((item, i) => (
              <motion.div key={i} custom={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                <item.icon className="w-10 h-10 text-cyan-600 mb-4" />
                <h3 className="text-xl font-bold text-archie-dark mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-cta py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Be the First Roofer on the Scene After Every Storm</h2>
          <p className="mt-4 text-lg text-white/80">Real-time NOAA data means you can identify and canvass storm-affected neighborhoods before the competition. Built for roofers, by a roofer.</p>
          <div className="mt-8">
            <CTAButton href="https://app.archie.now" size="lg" className="bg-white !text-archie-dark hover:bg-gray-100 !shadow-none">Start Tracking Storms Free</CTAButton>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-archie-navy py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading label="Storm Tool FAQ" title="Frequently Asked Questions About Storm Intelligence" subtitle="Everything you need to know about using NOAA data and canvassing tools to grow your storm restoration business." light />
          <div className="space-y-3 mt-4">
            {faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">Turn Weather Events Into Revenue</h2>
          <p className="mt-6 text-xl text-gray-300 max-w-2xl mx-auto">Every storm is an opportunity. Archie makes sure you find it first, canvass it efficiently, and document it professionally.</p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <CTAButton href="https://app.archie.now" size="lg" icon={CloudLightning}>Get Storm Intelligence</CTAButton>
            <CTAButton href="/features" variant="secondary" size="lg">Explore All Features</CTAButton>
          </div>
        </div>
      </section>
    </>
  );
}

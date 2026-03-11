import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  MapPin, ArrowRight, DollarSign, CloudLightning, Wind, Sun,
  Users, Shield, BarChart3, Zap, ChevronDown, Home,
  CheckCircle2, Layers, Target, Calendar, FileText, Phone,
  TrendingUp, Wrench, Building2, ThermometerSun, Droplets,
  HardHat, ClipboardCheck, Brain, AlertTriangle,
} from 'lucide-react';
import SectionHeading from '../../components/SectionHeading';
import CTAButton from '../../components/CTAButton';
import cities from '../../data/cities';

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.5 } }),
};

const stormRiskColors = {
  Low: 'bg-green-500/20 text-green-400 border-green-500/30',
  Moderate: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  High: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  'Very High': 'bg-red-500/20 text-red-400 border-red-500/30',
};

const stormRiskDescriptions = {
  Low: 'experiences relatively mild weather conditions, but seasonal storms can still cause unexpected roof damage. Proactive inspections are key to staying ahead.',
  Moderate: 'faces moderate storm activity throughout the year, including occasional hail and wind events that create consistent demand for roofing services.',
  High: 'is located in an active storm corridor with frequent hail, high winds, and severe thunderstorms that drive significant roofing repair and replacement demand.',
  'Very High': 'sits in one of the most storm-active regions in the country, with frequent severe hail, tornadoes, and high-wind events that create year-round roofing demand.',
};

const materialDescriptions = {
  'Asphalt Shingles': 'The most popular choice for residential roofing. Archie\'s AI accurately measures asphalt shingle roofs from aerial imagery, generates instant estimates, and tracks material costs from local suppliers.',
  'Metal Roofing': 'Growing in popularity for its durability and energy efficiency. Archie handles standing seam, corrugated, and metal tile measurements with specialized AI models trained on metal roof profiles.',
  'Clay Tile': 'Common in warmer climates for its heat resistance and distinctive look. Archie\'s estimation engine includes tile weight calculations, underlayment requirements, and breakage allowances.',
  'Concrete Tile': 'A durable and cost-effective alternative to clay. Archie calculates precise tile counts, ridge cap quantities, and accounts for the structural requirements of concrete tile installations.',
  'Slate': 'A premium natural roofing material known for its longevity. Archie\'s AI identifies slate roofs from imagery and generates estimates that account for the specialized labor and material costs.',
  'Wood Shakes': 'Popular for their natural aesthetic in certain regions. Archie tracks wood shake pricing, fire treatment requirements, and local building code restrictions for shake installations.',
  'Cedar Shakes': 'Prized for their natural beauty and insulation properties. Archie factors in cedar-specific treatment costs, ventilation requirements, and regional availability in estimates.',
  'TPO/PVC': 'Standard for commercial flat roofing applications. Archie measures flat roof areas, calculates membrane quantities, and includes flashing and penetration details in commercial estimates.',
  'EPDM': 'A reliable single-ply membrane for commercial roofs. Archie\'s commercial estimation tools handle EPDM-specific adhesive, seam tape, and termination bar calculations.',
  'Built-Up Roofing': 'Traditional multi-layer commercial roofing system. Archie calculates layer counts, gravel or cap sheet quantities, and accounts for tear-off complexity in re-roofing estimates.',
  'Modified Bitumen': 'A popular choice for flat and low-slope commercial roofs. Archie includes torch-down, peel-and-stick, and hot-mopped application methods in its estimation calculations.',
  'Synthetic Slate': 'A lightweight alternative that mimics natural slate. Archie\'s AI distinguishes synthetic from natural slate in imagery and adjusts material costs and labor rates accordingly.',
  'Composite Shingles': 'Engineered for enhanced durability and aesthetic variety. Archie tracks composite shingle product lines and generates accurate estimates with manufacturer-specific pricing.',
  'Flat Roofing': 'Requires specialized measurement and drainage planning. Archie\'s AI calculates flat roof areas, identifies drainage points, and generates estimates with proper slope-to-drain specifications.',
  'Standing Seam Metal': 'Premium metal roofing with concealed fasteners. Archie calculates panel lengths, seam counts, and includes trim and flashing details for accurate standing seam estimates.',
};

function getWeatherChallenges(stormRisk, city) {
  const challenges = {
    Low: [
      { icon: Sun, title: 'UV Exposure', desc: `Even with lower storm risk, ${city.name} roofs face constant UV degradation that shortens material lifespan and causes premature aging.` },
      { icon: Droplets, title: 'Seasonal Rain', desc: `Periodic heavy rainfall in ${city.name} tests roof integrity and can expose vulnerabilities in aging roofing systems.` },
      { icon: ThermometerSun, title: 'Temperature Cycling', desc: `Daily temperature swings in ${city.name} cause thermal expansion and contraction that loosens fasteners and cracks sealants over time.` },
    ],
    Moderate: [
      { icon: CloudLightning, title: 'Seasonal Storms', desc: `${city.name} experiences moderate storm seasons with hail and wind events that create steady demand for roof repairs and inspections.` },
      { icon: Wind, title: 'Wind Events', desc: `Average wind speeds of ${city.avgWindSpeed} mph in ${city.name} regularly cause shingle lift and ridge cap damage during storm events.` },
      { icon: Droplets, title: 'Heavy Rainfall', desc: `Intense rain events in ${city.name} test roof drainage systems and expose leaks from storm-damaged areas.` },
    ],
    High: [
      { icon: CloudLightning, title: 'Frequent Hail', desc: `With ${city.annualHailDays} annual hail days, ${city.name} roofers face constant demand for hail damage assessment and repair.` },
      { icon: Wind, title: 'High Winds', desc: `Wind events averaging ${city.avgWindSpeed} mph regularly strip shingles and damage roofing systems across ${city.name}.` },
      { icon: AlertTriangle, title: 'Severe Thunderstorms', desc: `${city.name} sits in an active severe weather corridor, creating urgent demand for emergency roof repairs after major storm events.` },
    ],
    'Very High': [
      { icon: CloudLightning, title: 'Extreme Hail Events', desc: `${city.name} averages ${city.annualHailDays} hail days per year, placing it among the most hail-active markets in the country for roofing contractors.` },
      { icon: AlertTriangle, title: 'Tornado Alley Exposure', desc: `Located in a high-tornado-risk zone, ${city.name} experiences severe wind events that can devastate entire neighborhoods of roofs simultaneously.` },
      { icon: Wind, title: 'Sustained High Winds', desc: `Average wind speeds of ${city.avgWindSpeed} mph mean ${city.name} roofs face near-constant wind stress, requiring impact-resistant materials and expert installation.` },
    ],
  };
  return challenges[stormRisk] || challenges.Moderate;
}

function getBenefits(city) {
  return [
    { icon: Target, title: 'Storm Intelligence', desc: `Track real-time NOAA hail, wind, and tornado data for ${city.name} and surrounding areas. Be the first roofer to canvass after every storm.` },
    { icon: Brain, title: 'AI Roof Measurements', desc: `Get instant, accurate roof measurements for any property in ${city.name} from satellite imagery. No ladder needed for initial assessments.` },
    { icon: DollarSign, title: 'Instant Estimates', desc: `Generate professional estimates calibrated to ${city.name} material costs and labor rates. Close more deals with accurate, on-the-spot pricing.` },
    { icon: Users, title: 'CRM Built for Roofers', desc: `Manage your ${city.name} leads, customers, and jobs in a CRM designed specifically for roofing workflows, not generic sales pipelines.` },
    { icon: HardHat, title: 'Crew Management', desc: `Schedule and manage your roofing crews across ${city.name} job sites. Track production, materials, and job progress in real time.` },
    { icon: TrendingUp, title: 'Business Analytics', desc: `See your ${city.name} market performance at a glance. Track close rates, revenue, average job size, and growth trends across your service area.` },
  ];
}

function getFAQs(city) {
  return [
    {
      q: `How much does a new roof cost in ${city.name}?`,
      a: `The average roof replacement cost in ${city.name}, ${city.state} is approximately $${city.avgRoofCost.toLocaleString()}. However, costs vary based on roof size, pitch, material, and complexity. Archie's AI estimation tool provides instant, accurate quotes calibrated to ${city.name}'s current material prices and labor rates, helping contractors deliver professional estimates on the spot.`,
    },
    {
      q: `What's the best roofing material for ${city.name}'s climate?`,
      a: `The most popular roofing materials in ${city.name} include ${city.commonMaterials.slice(0, 3).join(', ')}. The best choice depends on your budget, aesthetic preference, and how well the material handles ${city.name}'s ${city.stormRisk.toLowerCase()} storm risk conditions. Archie's platform helps contractors recommend the right materials by analyzing local weather patterns and building code requirements.`,
    },
    {
      q: `How often should I inspect my roof in ${city.name}?`,
      a: `In ${city.name}, roofing professionals recommend inspections at least twice per year and after any significant storm event. With ${city.annualHailDays} average annual hail days and wind events, regular inspections are critical. Archie's AI inspection tool allows contractors to perform preliminary assessments from satellite imagery before scheduling an on-site visit.`,
    },
    {
      q: `Do I need a roofing license in ${city.state}?`,
      a: `Roofing license requirements in ${city.state} vary by city and county. Most jurisdictions require contractors to hold a valid license, carry liability insurance, and maintain workers' compensation coverage. Archie helps ${city.state} roofing contractors stay organized by tracking license renewals, insurance certificates, and compliance documentation within the platform.`,
    },
    {
      q: `What roofing software do contractors in ${city.name} use?`,
      a: `Roofing contractors in ${city.name} increasingly use Archie as their all-in-one business platform. Unlike generic CRMs or cobbled-together tool stacks, Archie is purpose-built for roofing with AI measurements, instant estimates, storm tracking, CRM, crew management, and financial tools all in one platform. It's the most comprehensive roofing software available.`,
    },
    {
      q: `How does storm damage affect roofing in ${city.name}?`,
      a: `${city.name} has a ${city.stormRisk.toLowerCase()} storm risk level with approximately ${city.annualHailDays} hail days per year and average wind speeds of ${city.avgWindSpeed} mph. Storm damage creates significant demand for roofing services. Archie's Storm Intelligence tool (MyCanvass) tracks NOAA weather data in real time, helping roofers identify affected neighborhoods and generate branded storm reports for homeowners.`,
    },
    {
      q: `What's the best time to replace a roof in ${city.name}?`,
      a: `The ideal time for roof replacement in ${city.name} depends on seasonal weather patterns. Generally, spring and fall offer the best conditions with moderate temperatures for proper material adhesion. However, storm damage repairs happen year-round. Archie's scheduling and production tools help ${city.name} contractors manage seasonal demand spikes and optimize crew scheduling across jobs.`,
    },
    {
      q: `How do I find roofing leads in ${city.name}?`,
      a: `The most effective lead generation strategies for ${city.name} roofers include storm canvassing with NOAA data, door-to-door sales, digital marketing, and referral programs. Archie's Prospector and Storm Intelligence tools help you identify high-probability leads by pinpointing storm-affected properties, tracking neighborhood activity, and managing follow-up sequences automatically through the CRM.`,
    },
    {
      q: `What insurance do roofers need in ${city.state}?`,
      a: `Roofing contractors in ${city.state} typically need general liability insurance, workers' compensation insurance, and commercial auto insurance at minimum. Many ${city.state} jurisdictions also require surety bonds. Archie helps roofing businesses track insurance policies, expiration dates, and certificate requests from general contractors and property owners.`,
    },
    {
      q: `How can AI help my roofing business in ${city.name}?`,
      a: `AI is transforming roofing in ${city.name}. Archie's AI provides instant roof measurements from satellite imagery, automated estimate generation with local pricing, storm damage probability scoring, intelligent lead prioritization, and voice-powered CRM updates. These tools are designed to help ${city.name} roofers save time on measurements, create professional estimates faster, and focus more on closing deals.`,
    },
  ];
}

function getNearbyCities(currentCity) {
  const sameSate = cities.filter(
    (c) => c.state === currentCity.state && c.slug !== currentCity.slug,
  );
  if (sameSate.length >= 6) return sameSate.slice(0, 6);
  const others = cities.filter(
    (c) => c.slug !== currentCity.slug && c.state !== currentCity.state,
  );
  return [...sameSate, ...others].slice(0, 6);
}

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

function StatCard({ icon: Icon, label, value, color = 'text-archie-orange' }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
    >
      <div className={`w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4`}>
        <Icon className={`w-6 h-6 ${color}`} />
      </div>
      <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
      <p className="text-2xl font-extrabold text-archie-dark">{value}</p>
    </motion.div>
  );
}

export default function CityPage() {
  const { citySlug } = useParams();
  const city = cities.find((c) => c.slug === citySlug);

  if (!city) {
    return (
      <div className="min-h-screen bg-archie-dark flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-archie-orange/10 flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-archie-orange" />
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-4">City Not Found</h1>
          <p className="text-gray-400 mb-8">
            We couldn't find the city you're looking for. It may not be in our directory yet, or the URL may be incorrect.
          </p>
          <CTAButton href="/" size="lg" icon={Home}>
            Back to Home
          </CTAButton>
        </div>
      </div>
    );
  }

  const nearbyCities = getNearbyCities(city);
  const weatherChallenges = getWeatherChallenges(city.stormRisk, city);
  const benefits = getBenefits(city);
  const faqs = getFAQs(city);

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: `Archie - Roofing Software for ${city.name}, ${city.state}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: `Archie is the #1 roofing business platform for contractors in ${city.name}, ${city.state}. AI-powered CRM, estimates, crew management, and storm intelligence.`,
    url: `https://archie.now/cities/${city.slug}`,
    areaServed: {
      '@type': 'City',
      name: city.name,
      addressRegion: city.stateAbbr,
      addressCountry: 'US',
    },
    provider: {
      '@type': 'Organization',
      name: 'Archie',
      url: 'https://archie.now',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{`Best Roofing Software in ${city.name}, ${city.state} | Archie`}</title>
        <meta
          name="description"
          content={`Archie is the #1 roofing business platform for contractors in ${city.name}, ${city.state}. AI-powered CRM, estimates, crew management, and storm intelligence.`}
        />
        <meta
          name="keywords"
          content={`roofing software ${city.name}, roofing CRM ${city.name}, ${city.name} roofing contractor software, storm tracking ${city.name} ${city.stateAbbr}, roofing estimates ${city.name}`}
        />
        <link rel="canonical" href={`https://archie.now/cities/${city.slug}`} />
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* ==================== HERO ==================== */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(249,115,22,0.12),transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-archie-orange text-sm font-medium mb-6 hover:underline"
            >
              <ArrowRight className="w-4 h-4 rotate-180" /> Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 mb-4"
            >
              <MapPin className="w-5 h-5 text-archie-orange" />
              <span className="text-archie-orange font-semibold text-sm uppercase tracking-wider">
                {city.name}, {city.stateAbbr}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              #1 Roofing Software for{' '}
              <span className="text-gradient">{city.name}, {city.stateAbbr}</span>{' '}
              Contractors
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-6 text-xl text-gray-300 leading-relaxed"
            >
              Archie helps roofing professionals serving the {city.name} market navigate{' '}
              {city.name}'s {city.stormRisk.toLowerCase()} storm risk environment with AI-powered
              tools built specifically for roofing contractors.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <CTAButton href="https://app.archie.now" size="lg" icon={Zap}>
                Start Free in {city.name}
              </CTAButton>
              <CTAButton href="#market-overview" variant="secondary" size="lg">
                See Local Market Data
              </CTAButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ==================== LOCAL MARKET OVERVIEW ==================== */}
      <section id="market-overview" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Local Market Data"
            title={`${city.name} Roofing Market at a Glance`}
            subtitle={`Key statistics for roofing contractors operating in ${city.name}, ${city.state} and the surrounding metro area.`}
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard
              icon={DollarSign}
              label="Avg. Roof Replacement"
              value={`$${city.avgRoofCost.toLocaleString()}`}
            />
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-archie-orange" />
              </div>
              <p className="text-sm text-gray-500 font-medium mb-1">Storm Risk Level</p>
              <span
                className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${
                  stormRiskColors[city.stormRisk] || stormRiskColors.Moderate
                }`}
              >
                {city.stormRisk}
              </span>
            </motion.div>
            <StatCard
              icon={CloudLightning}
              label="Annual Hail Days"
              value={city.annualHailDays}
              color="text-cyan-500"
            />
            <StatCard
              icon={Wind}
              label="Avg. Wind Speed"
              value={`${city.avgWindSpeed} mph`}
              color="text-blue-500"
            />
            <StatCard
              icon={Users}
              label="Population Served"
              value={city.population.toLocaleString()}
              color="text-purple-500"
            />
          </div>
        </div>
      </section>

      {/* ==================== WEATHER & STORM ==================== */}
      <section className="bg-archie-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            light
            label="Storm Intelligence"
            title={`Weather Challenges for ${city.name} Roofers`}
            subtitle={`${city.name} ${stormRiskDescriptions[city.stormRisk] || stormRiskDescriptions.Moderate}`}
          />

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {weatherChallenges.map((item, i) => (
              <motion.div
                key={item.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-5">
                  <item.icon className="w-7 h-7 text-archie-orange" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-archie-orange/10 to-archie-accent/10 border border-archie-orange/20 rounded-2xl p-8 md:p-12"
          >
            <div className="md:flex items-center gap-8">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Archie's Storm Tool: Built for {city.name}'s Weather
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  MyCanvass integrates real-time NOAA data so you see exactly where hail, wind, and
                  tornado events hit in {city.name} and surrounding areas. Generate branded storm
                  reports, plan canvassing routes, and connect storm data directly to insurance
                  claims -- all from your phone.
                </p>
                <ul className="space-y-3">
                  {[
                    `Real-time NOAA hail and wind data for ${city.name}`,
                    'Branded storm reports for homeowner door knocks',
                    'Territory management with pin-drop canvassing',
                    'Storm data linked directly to CRM leads and claims',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-archie-orange shrink-0 mt-0.5" />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8 md:mt-0 shrink-0">
                <CTAButton href="https://app.archie.now" size="lg" icon={CloudLightning}>
                  Access Storm Data
                </CTAButton>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==================== COMMON MATERIALS ==================== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Local Materials"
            title={`Popular Roofing Materials in ${city.name}`}
            subtitle={`The most commonly installed roofing materials in ${city.name}, ${city.stateAbbr} and how Archie's AI handles each type.`}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {city.commonMaterials.map((material, i) => (
              <motion.div
                key={material}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-archie-orange/10 flex items-center justify-center">
                    <Layers className="w-5 h-5 text-archie-orange" />
                  </div>
                  <h3 className="text-lg font-bold text-archie-dark">{material}</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {materialDescriptions[material] ||
                    `A popular roofing material in ${city.name}. Archie's AI estimation engine handles ${material.toLowerCase()} measurements, material calculations, and cost estimates tailored to local ${city.name} pricing.`}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEIGHBORHOODS ==================== */}
      <section className="bg-archie-navy py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            light
            label="Service Areas"
            title={`Neighborhoods Served in ${city.name}`}
            subtitle={`Archie helps roofers across ${city.name} and surrounding areas manage leads, estimates, and jobs in every neighborhood.`}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {city.topNeighborhoods.map((neighborhood, i) => (
              <motion.div
                key={neighborhood}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-center hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-archie-orange shrink-0" />
                  <span className="text-white text-sm font-medium">{neighborhood}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 mt-10 text-lg"
          >
            Plus dozens more neighborhoods across the greater {city.name} metro area.
          </motion.p>
        </div>
      </section>

      {/* ==================== WHY LOCAL ROOFERS CHOOSE ARCHIE ==================== */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label={`Why ${city.name} Roofers Choose Archie`}
            title={`Built for Roofing Contractors in ${city.name}`}
            subtitle={`Every feature in Archie is designed for the way roofing businesses actually work -- from storm chasing to crew scheduling to getting paid.`}
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-gray-50 border border-gray-100 rounded-2xl p-8 hover:shadow-xl transition-shadow"
              >
                <div className="w-14 h-14 rounded-xl bg-archie-orange/10 flex items-center justify-center mb-5">
                  <benefit.icon className="w-7 h-7 text-archie-orange" />
                </div>
                <h3 className="text-xl font-bold text-archie-dark mb-3">{benefit.title}</h3>
                <p className="text-gray-600 leading-relaxed">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA BANNER ==================== */}
      <section className="bg-archie-dark py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center"
          >
            <Zap className="w-12 h-12 text-archie-orange mx-auto mb-6" />

            <h3 className="text-2xl md:text-3xl text-white font-bold leading-relaxed mb-4">
              Ready to Grow Your Roofing Business in {city.name}?
            </h3>

            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Get AI-powered roof measurements, instant estimates, storm tracking, and a CRM built
              specifically for how roofers work. Start your free account today.
            </p>

            <CTAButton href="https://app.archie.now" size="lg" icon={ArrowRight}>
              Try Archie Free
            </CTAButton>
          </motion.div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-archie-navy py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SectionHeading
            light
            label="FAQ"
            title={`Roofing Questions About ${city.name}`}
            subtitle={`Common questions about roofing in ${city.name}, ${city.state} and how Archie helps local contractors succeed.`}
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NEARBY CITIES ==================== */}
      {nearbyCities.length > 0 && (
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <SectionHeading
              label="Nearby Markets"
              title="Explore Nearby Cities"
              subtitle={`Archie serves roofing contractors across ${city.state} and beyond. Explore other markets near ${city.name}.`}
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {nearbyCities.map((nearby, i) => (
                <motion.div
                  key={nearby.slug}
                  custom={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <Link
                    to={`/cities/${nearby.slug}`}
                    className="block bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-archie-orange/30 transition-all group"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-archie-orange/10 flex items-center justify-center group-hover:bg-archie-orange/20 transition-colors">
                        <MapPin className="w-5 h-5 text-archie-orange" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-archie-dark group-hover:text-archie-orange transition-colors">
                          {nearby.name}, {nearby.stateAbbr}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Pop. {nearby.population.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        Avg. Roof: ${nearby.avgRoofCost.toLocaleString()}
                      </span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold border ${
                          stormRiskColors[nearby.stormRisk] || stormRiskColors.Moderate
                        }`}
                      >
                        {nearby.stormRisk} Risk
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-1 text-archie-orange text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      View {nearby.name} <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== FINAL CTA ==================== */}
      <section className="bg-gradient-hero py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(249,115,22,0.15),transparent_70%)]" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Get Started Free
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-6">
              Grow Your {city.name}{' '}
              <span className="text-gradient">Roofing Business</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              Start your free account today. Get AI roof measurements, instant estimates, storm
              intelligence, CRM, crew management, and everything else you need to grow your
              roofing business in {city.name}, {city.stateAbbr}.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg" icon={Zap}>
                Start Free in {city.name}
              </CTAButton>
              <CTAButton href="/contact" variant="secondary" size="lg" icon={Phone}>
                Talk to Our Team
              </CTAButton>
            </div>
            <p className="text-gray-400 text-sm mt-6">
              No credit card required. Free plan available.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}

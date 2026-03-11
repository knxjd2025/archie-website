import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Cloud,
  CloudDrizzle,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Eye,
  HardHat,
  MapPin,
  Minus,
  Phone,
  Plus,
  Search,
  Shield,
  Sun,
  Thermometer,
  Wind,
  Zap,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

/* ───────── helpers ───────── */

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: 'easeOut' },
  }),
};

function regionFromZip(zip) {
  const first = parseInt(zip.charAt(0), 10);
  if (first <= 1) return 'northeast';
  if (first <= 3) return 'southeast';
  if (first <= 5) return 'midwest';
  if (first <= 7) return 'central';
  return 'west';
}

function generateWeather(zip) {
  const region = regionFromZip(zip);
  const seed = parseInt(zip, 10) || 50000;
  const pseudo = (n) => ((seed * 9301 + 49297) % 233280) / 233280 * n;

  const profiles = {
    northeast: { baseTemp: 38, humidity: 65, wind: 18, uv: 3, precip: 45, label: 'Northeast' },
    southeast: { baseTemp: 78, humidity: 72, wind: 8, uv: 8, precip: 25, label: 'Southeast' },
    midwest: { baseTemp: 55, humidity: 55, wind: 14, uv: 5, precip: 35, label: 'Midwest' },
    central: { baseTemp: 75, humidity: 50, wind: 10, uv: 7, precip: 20, label: 'South / Central' },
    west: { baseTemp: 65, humidity: 40, wind: 7, uv: 6, precip: 15, label: 'West' },
  };

  const p = profiles[region];
  const tempVariance = Math.round(pseudo(12) - 6);
  const temp = p.baseTemp + tempVariance;
  const humidity = Math.min(100, Math.max(10, p.humidity + Math.round(pseudo(10) - 5)));
  const wind = Math.max(0, p.wind + Math.round(pseudo(8) - 4));
  const uv = Math.min(11, Math.max(1, p.uv + Math.round(pseudo(3) - 1)));
  const precip = Math.min(100, Math.max(0, p.precip + Math.round(pseudo(20) - 10)));

  const conditions = ['Sunny', 'Partly Cloudy', 'Cloudy', 'Overcast', 'Light Rain', 'Rain'];
  const condIdx = precip < 15 ? 0 : precip < 30 ? 1 : precip < 45 ? 2 : precip < 60 ? 3 : precip < 80 ? 4 : 5;

  let rating, ratingColor, ratingBg;
  const tempOk = temp >= 40 && temp <= 90;
  const windOk = wind < 20;
  const precipOk = precip < 30;
  const score = (tempOk ? 1 : 0) + (windOk ? 1 : 0) + (precipOk ? 1 : 0);
  if (score === 3) { rating = 'Excellent'; ratingColor = 'text-emerald-400'; ratingBg = 'bg-emerald-500/20 border-emerald-500/40'; }
  else if (score === 2) { rating = 'Good'; ratingColor = 'text-blue-400'; ratingBg = 'bg-blue-500/20 border-blue-500/40'; }
  else if (score === 1) { rating = 'Fair'; ratingColor = 'text-yellow-400'; ratingBg = 'bg-yellow-500/20 border-yellow-500/40'; }
  else { rating = 'Poor'; ratingColor = 'text-red-400'; ratingBg = 'bg-red-500/20 border-red-500/40'; }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = new Date().getDay();
  const forecast = Array.from({ length: 7 }, (_, i) => {
    const dayTemp = temp + Math.round((Math.sin(i * 1.2) * 8));
    const dayPrecip = Math.min(100, Math.max(0, precip + Math.round(Math.cos(i * 1.5) * 15)));
    const dayWind = Math.max(0, wind + Math.round(Math.sin(i * 0.9) * 5));
    const dayCondIdx = dayPrecip < 15 ? 0 : dayPrecip < 30 ? 1 : dayPrecip < 45 ? 2 : dayPrecip < 60 ? 3 : dayPrecip < 80 ? 4 : 5;
    return {
      day: i === 0 ? 'Today' : dayNames[(today + i) % 7],
      high: dayTemp + 5,
      low: dayTemp - 8,
      condition: conditions[dayCondIdx],
      wind: dayWind,
      precip: dayPrecip,
    };
  });

  const stormTypes = ['Hailstorm', 'Severe Thunderstorm', 'Tropical Storm', 'Windstorm', 'Ice Storm'];
  const severities = ['Moderate', 'Severe', 'Minor', 'Significant', 'Watch'];
  const storms = Array.from({ length: 4 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (i * 7 + Math.round(pseudo(5))));
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      type: stormTypes[(seed + i) % stormTypes.length],
      severity: severities[(seed + i * 3) % severities.length],
      details: `${Math.round(pseudo(3) + 1)}-inch hail reported. Wind gusts up to ${Math.round(pseudo(30) + 40)} mph.`,
    };
  });

  const tips = [];
  if (temp < 40) tips.push('Temperatures below 40\u00b0F can prevent shingle adhesive from sealing properly. Use hand-sealing methods or wait for warmer conditions.');
  if (temp > 90) tips.push('High heat increases risk of heat exhaustion. Ensure crews have water, shade breaks, and start early in the morning.');
  if (wind >= 15) tips.push('Elevated wind speeds make working at heights dangerous and can blow shingles off before they seal. Consider postponing work.');
  if (precip >= 30) tips.push('Significant chance of rain. Wet surfaces are slip hazards and moisture trapped under shingles causes rot and mold.');
  if (uv >= 7) tips.push('UV index is high. Crews should wear sunscreen, hats, and UV-protective clothing.');
  if (tips.length === 0) tips.push('Weather conditions look ideal for roofing. Standard safety protocols apply.');
  tips.push('Always check OSHA guidelines for working at heights and ensure fall protection is in place.');

  return {
    region: p.label,
    temp,
    humidity,
    wind,
    uv,
    precip,
    condition: conditions[condIdx],
    rating,
    ratingColor,
    ratingBg,
    forecast,
    storms,
    tips,
  };
}

function conditionIcon(condition) {
  if (condition.includes('Rain')) return CloudRain;
  if (condition.includes('Drizzle')) return CloudDrizzle;
  if (condition.includes('Snow') || condition.includes('Ice')) return CloudSnow;
  if (condition.includes('Sunny')) return Sun;
  if (condition.includes('Partly')) return CloudSun;
  return Cloud;
}

/* ───────── FAQ data ───────── */

const FAQ_DATA = [
  { q: 'Can you roof in the rain?', a: 'No. Roofing in rain is dangerous due to slippery surfaces and can trap moisture under shingles, leading to mold, rot, and voided manufacturer warranties. Wait until surfaces are fully dry.' },
  { q: 'What is the minimum temperature for installing asphalt shingles?', a: 'Most manufacturers recommend a minimum of 40\u00b0F (4\u00b0C). Below this temperature, shingle adhesive strips won\'t properly activate, and shingles become brittle and prone to cracking during installation.' },
  { q: 'What wind speed is too high for roofing?', a: 'OSHA guidelines recommend stopping work when sustained winds exceed 20 mph. Gusts above 30 mph make it dangerous to handle materials and maintain balance at heights.' },
  { q: 'How soon after a storm should I inspect my roof?', a: 'Inspect within 24\u201348 hours if safe to do so. Document damage with photos and video before any temporary repairs. Contact your insurance company promptly as most policies have filing deadlines.' },
  { q: 'Does humidity affect roof installation?', a: 'High humidity (above 85%) can slow adhesive curing and affect paint/sealant application. It also increases slip risk on surfaces. Moderate humidity is generally fine for installation.' },
  { q: 'What size hail causes roof damage?', a: 'Hail 1 inch in diameter (quarter-sized) and larger typically causes damage to asphalt shingles. However, even smaller hail can damage older or already compromised roofing materials.' },
  { q: 'Can you install a roof in winter?', a: 'Yes, with precautions. Use cold-weather adhesive, hand-seal shingles, keep materials warm before installation, and choose days above 40\u00b0F. Winter installations take longer and may cost more.' },
  { q: 'How does UV exposure affect roofing materials?', a: 'Prolonged UV exposure breaks down the chemical bonds in asphalt shingles, causing them to become brittle, curl, and lose granules. Higher UV areas may need UV-resistant materials or more frequent replacement.' },
  { q: 'What weather conditions void a roofing warranty?', a: 'Installing below manufacturer minimum temperatures, in rain, or in excessive wind can void warranties. Always check the specific manufacturer\'s installation requirements for weather conditions.' },
  { q: 'How do I protect an unfinished roof from weather?', a: 'Use quality tarps secured with battens and weights. Apply ice-and-water shield on exposed decking. Never leave decking exposed overnight during storm season. Coordinate with weather forecasts.' },
  { q: 'Does snow need to be removed before roofing?', a: 'Yes. All snow, ice, and moisture must be removed and the deck must be completely dry before installing any roofing materials. This ensures proper adhesion and prevents trapped moisture.' },
  { q: 'What are the best months for roofing?', a: 'Late spring through early fall (May\u2013October) offers ideal conditions in most US regions. Temperatures are moderate, days are longer, and precipitation is generally predictable.' },
  { q: 'How does temperature affect metal roof installation?', a: 'Metal expands in heat and contracts in cold. Install in moderate temperatures (50\u201385\u00b0F) when possible. Allow for thermal movement in fastening systems and avoid installation on extremely hot metal surfaces.' },
  { q: 'Can you apply roof coating in cold weather?', a: 'Most roof coatings require a minimum of 50\u00b0F and rising, with no rain expected for 24 hours. Cold weather prevents proper curing and can cause the coating to crack or peel.' },
  { q: 'How do I track storms for roofing leads?', a: 'Use tools like Archie\'s Storm Intelligence feature that combines NOAA data, hail maps, and property data to identify affected neighborhoods in real time, giving you a head start on canvassing.' },
];

/* ───────── component ───────── */

export default function Weather() {
  const [leadCaptured, setLeadCaptured] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '' });
  const [formErrors, setFormErrors] = useState({});
  const [zip, setZip] = useState('');
  const [weather, setWeather] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  function handleFormChange(e) {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setFormErrors((p) => ({ ...p, [e.target.name]: '' }));
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Valid email is required';
    if (!form.phone.trim()) errors.phone = 'Phone is required';
    if (!form.company.trim()) errors.company = 'Company is required';
    if (Object.keys(errors).length) return setFormErrors(errors);
    setLeadCaptured(true);
  }

  function handleWeatherSearch(e) {
    e.preventDefault();
    if (!/^\d{5}$/.test(zip)) return;
    setWeather(generateWeather(zip));
  }

  return (
    <>
      <Helmet>
        <title>Roofing Weather Tool | Archie</title>
        <meta name="description" content="Free weather lookup tool built for roofers. Check roofing conditions, 7-day forecasts, storm activity, and safety tips for any US ZIP code." />
        <link rel="canonical" href="https://archie.now/weather" />
      </Helmet>

      {/* ── Hero ── */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-1/4 w-96 h-96 bg-archie-orange rounded-full blur-[120px]" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Free Tool
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
              Roofing Weather <span className="text-gradient">Lookup Tool</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
              Check current conditions, 7-day forecasts, recent storm activity, and safety recommendations for any US ZIP code. Built for roofers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Lead capture OR Dashboard ── */}
      <section className="py-20 bg-archie-light">
        <div className="max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            {!leadCaptured ? (
              <motion.div
                key="lead-form"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-lg mx-auto"
              >
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-archie-dark text-center mb-2">Unlock the Weather Tool</h2>
                  <p className="text-gray-500 text-center mb-8">Enter your info to get free, unlimited access.</p>

                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {[
                      { name: 'name', label: 'Full Name', type: 'text', placeholder: 'John Smith' },
                      { name: 'email', label: 'Email', type: 'email', placeholder: 'john@roofingco.com' },
                      { name: 'phone', label: 'Phone', type: 'tel', placeholder: '(555) 123-4567' },
                      { name: 'company', label: 'Company', type: 'text', placeholder: 'Smith Roofing LLC' },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">{f.label}</label>
                        <input
                          name={f.name}
                          type={f.type}
                          placeholder={f.placeholder}
                          value={form[f.name]}
                          onChange={handleFormChange}
                          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-archie-orange/50 focus:border-archie-orange transition"
                        />
                        {formErrors[f.name] && <p className="mt-1 text-xs text-red-500">{formErrors[f.name]}</p>}
                      </div>
                    ))}

                    <CTAButton className="w-full" icon={Zap} onClick={() => {}}>
                      <span className="sr-only">Submit</span>
                    </CTAButton>
                    <button type="submit" className="w-full bg-gradient-cta text-white font-semibold rounded-xl px-6 py-3.5 hover:brightness-110 transition-all cursor-pointer">
                      Get Free Access
                    </button>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {/* ZIP Input */}
                <div className="max-w-xl mx-auto mb-12">
                  <form onSubmit={handleWeatherSearch} className="flex gap-3">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        maxLength={5}
                        placeholder="Enter ZIP code (e.g. 75201)"
                        value={zip}
                        onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
                        className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 bg-white text-gray-800 placeholder-gray-400 text-lg focus:outline-none focus:ring-2 focus:ring-archie-orange/50 focus:border-archie-orange transition shadow-sm"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={zip.length !== 5}
                      className="bg-gradient-cta text-white font-semibold rounded-xl px-8 py-4 hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex items-center gap-2 shadow-lg shadow-archie-orange/25"
                    >
                      <Search className="w-5 h-5" /> Check Weather
                    </button>
                  </form>
                </div>

                {/* Weather Results */}
                <AnimatePresence mode="wait">
                  {weather && (
                    <motion.div
                      key={zip}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="space-y-10"
                    >
                      {/* Current Conditions + Safety sidebar */}
                      <div className="grid lg:grid-cols-3 gap-8">
                        {/* Current conditions */}
                        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                            <div>
                              <p className="text-sm text-gray-500 font-medium">Current Conditions for</p>
                              <h3 className="text-3xl font-bold text-archie-dark">{zip} &mdash; {weather.region}</h3>
                              <p className="text-gray-500 mt-1">{weather.condition}</p>
                            </div>
                            <div className={`px-5 py-2.5 rounded-full border text-sm font-bold ${weather.ratingBg} ${weather.ratingColor}`}>
                              <HardHat className="inline w-4 h-4 mr-1.5 -mt-0.5" />
                              Roofing: {weather.rating}
                            </div>
                          </div>

                          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                            {[
                              { icon: Thermometer, label: 'Temperature', value: `${weather.temp}\u00b0F`, sub: weather.temp < 40 ? 'Too cold' : weather.temp > 90 ? 'Too hot' : 'Ideal range' },
                              { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, sub: weather.humidity > 80 ? 'Very humid' : 'Acceptable' },
                              { icon: Wind, label: 'Wind Speed', value: `${weather.wind} mph`, sub: weather.wind >= 20 ? 'Dangerous' : weather.wind >= 15 ? 'Caution' : 'Safe' },
                              { icon: Sun, label: 'UV Index', value: weather.uv, sub: weather.uv >= 8 ? 'Very High' : weather.uv >= 6 ? 'High' : 'Moderate' },
                              { icon: CloudRain, label: 'Precip Chance', value: `${weather.precip}%`, sub: weather.precip >= 50 ? 'Likely rain' : weather.precip >= 30 ? 'Possible' : 'Low' },
                            ].map((stat) => (
                              <div key={stat.label} className="text-center p-4 rounded-xl bg-gray-50">
                                <stat.icon className="w-6 h-6 mx-auto mb-2 text-archie-orange" />
                                <p className="text-xs text-gray-500 font-medium">{stat.label}</p>
                                <p className="text-2xl font-bold text-archie-dark mt-1">{stat.value}</p>
                                <p className="text-xs text-gray-400 mt-1">{stat.sub}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Safety Tips sidebar */}
                        <div className="bg-archie-dark rounded-2xl shadow-lg p-6">
                          <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-archie-orange" /> Safety Tips
                          </h4>
                          <ul className="space-y-3">
                            {weather.tips.map((tip, i) => (
                              <li key={i} className="flex gap-3 text-sm text-gray-300">
                                <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* 7-day forecast */}
                      <div>
                        <h3 className="text-2xl font-bold text-archie-dark mb-6">7-Day Forecast</h3>
                        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
                          {weather.forecast.map((day, i) => {
                            const Icon = conditionIcon(day.condition);
                            return (
                              <motion.div
                                key={day.day}
                                custom={i}
                                variants={fadeUp}
                                initial="hidden"
                                animate="visible"
                                className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 text-center"
                              >
                                <p className="font-bold text-archie-dark text-sm">{day.day}</p>
                                <Icon className="w-8 h-8 mx-auto my-3 text-archie-orange" />
                                <p className="text-xs text-gray-400">{day.condition}</p>
                                <p className="mt-2 font-bold text-archie-dark">
                                  {day.high}\u00b0 <span className="text-gray-400 font-normal">/ {day.low}\u00b0</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                                  <Wind className="w-3 h-3" /> {day.wind} mph
                                </p>
                                <p className="text-xs text-gray-400 flex items-center justify-center gap-1">
                                  <Droplets className="w-3 h-3" /> {day.precip}%
                                </p>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Storm Activity */}
                      <div>
                        <h3 className="text-2xl font-bold text-archie-dark mb-6">Recent Storm Activity</h3>
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                          <div className="overflow-x-auto">
                            <table className="w-full text-left">
                              <thead>
                                <tr className="bg-gray-50 border-b border-gray-100">
                                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Severity</th>
                                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Details</th>
                                </tr>
                              </thead>
                              <tbody>
                                {weather.storms.map((storm, i) => (
                                  <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition">
                                    <td className="px-6 py-4 text-sm font-medium text-archie-dark whitespace-nowrap">{storm.date}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-2">
                                      <CloudLightning className="w-4 h-4 text-archie-orange" /> {storm.type}
                                    </td>
                                    <td className="px-6 py-4">
                                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                                        storm.severity === 'Severe' || storm.severity === 'Significant'
                                          ? 'bg-red-100 text-red-700'
                                          : storm.severity === 'Moderate'
                                          ? 'bg-yellow-100 text-yellow-700'
                                          : 'bg-blue-100 text-blue-700'
                                      }`}>
                                        {storm.severity}
                                      </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">{storm.details}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                          <div className="px-6 py-3 bg-gray-50 text-xs text-gray-400">
                            Data sourced from NOAA Storm Events Database. Simulated for demonstration purposes.
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!weather && (
                  <div className="text-center py-16">
                    <CloudSun className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                    <p className="text-gray-400 text-lg">Enter a ZIP code above to see roofing weather conditions.</p>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <SectionHeading
            label="FAQ"
            title="Weather & Roofing Questions"
            subtitle="Common questions about how weather affects roofing work."
          />

          <div className="space-y-3">
            {FAQ_DATA.map((item, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  initial={false}
                  className="border border-gray-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer hover:bg-gray-50 transition"
                  >
                    <span className="font-semibold text-archie-dark pr-4">{item.q}</span>
                    {isOpen ? <Minus className="w-5 h-5 text-archie-orange shrink-0" /> : <Plus className="w-5 h-5 text-gray-400 shrink-0" />}
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                      >
                        <p className="px-6 pb-5 text-gray-600 leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-hero">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <CloudLightning className="w-12 h-12 mx-auto text-archie-orange mb-6" />
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Get Real-Time Storm Alerts with Archie
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-xl mx-auto">
              Stop checking the weather manually. Archie monitors storms across your service area and alerts you the moment hail hits — so you can be the first to knock.
            </p>
            <CTAButton href="https://app.archie.now" size="lg" iconRight={ArrowRight}>
              Start Free Today
            </CTAButton>
          </motion.div>
        </div>
      </section>
    </>
  );
}

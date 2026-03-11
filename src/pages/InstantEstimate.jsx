import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Calculator,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  User,
  Mail,
  Phone,
  Building2,
  Ruler,
  Layers,
  MapPin,
  Home,
  Wrench,
  DollarSign,
  Sparkles,
  Shield,
  Star,
} from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import CTAButton from '../components/CTAButton';

/* ───────── animation helpers ───────── */

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ───────── data ───────── */

const MATERIALS = [
  { label: '3-Tab Asphalt Shingles', min: 3.5, max: 4.5 },
  { label: 'Architectural Shingles', min: 4.5, max: 6.0 },
  { label: 'Standing Seam Metal', min: 8, max: 14 },
  { label: 'Metal Corrugated', min: 5, max: 8 },
  { label: 'Clay Tile', min: 10, max: 18 },
  { label: 'Concrete Tile', min: 8, max: 14 },
  { label: 'Slate', min: 15, max: 30 },
  { label: 'TPO Flat Roof', min: 5, max: 8 },
  { label: 'EPDM Rubber', min: 4, max: 7 },
  { label: 'Cedar Shake', min: 8, max: 14 },
  { label: 'Synthetic Composite', min: 6, max: 10 },
];

const PITCHES = ['4/12', '5/12', '6/12', '7/12', '8/12', '9/12', '10/12', '12/12'];

const PITCH_MULTIPLIERS = {
  '4/12': 1.0,
  '5/12': 1.02,
  '6/12': 1.05,
  '7/12': 1.08,
  '8/12': 1.12,
  '9/12': 1.16,
  '10/12': 1.2,
  '12/12': 1.3,
};

const REGIONS = {
  Northeast: 1.15,
  Southeast: 0.95,
  Midwest: 0.9,
  Southwest: 1.0,
  'West Coast': 1.2,
  Mountain: 0.95,
};

const STATE_REGION = {
  AL: 'Southeast', AK: 'West Coast', AZ: 'Southwest', AR: 'Southeast', CA: 'West Coast',
  CO: 'Mountain', CT: 'Northeast', DE: 'Northeast', FL: 'Southeast', GA: 'Southeast',
  HI: 'West Coast', ID: 'Mountain', IL: 'Midwest', IN: 'Midwest', IA: 'Midwest',
  KS: 'Midwest', KY: 'Southeast', LA: 'Southeast', ME: 'Northeast', MD: 'Northeast',
  MA: 'Northeast', MI: 'Midwest', MN: 'Midwest', MS: 'Southeast', MO: 'Midwest',
  MT: 'Mountain', NE: 'Midwest', NV: 'Mountain', NH: 'Northeast', NJ: 'Northeast',
  NM: 'Southwest', NY: 'Northeast', NC: 'Southeast', ND: 'Midwest', OH: 'Midwest',
  OK: 'Southwest', OR: 'West Coast', PA: 'Northeast', RI: 'Northeast', SC: 'Southeast',
  SD: 'Midwest', TN: 'Southeast', TX: 'Southwest', UT: 'Mountain', VT: 'Northeast',
  VA: 'Southeast', WA: 'West Coast', WV: 'Southeast', WI: 'Midwest', WY: 'Mountain',
};

const STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' }, { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' }, { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' }, { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' }, { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' }, { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' }, { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' }, { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' }, { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' }, { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' }, { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' }, { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' }, { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' }, { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' }, { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' }, { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' }, { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

const FAQS = [
  {
    q: 'How much does a new roof cost in 2025?',
    a: 'The average cost of a new roof in 2025 ranges from $7,000 to $45,000 depending on the size of your home, materials selected, and your geographic location. A typical 2,000 sq ft asphalt shingle roof costs between $8,000 and $12,000, while premium materials like slate or standing seam metal can push costs to $30,000 or more. Labor costs have increased 8-12% since 2023 due to skilled labor shortages in the construction industry.',
  },
  {
    q: 'What affects roof replacement cost?',
    a: 'The primary factors affecting roof replacement cost are: roof size (measured in "squares" of 100 sq ft), material type, roof pitch/steepness, number of existing layers to remove, geographic location, accessibility, structural repairs needed, local permit fees, and the complexity of the roof design (valleys, dormers, skylights). Steep roofs (8/12 pitch or higher) require additional safety equipment and take longer to install, adding 15-30% to labor costs.',
  },
  {
    q: 'How long does a roof last?',
    a: 'Roof lifespan varies significantly by material: 3-tab asphalt shingles last 15-20 years, architectural shingles 25-30 years, metal roofing 40-70 years, clay and concrete tile 50-100+ years, slate 75-150+ years, cedar shake 20-40 years, and flat roof membranes (TPO/EPDM) 20-30 years. Climate, ventilation, maintenance, and installation quality all affect actual lifespan. Regular inspections and maintenance can extend any roof\'s life by 5-15 years.',
  },
  {
    q: 'Is metal roofing worth the investment?',
    a: 'Metal roofing is worth the investment for many homeowners despite its higher upfront cost (typically 2-3x the cost of asphalt shingles). Benefits include a 40-70 year lifespan, superior wind resistance (up to 140 mph), energy savings of 10-25% on cooling costs due to reflectivity, low maintenance, fire resistance, and increased home value. Metal roofs also qualify for insurance discounts in many states, particularly in hail-prone and hurricane-prone regions.',
  },
  {
    q: 'Should I repair or replace my roof?',
    a: 'Consider replacement if your roof is more than 75% through its expected lifespan, has widespread damage across multiple areas, shows signs of structural issues (sagging, water damage to decking), or if repair costs exceed 30% of full replacement cost. Repairs make sense for localized damage, minor leaks, missing shingles in a small area, or if the roof is less than 10 years old. A professional inspection can help you make the most cost-effective decision.',
  },
  {
    q: 'What\'s the cheapest roofing material?',
    a: '3-tab asphalt shingles are the most affordable roofing material at $3.50-$4.50 per square foot installed. They come in various colors, are widely available, and most roofing contractors are experienced installing them. However, they have the shortest lifespan (15-20 years) and offer less wind resistance than premium options. Architectural shingles cost only $1-2 more per square foot and last 25-30 years, making them a better long-term value for most homeowners.',
  },
  {
    q: 'How much does a roof cost per square?',
    a: 'A roofing "square" covers 100 square feet. Costs per square vary by material: asphalt shingles $350-$600, architectural shingles $450-$800, metal standing seam $800-$1,400, clay tile $1,000-$1,800, slate $1,500-$3,000, and cedar shake $800-$1,400. These prices include materials, labor, and basic accessories. Most residential roofs range from 15-40 squares, so multiplying the per-square cost by your roof\'s square count gives you a rough total estimate.',
  },
  {
    q: 'Does roof pitch affect cost?',
    a: 'Yes, roof pitch significantly affects cost. A steeper roof requires more safety equipment, takes longer to install, uses more materials (steeper roofs have more surface area), and may require specialized labor. Roofs with a pitch of 8/12 or greater are considered steep and typically add 10-30% to labor costs. Extremely steep roofs (12/12 and above) may require scaffolding or specialized harness systems, adding even more to the total cost.',
  },
  {
    q: 'How many layers of shingles can you have?',
    a: 'Most building codes allow a maximum of two layers of asphalt shingles on a roof. However, many roofing professionals recommend tearing off to the deck for any re-roof to inspect the underlying decking for damage, ensure proper installation of underlayment and ice/water shield, and avoid excess weight on the roof structure. Adding a second layer saves on tear-off costs ($1-2 per sq ft) but may void manufacturer warranties and can hide underlying issues.',
  },
  {
    q: 'What time of year is cheapest for roofing?',
    a: 'Late fall and winter (November through February) are typically the cheapest times for roof replacement in most regions. Roofing contractors are less busy during these months and may offer discounts of 5-15% to keep crews working. Spring and summer are peak season with higher prices and longer wait times. However, weather conditions matter — asphalt shingles need temperatures above 40\u00b0F to seal properly, and some materials shouldn\'t be installed in wet or freezing conditions.',
  },
  {
    q: 'Do I need a permit for a new roof?',
    a: 'In most jurisdictions, yes — a building permit is required for a full roof replacement. Permit costs typically range from $100-$500 depending on your location. Permits ensure the work meets local building codes, which protects you as the homeowner. Your roofing contractor should pull the permit on your behalf. Working without a permit can result in fines, required removal of the new roof, or issues when selling your home.',
  },
  {
    q: 'How long does roof replacement take?',
    a: 'A typical residential roof replacement takes 1-3 days for a standard asphalt shingle roof on a single-story home. Factors that extend the timeline include: larger roof size, steep pitch, multiple layers to tear off, structural repairs, complex roof designs with many valleys/dormers, and adverse weather. Metal and tile roofs generally take 3-7 days. Your contractor should provide a specific timeline based on your roof\'s characteristics.',
  },
  {
    q: 'Can I roof over existing shingles?',
    a: 'In many cases, yes — you can install new asphalt shingles over one existing layer if the current shingles are flat, the decking is in good condition, and local building codes allow it. This saves $1-2 per square foot in tear-off costs. However, roofing over is not recommended if there are signs of moisture damage, the existing shingles are curling or buckling, you\'re switching to a different material, or there are already two layers present.',
  },
  {
    q: 'What\'s the best roofing material for my climate?',
    a: 'Climate should heavily influence your material choice. For hot climates (Southwest, Southeast): metal or tile roofs reflect heat and reduce cooling costs. For cold/snowy climates (Northeast, Midwest): architectural shingles or metal with proper ice/water shield. For hurricane zones (Florida, Gulf Coast): metal roofing or impact-resistant shingles rated for high winds. For hail-prone areas (Midwest, Plains): impact-resistant Class 4 shingles or metal. For wet climates (Pacific Northwest): metal or synthetic materials that resist moss and algae.',
  },
  {
    q: 'How do I know if I need a new roof?',
    a: 'Common signs you need a new roof include: shingles that are curling, cracking, or missing; granules accumulating in gutters; daylight visible through the attic; sagging areas on the roof; water stains on interior ceilings or walls; the roof is over 20 years old (for asphalt shingles); mold or moss growth across large areas; increasing energy bills; and multiple recent leak repairs. If you notice three or more of these signs, schedule a professional inspection.',
  },
  {
    q: 'Does a new roof increase home value?',
    a: 'Yes, a new roof is one of the top home improvements for return on investment. According to industry data, a new asphalt shingle roof recoups approximately 60-70% of its cost at resale, while a new metal roof can recoup 85% or more. Beyond direct ROI, a new roof improves curb appeal, eliminates a major inspection red flag for buyers, may reduce insurance premiums, and makes your home easier to sell. In competitive markets, a new roof can be a significant selling advantage.',
  },
  {
    q: 'What\'s included in a roof replacement?',
    a: 'A complete roof replacement typically includes: removal of existing roofing material, inspection and repair of roof decking, installation of underlayment (felt or synthetic), ice and water shield in vulnerable areas, drip edge installation, new shingles/materials, ridge vent or other ventilation, flashing around penetrations (vents, pipes, chimneys), cleanup and debris removal, and final inspection. Get a detailed written scope of work from your contractor before signing a contract.',
  },
  {
    q: 'How do I choose a roofing contractor?',
    a: 'When choosing a roofing contractor, verify they are licensed and insured in your state, check reviews on Google and BBB, ask for at least three references from recent projects, get 3-5 written estimates for comparison, confirm they pull permits and schedule inspections, ask about manufacturer certifications (GAF Master Elite, CertainTeed Select ShingleMaster), ensure they offer a workmanship warranty in addition to the material warranty, and never pay more than 30% upfront. Avoid contractors who show up after storms offering immediate work at a discount.',
  },
  {
    q: 'Are roofing estimates free?',
    a: 'Most reputable roofing contractors offer free estimates. An in-person estimate should include a physical inspection of your roof, a written scope of work detailing what\'s included, material specifications and options, a clear total price or price range, timeline for completion, payment terms, and warranty information. Be wary of contractors who charge for estimates — this is not standard industry practice. Digital tools like Archie can provide instant ballpark estimates to help you budget before requesting in-person quotes.',
  },
  {
    q: 'What warranty should I expect?',
    a: 'You should receive two types of warranties: a manufacturer\'s material warranty and a contractor\'s workmanship warranty. Material warranties for asphalt shingles typically range from 25 years to lifetime, depending on the product line. Workmanship warranties from reputable contractors should be at least 5-10 years. Premium contractors offer 15-25 year workmanship warranties. Always get warranty terms in writing, understand what\'s covered and what voids the warranty, and keep all documentation. Manufacturer warranties are only valid if the materials were installed according to their specifications.',
  },
];

/* ───────── helper ───────── */

function fmt(num) {
  return num.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

/* ───────── component ───────── */

export default function InstantEstimate() {
  /* lead form state */
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [lead, setLead] = useState({ name: '', email: '', phone: '', company: '' });
  const [formErrors, setFormErrors] = useState({});

  /* calculator state */
  const [roofSize, setRoofSize] = useState(2000);
  const [pitch, setPitch] = useState('6/12');
  const [materialIdx, setMaterialIdx] = useState(1); // Architectural Shingles
  const [layers, setLayers] = useState(1);
  const [stateCode, setStateCode] = useState('TX');
  const [gutters, setGutters] = useState(false);
  const [skylightFlashing, setSkylightFlashing] = useState(false);
  const [skylightQty, setSkylightQty] = useState(1);
  const [chimneyFlashing, setChimneyFlashing] = useState(false);
  const [ridgeVent, setRidgeVent] = useState(false);
  const [deckingRepair, setDeckingRepair] = useState(false);

  /* ── lead form handlers ── */

  function handleLeadChange(e) {
    setLead((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (formErrors[e.target.name]) {
      setFormErrors((prev) => ({ ...prev, [e.target.name]: '' }));
    }
  }

  function handleLeadSubmit(e) {
    e.preventDefault();
    const errors = {};
    if (!lead.name.trim()) errors.name = 'Name is required';
    if (!lead.email.trim() || !/\S+@\S+\.\S+/.test(lead.email)) errors.email = 'Valid email is required';
    if (!lead.phone.trim() || lead.phone.replace(/\D/g, '').length < 10) errors.phone = 'Valid phone number is required';
    if (!lead.company.trim()) errors.company = 'Company name is required';
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormSubmitted(true);
  }

  /* ── calculations ── */

  const estimate = useMemo(() => {
    const mat = MATERIALS[materialIdx];
    const region = STATE_REGION[stateCode] || 'Southwest';
    const regionMult = REGIONS[region];
    const pitchMult = PITCH_MULTIPLIERS[pitch];

    const baseMin = roofSize * mat.min;
    const baseMax = roofSize * mat.max;

    const layerCostMin = layers * 1 * roofSize;
    const layerCostMax = layers * 2 * roofSize;

    let addonsMin = 0;
    let addonsMax = 0;

    if (gutters) { addonsMin += 1500; addonsMax += 3000; }
    if (skylightFlashing) { addonsMin += 300 * skylightQty; addonsMax += 500 * skylightQty; }
    if (chimneyFlashing) { addonsMin += 400; addonsMax += 800; }
    if (ridgeVent) { addonsMin += 500; addonsMax += 1000; }
    if (deckingRepair) {
      const deckArea = roofSize * 0.1;
      addonsMin += deckArea * 2;
      addonsMax += deckArea * 4;
    }

    const totalMin = (baseMin + layerCostMin + addonsMin) * pitchMult * regionMult;
    const totalMax = (baseMax + layerCostMax + addonsMax) * pitchMult * regionMult;

    // Good / Better / Best tiers
    const goodMin = totalMin * 0.85;
    const goodMax = totalMin * 1.0;
    const betterMin = (totalMin + totalMax) / 2 * 0.9;
    const betterMax = (totalMin + totalMax) / 2 * 1.1;
    const bestMin = totalMax * 1.0;
    const bestMax = totalMax * 1.2;

    return {
      totalMin,
      totalMax,
      region,
      regionMult,
      good: { min: goodMin, max: goodMax },
      better: { min: betterMin, max: betterMax },
      best: { min: bestMin, max: bestMax },
    };
  }, [roofSize, pitch, materialIdx, layers, stateCode, gutters, skylightFlashing, skylightQty, chimneyFlashing, ridgeVent, deckingRepair]);

  /* ───────── render ───────── */

  return (
    <>
      <Helmet>
        <title>Free Roof Estimate Calculator | Archie</title>
        <meta
          name="description"
          content="Get an instant roof replacement cost estimate. Enter your roof details and receive a free, detailed price range in seconds. Powered by Archie's AI roofing platform."
        />
        <meta
          name="keywords"
          content="how much does a new roof cost, roof estimate calculator, roof replacement cost, roofing cost estimator, free roof estimate, roof price calculator, new roof cost 2025, roofing estimate tool"
        />
        <link rel="canonical" href="https://app.archie.now/instant-estimate" />
        <meta property="og:title" content="Free Roof Estimate Calculator | Archie" />
        <meta property="og:description" content="Get an instant roof replacement cost estimate. Enter your roof details and see pricing in seconds." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://app.archie.now/instant-estimate" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Free Roof Estimate Calculator | Archie" />
        <meta name="twitter:description" content="Get an instant roof replacement cost estimate. Free calculator powered by Archie." />
      </Helmet>

      {/* ───────── HERO ───────── */}
      <section className="relative bg-gradient-hero pt-28 pb-20 overflow-hidden">
        {/* decorative blobs */}
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-archie-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-archie-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span
              variants={fadeIn}
              className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange"
            >
              Free Roofing Tool
            </motion.span>

            <motion.h1
              variants={fadeIn}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight"
            >
              Get Your <span className="text-gradient">Instant Roof Estimate</span>
            </motion.h1>

            <motion.p variants={fadeIn} className="mt-6 text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Answer a few quick questions about your roof and get a detailed cost estimate in seconds — completely free. No commitments, no surprise calls.
            </motion.p>

            <motion.div variants={fadeIn} className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {['No credit card required', 'Takes under 60 seconds', 'Built for roofing contractors'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-archie-orange" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ───────── LEAD CAPTURE / CALCULATOR ───────── */}
      <section className="py-20 bg-archie-light">
        <div className="max-w-5xl mx-auto px-6">
          {!formSubmitted ? (
            /* ── Lead Capture Form ── */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-xl mx-auto"
            >
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 sm:p-10">
                <div className="text-center mb-8">
                  <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-archie-orange/10 mb-4">
                    <Calculator className="w-7 h-7 text-archie-orange" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-archie-dark">
                    Unlock Your Free Estimate
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Enter your info below to access our instant roof estimate calculator.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="lead-name" className="block text-sm font-semibold text-archie-dark mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="lead-name"
                        name="name"
                        type="text"
                        value={lead.name}
                        onChange={handleLeadChange}
                        placeholder="John Smith"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${formErrors.name ? 'border-red-400' : 'border-gray-200'} focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark`}
                      />
                    </div>
                    {formErrors.name && <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="lead-email" className="block text-sm font-semibold text-archie-dark mb-1.5">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="lead-email"
                        name="email"
                        type="email"
                        value={lead.email}
                        onChange={handleLeadChange}
                        placeholder="john@company.com"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${formErrors.email ? 'border-red-400' : 'border-gray-200'} focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark`}
                      />
                    </div>
                    {formErrors.email && <p className="mt-1 text-xs text-red-500">{formErrors.email}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="lead-phone" className="block text-sm font-semibold text-archie-dark mb-1.5">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="lead-phone"
                        name="phone"
                        type="tel"
                        value={lead.phone}
                        onChange={handleLeadChange}
                        placeholder="(555) 123-4567"
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${formErrors.phone ? 'border-red-400' : 'border-gray-200'} focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark`}
                      />
                    </div>
                    {formErrors.phone && <p className="mt-1 text-xs text-red-500">{formErrors.phone}</p>}
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="lead-company" className="block text-sm font-semibold text-archie-dark mb-1.5">
                      Company Name
                    </label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        id="lead-company"
                        name="company"
                        type="text"
                        value={lead.company}
                        onChange={handleLeadChange}
                        placeholder="Acme Roofing Co."
                        className={`w-full pl-11 pr-4 py-3 rounded-xl border ${formErrors.company ? 'border-red-400' : 'border-gray-200'} focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark`}
                      />
                    </div>
                    {formErrors.company && <p className="mt-1 text-xs text-red-500">{formErrors.company}</p>}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full py-3.5 rounded-xl bg-gradient-cta text-white font-semibold text-lg shadow-lg shadow-archie-orange/25 hover:shadow-xl hover:shadow-archie-orange/35 hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Get My Estimate
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </form>

                <p className="mt-4 text-center text-xs text-gray-400">
                  Your information is secure and will never be shared with third parties.
                </p>
              </div>
            </motion.div>
          ) : (
            /* ── Calculator ── */
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <SectionHeading
                label="Roof Estimate Calculator"
                title="Customize Your Estimate"
                subtitle="Adjust the options below to get a personalized roof replacement cost range for your project."
              />

              <div className="grid lg:grid-cols-3 gap-8">
                {/* ── LEFT: Inputs ── */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Card wrapper */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 space-y-6">
                    {/* Roof Size */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-semibold text-archie-dark mb-2">
                        <Ruler className="w-4 h-4 text-archie-orange" />
                        Roof Size (sq ft)
                      </label>
                      <input
                        type="range"
                        min={500}
                        max={10000}
                        step={100}
                        value={roofSize}
                        onChange={(e) => setRoofSize(Number(e.target.value))}
                        className="w-full accent-archie-orange"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>500</span>
                        <span className="text-base font-bold text-archie-dark">{roofSize.toLocaleString()} sq ft</span>
                        <span>10,000</span>
                      </div>
                    </div>

                    {/* Pitch & Material row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Pitch */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-archie-dark mb-2">
                          <Home className="w-4 h-4 text-archie-orange" />
                          Roof Pitch
                        </label>
                        <select
                          value={pitch}
                          onChange={(e) => setPitch(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark bg-white"
                        >
                          {PITCHES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </div>

                      {/* Material */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-archie-dark mb-2">
                          <Layers className="w-4 h-4 text-archie-orange" />
                          Roofing Material
                        </label>
                        <select
                          value={materialIdx}
                          onChange={(e) => setMaterialIdx(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark bg-white"
                        >
                          {MATERIALS.map((m, i) => (
                            <option key={m.label} value={i}>
                              {m.label} (${m.min}-${m.max}/sqft)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Layers & State row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      {/* Layers */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-archie-dark mb-2">
                          <Wrench className="w-4 h-4 text-archie-orange" />
                          Layers to Remove
                        </label>
                        <select
                          value={layers}
                          onChange={(e) => setLayers(Number(e.target.value))}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark bg-white"
                        >
                          <option value={0}>0 layers (new construction)</option>
                          <option value={1}>1 layer (+$1-2/sqft)</option>
                          <option value={2}>2 layers (+$2-4/sqft)</option>
                        </select>
                      </div>

                      {/* State */}
                      <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-archie-dark mb-2">
                          <MapPin className="w-4 h-4 text-archie-orange" />
                          State
                        </label>
                        <select
                          value={stateCode}
                          onChange={(e) => setStateCode(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark bg-white"
                        >
                          {STATES.map((s) => (
                            <option key={s.code} value={s.code}>
                              {s.name} ({STATE_REGION[s.code]} &times;{REGIONS[STATE_REGION[s.code]]})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Add-ons */}
                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-archie-dark mb-3">
                        <Sparkles className="w-4 h-4 text-archie-orange" />
                        Additional Work
                      </p>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {/* Gutters */}
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-archie-orange/40 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={gutters}
                            onChange={(e) => setGutters(e.target.checked)}
                            className="accent-archie-orange w-4 h-4"
                          />
                          <span className="text-sm text-archie-dark">Gutter Replacement <span className="text-gray-400">(+$1,500-3,000)</span></span>
                        </label>

                        {/* Skylight */}
                        <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-archie-orange/40 transition-colors">
                          <input
                            type="checkbox"
                            checked={skylightFlashing}
                            onChange={(e) => setSkylightFlashing(e.target.checked)}
                            className="accent-archie-orange w-4 h-4 cursor-pointer"
                            id="skylight-check"
                          />
                          <label htmlFor="skylight-check" className="text-sm text-archie-dark cursor-pointer">
                            Skylight Flashing <span className="text-gray-400">(+$300-500 ea)</span>
                          </label>
                          {skylightFlashing && (
                            <input
                              type="number"
                              min={1}
                              max={10}
                              value={skylightQty}
                              onChange={(e) => setSkylightQty(Math.max(1, Math.min(10, Number(e.target.value))))}
                              className="w-14 px-2 py-1 rounded-lg border border-gray-200 text-sm text-center text-archie-dark ml-auto"
                            />
                          )}
                        </div>

                        {/* Chimney */}
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-archie-orange/40 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={chimneyFlashing}
                            onChange={(e) => setChimneyFlashing(e.target.checked)}
                            className="accent-archie-orange w-4 h-4"
                          />
                          <span className="text-sm text-archie-dark">Chimney Flashing <span className="text-gray-400">(+$400-800)</span></span>
                        </label>

                        {/* Ridge Vent */}
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-archie-orange/40 transition-colors cursor-pointer">
                          <input
                            type="checkbox"
                            checked={ridgeVent}
                            onChange={(e) => setRidgeVent(e.target.checked)}
                            className="accent-archie-orange w-4 h-4"
                          />
                          <span className="text-sm text-archie-dark">Ridge Vent <span className="text-gray-400">(+$500-1,000)</span></span>
                        </label>

                        {/* Decking Repair */}
                        <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 hover:border-archie-orange/40 transition-colors cursor-pointer sm:col-span-2">
                          <input
                            type="checkbox"
                            checked={deckingRepair}
                            onChange={(e) => setDeckingRepair(e.target.checked)}
                            className="accent-archie-orange w-4 h-4"
                          />
                          <span className="text-sm text-archie-dark">Decking Repair <span className="text-gray-400">(+$2-4/sqft for ~10% of roof)</span></span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ── RIGHT: Results ── */}
                <div className="space-y-6">
                  {/* Estimate card */}
                  <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 sticky top-28">
                    <h3 className="text-lg font-bold text-archie-dark mb-1">Estimated Cost Range</h3>
                    <p className="text-xs text-gray-400 mb-6">
                      {MATERIALS[materialIdx].label} &middot; {roofSize.toLocaleString()} sq ft &middot; {estimate.region} region
                    </p>

                    {/* Tiers */}
                    <div className="space-y-4">
                      {/* Good */}
                      <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                        <div className="flex items-center gap-2 mb-1">
                          <Shield className="w-4 h-4 text-gray-500" />
                          <span className="text-sm font-bold text-archie-dark">Good</span>
                        </div>
                        <p className="text-xl font-extrabold text-archie-dark">
                          {fmt(estimate.good.min)} &ndash; {fmt(estimate.good.max)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Budget-friendly, standard materials &amp; labor</p>
                      </div>

                      {/* Better */}
                      <div className="p-4 rounded-xl bg-archie-orange/5 border-2 border-archie-orange">
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-archie-orange" />
                          <span className="text-sm font-bold text-archie-dark">Better</span>
                          <span className="ml-auto text-[10px] font-bold uppercase tracking-wider text-archie-orange bg-archie-orange/10 px-2 py-0.5 rounded-full">
                            Most Popular
                          </span>
                        </div>
                        <p className="text-xl font-extrabold text-archie-dark">
                          {fmt(estimate.better.min)} &ndash; {fmt(estimate.better.max)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Quality materials, experienced crew, warranty included</p>
                      </div>

                      {/* Best */}
                      <div className="p-4 rounded-xl bg-archie-dark border border-archie-navy">
                        <div className="flex items-center gap-2 mb-1">
                          <Sparkles className="w-4 h-4 text-archie-orange" />
                          <span className="text-sm font-bold text-white">Best</span>
                        </div>
                        <p className="text-xl font-extrabold text-white">
                          {fmt(estimate.best.min)} &ndash; {fmt(estimate.best.max)}
                        </p>
                        <p className="text-xs text-gray-400 mt-1">Premium materials, top-rated contractor, extended warranty</p>
                      </div>
                    </div>

                    {/* Material highlight */}
                    <div className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200">
                      <p className="text-xs font-semibold text-archie-dark mb-2">Material Snapshot</p>
                      <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                        <span>Material</span>
                        <span className="font-semibold text-archie-dark">{MATERIALS[materialIdx].label}</span>
                        <span>Per Sq Ft</span>
                        <span className="font-semibold text-archie-dark">${MATERIALS[materialIdx].min}-${MATERIALS[materialIdx].max}</span>
                        <span>Region Factor</span>
                        <span className="font-semibold text-archie-dark">{estimate.region} (&times;{estimate.regionMult})</span>
                        <span>Pitch Factor</span>
                        <span className="font-semibold text-archie-dark">{pitch} (&times;{PITCH_MULTIPLIERS[pitch]})</span>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 p-4 rounded-xl bg-archie-orange/5 border border-archie-orange/20 text-center">
                      <p className="text-sm text-archie-dark font-semibold mb-1">
                        This is an estimate only.
                      </p>
                      <p className="text-xs text-gray-500 mb-3">
                        Get an exact, professional-grade quote with Archie's AI measurement tools.
                      </p>
                      <CTAButton href="https://app.archie.now" size="sm" iconRight={ArrowRight}>
                        Get Exact Quote with Archie
                      </CTAButton>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* ───────── FAQ SECTION ───────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <SectionHeading
            label="FAQ"
            title="Everything You Need to Know About Roof Costs"
            subtitle="Expert answers to the most common roofing cost questions to help you plan and budget for your project."
          />

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl overflow-hidden transition-all hover:border-archie-orange/30"
              >
                <summary className="flex items-center justify-between p-5 cursor-pointer select-none list-none [&::-webkit-details-marker]:hidden">
                  <span className="font-semibold text-archie-dark pr-4">{faq.q}</span>
                  <ChevronDown className="w-5 h-5 text-archie-orange shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <div className="px-5 pb-5 text-gray-600 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── FINAL CTA ───────── */}
      <section className="py-20 bg-gradient-hero relative overflow-hidden">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-archie-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[400px] h-[400px] bg-archie-accent/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Ready to Level Up?
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight">
              Want Accurate Estimates in Seconds?{' '}
              <span className="text-gradient">Try Archie Free</span>
            </h2>
            <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Stop guessing on roof costs. Archie's AI-powered platform generates professional estimates from satellite imagery, blueprints, and real-time material pricing — in under 60 seconds.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg" iconRight={ArrowRight}>
                Start Free
              </CTAButton>
              <CTAButton href="/features/estimates" variant="secondary" size="lg">
                See How It Works
              </CTAButton>
            </div>
            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
              {['No credit card required', 'Free forever', 'Cancel anytime'].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-archie-orange" />
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

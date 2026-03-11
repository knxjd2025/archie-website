import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  CloudLightning, ChevronDown, CheckCircle, AlertTriangle, Camera,
  Wind, Droplets, MapPin, Search, ArrowRight, Clock, Award,
  BookOpen, Target, CloudRain, Thermometer, Eye, Zap, Shield,
  BarChart3, FileText
} from 'lucide-react';
import CTAButton from '../../components/CTAButton';
import SectionHeading from '../../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const tocSections = [
  { id: 'hail-damage', title: '1. Hail Damage', icon: CloudRain },
  { id: 'wind-damage', title: '2. Wind Damage', icon: Wind },
  { id: 'tornado-hurricane', title: '3. Tornado & Hurricane Damage', icon: CloudLightning },
  { id: 'inspection', title: '4. How to Inspect for Damage', icon: Search },
  { id: 'documentation', title: '5. Documentation & Photography', icon: Camera },
  { id: 'weather-data', title: '6. NOAA Data & Weather Patterns', icon: Thermometer },
  { id: 'regional-patterns', title: '7. Regional Storm Patterns', icon: MapPin },
  { id: 'insurance-docs', title: '8. Insurance Documentation', icon: FileText },
  { id: 'archie-storm-tool', title: '9. Archie\'s Storm Tool', icon: Zap },
  { id: 'faq', title: 'Frequently Asked Questions', icon: Eye },
];

const faqs = [
  {
    q: 'How large does hail need to be to damage a roof?',
    a: 'Hail as small as 1 inch in diameter (quarter-sized) can damage standard asphalt shingles, especially if driven by high winds. However, the threshold varies by material: 3-tab shingles can be damaged by hail as small as 3/4 inch, architectural/laminate shingles typically require 1 inch or larger, impact-resistant (IR) shingles can withstand up to 2 inches, metal roofing may dent from 1-inch hail but typically maintains function, and tile roofing can crack from hail 1.5 inches and larger. Factors beyond size include hail density (solid ice vs. slushy), wind speed during the event, the age and condition of the roofing material, and the angle of impact.'
  },
  {
    q: 'Can I inspect for storm damage in the rain?',
    a: 'It is not recommended. Wet roofs are extremely slippery and dangerous, especially steep-slope roofs. Water on the surface also makes it difficult to identify granule loss, hail bruising, and other subtle damage indicators. Additionally, chalk marks (used to circle hail hits) will not adhere to wet surfaces. Wait at least 24 hours after rain for the roof to fully dry. If you must assess damage urgently, you can perform a ground-level inspection looking at gutters, siding, AC units, and other ground-level indicators of storm damage, and schedule the roof inspection once conditions are safe.'
  },
  {
    q: 'How soon after a storm should I inspect a roof?',
    a: 'Ideally, inspect within 24-72 hours of the storm event while damage is fresh and unmistakable. Hail damage on asphalt shingles is most visible immediately after the event — over time, granules can resettle and damage becomes harder to identify. However, do not inspect during ongoing severe weather or while conditions are unsafe. For large storm events affecting many homes, the first contractors in the affected neighborhoods typically secure the most jobs. Having a storm tracking tool that alerts you immediately when storms hit your market gives you a significant competitive advantage.'
  },
  {
    q: 'What is the difference between hail damage and normal wear?',
    a: 'Hail damage is characterized by random impact marks with no discernible pattern, displaced granules exposing the asphalt mat underneath, soft spots where the shingle mat has been bruised or fractured, fresh-looking exposed areas (not weathered), and corresponding damage on soft metals (gutters, flashing, vents). Normal wear shows as uniform granule loss across the roof, curling or cupping of shingle edges, moss or algae growth, cracking along shingle tabs (thermal splitting), and granule accumulation in gutters that has been occurring gradually. The key distinction is that hail damage is random and sudden, while wear is uniform and gradual.'
  },
  {
    q: 'What wind speed causes roof damage?',
    a: 'The threshold for wind damage to asphalt shingle roofs is generally 60-70 mph, though improperly installed or aged shingles can fail at lower speeds. Standard 3-tab shingles are rated for 60 mph winds, while architectural shingles are rated for 110-130 mph. However, the rated wind speed assumes proper installation with the correct number and placement of nails. Common wind damage includes lifted or creased shingle tabs, missing shingles or shingle sections, exposed nail heads from lifted shingles, and debris impact damage from branches, signs, or other objects. Wind damage is often directional — the side of the roof facing the prevailing wind direction during the storm will show the most damage.'
  },
  {
    q: 'How do I determine if damage was caused by a specific storm event?',
    a: 'Correlate the damage characteristics with weather data. Obtain NOAA storm reports, SPC hail reports, and local weather station data for the specific date. Compare hail size reported in the area with the damage found on the roof. Check for corresponding collateral damage on other surfaces (gutters, AC units, vehicles) that would have been affected simultaneously. Review the property for pre-existing damage that may predate the storm. Check with neighbors to see if they also have damage. The timeline between the storm event and the claim filing also matters — insurance companies are more skeptical of claims filed months after an event.'
  },
  {
    q: 'What are the signs of tornado damage on a roof?',
    a: 'Tornado damage ranges from minor (EF0) to catastrophic (EF5). Signs include: shingles torn off in large sections or strips rather than individual tabs, ridge cap lifted or removed, decking boards visible or missing, broken or displaced roof trusses, structural movement visible as wall separation from the roof, debris embedded in the roof surface, gutters twisted or torn from fascia, and in severe cases, partial or complete roof removal. Tornado damage patterns follow the tornado\'s path — damage will be concentrated along a line rather than spread uniformly across a neighborhood. Document the directionality of damage as this helps establish the tornado as the cause.'
  },
  {
    q: 'How does age affect a roof\'s vulnerability to storm damage?',
    a: 'Older roofs are significantly more vulnerable to storm damage. As asphalt shingles age, they lose granules (which protect against UV and impact), become more brittle (making them easier to crack and lift), lose adhesive bond strength (making them more susceptible to wind), and develop micro-cracks that weaken the mat. A 20-year-old roof with marginal remaining life may sustain damage from a storm that would not affect a 5-year-old roof. Insurance adjusters will note the roof\'s age and condition, and it affects the depreciation calculation on the claim. Some carriers will not insure roofs over a certain age (typically 15-20 years) or may only offer ACV coverage for older roofs.'
  },
  {
    q: 'What should I look for when inspecting flat roofs after a storm?',
    a: 'Flat roof storm damage differs from steep-slope damage. Look for: punctures from wind-driven debris, membrane tears or lifted seams, ponding water in new areas (indicating structural movement or drainage blockage), displaced or damaged flashing at edges and penetrations, gravel displacement on ballasted systems, damaged or dislodged rooftop equipment (HVAC units, exhaust fans), split membrane at corner and edge details where wind uplift is greatest, and blistering or bubbling that may indicate moisture infiltration. For TPO and PVC membranes, check welded seams for separation. For EPDM, check for shrinkage at edges and seam adhesive failure.'
  },
  {
    q: 'Can solar panels be damaged by hail?',
    a: 'Modern solar panels are designed to withstand hail up to 1 inch in diameter at 50 mph. However, larger hail (1.5 inches+) can crack solar panel glass, damage frames, and affect performance. After a hailstorm, inspect solar panels for cracked or shattered glass, visible cell damage beneath the glass, micro-cracks (may require specialized equipment to detect), frame damage or displacement, and wiring damage. Solar panel damage should be included in the insurance claim as a separate line item. Detach-and-reset charges for solar panels during a roof replacement are also claimable. Document the make, model, and quantity of panels for accurate estimating.'
  },
  {
    q: 'How do I estimate the cost of storm damage repairs?',
    a: 'For insurance claims, use Xactimate with local pricing databases. For retail repairs, calculate: the area of damage in squares (100 sq ft), materials needed (matched to existing or upgraded), labor hours based on repair complexity, equipment and access requirements, dump fees for removed materials, and your standard markup for overhead and profit. Minor repairs (replacing a few shingles, sealing a flashing) typically range from $150-$500. Partial roof sections may cost $1,000-$5,000. Full replacements driven by storm damage follow standard replacement pricing for the material type. Always include a contingency for hidden damage that may be discovered during the repair.'
  },
  {
    q: 'What is a "test square" and why is it important?',
    a: 'A test square is a 10-foot by 10-foot (100 square foot) area marked on the roof where you count and document every hail impact. It provides a standardized measurement of damage density that adjusters use to determine if damage meets the threshold for roof replacement. Most carriers require 8-10+ hits per test square to justify replacement (though this varies by carrier and policy). Mark the test square with chalk lines, photograph the entire square, then photograph each individual hail hit within it. Perform test squares on the most impacted roof plane (typically the side facing the storm direction) and on secondary planes for comparison. This systematic approach provides objective, measurable evidence that is difficult for adjusters to dispute.'
  },
  {
    q: 'How do I handle a roof with multiple layers when filing a storm claim?',
    a: 'If the damaged roof has multiple layers (a second layer of shingles over the first), the insurance claim should include tear-off charges for ALL layers, disposal costs for the additional material, and any additional labor for removing multiple layers. Building codes in most jurisdictions limit roofs to two layers, and most manufacturer warranties require installation over a single layer or clean deck. If there are two layers, both must be removed before re-roofing. This additional work is a legitimate claim expense. Document the number of layers during your inspection by checking exposed edges or lifting a shingle to view cross-sections.'
  },
  {
    q: 'What is wind-driven rain damage and is it covered?',
    a: 'Wind-driven rain occurs when high winds push rain horizontally, forcing water under shingles, through damaged flashings, or into gaps that would not normally leak under vertical rainfall. The resulting interior water damage — stained ceilings, wet insulation, damaged drywall, mold growth — is typically covered under homeowners insurance when caused by a covered wind event. However, water damage from maintenance issues (worn flashings, missing caulk, deteriorated shingles) is generally NOT covered. The key distinction is whether the water intrusion was caused by the storm event or by pre-existing conditions. Document the specific wind damage that allowed water entry and take photos of both the exterior entry point and interior damage.'
  },
  {
    q: 'How do I handle customers who want me to find damage that is not there?',
    a: 'This is an ethical and legal line you must never cross. Fabricating or exaggerating storm damage is insurance fraud — a felony in most states that carries prison time, heavy fines, and permanent loss of your license. If you inspect a roof and find no storm damage, tell the homeowner honestly. Explain what you looked for and why the roof does not meet the threshold for a claim. Offer maintenance services for any non-storm issues you identify. Your integrity is your most valuable long-term asset. Homeowners and adjusters remember honest contractors, and a reputation for integrity generates referrals and trust that far outweigh any short-term gain from inflating a claim.'
  },
  {
    q: 'What tools do I need for storm damage inspections?',
    a: 'Essential inspection tools include: a high-quality smartphone or camera (12+ megapixels), chalk or crayon for marking damage, a tape measure (at least 25 feet), a pitch gauge or smartphone inclinometer app, binoculars for initial ground-level assessment, a drone (optional but increasingly valuable for documentation), a notepad or tablet for recording observations, personal fall arrest system (harness, lanyard, anchor), sturdy extension ladder (minimum 28 feet), a moisture meter for detecting wet decking or insulation, reference objects for photo scale (coins, rulers), and a printed inspection checklist. Having professional, branded inspection report templates also adds credibility.'
  },
  {
    q: 'How long after a storm can damage be claimed?',
    a: 'Most homeowner insurance policies require claims to be filed within 1-2 years of the damage date, though this varies by carrier and state. Some states have specific statutes of limitations: for example, Texas gives homeowners 2 years from the date they knew or should have known about the damage. However, the sooner a claim is filed, the better. Late-filed claims face increased scrutiny because damage may have worsened due to lack of maintenance, other weather events may have contributed to the damage, evidence may have deteriorated, and adjusters will question why the homeowner waited if the damage was significant. Best practice: file claims within 30 days of the storm event whenever possible.'
  },
  {
    q: 'Can I inspect a roof using a drone instead of climbing it?',
    a: 'Drone inspections are increasingly accepted by insurance companies and can be an excellent supplement to physical inspections. Advantages include: safety (no fall risk), speed (inspect a roof in 10-15 minutes), documentation quality (high-resolution aerial photos and video), and the ability to inspect roofs that are too steep, too high, or too damaged to safely walk. However, drones have limitations: they cannot feel for soft spots or bruised shingles, small damage can be hard to see from drone altitude, wind and weather limit when you can fly, and FAA regulations require a Part 107 license for commercial drone use. Best practice: use drones for initial assessment and documentation, then verify findings with a physical inspection when safe and practical.'
  },
  {
    q: 'What is the most common type of storm damage to roofs?',
    a: 'Hail damage is the most common and most costly type of storm damage to roofs in the United States. According to NOAA and insurance industry data, hail causes over $10 billion in property damage annually, with roofing being the most affected component. The states with the most hail damage claims are Texas, Colorado, Nebraska, Kansas, Oklahoma, Minnesota, South Dakota, and the broader "Hail Belt" stretching from Texas through the Great Plains. Wind damage is the second most common, particularly in coastal states and the Southeast. Combined, hail and wind account for over 70% of all residential property insurance claims in the United States.'
  },
  {
    q: 'How do impact-resistant shingles perform in storms?',
    a: 'Impact-resistant (IR) shingles are rated using the UL 2218 standard, with Class 4 being the highest rating. Class 4 shingles can withstand a 2-inch steel ball dropped from 20 feet without cracking. In real-world storms, IR shingles significantly outperform standard shingles: they resist hail damage up to approximately 2 inches in diameter, maintain better granule adhesion under impact, and last longer overall due to their more durable construction. Many insurance companies offer premium discounts of 10-28% for Class 4 IR shingles, which can offset the 15-20% higher material cost within a few years. In hail-prone markets, recommending IR shingles provides genuine value to homeowners and can be a strong selling point.'
  },
  {
    q: 'What should I do if I suspect previous storm damage that was never repaired?',
    a: 'If you find evidence of prior storm damage (old hail hits with weathered granule displacement, previously repaired but failing patches, mismatched shingles from spot repairs), document it separately from any new damage. Prior unrepaired damage complicates new claims because the insurance company will argue that some damage is pre-existing. Be transparent with both the homeowner and the adjuster about what appears to be new versus old damage. In some cases, the homeowner may have a valid claim for prior damage that was never reported. However, mixing old and new damage in a single claim raises fraud red flags. Always err on the side of honesty and transparency.'
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

export default function StormDamageGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Storm Damage Assessment Guide for Roofing Contractors",
    "description": "Complete guide to identifying, documenting, and assessing storm damage on roofs. Covers hail, wind, tornado, and hurricane damage with inspection techniques and insurance documentation.",
    "author": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "publisher": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "datePublished": "2025-01-25",
    "dateModified": "2025-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://archie.now/resources/storm-damage-guide" },
  };

  return (
    <>
      <Helmet>
        <title>Storm Damage Assessment Guide for Roofing Contractors | Archie</title>
        <meta name="description" content="The definitive guide to storm damage assessment for roofers. Learn to identify hail, wind, tornado, and hurricane damage. Expert inspection techniques, documentation standards, and insurance claim strategies." />
        <meta name="keywords" content="storm damage assessment, hail damage roof, wind damage shingles, roof inspection guide, storm damage documentation, roofing insurance claims, hail damage identification" />
        <link rel="canonical" href="https://archie.now/resources/storm-damage-guide" />
        <meta property="og:title" content="Storm Damage Assessment Guide for Roofing Contractors" />
        <meta property="og:description" content="Master storm damage identification and documentation. The complete guide for roofing contractors." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Storm Damage Resource
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Storm Damage Assessment Guide for <span className="text-gradient">Roofing Contractors</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Learn to identify, document, and assess every type of storm damage. From hail identification to hurricane recovery, this is your complete field guide.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 30 min read</span>
              <span>|</span>
              <span className="flex items-center gap-1"><Award className="w-4 h-4" /> Updated March 2025</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="bg-archie-light py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-archie-dark mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-archie-orange" /> Table of Contents
            </h2>
            <nav className="grid sm:grid-cols-2 gap-3">
              {tocSections.map(s => (
                <a key={s.id} href={`#${s.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-archie-orange/5 transition-colors group">
                  <s.icon className="w-5 h-5 text-archie-orange shrink-0" />
                  <span className="text-gray-700 group-hover:text-archie-orange transition-colors font-medium">{s.title}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Section 1: Hail Damage */}
      <section id="hail-damage" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">1. Hail Damage</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Hail damage is the leading cause of roofing insurance claims in the United States, generating over <strong>$10 billion in insured losses annually</strong>. The United States experiences approximately 5,000 hailstorms per year, with the most severe activity concentrated in the Great Plains and Midwest states. Understanding how to identify and document hail damage is arguably the most important skill for any storm restoration contractor.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">How Hail Damages Asphalt Shingles</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              When hailstones strike an asphalt shingle, the impact displaces protective granules and compresses or fractures the underlying fiberglass mat. This damage is significant because it exposes the asphalt to UV radiation, which accelerates deterioration. A shingle that would have lasted 20 more years may fail in 5-7 years after hail damage due to accelerated UV degradation. The damage also creates weak points where water can penetrate, leading to leaks, deck rot, and interior damage over time.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Hail Damage by Material Type</h3>
            <div className="space-y-4 mb-6">
              {[
                {
                  material: 'Asphalt Shingles (3-Tab)',
                  signs: 'Random dark spots where granules are displaced, exposing black mat. Soft spots indicating mat fracture. May show circular indentations. Bruising may be felt by pressing gently with your thumb — damaged areas feel soft or spongy compared to undamaged areas.',
                  threshold: '3/4 inch hail and above'
                },
                {
                  material: 'Architectural/Laminate Shingles',
                  signs: 'Similar to 3-tab but more impact resistant due to thicker construction. Look for granule loss in circular patterns, cracked or dislodged granules, and soft spots. The dimensional surface can mask damage, so inspect carefully at multiple angles.',
                  threshold: '1 inch hail and above'
                },
                {
                  material: 'Metal Roofing',
                  signs: 'Dents or dimples in the metal surface. On standing seam, check flat panels between seams. On corrugated, check the ridges and valleys. Metal dents are purely cosmetic unless they crack a coating or create a water trap. Some policies exclude cosmetic metal damage.',
                  threshold: '1 inch hail (for denting); 2+ inches for functional damage'
                },
                {
                  material: 'Clay/Concrete Tile',
                  signs: 'Cracked, chipped, or broken tiles. Tiles may show impact fractures radiating from a central point. Concrete tiles may show spalling (surface chips). Damage is often visible from the ground. Replacement requires matching existing tile profiles and colors.',
                  threshold: '1.5 inches and above'
                },
                {
                  material: 'Slate',
                  signs: 'Cracked or broken slates, chipped edges, and punctures. Natural slate is relatively impact-resistant but brittleness increases with age. Replacement with matching natural slate can be very expensive.',
                  threshold: '1.5 inches and above'
                },
                {
                  material: 'Wood Shake/Shingle',
                  signs: 'Splits along the grain with sharp, clean edges (storm damage) versus rounded, weathered splits (age). Hail impacts may create indentations or circular marks. Impact dents with displaced wood fibers. Orange-tinted fresh wood visible at splits.',
                  threshold: '1 inch and above'
                },
              ].map((m, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-5">
                  <h4 className="font-bold text-archie-dark mb-1">{m.material}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed mb-2">{m.signs}</p>
                  <p className="text-archie-orange text-sm font-medium">Typical damage threshold: {m.threshold}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Hail Size Reference Chart</h3>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left text-gray-600 text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="py-3 pr-4">Size</th>
                    <th className="py-3 pr-4">Diameter</th>
                    <th className="py-3 pr-4">Comparison</th>
                    <th className="py-3">Damage Potential</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Pea', '1/4"', 'Pea', 'Minimal to none'],
                    ['Marble', '1/2"', 'Marble / small grape', 'Light granule loss on aged shingles'],
                    ['Dime', '3/4"', 'Penny to dime', 'Moderate damage to 3-tab shingles'],
                    ['Quarter', '1"', 'Quarter', 'Damage to most asphalt shingles'],
                    ['Half Dollar', '1.25"', 'Half dollar', 'Significant damage to all asphalt'],
                    ['Ping Pong', '1.5"', 'Ping pong ball', 'Severe damage, tile cracking'],
                    ['Golf Ball', '1.75"', 'Golf ball', 'Severe damage to all materials'],
                    ['Tennis Ball', '2.5"', 'Tennis ball', 'Catastrophic, structural risk'],
                    ['Baseball', '2.75"', 'Baseball', 'Catastrophic damage, punctures likely'],
                    ['Softball', '4.5"', 'Softball', 'Extreme destruction, life-threatening'],
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-gray-100">
                      <td className="py-2 pr-4 font-medium">{row[0]}</td>
                      <td className="py-2 pr-4">{row[1]}</td>
                      <td className="py-2 pr-4">{row[2]}</td>
                      <td className="py-2 text-archie-orange">{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 2: Wind Damage */}
      <section id="wind-damage" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">2. Wind Damage</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Wind damage to roofs can range from lifted shingle tabs to complete structural failure. Understanding wind patterns, how roofs interact with wind forces, and what to look for during inspections is essential for accurate damage assessment. Wind damage accounts for approximately 25% of all homeowner insurance claims and is particularly prevalent in coastal areas, the Southeast, and the Great Plains.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">How Wind Damages Roofs</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Wind does not exert uniform pressure across a roof. Instead, it creates areas of high negative pressure (suction) at edges, corners, and ridges. This is why wind damage is typically worst at the perimeter of the roof, at the ridge, and at corners — areas where uplift forces are 2-3 times greater than in the center of the roof field. The wind speed at which damage occurs depends on the material type, installation quality, age of the sealant strip, roof geometry, and surrounding terrain and structures.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Wind Speed Classification and Expected Damage</h3>
            <div className="space-y-4 mb-8">
              {[
                { speed: '45-57 mph', category: 'Moderate', damage: 'Minor damage to older roofs. Loose or improperly sealed shingles may lift. Ridge cap may be affected. Debris from trees may impact roof.' },
                { speed: '58-74 mph', category: 'Severe Thunderstorm', damage: 'Standard 3-tab shingles begin to fail. Edge and ridge shingles lift or tear. Soffits and fascia may be damaged. Tree limb impacts common.' },
                { speed: '75-95 mph', category: 'Hurricane Cat 1 / Strong Thunderstorm', damage: 'Significant shingle loss on standard roofs. Architectural shingles may lift at edges. Flat roof membranes may peel at edges. Structural damage to older buildings.' },
                { speed: '96-130 mph', category: 'Hurricane Cat 2-3', damage: 'Extensive damage to all roof types. Structural damage to roof decking. Complete removal of inadequately attached materials. Major debris impact damage.' },
                { speed: '131+ mph', category: 'Hurricane Cat 4-5 / EF3+ Tornado', damage: 'Catastrophic damage. Structural failure of roof framing. Complete roof removal possible. Only impact-rated or wind-rated systems survive.' },
              ].map((w, i) => (
                <div key={i} className="bg-archie-navy rounded-lg p-5 border border-archie-blue/20">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-archie-orange font-bold">{w.speed}</span>
                    <span className="text-gray-400">|</span>
                    <span className="text-white font-medium">{w.category}</span>
                  </div>
                  <p className="text-gray-300 text-sm">{w.damage}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Common Wind Damage Indicators</h3>
            <div className="space-y-3 mb-6">
              {[
                'Lifted, curled, or creased shingle tabs (check adhesive strips for failure)',
                'Missing shingles — look for exposed felt or decking and nails',
                'Shingle debris in the yard or gutters',
                'Ridge cap shingles lifted, displaced, or missing',
                'Exposed or raised nail heads from lifted shingles',
                'Damaged or dislodged drip edge and flashing at eaves and rakes',
                'Soffit panels pushed in or blown off (indicates attic pressurization)',
                'Gutter sections pulled away from fascia',
                'Debris impact marks on the roof surface',
                'Directional damage pattern — damage concentrated on the windward side',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-archie-orange shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 3: Tornado & Hurricane */}
      <section id="tornado-hurricane" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">3. Tornado & Hurricane Damage</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Tornado and hurricane events represent the most severe and most complex storm damage scenarios. These events can affect hundreds or thousands of homes simultaneously, creating massive demand for roofing services and unique challenges around material availability, labor shortages, and claims processing backlogs. Contractors who are prepared to respond to these events can generate significant revenue while providing a vital community service.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Tornado Damage Assessment</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Tornadoes are classified on the Enhanced Fujita (EF) Scale from EF0 (65-85 mph) to EF5 (200+ mph). Even EF0 tornadoes can cause significant roof damage, while EF3 and above can destroy structures entirely. Tornado damage follows a linear path — the tornado's track will show a clear line of damage with the most severe damage at the center of the path. Key differences from straight-line wind damage include multi-directional debris impact (tornado winds rotate), objects embedded in the roof structure, structural twisting or movement visible in the framing, and a narrow damage path rather than broad-area damage.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Hurricane Damage Assessment</h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              Hurricanes bring three types of damaging forces: sustained high winds, wind-driven rain, and storm surge (flooding in coastal areas). For roof assessments after hurricanes, document the wind damage (shingle loss, structural damage) separately from water damage (leaks, interior damage) and flood damage (which is covered by separate NFIP flood policies, not homeowner's insurance). Hurricane damage assessments also need to account for temporary emergency repairs (tarping), which should be documented and claimed separately, the potential for mold growth if roofs were compromised and not tarped quickly, extended timelines for adjuster inspections during catastrophic events, and material and labor shortages that may affect repair costs and timelines.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Safety Considerations for Catastrophic Events</h3>
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-red-800 mb-2">Critical Safety Warning</h4>
                  <p className="text-red-700 leading-relaxed mb-4">
                    Inspecting properties after tornadoes and hurricanes presents serious safety hazards not present in normal storm damage inspections.
                  </p>
                  <div className="space-y-2">
                    {[
                      'Never enter a structure that shows signs of structural compromise (leaning walls, sagging roof, foundation cracking)',
                      'Watch for downed power lines and assume all wires are live until the utility confirms they are de-energized',
                      'Be aware of hazardous materials (asbestos in older homes, chemical spills from damaged storage)',
                      'Wear appropriate PPE: hard hat, steel-toe boots, gloves, N95 respirator (mold risk), safety glasses',
                      'Work in pairs — never inspect a damaged property alone',
                      'Check for gas leaks (smell of rotten eggs) before entering any structure',
                      'Be cautious of weakened roof structures that may not support your weight',
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                        <span className="text-red-700 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 4: Inspection */}
      <section id="inspection" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">4. How to Inspect for Storm Damage</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              A systematic inspection process ensures you identify all damage, document it properly, and present your findings credibly to both the homeowner and the insurance adjuster. Rushing through inspections or using an inconsistent approach leads to missed damage, weak documentation, and lower claim approvals.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">The 5-Phase Inspection Process</h3>

            <div className="space-y-6 mb-8">
              {[
                {
                  phase: 'Phase 1: Ground-Level Assessment',
                  steps: [
                    'Walk the entire property perimeter, looking at all sides of the building',
                    'Inspect gutters and downspouts for dents, granule accumulation, and damage',
                    'Check siding, window screens, and trim for hail or wind damage',
                    'Examine AC units, fence posts, and outdoor furniture for impact marks',
                    'Look at the roof from ground level with binoculars — note visible damage, missing shingles, or lifted areas',
                    'Check vehicles for hail damage as corroborating evidence',
                    'Note the condition of neighboring properties — similar damage supports a storm event',
                  ]
                },
                {
                  phase: 'Phase 2: Roof Access and Safety Setup',
                  steps: [
                    'Set up ladder on stable, level ground with proper angle (4:1 ratio)',
                    'Install personal fall arrest system (anchor, harness, lanyard) before stepping on the roof',
                    'Assess roof walkability — do not walk roofs steeper than 8/12 pitch without scaffolding or specialized equipment',
                    'Check for hazards: wet surfaces, moss, loose material, compromised decking',
                    'Have all inspection tools organized and accessible before climbing',
                  ]
                },
                {
                  phase: 'Phase 3: Systematic Roof Inspection',
                  steps: [
                    'Start at the ridge and work down, inspecting every plane systematically',
                    'Check ridge cap for lifted, cracked, or missing pieces',
                    'Inspect all flashings: chimney, pipe boots, wall step flashing, valley flashing',
                    'Walk the entire perimeter checking drip edge and rake edge for damage',
                    'Inspect each roof plane for hail hits, lifted shingles, and wind damage',
                    'Perform test squares on the most impacted roof plane — mark 10x10 area and count all hits',
                    'Check vents, skylights, and any penetrations for damage',
                    'Assess overall roof condition and note pre-existing issues separately',
                  ]
                },
                {
                  phase: 'Phase 4: Interior Inspection',
                  steps: [
                    'Inspect the attic for water stains, daylight penetration, and wet insulation',
                    'Check ceilings in all rooms for water stains or discoloration',
                    'Look for peeling paint or bubbling drywall near exterior walls',
                    'Document any active leaks or signs of water intrusion',
                    'Assess ventilation and note any code deficiencies',
                  ]
                },
                {
                  phase: 'Phase 5: Documentation and Report',
                  steps: [
                    'Compile all photos in chronological order with clear labels',
                    'Write a detailed inspection report with findings for each area',
                    'Include weather data confirming the storm event',
                    'Provide your professional recommendation: repair vs. replacement',
                    'Present findings to the homeowner clearly and honestly',
                    'If damage warrants a claim, advise the homeowner on next steps',
                  ]
                },
              ].map((p, i) => (
                <div key={i} className="bg-archie-navy rounded-xl p-6 border border-archie-blue/20">
                  <h4 className="font-bold text-archie-orange mb-4">{p.phase}</h4>
                  <div className="space-y-2">
                    {p.steps.map((step, j) => (
                      <div key={j} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-archie-orange shrink-0 mt-0.5" />
                        <span className="text-gray-300 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 5: Documentation & Photography */}
      <section id="documentation" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">5. Documentation & Photography Best Practices</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Your documentation quality directly determines your claim success rate. Insurance adjusters review documentation from dozens of contractors — the ones with clear, organized, and thorough documentation get their claims approved faster and with fewer disputes. Think of your documentation package as a legal brief: it needs to tell a clear, evidence-backed story.
            </p>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Photography Best Practices</h3>
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {[
                { title: 'Use a Systematic Approach', desc: 'Start with wide establishing shots, then move to mid-range context shots, and finally close-up detail shots. This tells a visual story that any reviewer can follow.' },
                { title: 'Include Scale References', desc: 'Place a coin, chalk circle, ruler, or your hand next to damage for scale. Without a reference object, it is impossible to gauge the size of damage from a photo.' },
                { title: 'Ensure Proper Lighting', desc: 'Photograph damage with the sun at your back for even illumination. Avoid shooting directly into the sun. For subtle damage like hail bruising, shoot at an angle to create shadows that highlight impacts.' },
                { title: 'Capture Sharp, Focused Images', desc: 'Hold the camera steady, tap to focus on the damage area, and take multiple shots of each area. Blurry photos are the most common reason documentation is rejected.' },
                { title: 'Label Everything', desc: 'Use a photo organization system that identifies the roof plane, location on the plane, and type of damage. Many inspection apps allow you to annotate photos in the field.' },
                { title: 'Photograph Undamaged Areas Too', desc: 'Including photos of undamaged areas provides contrast and demonstrates that damage is localized to storm-related patterns rather than general wear.' },
              ].map((bp, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-5">
                  <h4 className="font-bold text-archie-dark mb-2">{bp.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{bp.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-archie-dark mb-4 mt-10">Minimum Photo Requirements Per Inspection</h3>
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="space-y-3">
                {[
                  { category: 'Property overview (all 4 sides)', count: '4-8 photos' },
                  { category: 'Each roof plane (overview + damage close-ups)', count: '10-20 photos' },
                  { category: 'Test squares (overview + individual hits)', count: '10-15 photos' },
                  { category: 'Flashings and penetrations', count: '5-10 photos' },
                  { category: 'Gutters and downspouts', count: '4-8 photos' },
                  { category: 'Collateral damage (AC, siding, screens)', count: '5-10 photos' },
                  { category: 'Interior damage (if applicable)', count: '3-5 photos' },
                  { category: 'Attic inspection', count: '3-5 photos' },
                ].map((r, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-600">{r.category}</span>
                    <span className="text-archie-orange font-bold">{r.count}</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-gray-200 flex justify-between">
                  <span className="font-bold text-archie-dark">Total minimum per inspection</span>
                  <span className="text-archie-orange font-bold">50-80+ photos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 6: NOAA Data */}
      <section id="weather-data" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">6. NOAA Data & Weather Patterns</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Weather data from the National Oceanic and Atmospheric Administration (NOAA) and related agencies is essential for establishing the causal link between a storm event and roof damage. Insurance companies require evidence that a covered weather event occurred in the area — your weather documentation provides this proof.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Key Weather Data Sources</h3>
            <div className="space-y-4 mb-8">
              {[
                { source: 'NOAA Storm Events Database', desc: 'The official record of significant weather events in the United States. Searchable by date, location, and event type. Provides hail size, wind speeds, and damage descriptions. Available at ncdc.noaa.gov/stormevents.', url: 'https://www.ncdc.noaa.gov/stormevents/' },
                { source: 'SPC Storm Reports', desc: 'The Storm Prediction Center maintains daily reports of severe weather including hail, wind, and tornado reports submitted by spotters and NWS offices. Provides hail size and location data often within hours of an event.', url: 'https://www.spc.noaa.gov/climo/reports/' },
                { source: 'National Weather Service Local Offices', desc: 'Your local NWS office publishes storm surveys, damage assessments, and post-event summaries for significant events. These reports carry strong credibility with insurance companies.' },
                { source: 'Commercial Hail Data Services', desc: 'Services like HailTrace, HailWatch, and CoreLogic provide detailed hail swath maps showing the geographic extent and estimated hail size for specific storm events. These are widely used by both contractors and insurance companies.' },
                { source: 'ASOS/AWOS Weather Stations', desc: 'Automated surface observation stations at airports and other locations record continuous weather data including wind speed, precipitation, and temperature. The closest station to the property provides localized weather evidence.' },
              ].map((s, i) => (
                <div key={i} className="bg-archie-navy rounded-lg p-5 border border-archie-blue/20">
                  <h4 className="font-bold text-archie-orange mb-2">{s.source}</h4>
                  <p className="text-gray-300 text-sm leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">Severe Weather Statistics</h3>
            <p className="text-gray-300 leading-relaxed mb-6">
              Understanding weather patterns helps you anticipate busy seasons and target your marketing. On average, the US experiences 1,200 tornadoes per year (most in April-June), 5,000+ severe hailstorms per year, an average of 12 named hurricanes per Atlantic season (June-November), and the total insured losses from severe convective storms (hail, wind, tornadoes) average $30-40 billion annually. Severe weather is increasing in both frequency and intensity due to climate change, with the number of significant hailstorm events up 30% over the past two decades.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Section 7: Regional Patterns */}
      <section id="regional-patterns" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">7. Regional Storm Patterns Across the US</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Understanding regional storm patterns is crucial for business planning, marketing timing, and resource allocation. Different regions face different storm threats at different times of the year.
            </p>

            <div className="space-y-6 mb-8">
              {[
                {
                  region: 'Great Plains / "Hail Alley" (TX, OK, KS, NE, CO, SD)',
                  season: 'March - August (peak: May-June)',
                  threats: 'Hail (primary), tornadoes, straight-line winds, wind-driven rain',
                  notes: 'The epicenter of hail damage in the US. Texas alone accounts for 20% of all hail damage claims nationally. Denver-metro and the DFW Metroplex are among the highest-frequency hail markets. Contractors in this region can build entire businesses around storm restoration.'
                },
                {
                  region: 'Midwest (MN, IA, MO, IL, IN, OH, WI, MI)',
                  season: 'April - September (peak: May-July)',
                  threats: 'Hail, tornadoes, severe thunderstorms, ice storms (winter)',
                  notes: 'Active hail and tornado corridor. Minnesota and Iowa see significant hail activity. The Midwest also experiences damaging ice storms in winter that can cause tree limb impacts and ice dam damage.'
                },
                {
                  region: 'Southeast (FL, GA, AL, MS, LA, SC, NC)',
                  season: 'June - November (hurricanes), year-round (thunderstorms)',
                  threats: 'Hurricanes (primary), tornadoes, severe thunderstorms, tropical storms',
                  notes: 'Hurricane risk dominates this region. Florida leads the nation in hurricane-related insurance claims. The warm, humid climate also creates year-round thunderstorm activity. Contractors need expertise in both wind damage and water intrusion.'
                },
                {
                  region: 'Northeast (NY, PA, NJ, CT, MA, ME, NH, VT)',
                  season: 'June - September (storms), November - March (ice/snow)',
                  threats: 'Nor\'easters, ice storms, occasional hail, heavy snow loads',
                  notes: 'Less hail activity but significant ice dam damage in winter. Nor\'easters bring sustained high winds and heavy precipitation. Heavy snow loads can cause structural damage to flat and low-slope roofs. Freeze-thaw cycles accelerate roof deterioration.'
                },
                {
                  region: 'Mountain West (CO, WY, MT, UT, NM, AZ)',
                  season: 'April - September',
                  threats: 'Hail (Colorado Front Range), high winds, heavy snow, monsoon rains (AZ, NM)',
                  notes: 'Colorado Front Range is one of the most active hail regions in the world. High-altitude storms can produce large hail with little warning. Arizona and New Mexico experience monsoon season (July-September) with intense thunderstorms and flash flooding.'
                },
                {
                  region: 'Pacific Coast (CA, OR, WA)',
                  season: 'October - April (atmospheric rivers), year-round (earthquakes)',
                  threats: 'Atmospheric rivers (heavy rain and wind), wildfires, earthquakes',
                  notes: 'Less traditional storm damage but increasing wildfire-related roof losses. Atmospheric rivers bring sustained heavy rainfall that tests roof waterproofing. California wildfire seasons have created massive demand for re-roofing with fire-resistant materials.'
                },
              ].map((r, i) => (
                <div key={i} className="bg-gray-50 rounded-xl p-6">
                  <h4 className="font-bold text-archie-dark mb-1">{r.region}</h4>
                  <div className="flex flex-wrap gap-4 text-sm mb-3">
                    <span className="text-archie-orange font-medium">Season: {r.season}</span>
                    <span className="text-gray-500">Threats: {r.threats}</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.notes}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 8: Insurance Documentation */}
      <section id="insurance-docs" className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-8">8. Insurance Documentation for Storm Claims</h2>

            <p className="text-gray-300 leading-relaxed mb-6">
              Storm damage claims require a higher standard of documentation than standard retail roofing work. You are essentially building a case that proves specific storm damage occurred and that the proposed repairs are necessary and appropriately priced. The quality of your documentation directly impacts approval rates, supplement success, and payment speed.
            </p>

            <h3 className="text-2xl font-bold text-white mb-4 mt-10">The Documentation Package Checklist</h3>
            <div className="space-y-3 mb-8">
              {[
                'Property overview photos (all 4 sides, aerial if available)',
                'Complete roof inspection photos organized by roof plane',
                'Close-up damage photos with scale references for every damaged area',
                'Test square photos with hail hit count documentation',
                'Collateral damage photos (gutters, AC units, siding, window screens, vehicles)',
                'Interior damage photos (ceiling stains, attic, water damage)',
                'Detailed written inspection report with findings and recommendations',
                'NOAA or SPC storm event data confirming a storm in the area',
                'Hail map data from commercial services showing the property in the hail swath',
                'Xactimate estimate with all line items properly categorized',
                'Building code documentation for any code upgrade items',
                'Manufacturer specifications supporting material or installation requirements',
                'Measurements report (satellite or manual)',
                'Supplement cover letter explaining any items beyond the adjuster\'s estimate',
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-archie-orange shrink-0 mt-0.5" />
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>

            <div className="bg-archie-navy rounded-xl p-6 border border-archie-blue/30">
              <p className="text-archie-orange font-bold text-lg mb-2">Documentation Tip</p>
              <p className="text-gray-300 leading-relaxed">
                Create a standardized documentation template that your entire team follows. Consistency across inspections builds your company's credibility with adjusters. When an adjuster sees the same thorough, well-organized documentation package from your company on every claim, they learn to trust your assessments — which leads to faster approvals and fewer disputes.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Section 9: Archie Storm Tool */}
      <section id="archie-storm-tool" className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-archie-dark mb-8">9. How Archie's Storm Tool Helps</h2>

            <p className="text-gray-600 leading-relaxed mb-6">
              Archie's Storm Tool was built specifically for roofing contractors who do storm restoration work. It combines real-time weather tracking, hail mapping, property identification, and CRM integration into one powerful system that gives you a first-mover advantage after every storm event.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  icon: CloudLightning,
                  title: 'Real-Time Storm Tracking',
                  desc: 'Monitor severe weather in real time across your entire service area. Get push notifications when storms with damaging hail or high winds affect your market so you can mobilize immediately.'
                },
                {
                  icon: MapPin,
                  title: 'Hail Swath Mapping',
                  desc: 'See detailed maps of exactly where hail fell, the estimated size, and the geographic extent of the storm. Overlay with your existing customer database to identify properties in the damage zone.'
                },
                {
                  icon: Search,
                  title: 'Property Identification',
                  desc: 'Identify every property in the hail swath with property data including roof age, size, material, and owner information. Prioritize canvassing efforts on the properties most likely to have damage.'
                },
                {
                  icon: BarChart3,
                  title: 'Storm Revenue Forecasting',
                  desc: 'Estimate the revenue opportunity from each storm event based on the number of affected properties, average claim values, and your historical close rate. Plan staffing and resource allocation accordingly.'
                },
                {
                  icon: FileText,
                  title: 'Automated Documentation',
                  desc: 'Archie\'s AI assists with photo organization, inspection report generation, and weather data collection. Reduce documentation time by 60% while improving quality and consistency.'
                },
                {
                  icon: Shield,
                  title: 'Integrated Claims Management',
                  desc: 'Track every storm-related lead from initial contact through completed claim. See the status of every claim, every supplement, and every payment on one dashboard.'
                },
              ].map((f, i) => (
                <motion.div key={i} className="bg-gray-50 rounded-xl p-6" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
                  <f.icon className="w-8 h-8 text-archie-orange mb-4" />
                  <h4 className="font-bold text-archie-dark mb-2">{f.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-hero rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Be the First to Every Storm</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Contractors who arrive first after a storm win the most jobs. Archie's Storm Tool gives you the data and tools to mobilize faster than the competition.
              </p>
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-archie-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="FAQ"
            title="Frequently Asked Questions"
            subtitle="Expert answers to common storm damage assessment questions."
          />
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Track Storms. Find Damage. Win Jobs.
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Archie's Storm Tool puts real-time hail data, property intelligence, and claims management in your pocket. Start free today — free forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton href="/resources/insurance-claims-guide" variant="secondary" size="lg">
                Insurance Claims Guide
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

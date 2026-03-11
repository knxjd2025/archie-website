import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Layers, ChevronDown, CheckCircle, ArrowRight, Clock, Award,
  BookOpen, DollarSign, Thermometer, Shield, Wrench, MapPin,
  Star, XCircle, Target, BarChart3, Home
} from 'lucide-react';
import CTAButton from '../../components/CTAButton';
import SectionHeading from '../../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const materials = [
  {
    id: '3-tab',
    name: '3-Tab Asphalt Shingles',
    costPerSqFt: '$1.50 - $2.50',
    costPerSquare: '$150 - $250',
    installed: '$300 - $450',
    lifespan: '15-20 years',
    windRating: '60 mph',
    fireRating: 'Class A',
    difficulty: 'Easy',
    bestClimate: 'Moderate climates, not ideal for extreme heat or cold',
    pros: [
      'Lowest upfront cost of any roofing material',
      'Widely available at every supply house',
      'Quick and easy installation — fastest to install',
      'Familiar to virtually all roofing crews',
      'Lightweight — does not require structural reinforcement',
      'Available in many colors',
    ],
    cons: [
      'Shortest lifespan of any shingle type',
      'Low wind resistance (60 mph rating)',
      'Flat appearance — less aesthetic appeal',
      'More susceptible to hail damage',
      'Cannot achieve high-end manufacturer warranty programs',
      'Declining popularity — being replaced by architectural shingles',
    ],
    description: '3-tab shingles are the most basic and affordable asphalt shingle option. They feature a flat, uniform appearance with three evenly spaced tabs per strip. While they dominated the residential roofing market for decades, they have been largely replaced by architectural shingles in new construction and re-roofing projects. Today, 3-tab shingles account for less than 15% of the residential asphalt shingle market. They remain a budget option for rental properties, secondary structures, and cost-conscious homeowners, but most manufacturers are reducing their 3-tab product lines.',
  },
  {
    id: 'architectural',
    name: 'Architectural (Laminate/Dimensional) Shingles',
    costPerSqFt: '$2.50 - $4.50',
    costPerSquare: '$250 - $450',
    installed: '$400 - $650',
    lifespan: '25-30 years',
    windRating: '110-130 mph',
    fireRating: 'Class A',
    difficulty: 'Easy-Moderate',
    bestClimate: 'All climates — the most versatile asphalt option',
    pros: [
      'Attractive dimensional appearance with shadow lines',
      'Excellent wind resistance (110-130 mph)',
      'Longer lifespan than 3-tab (25-30 years)',
      'Available in premium designer styles mimicking slate and wood',
      'Eligible for enhanced manufacturer warranties (25-50 year)',
      'Better impact resistance than 3-tab',
      'The industry standard for residential roofing',
    ],
    cons: [
      'Higher cost than 3-tab shingles',
      'Heavier than 3-tab (may require structural assessment on older homes)',
      'Still susceptible to hail damage (unless impact-resistant rated)',
      'Color can fade over time with UV exposure',
      'Lifespan reduced in extreme climates',
    ],
    description: 'Architectural shingles (also called laminate or dimensional shingles) are now the standard for residential roofing, accounting for over 75% of the steep-slope residential market. They consist of two or more layers of asphalt-impregnated fiberglass bonded together, creating a thicker, more durable shingle with an attractive dimensional appearance. Major brands include GAF Timberline HDZ, CertainTeed Landmark, and Owens Corning Duration. Impact-resistant (IR) versions rated to UL 2218 Class 4 are available and recommended in hail-prone markets, often qualifying homeowners for insurance discounts of 10-28%.',
  },
  {
    id: 'standing-seam',
    name: 'Standing Seam Metal Roofing',
    costPerSqFt: '$7.00 - $14.00',
    costPerSquare: '$700 - $1,400',
    installed: '$900 - $1,600',
    lifespan: '40-70 years',
    windRating: '140-180 mph',
    fireRating: 'Class A',
    difficulty: 'Advanced',
    bestClimate: 'All climates — excellent in high-wind, heavy snow, and hot regions',
    pros: [
      'Extremely long lifespan (40-70 years)',
      'Superior wind resistance — among the highest rated',
      'Excellent energy efficiency — reflects solar heat, reducing cooling costs 10-25%',
      'Fire resistant — will not ignite from airborne embers',
      'Sheds snow and ice efficiently',
      'Low maintenance — no granule loss, moss, or algae',
      'Environmentally friendly — 25-95% recycled content and 100% recyclable at end of life',
      'May qualify for insurance discounts',
    ],
    cons: [
      'High upfront cost (2-3x asphalt)',
      'Requires specialized installation skills — not all crews can install',
      'Can dent from large hail (cosmetic, not functional)',
      'Expansion and contraction noise in temperature extremes',
      'Limited color matching if panels need replacement',
      'Requires specialized tools and equipment',
    ],
    description: 'Standing seam metal roofing is the premium metal roofing option for residential applications. It features long, vertical panels that run from the ridge to the eave, connected by raised seams that lock together. The concealed fastener design eliminates exposed screws that can corrode and leak over time. Available in steel (galvalume or galvanized), aluminum, copper, and zinc, with a wide range of factory-applied colors and finishes. Standing seam metal is increasingly popular in coastal regions (hurricane resistance), mountain areas (snow shedding), and hot climates (energy efficiency). It is also gaining market share in suburban markets as homeowners recognize the long-term value proposition.',
  },
  {
    id: 'corrugated-metal',
    name: 'Corrugated/Screw-Down Metal Roofing',
    costPerSqFt: '$4.00 - $8.00',
    costPerSquare: '$400 - $800',
    installed: '$600 - $1,000',
    lifespan: '25-40 years',
    windRating: '110-140 mph',
    fireRating: 'Class A',
    difficulty: 'Moderate',
    bestClimate: 'All climates, popular in rural and agricultural areas',
    pros: [
      'More affordable than standing seam metal',
      'Good wind and weather resistance',
      'Fire resistant',
      'Relatively fast installation',
      'Lightweight — can be installed over existing roofing',
      'Wide availability at building supply stores',
    ],
    cons: [
      'Exposed fasteners are a maintenance liability (screws require re-tightening/replacement)',
      'Shorter lifespan than standing seam due to exposed fastener deterioration',
      'Less premium appearance than standing seam',
      'Exposed screws are potential leak points (most fail at 15-20 years)',
      'More susceptible to hail denting',
    ],
    description: 'Corrugated or screw-down metal panels use exposed fasteners that penetrate through the panel face into the roof deck. This is the most common metal roofing type for agricultural, commercial, and budget residential applications. While more affordable than standing seam, the exposed fastener system is the weak point — rubber washers on the screws degrade over time, leading to leaks. Most corrugated metal roofs require screw maintenance or replacement at 15-20 years. Available in a wide range of profiles (corrugated, R-panel, PBR panel) and colors. Some homeowner associations do not allow corrugated metal due to its utilitarian appearance.',
  },
  {
    id: 'clay-tile',
    name: 'Clay Tile Roofing',
    costPerSqFt: '$10.00 - $25.00',
    costPerSquare: '$1,000 - $2,500',
    installed: '$1,200 - $3,000',
    lifespan: '50-100+ years',
    windRating: '125-150 mph (when properly installed)',
    fireRating: 'Class A',
    difficulty: 'Advanced/Specialty',
    bestClimate: 'Hot, dry climates — Southwest, Mediterranean, and Florida',
    pros: [
      'Exceptional lifespan (50-100+ years — many last centuries)',
      'Timeless aesthetic appeal — increases home value',
      'Excellent fire resistance',
      'Natural thermal mass — keeps homes cooler in hot climates',
      'Resists rot, insects, and biological growth',
      'Environmentally friendly — natural clay, fully recyclable',
      'Color does not fade (fired-in color penetrates entire tile)',
    ],
    cons: [
      'Very heavy (800-1,500 lbs per square) — requires structural reinforcement',
      'Very high upfront cost',
      'Fragile — cracks under foot traffic and hail impact',
      'Requires specialized installation expertise',
      'Replacement tiles must match existing profile exactly',
      'Underlayment beneath tiles typically needs replacement at 30-40 years',
      'Not suitable for low-slope roofs',
    ],
    description: 'Clay tile roofing has been used for centuries and remains the premier choice for Mediterranean, Spanish Colonial, and Southwestern architectural styles. Tiles are made from natural clay fired at high temperatures, creating an extremely durable and weather-resistant product. Available in flat (shingle), "S" profile, barrel/mission, and interlocking profiles. The weight of clay tile (800-1,500 lbs per square vs. 200-300 lbs for asphalt) requires adequate structural support — always verify the roof structure can handle the load before specifying clay tile. While clay tiles can last 100+ years, the underlayment beneath them typically needs replacement at 30-40 years, which requires removing and reinstalling the tiles.',
  },
  {
    id: 'concrete-tile',
    name: 'Concrete Tile Roofing',
    costPerSqFt: '$8.00 - $18.00',
    costPerSquare: '$800 - $1,800',
    installed: '$1,000 - $2,200',
    lifespan: '40-75 years',
    windRating: '125-150 mph',
    fireRating: 'Class A',
    difficulty: 'Advanced/Specialty',
    bestClimate: 'Hot climates — Florida, Southwest, and Southern California',
    pros: [
      'More affordable than clay tile with similar appearance',
      'Very long lifespan (40-75 years)',
      'Excellent fire resistance',
      'Good wind resistance when properly installed',
      'Available in profiles mimicking clay tile, wood shake, and slate',
      'Can be painted or stained for color changes',
    ],
    cons: [
      'Very heavy (similar to clay tile)',
      'Color can fade over time (surface coating, not through-body)',
      'Can grow moss and algae in humid climates',
      'Absorbs more water than clay (can contribute to weight during rain)',
      'Requires structural assessment for most applications',
      'Fragile under foot traffic',
    ],
    description: 'Concrete tile is a more affordable alternative to clay tile that offers similar durability and aesthetics. Made from Portland cement, sand, and water, concrete tiles are molded into various profiles including flat, "S", low-profile, and shake-look. They are particularly popular in Florida and the Southwest, where their wind resistance and thermal mass are valuable. Concrete tiles are about 20-30% less expensive than clay tiles but are slightly heavier and more porous. Unlike clay (which has a fired-in color), concrete tile color is applied to the surface and may fade over 15-20 years, though tiles can be re-coated.',
  },
  {
    id: 'slate',
    name: 'Natural Slate Roofing',
    costPerSqFt: '$15.00 - $40.00',
    costPerSquare: '$1,500 - $4,000',
    installed: '$2,000 - $5,000',
    lifespan: '75-200 years',
    windRating: '110+ mph',
    fireRating: 'Class A',
    difficulty: 'Expert/Specialty',
    bestClimate: 'All climates — especially Northeast and historic districts',
    pros: [
      'The longest lasting roofing material available (75-200 years)',
      'Unmatched natural beauty — premium aesthetic',
      'Increases property value significantly',
      'Fire, wind, and weather resistant',
      'Naturally mold and mildew resistant',
      'Environmentally friendly — natural stone, incredibly long life cycle',
    ],
    cons: [
      'The most expensive roofing material',
      'Extremely heavy — structural reinforcement almost always required',
      'Requires expert installation (very few qualified installers)',
      'Fragile under foot traffic — repairs can be challenging',
      'Replacement slates must match existing size, thickness, and color',
      'Lead times for quality slate can be months',
    ],
    description: 'Natural slate is the most premium roofing material available, prized for its beauty, durability, and longevity. Quarried from sedimentary rock, roofing slate is hand-split into individual tiles and installed with copper or stainless steel nails on a reinforced roof structure. American slate (primarily from Vermont, Pennsylvania, Virginia, and New York) is available in a range of natural colors including grey, green, purple, red, and black. A properly installed slate roof can last 150-200 years — there are slate roofs in the US that have been performing for over 150 years. Slate roofing is typically reserved for high-end custom homes, historic restorations, and institutional buildings where its beauty and longevity justify the premium cost.',
  },
  {
    id: 'tpo',
    name: 'TPO (Thermoplastic Polyolefin)',
    costPerSqFt: '$3.50 - $7.00',
    costPerSquare: '$350 - $700',
    installed: '$500 - $900',
    lifespan: '20-30 years',
    windRating: '100-140 mph',
    fireRating: 'Class A or B',
    difficulty: 'Moderate (specialty)',
    bestClimate: 'Hot climates — excellent solar reflectivity',
    pros: [
      'Most popular commercial/flat roofing membrane',
      'Excellent energy efficiency (white reflective surface)',
      'Heat-welded seams are very strong and watertight',
      'Chemical and UV resistant',
      'Relatively affordable for flat roofing',
      'Lightweight',
      'Available in 45, 60, and 80 mil thicknesses',
    ],
    cons: [
      'Relatively newer product — less proven long-term track record',
      'Can shrink over time, pulling at edges and penetrations',
      'Thinner membranes (45 mil) are prone to puncture',
      'Heat-welding requires specialized equipment and training',
      'Quality varies significantly between manufacturers',
    ],
    description: 'TPO is the fastest-growing flat roofing membrane, now accounting for over 40% of the commercial roofing market. It is a single-ply thermoplastic membrane installed in wide rolls (6, 8, 10, or 12 feet) with heat-welded seams. Its white reflective surface meets Energy Star requirements and can reduce cooling costs by 10-30% compared to dark roofing. TPO is installed in three ways: mechanically attached (most common), fully adhered, or ballasted. For residential flat roofs, it has become the go-to choice for additions, porches, and garages. Specify 60 mil minimum for residential applications and 80 mil for commercial.',
  },
  {
    id: 'epdm',
    name: 'EPDM (Ethylene Propylene Diene Monomer)',
    costPerSqFt: '$3.00 - $6.00',
    costPerSquare: '$300 - $600',
    installed: '$450 - $800',
    lifespan: '25-30 years',
    windRating: '100-120 mph',
    fireRating: 'Class A (with cover board)',
    difficulty: 'Moderate',
    bestClimate: 'Northern climates — excellent cold-weather flexibility',
    pros: [
      'Proven long-term track record (40+ years of field performance data)',
      'Excellent flexibility — performs well in cold climates without cracking',
      'Simple installation — can be adhered, mechanically attached, or ballasted',
      'Very durable against UV, ozone, and weathering',
      'Easy to repair with patch kits',
      'Lower material cost than TPO or PVC',
    ],
    cons: [
      'Black color absorbs heat — lower energy efficiency than white membranes',
      'Seams are glued (adhesive), not welded — may separate over time',
      'Susceptible to puncture from foot traffic and sharp debris',
      'Shrinks over time, creating stress at edges and penetrations',
      'Appearance is less attractive than other options',
    ],
    description: 'EPDM (commonly called "rubber roofing") is a synthetic rubber membrane that has been used in flat roofing since the 1960s. It is available in black and white, in 45 mil and 60 mil thicknesses, and in rolls up to 50 feet wide. EPDM is valued for its proven durability, ease of repair, and cold-weather flexibility. While it has lost market share to TPO in recent years, EPDM remains a strong choice for flat roofs, particularly in northern climates where its flexibility at low temperatures is an advantage. The primary weakness of EPDM is its glued (contact adhesive) seams, which can separate over time — unlike TPO and PVC, which have heat-welded seams.',
  },
  {
    id: 'pvc',
    name: 'PVC (Polyvinyl Chloride)',
    costPerSqFt: '$5.00 - $10.00',
    costPerSquare: '$500 - $1,000',
    installed: '$700 - $1,200',
    lifespan: '25-35 years',
    windRating: '100-140 mph',
    fireRating: 'Class A',
    difficulty: 'Moderate (specialty)',
    bestClimate: 'All climates — especially chemical-exposed environments',
    pros: [
      'Superior chemical resistance (ideal for restaurants, industrial buildings)',
      'Heat-welded seams — strongest seam of any single-ply membrane',
      'Excellent fire resistance — self-extinguishing',
      'White reflective surface for energy efficiency',
      'Naturally resistant to mold, bacteria, and biological growth',
      'Proven track record (40+ years)',
    ],
    cons: [
      'Higher cost than TPO and EPDM',
      'Contains plasticizers that can migrate over time (older formulations)',
      'Can become brittle in very cold climates over time',
      'Requires specialized equipment for heat welding',
      'Not compatible with asphalt-based products (requires separation layer)',
    ],
    description: 'PVC roofing membrane is the premium single-ply flat roofing option, known for its superior chemical resistance, strong welded seams, and fire resistance. It excels in environments where the roof is exposed to grease, oils, or chemicals — making it the standard choice for restaurants, commercial kitchens, and industrial buildings where exhaust vents discharge onto the roof. PVC is also popular for high-end residential flat roof applications where durability and longevity justify the premium cost. Modern PVC formulations have addressed early concerns about plasticizer migration and cold-weather brittleness.',
  },
  {
    id: 'mod-bit',
    name: 'Modified Bitumen',
    costPerSqFt: '$3.50 - $7.00',
    costPerSquare: '$350 - $700',
    installed: '$500 - $900',
    lifespan: '20-30 years',
    windRating: '90-120 mph',
    fireRating: 'Class A',
    difficulty: 'Moderate',
    bestClimate: 'All climates — versatile performance',
    pros: [
      'Multi-ply system provides redundant waterproofing layers',
      'Excellent puncture resistance',
      'Can be torch-applied, cold-adhesive, or self-adhered',
      'Good flexibility and elongation',
      'Available with reflective cap sheet for energy efficiency',
      'Familiar to most flat roofing contractors',
    ],
    cons: [
      'Torch-applied installation creates fire risk',
      'Heavier than single-ply membranes',
      'More complex installation than TPO or EPDM',
      'Can develop blisters and ridging over time',
      'Seams require careful installation to prevent failure',
    ],
    description: 'Modified bitumen is an evolution of traditional built-up (BUR) roofing that adds polymer modifiers (APP or SBS) to asphalt for improved flexibility, strength, and longevity. It is typically installed as a two-ply system: a base sheet and a cap sheet. SBS (styrene-butadiene-styrene) modified bitumen provides excellent cold-weather flexibility and is the preferred type for northern climates. APP (atactic polypropylene) modified bitumen performs better in high heat. Modified bitumen remains popular for flat roofing applications because it provides multi-layer redundancy and is familiar to many commercial roofing contractors.',
  },
  {
    id: 'cedar-shake',
    name: 'Cedar Shake / Cedar Shingles',
    costPerSqFt: '$6.00 - $12.00',
    costPerSquare: '$600 - $1,200',
    installed: '$800 - $1,500',
    lifespan: '20-40 years',
    windRating: '80-110 mph',
    fireRating: 'Class C (untreated) / Class A (treated)',
    difficulty: 'Advanced',
    bestClimate: 'Cool, dry climates — Pacific Northwest, New England',
    pros: [
      'Beautiful, natural appearance that weathers to an attractive silver-grey',
      'Excellent natural insulation properties',
      'Environmentally sustainable — renewable resource, biodegradable',
      'Natural wind resistance when properly installed',
      'Cedar contains natural oils that resist insects and rot',
    ],
    cons: [
      'High maintenance — requires regular cleaning and treatment',
      'Fire hazard when untreated (restricted or banned in many fire-prone areas)',
      'Susceptible to moss, algae, and rot in humid climates',
      'More expensive than asphalt',
      'Shorter lifespan than premium alternatives (metal, tile, slate)',
      'Requires specialized installation skills',
      'May not be allowed by some insurance carriers or HOAs',
    ],
    description: 'Cedar shake and shingle roofing offers a distinctive natural aesthetic that has been used in North America for centuries. Shakes are hand-split (rougher texture) while shingles are sawn (smoother, more uniform). Western red cedar is the most common species due to its natural rot resistance, dimensional stability, and beauty. Cedar roofing is particularly popular in the Pacific Northwest, New England, and mountain resort communities. The primary challenge is fire risk — many communities in wildfire-prone areas have banned or restricted wood roofing, and some insurance carriers will not insure homes with wood roofs. Fire-retardant treated cedar is available but adds significant cost.',
  },
  {
    id: 'synthetic',
    name: 'Synthetic / Composite Roofing',
    costPerSqFt: '$5.00 - $12.00',
    costPerSquare: '$500 - $1,200',
    installed: '$700 - $1,500',
    lifespan: '30-50 years',
    windRating: '110-130 mph',
    fireRating: 'Class A',
    difficulty: 'Easy-Moderate',
    bestClimate: 'All climates',
    pros: [
      'Mimics the appearance of slate, shake, or tile at a fraction of the weight and cost',
      'Lightweight — no structural reinforcement needed',
      'Excellent impact resistance (many carry Class 4 IR rating)',
      'Class A fire rated',
      'Recyclable materials (many made from recycled rubber and plastic)',
      'Easier installation than the natural materials they replicate',
      'Backed by strong manufacturer warranties (30-50 years)',
    ],
    cons: [
      'Relatively newer products with less long-term performance data',
      'Some products can look less authentic than natural materials',
      'Higher cost than asphalt (but lower than natural slate or tile)',
      'Limited availability in some markets',
      'Quality varies significantly between brands',
      'May not satisfy purists or historic preservation requirements',
    ],
    description: 'Synthetic roofing products are engineered to replicate the appearance of premium natural materials — slate, cedar shake, and tile — without the weight, fragility, and high cost. Made from engineered polymers, recycled rubber, or composite materials, the best synthetic products are virtually indistinguishable from natural materials at ground level. Leading brands include DaVinci Roofscapes, BRAVA Roof Tile, CeDUR synthetic shake, and EcoStar Majestic Slate. Synthetic roofing is an excellent option for homeowners who want the look of premium materials with better durability, lower maintenance, and reasonable cost. It is also the go-to choice for historic renovations where natural slate or tile would exceed structural or budget limitations.',
  },
];

const faqs = [
  { q: 'What is the most cost-effective roofing material?', a: 'Architectural asphalt shingles offer the best balance of cost, performance, and lifespan for most residential applications. While they cost more than 3-tab shingles upfront ($400-$650 installed per square vs. $300-$450), their 25-30 year lifespan makes the cost per year lower. When calculated on a per-year basis, architectural shingles cost approximately $15-$22 per square per year, compared to $15-$23 for 3-tab (shorter life) and $13-$23 for standing seam metal (higher cost but much longer life). For homeowners planning to stay in their home 15+ years, metal roofing becomes the most cost-effective option due to its 40-70 year lifespan.' },
  { q: 'What roofing material lasts the longest?', a: 'Natural slate has the longest proven lifespan of any roofing material, commonly lasting 75-200 years when properly installed. Many slate roofs in the northeastern US have been performing for over 150 years. Clay tile is the second longest-lasting material at 50-100+ years. Standing seam metal roofing lasts 40-70 years. Concrete tile lasts 40-75 years. By comparison, architectural asphalt shingles last 25-30 years and 3-tab shingles last 15-20 years. Longevity depends heavily on proper installation, climate, maintenance, and material quality.' },
  { q: 'What is the best roofing material for hurricane areas?', a: 'Standing seam metal roofing (140-180 mph wind rating) and properly installed concrete or clay tile (125-150 mph) are the best options for hurricane-prone areas. Metal roofing\'s interlocking seam design provides exceptional uplift resistance, and its smooth surface allows wind to pass over rather than catch underneath. Many Florida and Gulf Coast building codes now require materials rated for 150+ mph winds. Impact-resistant asphalt shingles rated to 130 mph are also suitable for most hurricane zones and are more affordable than metal or tile. Always ensure installation meets or exceeds local wind code requirements — the strongest material fails if improperly installed.' },
  { q: 'What roofing material is best for hail-prone areas?', a: 'Impact-resistant (IR) asphalt shingles with a UL 2218 Class 4 rating are the most popular choice for hail-prone markets because they offer the best combination of hail resistance, cost, and availability. Class 4 shingles can withstand a 2-inch steel ball dropped from 20 feet. Standing seam metal roofing is also excellent in hail areas — while it may dent from large hail, the dents are cosmetic and do not affect function. However, some insurance policies now exclude cosmetic damage, which can limit coverage for dented metal. Many insurance companies offer 10-28% premium discounts for Class 4 IR shingles, making them financially attractive in hail-prone markets.' },
  { q: 'Can metal roofing be installed over existing shingles?', a: 'In many cases, yes. Metal roofing can often be installed over one layer of existing asphalt shingles, provided the existing roof is in reasonable condition (no significant rot, sagging, or moisture damage), the structure can handle the additional weight (though metal is lightweight, the existing shingles add weight), local building codes permit it, and furring strips or battens are used to create an air gap and flat installation surface. The advantages of overlaying include lower labor and disposal costs. The disadvantages include the inability to inspect and repair the deck, potential moisture trapping, and added weight. Most manufacturers warrant their metal products when installed over one layer of existing shingles.' },
  { q: 'What is the most energy-efficient roofing material?', a: 'Standing seam metal roofing in light or reflective colors is the most energy-efficient option, reflecting 60-70% of solar energy and reducing cooling costs by 10-25%. White TPO and PVC membranes (for flat roofs) are also excellent, reflecting 80%+ of solar energy and meeting Cool Roof requirements. "Cool roof" asphalt shingles with reflective granules are available but less effective than metal or white membranes. For hot climates, clay and concrete tile also perform well due to their thermal mass — they absorb heat slowly during the day and release it slowly at night, smoothing temperature fluctuations inside the home.' },
  { q: 'How do I choose between TPO, EPDM, and PVC for a flat roof?', a: 'The choice depends on your specific needs. Choose TPO for the best value and energy efficiency — it offers good performance at a moderate price and its white surface reflects solar heat. Choose EPDM for northern climates where cold-weather flexibility is important and where the cost savings over TPO/PVC are beneficial. Choose PVC when chemical resistance is needed (restaurants, industrial) or when the strongest possible seam is required. For residential flat roofs (additions, porches, garages), TPO in 60 mil is the most popular choice. For commercial applications, all three are viable — the choice often comes down to specification requirements and budget.' },
  { q: 'What roofing material has the best ROI for resale value?', a: 'According to Remodeling Magazine\'s Cost vs. Value Report, a new asphalt shingle roof recovers approximately 60-70% of its cost at resale. Standing seam metal roofing recovers 55-65% but adds significantly more absolute value due to the higher installation cost. Natural slate and clay tile roofs can actually increase property value beyond their cost in high-end markets where these materials are expected. The best ROI material depends on the home and neighborhood: installing a $50,000 slate roof on a $200,000 home makes no sense, but the same roof on a $1 million historic home is expected and adds significant value.' },
  { q: 'Are there roofing materials that help with soundproofing?', a: 'Standing seam metal roofing with solid sheathing and proper underlayment is no louder than asphalt during rain, despite the common misconception. Metal roofing installed directly on purlins (without solid decking) can be noticeably louder. For maximum sound insulation, consider adding a layer of rigid insulation board beneath the metal panels. Clay and concrete tile roofs provide excellent sound insulation due to their mass. Cedar shake also provides good sound dampening. If noise reduction is a priority, the combination of solid decking + synthetic underlayment + the chosen roofing material will provide the best results regardless of material type.' },
  { q: 'What materials are best for low-slope roofs?', a: 'Low-slope roofs (below 2:12 pitch) require specialized materials that provide a continuous waterproof membrane since water flows slowly and may pond. Suitable options include TPO, EPDM, and PVC single-ply membranes, modified bitumen, built-up roofing (BUR), and spray polyurethane foam (SPF). Standard asphalt shingles are not suitable for pitches below 2:12 (and require special underlayment installation between 2:12 and 4:12). Metal roofing can work on low slopes (minimum 1:12 to 3:12 depending on the system) with proper sealant at seams. Always follow manufacturer minimum slope requirements to maintain warranty coverage.' },
  { q: 'How do I determine what roofing material is currently on a house?', a: 'Identification tips: Asphalt shingles have visible granules, are flexible, and come in uniform strips (3-tab) or dimensional profiles (architectural). Metal roofing is obviously metallic with either exposed fasteners (corrugated) or raised seams (standing seam). Clay tile is heavy, earthy-colored, and makes a ringing sound when tapped. Concrete tile looks similar to clay but is typically flat or has a more uniform manufactured appearance. Slate is natural stone — heavy, typically dark grey, and splits along natural cleavage planes. Cedar shake has a rough, hand-split wood texture and weathers to a silver-grey. EPDM is black rubber. TPO/PVC is white/grey membrane. Modified bitumen has a granulated or smooth cap sheet surface.' },
  { q: 'What roofing materials are best for solar panel installation?', a: 'Standing seam metal roofing is the ideal substrate for solar panels because panels can be attached with clamps to the seams — no roof penetrations required. This eliminates leak risk and makes panel removal easy for future roof maintenance. Architectural asphalt shingles are the most common substrate for solar installations (using flashing-based mounting brackets), but this requires roof penetrations. Tile and slate roofs can accommodate solar panels but require specialty mounting systems and careful tile handling. Flat roofs with TPO/EPDM/PVC use ballasted or adhered mounting systems. If a customer is planning solar panels, metal roofing is the clear recommendation.' },
  { q: 'How do altitude and climate affect roofing material selection?', a: 'High altitude introduces intense UV exposure, extreme temperature swings, heavy snow loads, and high winds. Metal roofing excels at high altitudes due to its snow-shedding ability, wind resistance, and UV tolerance. In hot, humid climates, algae-resistant asphalt shingles, metal, and tile perform best. In cold climates, materials with good freeze-thaw resistance (metal, EPDM, SBS modified bitumen) are preferred. Coastal saltwater environments require aluminum or stainless steel (not galvanized steel), or non-metallic options. Wildfire-prone areas require Class A fire-rated materials — metal, tile, slate, or treated composition.' },
  { q: 'What is the environmental impact of different roofing materials?', a: 'Natural slate and clay tile have the lowest environmental impact due to minimal processing and extreme longevity (less frequent replacement = less waste). Metal roofing is also eco-friendly: it contains 25-95% recycled content, is 100% recyclable at end of life, and its long lifespan reduces waste. Asphalt shingles are the most environmentally problematic — approximately 11 million tons of shingle waste enters US landfills annually, though recycling programs exist in some areas. Cedar shake is a renewable resource but its shorter lifespan and fire-retardant treatment requirements reduce its environmental advantage. Synthetic products made from recycled materials offer a moderate environmental profile.' },
  { q: 'How does roof pitch affect material selection?', a: 'Roof pitch determines which materials can be used and how they are installed. Flat and low-slope (0-2:12): TPO, EPDM, PVC, modified bitumen, BUR, or spray foam only. Low slope (2:12 to 4:12): asphalt shingles with special underlayment (double-coverage ice and water shield), metal with sealant at seams, or flat roof membranes. Standard slope (4:12 to 12:12): all materials are suitable. Steep slope (12:12 and above): most materials work but installation is more dangerous and labor-intensive. Tile and slate become very labor-intensive on steep pitches. Metal is excellent on steep pitches for snow shedding. Always follow manufacturer minimum and maximum slope specifications.' },
  { q: 'Do roofing material warranties differ significantly?', a: 'Yes, substantially. 3-tab shingle warranties are typically 20-25 years with limited coverage. Architectural shingle warranties range from 30 years to "lifetime" (usually defined as 40-50 years in practice), with enhanced options available through certified contractor programs. Metal roofing warranties typically include a 30-50 year paint/finish warranty and a lifetime structural warranty. Clay and concrete tile often carry 50-75 year warranties. The key distinction is between material warranty (defective products) and workmanship warranty (installation errors). Manufacturer warranties only cover material defects — your workmanship warranty covers the installation. Some manufacturer programs (GAF Golden Pledge, CertainTeed SureStart Plus) cover both materials and workmanship when installed by certified contractors.' },
  { q: 'What is a roofing "square" and how do I calculate how many I need?', a: 'A roofing "square" equals 100 square feet. To calculate squares needed: measure the length and width of each roof section, multiply to get square footage, add all sections together, then divide by 100. For example, a simple gable roof with two 30x20 foot planes = (30x20) + (30x20) = 1,200 sq ft = 12 squares. Add waste factor based on complexity: simple roofs 10%, average complexity 12-15%, complex roofs (many hips, valleys, dormers) 15-20%. So 12 squares + 15% waste = 13.8 squares, round up to 14. This waste factor accounts for cuts, starter courses, and material lost during installation.' },
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

function MaterialCard({ material, index }) {
  const isDark = index % 2 === 1;
  return (
    <section id={material.id} className={isDark ? 'bg-archie-dark py-16 lg:py-20' : 'bg-white py-16 lg:py-20'}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-6 ${isDark ? 'text-white' : 'text-archie-dark'}`}>
            {material.name}
          </h2>

          <p className={`leading-relaxed mb-8 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
            {material.description}
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {[
              { label: 'Cost/Sq Ft', value: material.costPerSqFt, icon: DollarSign },
              { label: 'Lifespan', value: material.lifespan, icon: Clock },
              { label: 'Wind Rating', value: material.windRating, icon: Shield },
              { label: 'Install Difficulty', value: material.difficulty, icon: Wrench },
            ].map((stat, i) => (
              <div key={i} className={`rounded-xl p-4 text-center ${isDark ? 'bg-archie-navy border border-archie-blue/20' : 'bg-gray-50'}`}>
                <stat.icon className="w-5 h-5 text-archie-orange mx-auto mb-2" />
                <p className={`text-xs font-medium mb-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{stat.label}</p>
                <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-archie-dark'}`}>{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Cost Breakdown */}
          <div className={`rounded-xl p-5 mb-8 ${isDark ? 'bg-archie-navy border border-archie-blue/20' : 'bg-gray-50'}`}>
            <h4 className={`font-bold mb-3 ${isDark ? 'text-white' : 'text-archie-dark'}`}>Pricing Details</h4>
            <div className="grid sm:grid-cols-3 gap-3">
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Material per Sq Ft</p>
                <p className="text-archie-orange font-bold">{material.costPerSqFt}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Material per Square</p>
                <p className="text-archie-orange font-bold">{material.costPerSquare}</p>
              </div>
              <div>
                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Installed per Square</p>
                <p className="text-archie-orange font-bold">{material.installed}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200/20">
              <div className="flex flex-wrap gap-4 text-sm">
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Fire Rating: <strong className={isDark ? 'text-white' : 'text-archie-dark'}>{material.fireRating}</strong></span>
                <span className={isDark ? 'text-gray-400' : 'text-gray-500'}>Best Climate: <strong className={isDark ? 'text-white' : 'text-archie-dark'}>{material.bestClimate}</strong></span>
              </div>
            </div>
          </div>

          {/* Pros & Cons */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-archie-dark'}`}>
                <CheckCircle className="w-5 h-5 text-green-500" /> Pros
              </h4>
              <div className="space-y-2">
                {material.pros.map((pro, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{pro}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className={`font-bold mb-3 flex items-center gap-2 ${isDark ? 'text-white' : 'text-archie-dark'}`}>
                <XCircle className="w-5 h-5 text-red-400" /> Cons
              </h4>
              <div className="space-y-2">
                {material.cons.map((con, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{con}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function RoofingMaterialsGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Complete Guide to Roofing Materials: Costs, Pros & Cons",
    "description": "Comprehensive comparison of every roofing material including asphalt shingles, metal, tile, slate, flat roofing, cedar, and synthetics. Costs, lifespans, pros, cons, and best applications.",
    "author": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "publisher": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
    "datePublished": "2025-02-01",
    "dateModified": "2025-03-01",
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://archie.now/resources/roofing-materials-guide" },
  };

  return (
    <>
      <Helmet>
        <title>Complete Guide to Roofing Materials: Costs, Pros & Cons (2025) | Archie</title>
        <meta name="description" content="Compare every roofing material: asphalt shingles, metal, tile, slate, TPO, EPDM, PVC, cedar, and synthetics. Get costs per sq ft, lifespans, pros & cons, and expert recommendations for every climate." />
        <meta name="keywords" content="roofing materials comparison, roof material costs, best roofing material, metal roof vs shingles, TPO vs EPDM, slate roof cost, tile roof pros cons, roofing material guide" />
        <link rel="canonical" href="https://archie.now/resources/roofing-materials-guide" />
        <meta property="og:title" content="Complete Guide to Roofing Materials: Costs, Pros & Cons" />
        <meta property="og:description" content="The definitive comparison of every roofing material with real costs, lifespans, and expert recommendations." />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Materials Reference
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Complete Guide to <span className="text-gradient">Roofing Materials</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Every roofing material compared: costs per square foot, lifespans, pros and cons, best climates, and installation considerations. Your definitive reference guide.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 35 min read</span>
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
              <BookOpen className="w-6 h-6 text-archie-orange" /> Materials Covered
            </h2>
            <nav className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {materials.map(m => (
                <a key={m.id} href={`#${m.id}`} className="flex items-center gap-3 p-3 rounded-lg hover:bg-archie-orange/5 transition-colors group">
                  <Layers className="w-4 h-4 text-archie-orange shrink-0" />
                  <span className="text-gray-700 group-hover:text-archie-orange transition-colors font-medium text-sm">{m.name}</span>
                </a>
              ))}
            </nav>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeading
              label="Quick Comparison"
              title="Roofing Materials at a Glance"
              subtitle="Compare cost, lifespan, and key attributes across all major roofing materials."
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-archie-orange/30">
                    <th className="py-3 pr-4 font-bold text-archie-dark">Material</th>
                    <th className="py-3 pr-4 font-bold text-archie-dark">Cost/Sq Ft</th>
                    <th className="py-3 pr-4 font-bold text-archie-dark">Installed/Sq</th>
                    <th className="py-3 pr-4 font-bold text-archie-dark">Lifespan</th>
                    <th className="py-3 pr-4 font-bold text-archie-dark">Wind</th>
                    <th className="py-3 font-bold text-archie-dark">Fire</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m, i) => (
                    <tr key={i} className="border-b border-gray-100 hover:bg-archie-orange/5 transition-colors">
                      <td className="py-3 pr-4">
                        <a href={`#${m.id}`} className="font-medium text-archie-dark hover:text-archie-orange transition-colors">{m.name}</a>
                      </td>
                      <td className="py-3 pr-4 text-archie-orange font-medium">{m.costPerSqFt}</td>
                      <td className="py-3 pr-4 text-gray-600">{m.installed}</td>
                      <td className="py-3 pr-4 text-gray-600">{m.lifespan}</td>
                      <td className="py-3 pr-4 text-gray-600">{m.windRating}</td>
                      <td className="py-3 text-gray-600">{m.fireRating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-gray-400 text-xs mt-4">* All costs are 2025 national averages. Actual costs vary by region, supplier, and project specifics.</p>
          </motion.div>
        </div>
      </section>

      {/* Material Sections */}
      {materials.map((material, index) => (
        <MaterialCard key={material.id} material={material} index={index} />
      ))}

      {/* Regional Preferences */}
      <section className="bg-archie-light py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SectionHeading
              label="Regional Insights"
              title="Regional Material Preferences"
              subtitle="Roofing material popularity varies significantly by region based on climate, culture, building codes, and local availability."
            />
            <div className="space-y-4">
              {[
                { region: 'Northeast (NY, PA, NJ, CT, MA, ME)', materials: 'Architectural shingles (dominant), natural slate (historic areas), cedar shake (coastal New England), ice and water shield requirements', notes: 'Freeze-thaw cycles and heavy snow loads influence choices. Ice dam prevention is a major consideration. Historic preservation districts often require slate or approved synthetic alternatives.' },
                { region: 'Southeast (FL, GA, AL, SC, NC)', materials: 'Concrete tile (Florida), metal roofing (coastal), architectural shingles (inland), TPO/modified bitumen (commercial)', notes: 'Hurricane codes drive material selection. Florida has the strictest wind requirements. Metal and tile dominate in coastal areas for wind resistance. High humidity favors algae-resistant products.' },
                { region: 'Midwest (IL, OH, IN, MI, MN, WI)', materials: 'Architectural shingles (dominant), impact-resistant shingles (hail markets), metal (rural/agricultural)', notes: 'Hail and severe weather drive demand for IR-rated products. Cost sensitivity favors asphalt in most markets. Metal is popular for agricultural and rural residential buildings.' },
                { region: 'Southwest (AZ, NM, NV, UT)', materials: 'Clay and concrete tile (dominant), metal (modern designs), flat roof membranes (commercial)', notes: 'Extreme heat and UV exposure are primary concerns. Tile\'s thermal mass provides natural cooling. Light-colored and reflective materials are strongly preferred. Low humidity means fewer moisture-related concerns.' },
                { region: 'Pacific Coast (CA, OR, WA)', materials: 'Architectural shingles, concrete tile (SoCal), metal (Pacific NW), fire-resistant materials (wildfire zones)', notes: 'California wildfire zones require Class A fire-rated materials. Pacific Northwest favors materials that perform in heavy rain. California Title 24 energy codes influence color and reflectivity choices.' },
                { region: 'Mountain West (CO, MT, WY, ID)', materials: 'Metal (dominant in mountains), IR shingles (Front Range hail zone), cedar shake (resort communities)', notes: 'Heavy snow loads, high winds, and intense UV at altitude drive material choices. Metal\'s snow-shedding ability makes it ideal for mountain homes. Colorado Front Range is one of the nation\'s most active hail markets.' },
              ].map((r, i) => (
                <div key={i} className="bg-white rounded-xl p-6 shadow-sm">
                  <h4 className="font-bold text-archie-dark mb-1 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-archie-orange" />
                    {r.region}
                  </h4>
                  <p className="text-archie-orange text-sm font-medium mb-2">Popular: {r.materials}</p>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.notes}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Archie CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <div className="bg-gradient-hero rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Price Any Material Instantly</h3>
              <p className="text-gray-300 mb-6 max-w-xl mx-auto">
                Archie's AI-powered estimating tool calculates material quantities, local pricing, and labor costs for any roofing material — generating professional estimates in minutes from satellite measurements.
              </p>
              <CTAButton href="https://app.archie.now" size="lg">
                Try Archie's Estimating Tool <ArrowRight className="w-5 h-5" />
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
            subtitle="Expert answers to the most common questions about roofing materials."
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
              Get Accurate Estimates for Any Material
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Archie combines AI roof measurements with real-time material pricing to generate professional estimates in minutes — for every material type.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CTAButton href="https://app.archie.now" size="lg">
                Start Free <ArrowRight className="w-5 h-5" />
              </CTAButton>
              <CTAButton href="/resources/roofing-guide" variant="secondary" size="lg">
                Roofing Business Guide
              </CTAButton>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}

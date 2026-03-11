import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  Clock, ArrowRight, Search, Tag, TrendingUp,
  CloudLightning, Lightbulb, Wrench, BarChart3, Newspaper
} from 'lucide-react';
import CTAButton from '../components/CTAButton';
import SectionHeading from '../components/SectionHeading';

const fadeIn = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const categories = [
  { name: 'All', icon: Newspaper },
  { name: 'Industry News', icon: TrendingUp },
  { name: 'Tips & Tricks', icon: Lightbulb },
  { name: 'Product Updates', icon: Wrench },
  { name: 'Storm Season', icon: CloudLightning },
  { name: 'Business Growth', icon: BarChart3 },
];

const blogPosts = [
  {
    id: 1,
    title: '2025 Roofing Industry Trends: What Every Contractor Needs to Know',
    excerpt: 'From AI-powered measurements to sustainable materials, the roofing industry is evolving fast. Here are the 10 biggest trends shaping the industry in 2025 and how to position your business to take advantage of each one.',
    category: 'Industry News',
    date: 'March 5, 2025',
    readTime: '8 min read',
    slug: 'roofing-industry-trends-2025',
    featured: true,
  },
  {
    id: 2,
    title: 'How to Close More Roofing Sales: 15 Proven Techniques',
    excerpt: 'The best roofing salespeople do not sell — they educate, build trust, and solve problems. Learn 15 field-tested techniques that top roofing sales reps use to close at 40%+ rates, including the consultation approach, visual aids, and financing options.',
    category: 'Tips & Tricks',
    date: 'February 28, 2025',
    readTime: '12 min read',
    slug: 'close-more-roofing-sales',
    featured: true,
  },
  {
    id: 3,
    title: 'Archie Launches AI Sales Coach: Train Your Team 24/7',
    excerpt: 'Introducing Archie\'s AI Sales Coach — a personalized training tool that analyzes your sales calls, provides real-time feedback, and helps every member of your team sell like your best closer. Available now for all Pro and Enterprise users.',
    category: 'Product Updates',
    date: 'February 20, 2025',
    readTime: '5 min read',
    slug: 'archie-ai-sales-coach-launch',
  },
  {
    id: 4,
    title: 'Preparing for 2025 Storm Season: A Contractor\'s Checklist',
    excerpt: 'Storm season preparation starts months before the first hail falls. This comprehensive checklist covers everything from crew training and equipment maintenance to marketing campaigns, cash reserves, and technology setup to ensure you are ready to capitalize on storm events.',
    category: 'Storm Season',
    date: 'February 15, 2025',
    readTime: '10 min read',
    slug: 'storm-season-preparation-2025',
  },
  {
    id: 5,
    title: 'Scaling Your Roofing Company from $1M to $5M: Lessons from Contractors Who Did It',
    excerpt: 'We interviewed 12 roofing company owners who successfully scaled past $5 million in annual revenue. Their advice is surprisingly consistent: systems beat hustle, people beat tools, and culture beats strategy. Here are their top takeaways.',
    category: 'Business Growth',
    date: 'February 10, 2025',
    readTime: '15 min read',
    slug: 'scaling-roofing-company-1m-to-5m',
  },
  {
    id: 6,
    title: 'The Ultimate Guide to Roofing SEO in 2025',
    excerpt: 'Your website is your 24/7 salesperson. Learn how to optimize your roofing company website for local search, dominate the Google Map Pack, generate more organic leads, and reduce your cost-per-acquisition through strategic content and technical SEO.',
    category: 'Business Growth',
    date: 'February 5, 2025',
    readTime: '18 min read',
    slug: 'roofing-seo-guide-2025',
  },
  {
    id: 7,
    title: 'Impact-Resistant Shingles: Worth the Investment? A Data-Driven Analysis',
    excerpt: 'We analyzed insurance premium data across 15 states and manufacturer performance claims to answer the question: do Class 4 impact-resistant shingles actually save homeowners money? The short answer is yes — but the math varies significantly by market.',
    category: 'Industry News',
    date: 'January 30, 2025',
    readTime: '9 min read',
    slug: 'impact-resistant-shingles-analysis',
  },
  {
    id: 8,
    title: '5 Xactimate Mistakes That Cost Roofers Thousands',
    excerpt: 'Even experienced roofing contractors make costly errors in their Xactimate estimates. From incorrect waste factors to missing line items for code upgrades, these five common mistakes can leave $1,000 to $5,000 on the table per claim.',
    category: 'Tips & Tricks',
    date: 'January 25, 2025',
    readTime: '7 min read',
    slug: 'xactimate-mistakes-costing-roofers',
  },
  {
    id: 9,
    title: 'New Feature: AI-Powered Roof Measurements Now 40% Faster',
    excerpt: 'We have completely rebuilt Archie\'s AI measurement engine. The new system delivers measurements 40% faster with improved accuracy on complex roof geometries including multi-hip, dormered, and turret designs. Plus, automatic pitch detection and waste factor calculations.',
    category: 'Product Updates',
    date: 'January 20, 2025',
    readTime: '4 min read',
    slug: 'ai-roof-measurements-update',
  },
  {
    id: 10,
    title: 'How the Texas Hail Season 2024 Broke Records — And What 2025 May Bring',
    excerpt: 'The 2024 Texas hail season produced over $8 billion in insured losses, making it the costliest severe convective storm season in state history. We analyze the data, examine the climate factors driving increased hail activity, and forecast what contractors should expect in 2025.',
    category: 'Storm Season',
    date: 'January 15, 2025',
    readTime: '11 min read',
    slug: 'texas-hail-season-2024-analysis',
  },
  {
    id: 11,
    title: 'Roofing CRM Comparison 2025: Archie vs. JobNimbus vs. AccuLynx',
    excerpt: 'Choosing the right CRM is one of the most important technology decisions for a roofing company. We compare features, pricing, ease of use, and customer satisfaction across the three most popular roofing CRM platforms to help you make an informed decision.',
    category: 'Industry News',
    date: 'January 10, 2025',
    readTime: '14 min read',
    slug: 'roofing-crm-comparison-2025',
  },
  {
    id: 12,
    title: 'Building a Referral Machine: How One Roofer Gets 60% of Revenue from Referrals',
    excerpt: 'Mike Torres of Torres Roofing in San Antonio generates over 60% of his $3.2 million annual revenue through referrals. We spent a day with his team to understand his system — from the initial thank-you gift to the 12-month follow-up sequence that keeps his phone ringing.',
    category: 'Business Growth',
    date: 'January 5, 2025',
    readTime: '10 min read',
    slug: 'building-referral-machine-roofing',
  },
  {
    id: 13,
    title: 'Metal Roofing Market Growth: Why More Homeowners Are Making the Switch',
    excerpt: 'Residential metal roofing market share has grown from 12% to 18% over the past five years. We examine the factors driving adoption — including insurance savings, energy efficiency, sustainability, and the declining cost gap with premium asphalt shingles.',
    category: 'Industry News',
    date: 'December 28, 2024',
    readTime: '8 min read',
    slug: 'metal-roofing-market-growth',
  },
  {
    id: 14,
    title: 'Door Knocking After Storms: The Script That Books 5+ Appointments Per Day',
    excerpt: 'Door knocking remains the most effective lead generation method for storm restoration contractors. This guide includes the exact scripts, rebuttals, and follow-up sequences used by top canvassers who consistently book 5 or more appointments per day in storm-affected neighborhoods.',
    category: 'Tips & Tricks',
    date: 'December 20, 2024',
    readTime: '13 min read',
    slug: 'storm-door-knocking-script',
  },
  {
    id: 15,
    title: 'Archie Year in Review: 2024 Highlights and 2025 Roadmap',
    excerpt: 'A look back at everything we shipped in 2024 — including storm tracking, AI voice assistant, sales coaching, and production management tools — plus a sneak peek at what is coming in 2025. Spoiler: finance integrations, a mobile app, and expanded AI capabilities.',
    category: 'Product Updates',
    date: 'December 15, 2024',
    readTime: '6 min read',
    slug: 'archie-2024-year-in-review',
  },
];

const categoryColors = {
  'Industry News': 'bg-blue-100 text-blue-700',
  'Tips & Tricks': 'bg-green-100 text-green-700',
  'Product Updates': 'bg-purple-100 text-purple-700',
  'Storm Season': 'bg-yellow-100 text-yellow-700',
  'Business Growth': 'bg-archie-orange/10 text-archie-orange',
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featured = blogPosts.filter(p => p.featured);

  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Archie Roofing Blog",
    "description": "Expert roofing industry insights, tips, product updates, and business growth strategies for roofing contractors.",
    "url": "https://archie.now/blog",
    "publisher": { "@type": "Organization", "name": "Archie", "url": "https://app.archie.now" },
  };

  return (
    <>
      <Helmet>
        <title>Roofing Industry Blog | Tips, News & Insights for Contractors | Archie</title>
        <meta name="description" content="Expert roofing industry insights, business growth strategies, storm season tips, and product updates from Archie. The go-to resource for roofing contractors." />
        <meta name="keywords" content="roofing blog, roofing industry news, roofing tips, roofing business growth, storm damage tips, roofing contractor advice" />
        <link rel="canonical" href="https://archie.now/blog" />
        <meta property="og:title" content="Roofing Industry Blog | Archie" />
        <meta property="og:description" content="Expert insights and tips for roofing contractors. Industry news, business strategies, and product updates." />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-hero py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeIn}>
            <span className="inline-block mb-4 px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase bg-archie-orange/10 text-archie-orange">
              Archie Blog
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
              Insights for <span className="text-gradient">Roofing Professionals</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Industry news, expert tips, product updates, and business growth strategies to help you run a more profitable roofing company.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="bg-archie-light py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-lg font-bold text-archie-dark mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-archie-orange" /> Featured Articles
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {featured.map(post => (
              <motion.a
                key={post.id}
                href={`/blog/${post.slug}`}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="block bg-white rounded-2xl shadow-lg overflow-hidden group"
              >
                <div className="h-48 bg-gradient-cta flex items-center justify-center">
                  <Newspaper className="w-16 h-16 text-white/30" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${categoryColors[post.category]}`}>
                      {post.category}
                    </span>
                    <span className="text-gray-400 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-archie-dark mb-2 group-hover:text-archie-orange transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-gray-400 text-xs">{post.date}</span>
                    <span className="text-archie-orange text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all text-archie-dark placeholder:text-gray-400"
            />
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-archie-orange text-white shadow-lg shadow-archie-orange/25'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <cat.icon className="w-4 h-4" />
                {cat.name}
              </button>
            ))}
          </div>

          {/* Posts Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No articles found matching your search.</p>
              <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }} className="text-archie-orange font-medium mt-2 hover:underline">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(post => (
                <motion.a
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                  className="block bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow group"
                >
                  <div className="h-36 bg-archie-dark flex items-center justify-center">
                    <Newspaper className="w-10 h-10 text-white/20" />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${categoryColors[post.category]}`}>
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-archie-dark mb-2 group-hover:text-archie-orange transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{post.excerpt}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-gray-400 text-xs">{post.date}</span>
                      <span className="text-archie-orange text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-archie-dark py-16 lg:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Stay Ahead of the Industry
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Get the latest roofing industry insights, tips, and Archie product updates delivered to your inbox every week. No spam, just useful content.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-5 py-3.5 rounded-xl border border-gray-700 bg-archie-navy text-white placeholder:text-gray-500 focus:border-archie-orange focus:ring-2 focus:ring-archie-orange/20 outline-none transition-all"
              />
              <CTAButton size="md" className="w-full sm:w-auto whitespace-nowrap">
                Subscribe
              </CTAButton>
            </div>
            <p className="text-gray-500 text-xs mt-3">Free weekly insights for roofing professionals. Unsubscribe anytime.</p>
          </motion.div>
        </div>
      </section>

      {/* Resource Guides CTA */}
      <section className="bg-white py-16 lg:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <SectionHeading
            label="Deep Dives"
            title="Comprehensive Resource Guides"
            subtitle="Go deeper with our complete guides covering every aspect of running a roofing business."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'Roofing Business Guide', desc: 'Start, run, and scale a profitable roofing company.', href: '/resources/roofing-guide' },
              { title: 'Insurance Claims Guide', desc: 'Master the claims process from inspection to payment.', href: '/resources/insurance-claims-guide' },
              { title: 'Storm Damage Guide', desc: 'Identify, document, and assess every type of storm damage.', href: '/resources/storm-damage-guide' },
              { title: 'Materials Guide', desc: 'Every roofing material compared with costs and specs.', href: '/resources/roofing-materials-guide' },
            ].map((guide, i) => (
              <motion.a
                key={i}
                href={guide.href}
                variants={fadeIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="block bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow group"
              >
                <h4 className="font-bold text-archie-dark mb-2 group-hover:text-archie-orange transition-colors">{guide.title}</h4>
                <p className="text-gray-500 text-sm mb-4">{guide.desc}</p>
                <span className="text-archie-orange text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-hero py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
              Put These Insights Into Action With Archie
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Reading about roofing best practices is great. Having a platform that implements them automatically is better. Try Archie free today.
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

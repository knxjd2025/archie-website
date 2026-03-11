import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Zap,
  Brain,
  Mic,
  Calculator,
  CloudLightning,
  Trophy,
  ClipboardList,
  Users,
  Search,
  DollarSign,
  BookOpen,
  Shield,
  Hammer,
  Layers,
  MapPin,
  ExternalLink,
} from 'lucide-react';

const featureItems = [
  { name: 'CRM', href: '/features/crm', icon: Users, desc: 'Manage leads & customers' },
  { name: 'AI Roof Inspections', href: '/features/ai-roof-inspections', icon: Brain, desc: 'Drone & satellite analysis' },
  { name: 'Voice Assistant', href: '/features/voice-assistant', icon: Mic, desc: 'Hands-free AI assistant' },
  { name: 'Estimates', href: '/features/estimates', icon: Calculator, desc: 'Instant accurate estimates' },
  { name: 'Storm Tool', href: '/features/storm-tool', icon: CloudLightning, desc: 'Real-time storm tracking' },
  { name: 'Sales Coach', href: '/features/sales-coach', icon: Trophy, desc: 'AI-powered sales training' },
  { name: 'Production', href: '/features/production', icon: ClipboardList, desc: 'Job & project management' },
  { name: 'Networking', href: '/features/networking', icon: Users, desc: 'Connect with contractors' },
  { name: 'Prospector', href: '/features/prospector', icon: Search, desc: 'Find new customers' },
  { name: 'Finance', href: '/features/finance', icon: DollarSign, desc: 'Invoicing & payments' },
];

const resourceItems = [
  { name: 'Roofing Business Guide', href: '/resources/roofing-guide', icon: BookOpen },
  { name: 'Insurance Claims Guide', href: '/resources/insurance-claims-guide', icon: Shield },
  { name: 'Storm Damage Guide', href: '/resources/storm-damage-guide', icon: CloudLightning },
  { name: 'Roofing Materials Guide', href: '/resources/roofing-materials-guide', icon: Layers },
];

const cityItems = [
  { name: 'Dallas, TX', slug: 'dallas-tx' },
  { name: 'Houston, TX', slug: 'houston-tx' },
  { name: 'Denver, CO', slug: 'denver-co' },
  { name: 'Atlanta, GA', slug: 'atlanta-ga' },
  { name: 'Orlando, FL', slug: 'orlando-fl' },
  { name: 'Nashville, TN', slug: 'nashville-tn' },
  { name: 'Phoenix, AZ', slug: 'phoenix-az' },
  { name: 'Charlotte, NC', slug: 'charlotte-nc' },
  { name: 'San Antonio, TX', slug: 'san-antonio-tx' },
  { name: 'Oklahoma City, OK', slug: 'oklahoma-city-ok' },
];

function MegaMenuDropdown({ label, isOpen, onToggle, children }) {
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        onToggle(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onToggle]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => onToggle(!isOpen)}
        className="flex items-center gap-1 text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
      >
        {label}
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-50"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [mobileExpanded, setMobileExpanded] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  function handleDropdown(name, isOpen) {
    setOpenDropdown(isOpen ? name : null);
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-archie-dark/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Zap className="w-7 h-7 text-archie-orange" />
            <span className="text-xl font-extrabold tracking-tight text-gradient">
              ARCHIE
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <MegaMenuDropdown
              label="Features"
              isOpen={openDropdown === 'features'}
              onToggle={(open) => handleDropdown('features', open)}
            >
              <div className="w-[640px] bg-archie-navy/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-6">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                  <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider">
                    Platform Features
                  </h3>
                  <Link
                    to="/features"
                    className="text-xs font-medium text-archie-orange hover:text-archie-orange/80 flex items-center gap-1"
                  >
                    View all <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-1">
                  {featureItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <div className="w-9 h-9 rounded-lg bg-archie-orange/10 flex items-center justify-center shrink-0 group-hover:bg-archie-orange/20 transition-colors">
                          <Icon className="w-4.5 h-4.5 text-archie-orange" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-white group-hover:text-archie-orange transition-colors">
                            {item.name}
                          </p>
                          <p className="text-xs text-white/40 mt-0.5">{item.desc}</p>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </MegaMenuDropdown>

            <Link
              to="/pricing"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
            >
              Pricing
            </Link>

            <MegaMenuDropdown
              label="Resources"
              isOpen={openDropdown === 'resources'}
              onToggle={(open) => handleDropdown('resources', open)}
            >
              <div className="w-80 bg-archie-navy/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-4">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">
                  Guides &amp; Resources
                </h3>
                <div className="space-y-1">
                  {resourceItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                      >
                        <Icon className="w-4.5 h-4.5 text-archie-orange shrink-0" />
                        <span className="text-sm text-white/80 group-hover:text-white transition-colors">
                          {item.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-white/10 px-2">
                  <Link
                    to="/blog"
                    className="text-xs font-medium text-archie-orange hover:text-archie-orange/80 flex items-center gap-1"
                  >
                    Visit our Blog <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </MegaMenuDropdown>

            <MegaMenuDropdown
              label="Cities"
              isOpen={openDropdown === 'cities'}
              onToggle={(open) => handleDropdown('cities', open)}
            >
              <div className="w-72 bg-archie-navy/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/40 p-4">
                <h3 className="text-sm font-semibold text-white/50 uppercase tracking-wider mb-3 px-2">
                  Top Markets
                </h3>
                <div className="grid grid-cols-1 gap-0.5">
                  {cityItems.map((city) => (
                    <Link
                      key={city.slug}
                      to={`/cities/${city.slug}`}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <MapPin className="w-3.5 h-3.5 text-archie-orange/60 group-hover:text-archie-orange" />
                      <span className="text-sm text-white/70 group-hover:text-white transition-colors">
                        {city.name}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </MegaMenuDropdown>

            <Link
              to="/about"
              className="text-sm font-medium text-white/80 hover:text-white transition-colors py-2"
            >
              About
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/features"
              className="px-4 py-2 text-sm font-medium text-white/90 border border-white/15 rounded-lg hover:bg-white/5 transition-colors"
            >
              See Features
            </Link>
            <a
              href="https://app.archie.now"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-cta rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-archie-orange/20"
            >
              Start Free
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-white/80 hover:text-white"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 250 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-archie-dark border-l border-white/10 z-50 lg:hidden flex flex-col"
            >
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-archie-orange" />
                  <span className="text-lg font-extrabold text-gradient">ARCHIE</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 text-white/60 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Nav Links */}
              <div className="flex-1 overflow-y-auto py-4 px-4">
                <div className="space-y-1">
                  {/* Features Accordion */}
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'features' ? null : 'features')
                    }
                    className="flex items-center justify-between w-full py-3 text-sm font-semibold text-white/90"
                  >
                    Features
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpanded === 'features' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'features' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pb-2 space-y-0.5">
                          <Link
                            to="/features"
                            className="block py-2 px-3 text-sm text-archie-orange font-medium rounded-lg hover:bg-white/5"
                          >
                            All Features
                          </Link>
                          {featureItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block py-2 px-3 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Link
                    to="/pricing"
                    className="block py-3 text-sm font-semibold text-white/90 hover:text-white"
                  >
                    Pricing
                  </Link>

                  {/* Resources Accordion */}
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'resources' ? null : 'resources')
                    }
                    className="flex items-center justify-between w-full py-3 text-sm font-semibold text-white/90"
                  >
                    Resources
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpanded === 'resources' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'resources' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pb-2 space-y-0.5">
                          {resourceItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
                              className="block py-2 px-3 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                              {item.name}
                            </Link>
                          ))}
                          <Link
                            to="/blog"
                            className="block py-2 px-3 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                          >
                            Blog
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Cities Accordion */}
                  <button
                    onClick={() =>
                      setMobileExpanded(mobileExpanded === 'cities' ? null : 'cities')
                    }
                    className="flex items-center justify-between w-full py-3 text-sm font-semibold text-white/90"
                  >
                    Cities
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        mobileExpanded === 'cities' ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileExpanded === 'cities' && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pl-3 pb-2 space-y-0.5">
                          {cityItems.map((city) => (
                            <Link
                              key={city.slug}
                              to={`/cities/${city.slug}`}
                              className="block py-2 px-3 text-sm text-white/60 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                            >
                              {city.name}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <Link
                    to="/about"
                    className="block py-3 text-sm font-semibold text-white/90 hover:text-white"
                  >
                    About
                  </Link>
                  <Link
                    to="/contact"
                    className="block py-3 text-sm font-semibold text-white/90 hover:text-white"
                  >
                    Contact
                  </Link>
                </div>
              </div>

              {/* Mobile CTAs */}
              <div className="p-4 border-t border-white/10 space-y-3">
                <Link
                  to="/contact"
                  className="block w-full py-2.5 text-center text-sm font-medium text-white border border-white/15 rounded-lg hover:bg-white/5 transition-colors"
                >
                  See Features
                </Link>
                <a
                  href="https://app.archie.now"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2.5 text-center text-sm font-semibold text-white bg-gradient-cta rounded-lg hover:opacity-90 transition-opacity"
                >
                  Start Free
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}

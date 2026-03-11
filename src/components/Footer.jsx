import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Shield,
  Lock,
  Server,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Instagram,
} from 'lucide-react';

const productLinks = [
  { name: 'CRM', href: '/features/crm' },
  { name: 'AI Roof Inspections', href: '/features/ai-roof-inspections' },
  { name: 'Voice Assistant', href: '/features/voice-assistant' },
  { name: 'Estimates', href: '/features/estimates' },
  { name: 'Storm Tool', href: '/features/storm-tool' },
  { name: 'Sales Coach', href: '/features/sales-coach' },
  { name: 'Production', href: '/features/production' },
  { name: 'Networking', href: '/features/networking' },
  { name: 'Prospector', href: '/features/prospector' },
  { name: 'Finance', href: '/features/finance' },
];

const resourceLinks = [
  { name: 'Roofing Business Guide', href: '/resources/roofing-guide' },
  { name: 'Insurance Claims Guide', href: '/resources/insurance-claims-guide' },
  { name: 'Storm Damage Guide', href: '/resources/storm-damage-guide' },
  { name: 'Roofing Materials Guide', href: '/resources/roofing-materials-guide' },
  { name: 'Blog', href: '/blog' },
];

const companyLinks = [
  { name: 'About Archie', href: '/about' },
  { name: 'Contact Us', href: '/contact' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Free CRM', href: '/free-crm' },
  { name: 'Instant Estimate', href: '/instant-estimate' },
  { name: 'Weather Dashboard', href: '/weather' },
];

const cityLinks = [
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

const socialLinks = [
  { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/archieroofing' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/archieroofing' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/archieroofing' },
  { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/@archieroofing' },
  { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/archieroofing' },
];

const trustBadges = [
  { label: 'SOC 2 Compliant', icon: Shield },
  { label: '256-bit Encryption', icon: Lock },
  { label: '99.9% Uptime', icon: Server },
];

function FooterLinkColumn({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
        {title}
      </h3>
      <ul className="space-y-2.5">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-sm text-white/50 hover:text-archie-orange transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  function handleNewsletterSubmit(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  }

  return (
    <footer className="bg-archie-dark border-t border-white/5">
      {/* Newsletter CTA Section */}
      <div className="border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left max-w-md">
              <h3 className="text-xl font-bold text-white mb-2">
                Stay ahead of the storm
              </h3>
              <p className="text-sm text-white/50">
                Get roofing industry insights, product updates, and growth tips delivered to
                your inbox weekly.
              </p>
            </div>
            <form
              onSubmit={handleNewsletterSubmit}
              className="flex w-full max-w-md"
            >
              <div className="flex-1 relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-l-lg text-sm text-white placeholder-white/30 focus:outline-none focus:border-archie-orange/50 focus:ring-1 focus:ring-archie-orange/50 transition-colors"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-3 bg-gradient-cta text-white text-sm font-semibold rounded-r-lg hover:opacity-90 transition-opacity flex items-center gap-1.5 shrink-0"
              >
                {subscribed ? (
                  'Subscribed!'
                ) : (
                  <>
                    Subscribe <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2 mb-4 lg:mb-0">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/archie-logo.png" alt="Archie" className="w-7 h-7" />
              <span className="text-lg font-extrabold text-gradient">ARCHIE</span>
            </Link>
            <p className="text-sm text-white/40 mb-5 max-w-xs leading-relaxed">
              The AI-powered operating system for modern roofing businesses. Manage leads,
              inspections, estimates, production, and finances from one platform.
            </p>
            <div className="space-y-2 mb-6">
              <a
                href="mailto:hello@archie.now"
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                hello@archie.now
              </a>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:bg-archie-orange/15 hover:text-archie-orange transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Product Links */}
          <FooterLinkColumn title="Product">
            {productLinks.map((link) => (
              <FooterLink key={link.href} to={link.href}>
                {link.name}
              </FooterLink>
            ))}
          </FooterLinkColumn>

          {/* Resources Links */}
          <FooterLinkColumn title="Resources">
            {resourceLinks.map((link) => (
              <FooterLink key={link.href} to={link.href}>
                {link.name}
              </FooterLink>
            ))}
          </FooterLinkColumn>

          {/* Company Links */}
          <FooterLinkColumn title="Company">
            {companyLinks.map((link) => (
              <FooterLink key={link.href} to={link.href}>
                {link.name}
              </FooterLink>
            ))}
          </FooterLinkColumn>

          {/* Cities Links */}
          <FooterLinkColumn title="Cities">
            {cityLinks.map((city) => (
              <FooterLink key={city.slug} to={`/cities/${city.slug}`}>
                {city.name}
              </FooterLink>
            ))}
          </FooterLinkColumn>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap items-center justify-center gap-6 lg:gap-10">
            {trustBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.label}
                  className="flex items-center gap-2 text-white/30"
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium tracking-wide">{badge.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Archie Technologies, Inc. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link
                to="/privacy-policy"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms-of-service"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/security"
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Security
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/HomePage'));
const Features = lazy(() => import('./pages/Features'));
const CRM = lazy(() => import('./pages/features/CRM'));
const AIRoofInspections = lazy(() => import('./pages/features/AIRoofInspections'));
const VoiceAssistant = lazy(() => import('./pages/features/VoiceAssistant'));
const Estimates = lazy(() => import('./pages/features/Estimates'));
const StormTool = lazy(() => import('./pages/features/StormTool'));
const SalesCoach = lazy(() => import('./pages/features/SalesCoach'));
const Production = lazy(() => import('./pages/features/Production'));
const Networking = lazy(() => import('./pages/features/Networking'));
const Prospector = lazy(() => import('./pages/features/Prospector'));
const Finance = lazy(() => import('./pages/features/Finance'));
const Pricing = lazy(() => import('./pages/Pricing'));
const InstantEstimate = lazy(() => import('./pages/InstantEstimate'));
const Weather = lazy(() => import('./pages/Weather'));
const FreeCRM = lazy(() => import('./pages/FreeCRM'));
const RoofingGuide = lazy(() => import('./pages/resources/RoofingGuide'));
const InsuranceClaimsGuide = lazy(() => import('./pages/resources/InsuranceClaimsGuide'));
const StormDamageGuide = lazy(() => import('./pages/resources/StormDamageGuide'));
const RoofingMaterialsGuide = lazy(() => import('./pages/resources/RoofingMaterialsGuide'));
const CityPage = lazy(() => import('./pages/cities/CityPage'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-archie-dark flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-archie-orange/30 border-t-archie-orange rounded-full animate-spin" />
        <p className="text-white/60 text-sm tracking-wide">Loading...</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/features" element={<Features />} />
          <Route path="/features/crm" element={<CRM />} />
          <Route path="/features/ai-roof-inspections" element={<AIRoofInspections />} />
          <Route path="/features/voice-assistant" element={<VoiceAssistant />} />
          <Route path="/features/estimates" element={<Estimates />} />
          <Route path="/features/storm-tool" element={<StormTool />} />
          <Route path="/features/sales-coach" element={<SalesCoach />} />
          <Route path="/features/production" element={<Production />} />
          <Route path="/features/networking" element={<Networking />} />
          <Route path="/features/prospector" element={<Prospector />} />
          <Route path="/features/finance" element={<Finance />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/instant-estimate" element={<InstantEstimate />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/free-crm" element={<FreeCRM />} />
          <Route path="/resources/roofing-guide" element={<RoofingGuide />} />
          <Route path="/resources/insurance-claims-guide" element={<InsuranceClaimsGuide />} />
          <Route path="/resources/storm-damage-guide" element={<StormDamageGuide />} />
          <Route path="/resources/roofing-materials-guide" element={<RoofingMaterialsGuide />} />
          <Route path="/cities/:citySlug" element={<CityPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

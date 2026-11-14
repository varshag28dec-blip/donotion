import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import EmergencyBanner from './components/EmergencyBanner';

// Pages
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import DonorDashboard from './pages/DonorDashboard';
import ReceiverDashboard from './pages/ReceiverDashboard';
import VolunteerDashboard from './pages/VolunteerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ShareBasketPage from './pages/ShareBasketPage';
import FoodRescuePage from './pages/FoodRescuePage';
import RequestHelpPage from './pages/RequestHelpPage';
import DonationKitsPage from './pages/DonationKitsPage';
import CommunityMapPage from './pages/CommunityMapPage';
import TrackingPage from './pages/TrackingPage';
import SocialImpactPage from './pages/SocialImpactPage';
import Login from './pages/Login';
import Register from './pages/Register';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-[#071426] text-[#F8FAFC]">
          <EmergencyBanner />
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/donate" element={<DonorDashboard />} />
              <Route path="/request-help" element={<RequestHelpPage />} />
              <Route path="/share-basket" element={<ShareBasketPage />} />
              <Route path="/food-rescue" element={<FoodRescuePage />} />
              <Route path="/kits" element={<DonationKitsPage />} />
              <Route path="/map" element={<CommunityMapPage />} />
              <Route path="/volunteer" element={<VolunteerDashboard />} />
              <Route path="/impact" element={<SocialImpactPage />} />
              <Route path="/track/:code" element={<TrackingPage />} />
              <Route path="/tracking/:code" element={<TrackingPage />} />
              <Route path="/tracking" element={<TrackingPage />} />

              {/* Role Dashboards */}
              <Route path="/donor/dashboard" element={<DonorDashboard />} />
              <Route path="/receiver/dashboard" element={<ReceiverDashboard />} />
              <Route path="/volunteer/dashboard" element={<VolunteerDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />

              {/* Auth & Info */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Fallback to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

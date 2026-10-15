import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import PrivacyPolicy from './pages/PrivacyPolicy.jsx';
import TermsPage from './pages/TermsPage.jsx';
import BlogIndex from './pages/BlogIndex.jsx';
import BlogPost from './pages/BlogPost.jsx';
import DecodeHome from './pages/DecodeHome.jsx';
import DecodeCategory from './pages/DecodeCategory.jsx';
import DecodeDetail from './pages/DecodeDetail.jsx';
import DecodeRedirectPage from './pages/DecodeRedirectPage.jsx';
import DecodeAnalytics from './pages/DecodeAnalytics.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import AnalyticsTracker from './components/AnalyticsTracker.jsx';
import { TransitionProvider } from './context/TransitionContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TransitionProvider>
        <AnalyticsTracker />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          
          {/* Decode Platform Routes */}
          <Route path="/decode" element={<DecodeHome />} />
          <Route path="/decode/analytics" element={<DecodeAnalytics />} />
          <Route path="/decode/:category" element={<DecodeCategory />} />
          <Route path="/decode/:category/:slug" element={<DecodeDetail />} />
          <Route path="/articles" element={<Navigate to="/decode" replace />} />
          <Route path="/articles/*" element={<Navigate to="/decode" replace />} />

          {/* First-Party Outbound Redirect Routes */}
          <Route path="/go/:slug" element={<DecodeRedirectPage />} />
          <Route path="/go/:category/:slug" element={<DecodeRedirectPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  </StrictMode>,
);

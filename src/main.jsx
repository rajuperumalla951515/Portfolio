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
import DecodeJobsPage from './pages/DecodeJobsPage.jsx';
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
          <Route path="/decode" element={<DecodeJobsPage />} />
          <Route path="/decode/resources" element={<DecodeHome />} />
          <Route path="/decode/analytics" element={<DecodeAnalytics />} />
          <Route path="/decode/internships" element={<Navigate to="/decode/jobs/internships" replace />} />
          <Route path="/decode/jobs" element={<DecodeJobsPage />} />
          <Route path="/decode/jobs/saved" element={<DecodeJobsPage categorySlug="saved" />} />
          <Route path="/decode/jobs/internships" element={<DecodeJobsPage categorySlug="internships" />} />
          <Route path="/decode/jobs/graduate-trainee" element={<DecodeJobsPage categorySlug="graduate-trainee" />} />
          <Route path="/decode/jobs/entry-level" element={<DecodeJobsPage categorySlug="entry-level" />} />
          <Route path="/decode/jobs/apprenticeships" element={<DecodeJobsPage categorySlug="apprenticeships" />} />
          <Route path="/decode/jobs/remote" element={<DecodeJobsPage categorySlug="remote" />} />
          <Route path="/decode/jobs/:jobId" element={<DecodeDetail jobMode />} />
          <Route path="/decode/:category" element={<DecodeCategory />} />
          <Route path="/decode/:category/:slug" element={<DecodeDetail />} />
          <Route path="/articles" element={<Navigate to="/decode/resources" replace />} />
          <Route path="/articles/*" element={<Navigate to="/decode/resources" replace />} />

          {/* First-Party Outbound Redirect Routes */}
          <Route path="/go/:slug" element={<DecodeRedirectPage />} />
          <Route path="/go/:category/:slug" element={<DecodeRedirectPage />} />
          
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </TransitionProvider>
    </BrowserRouter>
  </StrictMode>,
);

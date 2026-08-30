import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';
import { DashboardLayout } from './layouts/DashboardLayout';
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { LiveMapPage } from './pages/LiveMapPage';
import { RouteIntelligencePage } from './pages/RouteIntelligencePage';
import { AccessibilityPage } from './pages/AccessibilityPage';
import { RiskDisruptionsPage } from './pages/RiskDisruptionsPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { AlertsPage } from './pages/AlertsPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';

export function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <AppStateProvider>
          <ToastProvider>
            <Routes>
              {/* Landing page */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />

              {/* Dashboard and Core App Layout */}
              <Route element={<DashboardLayout />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/map" element={<LiveMapPage />} />
                <Route path="/routes" element={<RouteIntelligencePage />} />
                <Route path="/accessibility" element={<AccessibilityPage />} />
                <Route path="/risk" element={<RiskDisruptionsPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/ai-insights" element={<AIInsightsPage />} />
                <Route path="/alerts" element={<AlertsPage />} />
                <Route path="/reports" element={<ReportsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>

              {/* Fallback to dashboard */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </ToastProvider>
        </AppStateProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

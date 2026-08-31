import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppStateProvider } from './context/AppStateContext';
import { ToastProvider } from './context/ToastContext';
import { LanguageProvider } from './context/LanguageContext';

// Stitch Driver App Layout & Screens
import { DriverLayout } from './layouts/DriverLayout';
import { DriverHomeScreen } from './pages/driver/DriverHomeScreen';
import { DriverRouteScreen } from './pages/driver/DriverRouteScreen';
import { DriverDeliveryScreen } from './pages/driver/DriverDeliveryScreen';
import { DriverSosScreen } from './pages/driver/DriverSosScreen';
import { DriverSupportScreen } from './pages/driver/DriverSupportScreen';

// Admin & Intelligence Platform Layout & Screens
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
              {/* Stitch Driver App (Default mobile-first driver experience) */}
              <Route path="/" element={<DriverLayout />}>
                <Route index element={<DriverHomeScreen />} />
                <Route path="driver" element={<DriverHomeScreen />} />
                <Route path="driver/home" element={<DriverHomeScreen />} />
                <Route path="driver/route" element={<DriverRouteScreen />} />
                <Route path="driver/delivery" element={<DriverDeliveryScreen />} />
                <Route path="driver/sos" element={<DriverSosScreen />} />
                <Route path="driver/support" element={<DriverSupportScreen />} />
              </Route>

              {/* Landing Page */}
              <Route path="/landing" element={<LandingPage />} />

              {/* Admin Command Center & Intelligence Portal */}
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

              {/* Fallback to Driver App */}
              <Route path="*" element={<Navigate to="/driver" replace />} />
            </Routes>
          </ToastProvider>
        </AppStateProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;

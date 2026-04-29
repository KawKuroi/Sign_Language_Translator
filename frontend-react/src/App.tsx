import { lazy, Suspense, type ReactNode } from 'react';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/lib/auth';
import { ToastProvider } from '@/components/ui/toast';
import { SectionLabel } from '@/components/ui/section-label';

const LandingPage = lazy(() => import('@/pages/landing'));
const AppTranslatorPage = lazy(() => import('@/pages/app-translator'));
const HistoryPage = lazy(() => import('@/pages/history'));
const AboutPage = lazy(() => import('@/pages/about'));
const LoginPage = lazy(() => import('@/pages/login'));
const RegisterPage = lazy(() => import('@/pages/register'));
const NotFoundPage = lazy(() => import('@/pages/not-found'));

function RequireAuth({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function PageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg">
      <SectionLabel>Cargando…</SectionLabel>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<AppTranslatorPage />} />
              <Route
                path="/history"
                element={
                  <RequireAuth>
                    <HistoryPage />
                  </RequireAuth>
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

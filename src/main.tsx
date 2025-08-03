import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorBoundary } from './components/ui/error-boundary'
import { LoadingSkeleton } from './components/ui/loading-skeleton'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingSkeleton variant="profile" />
        </div>
      }>
        <App />
      </Suspense>
    </ErrorBoundary>
  </StrictMode>
);

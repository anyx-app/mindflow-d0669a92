import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for routes that don't exist yet
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-3xl font-bold text-white">{title}</h2>
    <p className="text-slate-400 max-w-md">
      This feature is currently under development. Check back soon for updates!
    </p>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Dashboard />} />
          <Route path="journal" element={<PlaceholderPage title="Journal" />} />
          <Route path="mood" element={<PlaceholderPage title="Mood Tracker" />} />
          <Route path="insights" element={<PlaceholderPage title="Insights" />} />
          <Route path="connections" element={<PlaceholderPage title="Therapist Connect" />} />
          <Route path="settings" element={<PlaceholderPage title="Settings" />} />
          
          {/* Catch all redirect to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

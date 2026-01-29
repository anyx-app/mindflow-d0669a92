import React, { useState } from 'react';
import { Menu, X, Home, BookOpen, Activity, Share2, BarChart2, Settings, LogOut } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router-dom';

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isActive }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group
      ${
        isActive
          ? 'bg-[#7FB3D5]/20 text-white shadow-[0_0_15px_rgba(127,179,213,0.3)] border border-[#7FB3D5]/30'
          : 'text-slate-400 hover:text-white hover:bg-white/5 hover:translate-x-1'
      }
    `}
  >
    <div className={`transition-transform duration-300 ${isActive ? 'scale-110 text-[#7FB3D5]' : 'group-hover:scale-110'}`}>
      {icon}
    </div>
    <span className="font-medium tracking-wide">{label}</span>
  </Link>
);

export const AppShell: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { to: '/', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/journal', icon: <BookOpen size={20} />, label: 'Journal' },
    { to: '/mood', icon: <Activity size={20} />, label: 'Mood Tracker' },
    { to: '/insights', icon: <BarChart2 size={20} />, label: 'Insights' },
    { to: '/connections', icon: <Share2 size={20} />, label: 'Therapist Connect' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-100 font-sans selection:bg-[#7FB3D5]/30">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 w-full z-50 bg-[#0f172a]/80 backdrop-blur-xl border-b border-white/10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#7FB3D5] to-[#F5B7B1] flex items-center justify-center shadow-lg shadow-[#7FB3D5]/20">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
            MindFlow
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-300 hover:text-white active:scale-95 transition-transform"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0f172a]/95 backdrop-blur-2xl border-r border-white/10 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Logo Area */}
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#7FB3D5] to-[#F5B7B1] flex items-center justify-center shadow-[0_0_20px_rgba(127,179,213,0.3)]">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">MindFlow</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>

          {/* User Profile Snippet */}
          <div className="mt-auto pt-6 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-600 to-slate-800 border-2 border-white/20 flex items-center justify-center overflow-hidden">
                 <div className="w-full h-full bg-slate-700 flex items-center justify-center text-xs">AC</div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-white truncate group-hover:text-[#7FB3D5] transition-colors">Alex Chen</p>
                <p className="text-xs text-slate-400 truncate">Free Plan</p>
              </div>
            </div>
             <button className="flex items-center gap-2 text-slate-400 hover:text-red-400 transition-colors text-sm px-3">
                <LogOut size={16} />
                <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="lg:ml-72 min-h-screen pt-20 lg:pt-0">
        <div className="container mx-auto p-6 lg:p-10 animate-in fade-in duration-500">
           <Outlet />
        </div>
      </main>
      
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </div>
  );
};

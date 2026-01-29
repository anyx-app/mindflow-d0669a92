import React from 'react';
import { Plus, TrendingUp, Shield, Book, ArrowRight, Sun, Cloud, Moon, CloudRain } from 'lucide-react';
import { Link } from 'react-router-dom';

const MoodCard = () => (
  <div className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
    <div className="absolute top-0 right-0 w-32 h-32 bg-[#7FB3D5]/20 rounded-full blur-3xl -mr-16 -mt-16 transition-all duration-500 group-hover:bg-[#7FB3D5]/30"></div>
    
    <div className="relative z-10">
      <h3 className="text-2xl font-semibold text-white mb-2">How are you feeling?</h3>
      <p className="text-slate-400 mb-8">Log your mood to track patterns over time.</p>
      
      <div className="flex justify-between items-center gap-2 mb-8">
        {[
            { icon: <Sun size={24} />, label: 'Great', color: 'hover:text-yellow-300 hover:bg-yellow-500/20' },
            { icon: <Cloud size={24} />, label: 'Okay', color: 'hover:text-blue-300 hover:bg-blue-500/20' },
            { icon: <CloudRain size={24} />, label: 'Sad', color: 'hover:text-indigo-300 hover:bg-indigo-500/20' },
            { icon: <Moon size={24} />, label: 'Down', color: 'hover:text-purple-300 hover:bg-purple-500/20' }
        ].map((mood, idx) => (
            <button 
                key={idx}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border border-white/5 bg-white/5 transition-all duration-300 ${mood.color} group/btn active:scale-95`}
            >
                <div className="transition-transform duration-300 group-hover/btn:scale-110">{mood.icon}</div>
                <span className="text-xs font-medium text-slate-300">{mood.label}</span>
            </button>
        ))}
      </div>

      <button className="w-full py-3 px-4 bg-gradient-to-r from-[#7FB3D5] to-[#5DADE2] hover:from-[#5DADE2] hover:to-[#3498DB] text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all duration-300 hover:shadow-blue-500/30 active:scale-95 flex items-center justify-center gap-2">
        <Plus size={18} />
        <span>New Check-in</span>
      </button>
    </div>
  </div>
);

const FeatureCard = ({ title, description, icon, link, delay }: { title: string, description: string, icon: React.ReactNode, link: string, delay: string }) => (
  <Link to={link} className={`block h-full animate-in fade-in slide-in-from-bottom-4 duration-700 ${delay}`}>
    <div className="h-full group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 hover:border-white/20">
      <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity text-[#7FB3D5]">
        <ArrowRight size={20} className="-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
      </div>
      
      <div className="mb-4 w-12 h-12 rounded-lg bg-[#E8F8F5]/10 flex items-center justify-center text-[#7FB3D5] group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
    </div>
  </Link>
);

export default function Dashboard() {
  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Good Morning, <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7FB3D5] to-[#F5B7B1]">Alex</span>
          </h1>
          <p className="text-lg text-slate-400">Ready to flow through your thoughts today?</p>
        </div>
        <div className="text-right hidden md:block">
          <p className="text-sm font-medium text-[#7FB3D5]">Current Streak</p>
          <div className="text-3xl font-bold text-white">5 Days</div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Mood Tracker (Takes up 1 column on large screens) */}
        <div className="lg:col-span-1">
          <MoodCard />
        </div>

        {/* Right Column: Features Grid (Takes up 2 columns) */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
           <FeatureCard 
             title="Daily Journal"
             description="Write down your thoughts with guided prompts designed to help you find clarity and calm."
             icon={<Book size={24} />}
             link="/journal"
             delay="delay-100"
           />
           <FeatureCard 
             title="Mood Insights"
             description="Visualize your emotional trends and discover patterns in your mental health journey."
             icon={<TrendingUp size={24} />}
             link="/insights"
             delay="delay-200"
           />
           <FeatureCard 
             title="Therapist Connect"
             description="Securely share your logs and entries with your therapist for better professional support."
             icon={<Shield size={24} />}
             link="/connections"
             delay="delay-300"
           />
           <div className="rounded-2xl bg-gradient-to-br from-[#7FB3D5]/20 to-[#F5B7B1]/20 border border-white/10 p-6 flex flex-col justify-center items-center text-center">
             <h3 className="text-lg font-semibold text-white mb-2">Quote of the Day</h3>
             <p className="text-slate-300 italic">"Peace comes from within. Do not seek it without."</p>
             <span className="text-xs text-slate-500 mt-2">— Buddha</span>
           </div>
        </div>
      </div>
      
      {/* Recent Activity / Placeholder */}
      <div className="pt-8 border-t border-white/10">
        <h2 className="text-2xl font-semibold text-white mb-6">Recent Activity</h2>
        <div className="bg-white/5 rounded-xl border border-white/10 p-8 text-center">
            <p className="text-slate-400">No recent activity found. Start by checking in!</p>
        </div>
      </div>
    </div>
  );
}

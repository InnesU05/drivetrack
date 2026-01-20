"use client";

import Link from "next/link";
import Image from "next/image"; // 🔴 Added Import
import { 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  Play,
  X,
  Check,
  Zap,
  Car // Kept specifically for the footer or other sections if needed, but removed from Nav
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- 1. NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2">
              
              {/* 🔴 NEW: Custom App Logo */}
              <div className="relative w-8 h-8 rounded-lg overflow-hidden shadow-sm">
                  <Image 
                    src="/icon-192.png" 
                    alt="ADIbase Logo" 
                    fill
                    className="object-cover"
                  />
              </div>

              <span className="text-xl font-extrabold tracking-tight">
                ADI<span className="text-blue-600">base</span>
              </span>
              <span className="bg-blue-100 text-blue-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wide ml-1">
                  Beta
              </span>
            </div>

            <div className="flex items-center gap-4">
              <Link 
                href="/login" 
                className="text-sm font-bold text-slate-600 hover:text-slate-900 hidden sm:block"
              >
                Log In
              </Link>
              <Link
                href="/login?view=signup"
                className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-all active:scale-95"
              >
                Get Started
              </Link>
            </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        
        {/* --- 2. HERO SECTION --- */}
        <section className="max-w-4xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
             Early Access Now Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            The modern way to run <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">your driving school.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ditch the paper diary. Track students, <strong>record payments</strong>, and manage your business from your pocket.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <Link
                href="/login?view=signup"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all"
            >
                Start Free Trial <ArrowRight size={20} />
            </Link>
            <Link
                href="/login"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-lg px-8 py-4 rounded-full shadow-sm active:scale-[0.98] transition-all"
            >
                Log In
            </Link>
          </div>

          {/* Video Placeholder */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 flex flex-col items-center justify-center group overflow-hidden cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 opacity-80 group-hover:opacity-60 transition-opacity"></div>
             <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white ml-1" size={32} />
             </div>
             <p className="relative z-10 text-slate-400 font-medium mt-4 group-hover:text-white transition-colors">
                 Watch 1-minute Demo
             </p>
             <div className="absolute top-4 right-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                 Video Demo Box
             </div>
          </div>
        </section>

        {/* --- 3. SOCIAL PROOF --- */}
        <section className="max-w-5xl mx-auto mb-32 text-center">
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by smart instructors</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    "Paperless Diary", 
                    "Finance Tracking", 
                    "Student Progress App"
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center gap-3 font-bold text-slate-600 border border-slate-100">
                        <CheckCircle2 className="text-blue-600" size={20} /> {item}
                    </div>
                ))}
            </div>
        </section>

        {/* --- 4. COMPARISON TABLE --- */}
        <section className="max-w-3xl mx-auto mb-32">
            <div className="text-center mb-10">
                <h2 className="text-3xl font-extrabold text-slate-900">Stop living in the past.</h2>
                <p className="text-slate-500 mt-2">See why ADIs are switching to digital.</p>
            </div>
            
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                <div className="grid grid-cols-3 bg-slate-50 border-b border-slate-200 p-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                    <div className="col-span-1">Feature</div>
                    <div className="col-span-1 text-center">Paper Diary</div>
                    <div className="col-span-1 text-center text-blue-600">ADIbase</div>
                </div>
                {[
                    { name: "Data Backup", old: "Lost if dropped", new: "Secure Cloud" },
                    { name: "Payment Status", old: "Guesswork", new: "Instantly Visible" },
                    { name: "Student Feedback", old: "Verbal / Forgotten", new: "Visual App" },
                    { name: "Looking Professional", old: "❌", new: "✅" },
                ].map((row, i) => (
                    <div key={i} className="grid grid-cols-3 p-5 border-b border-slate-100 last:border-0 items-center">
                        <div className="col-span-1 font-bold text-slate-700 text-sm">{row.name}</div>
                        <div className="col-span-1 text-center text-slate-400 font-medium text-sm flex justify-center">{row.old === "❌" ? <X size={18} /> : row.old}</div>
                        <div className="col-span-1 text-center text-blue-600 font-bold text-sm flex justify-center bg-blue-50/50 py-1 rounded-lg">{row.new === "✅" ? <Check size={18} /> : row.new}</div>
                    </div>
                ))}
            </div>
        </section>

        {/* --- 5. FEATURES --- */}
        <section className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Everything you need.</h2>
                <p className="text-slate-500 text-lg">We handle the boring stuff so you can focus on teaching.</p>
            </div>

            {/* A. The "Hero" Feature Box (Student App) */}
            <div className="w-full bg-slate-900 rounded-[2.5rem] p-10 md:p-16 relative overflow-hidden group transition-colors flex flex-col md:flex-row items-center gap-16 mb-8 text-white shadow-2xl">
                <div className="flex-1 text-center md:text-left z-10">
                    <div className="inline-flex items-center gap-2 bg-blue-600/20 text-blue-300 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 border border-blue-500/30">
                        <Smartphone size={14} /> Student Features
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4">Student App Included</h3>
                    <p className="text-slate-400 leading-relaxed text-lg max-w-md">
                        Give students a free login via QR Code. They can view their progress charts, lesson history, and payment status instantly.
                    </p>
                </div>
                
                {/* CSS Phone Mockup */}
                <div className="relative w-64 h-[22rem] bg-slate-800 border-8 border-slate-700 rounded-[2.5rem] shadow-2xl flex-shrink-0 rotate-3 md:rotate-0 hover:rotate-0 transition-all duration-500">
                        <div className="w-full h-full bg-slate-900 rounded-[2rem] overflow-hidden p-4 space-y-3">
                            <div className="w-24 h-4 bg-slate-700 rounded-full mx-auto mb-6 opacity-50"></div>
                            <div className="w-full h-24 bg-blue-600/10 rounded-2xl border border-blue-500/20 p-3 flex gap-3 items-center">
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white text-xs">85%</div>
                                <div className="flex-1 space-y-2">
                                    <div className="w-20 h-2 bg-slate-700 rounded-full"></div>
                                    <div className="w-full h-2 bg-slate-800 rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="w-full h-12 bg-slate-800 rounded-xl"></div>
                                <div className="w-full h-12 bg-slate-800 rounded-xl"></div>
                            </div>
                        </div>
                </div>
            </div>

            {/* B. The 3-Column Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Finance Card */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-300 transition-colors group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-emerald-600 group-hover:scale-110 transition-transform">
                        <CreditCard size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Finance Tracking</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Manually track who has paid and who hasn't. See your total earnings at a glance.
                    </p>
                </div>

                {/* Logs Card */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-300 transition-colors group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                        <BarChart3 size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Lesson Logs</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Create professional lesson logs in seconds. Rate skills from 1-5 and add notes.
                    </p>
                </div>

                {/* Security Card */}
                <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 hover:border-blue-300 transition-colors group">
                    <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-purple-600 group-hover:scale-110 transition-transform">
                        <ShieldCheck size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Bank-Grade Security</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                        Data is encrypted and backed up daily. We take privacy seriously.
                    </p>
                </div>

            </div>
        </section>

        {/* --- 6. HOW IT WORKS --- */}
        <section className="max-w-5xl mx-auto mb-32 px-4">
             <div className="text-center mb-16">
                <span className="text-blue-600 font-bold text-sm uppercase tracking-widest">Simple Workflow</span>
                <h2 className="text-3xl font-extrabold text-slate-900 mt-2">Get started in 3 minutes</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                 <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>

                 {[
                    { step: 1, title: "Create Account", text: "Sign up for the free trial. No credit card required to start." },
                    { step: 2, title: "Invite Student", text: "Show them your unique QR code. They scan it to connect instantly." },
                    { step: 3, title: "Start Logging", text: "Track their first lesson and mark it as paid. It's that easy." }
                 ].map((s, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center relative group hover:-translate-y-1 transition-transform">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-6 ring-4 ring-white">
                            {s.step}
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                        <p className="text-slate-500 text-sm leading-relaxed">{s.text}</p>
                    </div>
                 ))}
             </div>
        </section>

        {/* --- 7. PRICING --- */}
        <section className="max-w-4xl mx-auto mb-32">
            <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-white flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-blue-900/20 relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none"></div>

                <div className="flex-1">
                    <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mb-4 text-blue-100">
                        <Zap size={14} fill="currentColor" /> Simple Pricing
                    </div>
                    <h2 className="text-4xl font-extrabold mb-4">One plan. Everything included.</h2>
                    <ul className="space-y-3 text-blue-100 font-medium">
                        <li className="flex items-center gap-2"><Check size={18} /> Unlimited Students & Lessons</li>
                        <li className="flex items-center gap-2"><Check size={18} /> Free Student App Access</li>
                        <li className="flex items-center gap-2"><Check size={18} /> Cancel anytime</li>
                    </ul>
                </div>

                <div className="bg-white text-slate-900 p-8 rounded-2xl min-w-[280px] text-center shadow-lg transform rotate-2">
                    <p className="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">Monthly</p>
                    <div className="flex items-center justify-center gap-1 mb-4">
                        <span className="text-5xl font-extrabold tracking-tighter">£5.99</span>
                    </div>
                    <Link 
                        href="/login?view=signup"
                        className="block w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors"
                    >
                        Start 7-Day Trial
                    </Link>
                    <p className="text-xs text-slate-400 mt-3 font-medium">No charge until trial ends.</p>
                </div>
            </div>
        </section>

        {/* --- 8. FAQ --- */}
        <section className="max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Common Questions</h2>
            <div className="space-y-4">
                <FaqItem question="Does it work on Android and iPhone?" answer="Yes! ADIbase is a web app that works perfectly on any phone, tablet, or computer. You can even install it to your home screen." />
                <FaqItem question="Can students log in?" answer="Yes. You invite students via a QR code. They get a free 'read-only' account to see their progress and lesson history." />
                <FaqItem question="How much does it cost?" answer="It's just £5.99 per month. You get full access to all features, unlimited students, and unlimited storage." />
            </div>
        </section>

        {/* --- 9. CTA --- */}
        <section className="max-w-4xl mx-auto text-center bg-slate-50 rounded-3xl p-12 md:p-20 relative overflow-hidden border border-slate-200">
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Ready to upgrade your school?</h2>
                <p className="text-slate-500 mb-10 text-lg">Start your 7-day free trial today. Cancel anytime.</p>
                <Link
                    href="/login?view=signup"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg active:scale-[0.98] transition-all hover:bg-blue-700"
                >
                    Start Free Trial <ArrowRight size={20} />
                </Link>
            </div>
        </section>

      </main>

      <footer className="py-10 text-center border-t border-slate-100 bg-white">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <Car size={20} />
            <span className="font-bold">ADIbase</span>
        </div>
        <p className="text-slate-400 text-sm">© {new Date().getFullYear()} ADIbase. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Simple FAQ Component
function FaqItem({ question, answer }: { question: string, answer: string }) {
    return (
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <h3 className="font-bold text-slate-900 mb-2">{question}</h3>
            <p className="text-slate-500 text-sm leading-relaxed">{answer}</p>
        </div>
    )
}
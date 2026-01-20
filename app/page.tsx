"use client";

import Link from "next/link";
import { 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  ShieldCheck, 
  Car, 
  CheckCircle2, 
  BarChart3, 
  Users, 
  Star,
  Play
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100">
      
      {/* --- 1. NAVBAR --- */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-xl border-b border-slate-100 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-blue-600 p-1.5 rounded-lg text-white">
                <Car size={20} strokeWidth={3} />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                ADI<span className="text-blue-600">base</span>
              </span>
            </div>

            {/* Desktop Nav Actions */}
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
             Now Live
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1]">
            The modern way to run <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">your driving school.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Ditch the paper diary. Track students, automate payments, and manage your business from your pocket.
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

          {/* --- VIDEO DEMO PLACEHOLDER --- */}
          <div className="relative w-full max-w-4xl mx-auto aspect-video bg-slate-900 rounded-3xl shadow-2xl border border-slate-800 flex flex-col items-center justify-center group overflow-hidden cursor-pointer">
             <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-slate-800 to-slate-900 opacity-80 group-hover:opacity-60 transition-opacity"></div>
             
             {/* Play Button Icon */}
             <div className="relative z-10 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                <Play fill="white" className="text-white ml-1" size={32} />
             </div>
             
             <p className="relative z-10 text-slate-400 font-medium mt-4 group-hover:text-white transition-colors">
                 Watch 1-minute Demo
             </p>

             {/* Badge */}
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
                    "Automated Finance", 
                    "Student Progress App"
                ].map((item, i) => (
                    <div key={i} className="bg-slate-50 rounded-2xl p-6 flex items-center justify-center gap-3 font-bold text-slate-600 border border-slate-100">
                        <CheckCircle2 className="text-blue-600" size={20} /> {item}
                    </div>
                ))}
            </div>
        </section>


        {/* --- 4. BENTO GRID FEATURES --- */}
        <section className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6">Everything you need.</h2>
                <p className="text-slate-500 text-lg">We handle the boring stuff so you can focus on teaching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Feature 1: Progress Tracking (Wide) */}
                <div className="md:col-span-2 bg-slate-50 rounded-[2.5rem] p-10 border border-slate-200 relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-6 text-blue-600">
                            <Smartphone size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Student App Included</h3>
                        <p className="text-slate-500 max-w-sm">
                            Your students get their own app to view lesson feedback, track progress, and see their test readiness score.
                        </p>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute right-0 bottom-0 w-64 h-64 bg-white rounded-tl-[2.5rem] border-t border-l border-slate-200 shadow-sm translate-y-10 translate-x-10 group-hover:translate-x-6 group-hover:translate-y-6 transition-transform">
                        <div className="p-6">
                             <div className="flex gap-2 mb-4">
                                {[1,2,3,4,5].map(i => <Star key={i} size={16} className="text-amber-400 fill-amber-400" />)}
                             </div>
                             <div className="h-2 w-24 bg-slate-100 rounded-full mb-2"></div>
                             <div className="h-2 w-16 bg-slate-100 rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Feature 2: Finance (Tall) */}
                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm mb-6 text-blue-400">
                            <CreditCard size={28} />
                        </div>
                        <h3 className="text-2xl font-bold mb-2">Track Payments</h3>
                        <p className="text-slate-400 text-sm">
                            Instantly see who owes you money. Mark lessons as paid with one tap.
                        </p>
                    </div>
                </div>

                {/* Feature 3: Progress Logs */}
                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-200">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center shadow-sm mb-6 text-emerald-600">
                        <BarChart3 size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Lesson Logs</h3>
                    <p className="text-slate-500 text-sm">
                        Create professional lesson logs in seconds. Rate skills from 1-5 and add notes.
                    </p>
                </div>

                {/* Feature 4: Security */}
                <div className="md:col-span-2 bg-blue-50 rounded-[2.5rem] p-10 border border-blue-100 flex items-center justify-between relative overflow-hidden">
                    <div className="relative z-10 max-w-md">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">Enterprise Security</h3>
                        <p className="text-slate-600">
                            Your data is encrypted and backed up daily. We take privacy seriously so you never lose a record.
                        </p>
                    </div>
                    <ShieldCheck className="text-blue-200 absolute -right-10 -bottom-10 rotate-12 opacity-50" size={200} />
                </div>
            </div>
        </section>

        {/* --- 5. FAQ --- */}
        <section className="max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-10 text-center">Common Questions</h2>
            <div className="space-y-4">
                <FaqItem question="Does it work on Android and iPhone?" answer="Yes! ADIbase is a web app that works perfectly on any phone, tablet, or computer. You can even install it to your home screen." />
                <FaqItem question="Can students log in?" answer="Yes. You can invite students via email. They get a free 'read-only' account to see their progress and lesson history." />
                <FaqItem question="How much does it cost?" answer="It's just £5.99 per month. You get full access to all features, unlimited students, and unlimited storage." />
            </div>
        </section>

        {/* --- 6. CTA --- */}
        <section className="max-w-4xl mx-auto text-center bg-slate-900 rounded-3xl p-12 md:p-20 relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">Ready to upgrade your school?</h2>
                <p className="text-slate-400 mb-10 text-lg">Start your 7-day free trial today. Cancel anytime.</p>
                <Link
                    href="/login?view=signup"
                    className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 font-bold text-lg px-8 py-4 rounded-full shadow-lg active:scale-[0.98] transition-all hover:bg-blue-50"
                >
                    Start Free Trial <ArrowRight size={20} />
                </Link>
            </div>
            
            {/* Background Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-blue-900/20 to-transparent pointer-events-none"></div>
        </section>

      </main>

      <footer className="py-10 text-center border-t border-slate-100 bg-slate-50">
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
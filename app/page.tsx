"use client";

import Link from "next/link";
import { ArrowRight, Smartphone, CreditCard, Shield, Car } from "lucide-react";

export default function LandingPage() {
  return (
    // 'dvh' ensures it fits perfectly between mobile browser bars
    <div className="min-h-[100dvh] bg-slate-50 flex flex-col font-sans">
      
      {/* --- HEADER --- */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="px-5 py-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Car className="text-blue-600 fill-blue-600" size={26} />
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                <span className="text-blue-600">ADI</span><span className="text-purple-600">base</span>
              </h1>
            </div>

            {/* Beta Badge */}
            <div className="bg-blue-100 text-blue-700 border border-blue-200 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
              BETA
            </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        {/* --- HERO SECTION --- */}
        <section className="px-6 py-12 flex-1 flex flex-col items-center justify-center text-center max-w-lg mx-auto w-full">
          
          <h2 className="text-4xl font-extrabold text-slate-900 leading-[1.1] mb-4 tracking-tight">
            The <span className="text-blue-600">Smartest Way</span> <br /> to Run Your School.
          </h2>

          <p className="text-lg text-slate-500 mb-8 leading-relaxed">
            Track students, payments, and lessons from your phone. No more paper diaries.
          </p>

          {/* --- MOBILE OPTIMIZED BUTTONS --- */}
          <div className="w-full space-y-3">
            
            {/* Primary Action - Large Touch Target */}
            <Link
                href="/login?view=signup"
                className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg h-14 rounded-2xl shadow-xl shadow-blue-600/20 active:scale-[0.98] transition-all"
            >
                Start Free Trial <ArrowRight size={20} />
            </Link>

            {/* Secondary Action */}
            <Link
                href="/login"
                className="w-full flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-lg h-14 rounded-2xl shadow-sm active:scale-[0.98] transition-all"
            >
                Log In
            </Link>

          </div>
            
          <p className="text-xs text-slate-400 mt-6 font-medium">
              First month free • Cancel anytime
          </p>
        </section>

        {/* --- FEATURES (Scrollable on Mobile) --- */}
        <section className="px-6 py-12 bg-white border-t border-slate-100">
            <div className="space-y-10 max-w-md mx-auto">
                <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Smartphone size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Digital Logs</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mt-1">
                            Give students a professional progress report after every drive.
                        </p>
                    </div>
                </div>

                <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
                        <CreditCard size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Track Payments</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mt-1">
                            See who owes you money instantly. Mark lessons as Paid/Unpaid.
                        </p>
                    </div>
                </div>

                <div className="flex gap-5 items-start">
                    <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Secure & Private</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mt-1">
                            Enterprise-grade encryption keeps your student data safe.
                        </p>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="py-8 text-center bg-white border-t border-slate-100">
        <p className="text-slate-400 text-xs">© {new Date().getFullYear()} ADIbase.</p>
      </footer>
    </div>
  );
}
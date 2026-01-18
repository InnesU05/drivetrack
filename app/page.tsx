"use client";

import Link from "next/link";
import { useState } from "react";
import { 
  ArrowRight, 
  Smartphone, 
  CreditCard, 
  Shield, 
  Car, // <--- Switched from 'Zap' to 'Car'
  Menu, 
  X 
} from "lucide-react";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* --- PROFESSIONAL HEADER --- */}
      <header className="w-full bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <div className="flex items-center gap-2">
              {/* UPDATED: Uses a Car icon instead of Lightning bolt */}
              <Car className="text-blue-600 fill-blue-600" size={28} />
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">
                LearnerLog
              </h1>
            </div>

            {/* Desktop Navigation (Hidden on Mobile) */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
                Log In
              </Link>
              <Link
                href="/subscribe"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all active:scale-95"
              >
                Start Free Trial
              </Link>
            </div>

            {/* Mobile Menu Button (Visible ONLY on Mobile) */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-slate-600 hover:text-blue-600 p-2"
              >
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>
        </div>

        {/* --- MOBILE MENU DROPDOWN --- */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl absolute w-full left-0">
            <div className="px-4 pt-4 pb-6 space-y-3 flex flex-col">
              <Link 
                href="/login" 
                className="block w-full text-center py-3 text-slate-600 font-semibold hover:bg-slate-50 rounded-lg"
              >
                Log In
              </Link>
              <Link
                href="/subscribe"
                className="block w-full text-center py-3 bg-blue-600 text-white font-bold rounded-xl shadow-md active:scale-95"
              >
                Start Free Trial
              </Link>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="px-4 py-16 md:py-32 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* BETA BADGE (Restored & Prominent) */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600"></span>
            </span>
            Accepting Beta Testers
          </div>

          {/* Main Headline */}
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Smartest Way</span> <br className="hidden sm:block"/> to Run Your Driving School.
          </h2>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl mx-auto">
            Ditch the paper diaries. Track student progress, payments, and lesson history in one secure app.
          </p>

          {/* Main CTA Button */}
          <div className="flex flex-col w-full sm:w-auto px-4 sm:px-0">
            <Link
                href="/subscribe"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 hover:-translate-y-1"
            >
                Start 1-Month Free Trial <ArrowRight size={22} />
            </Link>
            
            {/* UPDATED: clearer subtext */}
            <p className="text-sm text-slate-400 mt-5">
                First month free • Cancel anytime
            </p>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="px-6 py-20 bg-white border-t border-slate-100">
            <div className="max-w-md mx-auto md:max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-12">
                
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-blue-100">
                        <Smartphone size={28} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Lesson Logs</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Track skills, routes, and readiness scores. Give your students a professional progress report after every drive.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                        <CreditCard size={28} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Payment Tracking</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Never lose track of who owes you money. Mark lessons as Paid/Unpaid and see instant debt alerts.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-slate-50 transition-colors">
                    <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-purple-100">
                        <Shield size={28} strokeWidth={2} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
                    <p className="text-slate-600 leading-relaxed">
                        Your data is yours. We use enterprise-grade encryption to keep your student lists and contact details safe.
                    </p>
                </div>

            </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-10 text-center bg-white border-t border-slate-100">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <Car size={20} />
            <span className="font-bold text-lg">LearnerLog</span>
        </div>
        <p className="text-slate-400 text-sm">© {new Date().getFullYear()} LearnerLog. All rights reserved.</p>
      </footer>
    </div>
  );
}
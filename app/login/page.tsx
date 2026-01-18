import Link from "next/link";
import { ArrowRight, Smartphone, CreditCard, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* --- HEADER --- */}
      <header className="w-full py-5 px-6 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-2">
            <Zap className="text-blue-600 fill-blue-600" size={24} />
            <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">LearnerLog</h1>
        </div>
        
        <div className="flex items-center gap-6">
          <Link href="/login" className="text-sm font-semibold text-slate-600 hover:text-blue-600 transition-colors">
            Log In
          </Link>
          
          {/* FIX: 'hidden sm:inline-flex' hides this button on mobile so header isn't squished */}
          <Link
            href="/subscribe"
            className="hidden sm:inline-flex bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm transition-all active:scale-95"
          >
            Start Free Trial
          </Link>
        </div>
      </header>

      <main className="flex-1">
        {/* --- HERO SECTION --- */}
        <section className="px-6 py-20 md:py-32 text-center max-w-4xl mx-auto flex flex-col items-center">
          
          {/* Beta Badge */}
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
          <p className="text-lg sm:text-xl text-slate-600 mb-12 leading-relaxed max-w-2xl">
            Ditch the paper diaries and messy spreadsheets. Track student progress, manage payments, and view lesson history in one secure, modern app.
          </p>

          {/* Main CTA Button */}
          <div className="flex flex-col w-full sm:w-auto">
            <Link
                href="/subscribe"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-8 rounded-2xl shadow-lg shadow-blue-600/20 transition-all active:scale-95 hover:-translate-y-1"
            >
                Start 1-Month Free Trial <ArrowRight size={22} />
            </Link>
            <p className="text-sm text-slate-400 mt-5">
                No credit card required to sign up. Cancel anytime.
            </p>
          </div>
        </section>

        {/* --- FEATURES SECTION --- */}
        <section className="px-6 py-20 bg-white border-t border-slate-100">
            {/* FIX: 'grid-cols-1 md:grid-cols-3' ensures a vertical stack on mobile, 3-col on desktop */}
            <div className="max-w-md mx-auto md:max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-12">
                
                {/* Feature 1 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-blue-100/50 border border-blue-100">
                        <Smartphone size={30} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Digital Lesson Logs</h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                        Track skills, routes, and readiness scores. Give your students a professional progress report after every drive.
                    </p>
                </div>

                {/* Feature 2 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-emerald-100/50 border border-emerald-100">
                        <CreditCard size={30} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Payment Tracking</h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                        Never lose track of who owes you money. Mark lessons as Paid/Unpaid and see instant debt alerts.
                    </p>
                </div>

                {/* Feature 3 */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm shadow-purple-100/50 border border-purple-100">
                        <Shield size={30} strokeWidth={1.5} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Private</h3>
                    <p className="text-slate-600 leading-relaxed text-base">
                        Your data is yours. We use enterprise-grade encryption to keep your student lists and contact details safe.
                    </p>
                </div>

            </div>
        </section>
      </main>

      {/* --- FOOTER --- */}
      <footer className="py-8 text-center text-slate-400 text-sm bg-slate-50 border-t border-slate-200">
        <p>© {new Date().getFullYear()} LearnerLog. All rights reserved.</p>
      </footer>
    </div>
  );
}
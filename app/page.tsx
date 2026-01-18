import Link from "next/link";
import { CheckCircle2, ChevronRight, CreditCard, MapPin, ShieldCheck, Smartphone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <div className="bg-blue-600 text-white p-1.5 rounded-lg font-bold">DT</div>
             <span className="text-xl font-bold text-slate-900 tracking-tight">DriveTrack</span>
          </div>
          <div className="flex gap-4">
             <Link href="/login" className="text-slate-600 hover:text-slate-900 font-medium px-4 py-2">
               Log In
             </Link>
             <Link href="/login" className="bg-slate-900 text-white font-bold px-5 py-2 rounded-full hover:bg-slate-800 transition-colors">
               Get Started
             </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-20 lg:py-32">
        <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold mb-6 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Now Available on iOS & Android
        </div>
        
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6 max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          The <span className="text-blue-600">Smartest Way</span> to Run Your Driving School.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700">
          Ditch the paper diaries. Track student progress, payments, and lesson history in one secure app. Built for modern instructors.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm sm:max-w-md animate-in fade-in slide-in-from-bottom-10 duration-1000">
           <Link href="/login" className="flex-1 bg-blue-600 text-white text-lg font-bold py-4 rounded-xl shadow-xl hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2">
             Start for Free <ChevronRight />
           </Link>
        </div>
        
        <p className="text-slate-400 text-sm mt-6">No credit card required • Unlimited students</p>
      </header>

      {/* Features Grid */}
      <section className="bg-white py-20 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6">
           <div className="grid md:grid-cols-3 gap-10">
              
              {/* Feature 1 */}
              <div className="space-y-4">
                 <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
                   <Smartphone size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Digital Lesson Logs</h3>
                 <p className="text-slate-500 leading-relaxed">
                   Track skills, routes, and readiness score. Give your students a professional progress report after every drive.
                 </p>
              </div>

              {/* Feature 2 */}
              <div className="space-y-4">
                 <div className="w-12 h-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-2">
                   <CreditCard size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Payment Tracking</h3>
                 <p className="text-slate-500 leading-relaxed">
                   Never lose track of who owes you money. Mark lessons as Paid/Unpaid and see instant debt alerts on your dashboard.
                 </p>
              </div>

              {/* Feature 3 */}
              <div className="space-y-4">
                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-2">
                   <ShieldCheck size={24} />
                 </div>
                 <h3 className="text-xl font-bold text-slate-900">Secure & Private</h3>
                 <p className="text-slate-500 leading-relaxed">
                   Your data is yours. We use enterprise-grade encryption to keep your student lists and contact details safe.
                 </p>
              </div>

           </div>
        </div>
      </section>

     {/* Footer */}
<footer className="bg-slate-50 border-t border-slate-200 py-12 text-center">
    <p className="text-slate-400 text-sm mb-2">© 2026 DriveTrack. All rights reserved.</p>
    <Link href="/privacy" className="text-slate-400 hover:text-slate-600 text-xs underline">
        Privacy Policy
    </Link>
</footer>
    </div>
  );
}
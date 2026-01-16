import Link from 'next/link';
import { Car, CheckCircle, Smartphone } from 'lucide-react';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center pb-12">
        <div className="bg-blue-600 p-5 rounded-3xl mb-8 shadow-xl shadow-blue-200 rotate-3">
          <Car className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-5xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
          Track Lessons.<br/>
          <span className="text-blue-600">Build Confidence.</span>
        </h1>
        
        <p className="text-xl text-slate-500 mb-10 max-w-md leading-relaxed">
          The simple app for UK Driving Instructors to track progress and share feedback with students instantly.
        </p>
        
        <div className="flex flex-col w-full max-w-xs gap-4">
            <Link href="/login" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg transition-all active:scale-95 text-center text-lg">
              Instructor Login
            </Link>
            <Link href="/login" className="w-full bg-white hover:bg-slate-50 text-slate-700 font-bold py-4 rounded-2xl border border-slate-200 transition-all active:scale-95 text-center text-lg">
              Student Login
            </Link>
        </div>
      </div>

      {/* Feature List */}
      <div className="bg-white p-10 rounded-t-[40px] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
        <div className="max-w-md mx-auto space-y-8">
          <Feature icon={<CheckCircle className="text-green-500 w-6 h-6"/>} title="Track UK Standards" desc="Log progress on specific DVSA skills." />
          <Feature icon={<Smartphone className="text-blue-500 w-6 h-6"/>} title="Student App" desc="Students can see their progress anytime." />
        </div>
        <p className="text-center text-slate-300 text-sm mt-8">© 2024 DriveTrack Pro</p>
      </div>
    </main>
  );
}

function Feature({ icon, title, desc }: any) {
  return (
    <div className="flex items-start gap-4">
      <div className="bg-slate-50 p-3 rounded-xl">{icon}</div>
      <div>
        <h3 className="font-bold text-slate-900 text-lg">{title}</h3>
        <p className="text-slate-500 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}
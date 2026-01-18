import Link from "next/link";
import { AlertTriangle, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="bg-amber-100 p-6 rounded-full text-amber-600 mb-6 shadow-sm">
        <AlertTriangle size={48} />
      </div>
      
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Page Not Found</h1>
      <p className="text-slate-500 mb-8 max-w-xs mx-auto">
        Oops! We can't find the page you're looking for. It might have been moved or deleted.
      </p>

      <Link 
        href="/" 
        className="bg-slate-900 text-white font-bold py-3 px-8 rounded-xl hover:bg-slate-800 transition-colors flex items-center gap-2"
      >
        <Home size={20} /> Back to Home
      </Link>
    </div>
  );
}
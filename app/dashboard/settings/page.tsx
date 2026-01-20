"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  CreditCard, 
  Loader2, 
  Settings, 
  ChevronRight, 
  Mail, 
  Trash2, 
  Star,
  ExternalLink,
  Smartphone // New icon for the student preview
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);

  const handleManageSubscription = async () => {
    setLoading(true);
    try {
      // Call our API to get the Stripe Portal URL
      const response = await fetch("/api/create-portal-session", {
        method: "POST",
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong.");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to connect to the server.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-4 border-b border-slate-200 sticky top-0 z-10 flex items-center gap-4">
        <Link 
            href="/dashboard" 
            className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
        >
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-extrabold text-slate-900">Settings</h1>
      </div>

      <div className="max-w-2xl mx-auto p-4 space-y-6">
        
        {/* 1. SUBSCRIPTION SECTION (Restored) */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <CreditCard className="text-blue-600" /> Subscription
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    Manage your billing, invoices, and plan status.
                </p>
            </div>
            <div className="p-6 bg-slate-50/50">
                <button
                    onClick={handleManageSubscription}
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 hover:border-blue-500 hover:text-blue-600 text-slate-700 font-bold py-4 px-6 rounded-xl transition-all shadow-sm active:scale-95 disabled:opacity-50"
                >
                    {loading ? (
                        <><Loader2 className="animate-spin" size={18} /> Redirecting...</>
                    ) : (
                        <><span className="mr-1">Manage Subscription</span> <ExternalLink size={16} /></>
                    )}
                </button>
            </div>
        </div>

        {/* 2. GENERAL SETTINGS */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
             <div className="p-4 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide opacity-50">General</h3>
             </div>
             
             {/* --- NEW: Student App Preview Button --- */}
             <Link href="/dashboard/settings/student-view" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                        <Smartphone size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900">Student App Preview</p>
                        <p className="text-xs text-slate-500">See what your students see.</p>
                    </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-purple-600" />
             </Link>

             {/* Contact Support Link */}
             <Link href="/dashboard/settings/contact" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors border-b border-slate-100 group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <Mail size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900">Contact Support</p>
                        <p className="text-xs text-slate-500">Need help? Send us a message.</p>
                    </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-blue-600" />
             </Link>

             {/* Review Link */}
             <Link href="/dashboard/settings/review" className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-white transition-colors">
                        <Star size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900">Leave a Review</p>
                        <p className="text-xs text-slate-500">Tell us what you think!</p>
                    </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-amber-500" />
             </Link>
        </div>

        {/* 3. DANGER ZONE */}
        <div className="bg-white rounded-2xl border border-red-100 shadow-sm overflow-hidden">
             <Link href="/dashboard/settings/delete" className="flex items-center justify-between p-4 hover:bg-red-50 transition-colors group">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition-colors">
                        <Trash2 size={20} />
                    </div>
                    <div>
                        <p className="font-bold text-slate-900 group-hover:text-red-700">Delete Account</p>
                        <p className="text-xs text-slate-500 group-hover:text-red-400">Permanently remove your data.</p>
                    </div>
                </div>
                <ChevronRight className="text-slate-300 group-hover:text-red-600" />
             </Link>
        </div>

      </div>
    </div>
  );
}
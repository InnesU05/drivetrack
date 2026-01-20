"use client";

import Link from "next/link";
import { ArrowLeft, MessageCircle, QrCode, Star, CreditCard, Play } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 p-4 pb-20">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 rounded-full">
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-extrabold text-slate-900">How to use</h1>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* VIDEO PLACEHOLDER */}
        <div className="bg-slate-900 rounded-2xl aspect-video flex flex-col items-center justify-center text-white shadow-lg relative overflow-hidden group cursor-pointer">
            {/* Replace this div with your <video> or <iframe> tag later */}
            <div className="bg-white/10 p-4 rounded-full mb-3 backdrop-blur-sm group-hover:scale-110 transition-transform">
                <Play size={32} fill="currentColor" />
            </div>
            <p className="font-bold text-slate-300">Video Tutorial Coming Soon</p>
        </div>

        {/* TEXT GUIDE */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-lg text-slate-900">Quick Start Guide</h2>
                <p className="text-slate-500 text-sm">Everything you need to run your school.</p>
            </div>
            
            <div className="divide-y divide-slate-100">
                
                {/* Step 1 */}
                <div className="p-6 flex gap-4">
                    <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <QrCode size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 mb-1">1. Invite Students</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Go to your dashboard and tap <strong>"Invite Student"</strong>. Show them the QR code to scan. This links them to your account instantly so they can view their own progress.
                        </p>
                    </div>
                </div>

                {/* Step 2 */}
                <div className="p-6 flex gap-4">
                    <div className="bg-amber-100 text-amber-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Star size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 mb-1">2. Log Lessons & Ratings</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            Tap on a student's name to log a lesson. Rate their skills from 1-5 stars. We automatically calculate a <strong>"Test Readiness"</strong> score based on these ratings.
                        </p>
                    </div>
                </div>

                {/* Step 3 */}
                <div className="p-6 flex gap-4">
                    <div className="bg-green-100 text-green-600 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                        <CreditCard size={20} />
                    </div>
                    <div>
                        <h3 className="font-bold text-slate-900 mb-1">3. Track Payments</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            When logging a lesson, use the <strong>Payment Slider</strong> to mark it as "Paid" or "Unpaid". Unpaid lessons will show a red alert on your dashboard so you never lose track.
                        </p>
                    </div>
                </div>

            </div>
        </div>

        {/* SUPPORT LINK */}
        <Link href="/dashboard/settings/contact" className="block bg-slate-100 hover:bg-slate-200 p-6 rounded-2xl border border-slate-200 text-center active:scale-[0.98] transition-all">
             <div className="flex items-center justify-center gap-2 text-slate-900 font-bold mb-1">
                <MessageCircle size={20} />
                Still need help?
             </div>
             <p className="text-slate-500 text-sm">Contact support directly</p>
        </Link>

      </div>
    </div>
  );
}
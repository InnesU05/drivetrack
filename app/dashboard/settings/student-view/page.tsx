"use client";

import Link from "next/link";
import { ArrowLeft, Smartphone } from "lucide-react";

export default function StudentViewPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/settings" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 rounded-full">
            <ArrowLeft size={24} />
        </Link>
        <div>
            <h1 className="text-xl font-extrabold text-slate-900">Student View</h1>
            <p className="text-xs text-slate-500">This is what your learners see</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-12">
        
        {/* Screen 1: The Dashboard */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                Their Dashboard
            </h2>
            <p className="text-xs text-slate-500">They can see their Test Readiness score and upcoming lesson time immediately.</p>
            
            {/* Phone Mockup */}
            <div className="relative border-8 border-slate-900 rounded-[2rem] overflow-hidden shadow-xl bg-white aspect-[9/19]">
                {/* Simulated Content - Replace this div with an <img> tag later if you want real screenshots */}
                <div className="absolute inset-0 bg-slate-50 flex flex-col p-4">
                    <div className="h-8 w-8 bg-blue-100 rounded-full mb-6"></div>
                    <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                    <div className="h-8 w-48 bg-slate-900 rounded mb-8"></div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="aspect-square bg-white rounded-xl border border-slate-200 shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-xl border border-slate-200 shadow-sm"></div>
                    </div>
                    
                    <div className="h-32 bg-blue-600 rounded-xl shadow-lg opacity-90 flex items-center justify-center text-white text-xs font-bold">
                        Readiness Chart
                    </div>
                </div>
            </div>
        </div>

        {/* Screen 2: Lesson History */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Lesson Logs
            </h2>
            <p className="text-xs text-slate-500">They see every lesson you log, including your notes and the star ratings for that session.</p>
            
            {/* Phone Mockup */}
            <div className="relative border-8 border-slate-900 rounded-[2rem] overflow-hidden shadow-xl bg-white aspect-[9/19]">
                <div className="absolute inset-0 bg-slate-50 flex flex-col p-4 space-y-3">
                    <div className="h-12 w-full bg-white rounded-xl border border-slate-200 shadow-sm"></div>
                    <div className="h-12 w-full bg-white rounded-xl border border-slate-200 shadow-sm"></div>
                    <div className="h-12 w-full bg-white rounded-xl border border-slate-200 shadow-sm"></div>
                    <div className="h-24 w-full bg-white rounded-xl border border-slate-200 shadow-sm p-3">
                        <div className="h-2 w-full bg-slate-100 rounded mb-2"></div>
                        <div className="h-2 w-2/3 bg-slate-100 rounded"></div>
                    </div>
                </div>
            </div>
        </div>

        {/* Screen 3: Payments */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Payment Status
            </h2>
            <p className="text-xs text-slate-500">They can clearly see which lessons are unpaid (marked in red) so they know to bring cash or transfer money.</p>
            
            {/* Phone Mockup */}
            <div className="relative border-8 border-slate-900 rounded-[2rem] overflow-hidden shadow-xl bg-white aspect-[9/19]">
                <div className="absolute inset-0 bg-slate-50 flex flex-col items-center justify-center p-4">
                    <div className="w-full p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center mb-2">
                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                        <div className="h-6 w-16 bg-red-100 rounded-full flex items-center justify-center text-[10px] text-red-600 font-bold">UNPAID</div>
                    </div>
                    <div className="w-full p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex justify-between items-center">
                        <div className="h-4 w-20 bg-slate-200 rounded"></div>
                        <div className="h-6 w-16 bg-green-100 rounded-full flex items-center justify-center text-[10px] text-green-600 font-bold">PAID</div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
}
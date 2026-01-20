"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export default function StudentViewPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-4 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/settings" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 rounded-full transition-colors">
            <ArrowLeft size={24} />
        </Link>
        <div>
            <h1 className="text-xl font-extrabold text-slate-900">Student View</h1>
            <p className="text-xs text-slate-500">This is what your learners see</p>
        </div>
      </div>

      <div className="max-w-md mx-auto space-y-12">
        
        {/* Screen 1: The Invite */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                The Invite
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
                When they scan your QR code, they see this custom welcome screen asking to join your class.
            </p>
            
            <div className="relative border-8 border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[9/19]">
                <Image 
                    src="/demo-join.png" 
                    alt="Student Join Screen"
                    fill
                    className="object-contain" // 🔴 Changed from object-cover
                    placeholder="empty"
                />
            </div>
        </div>

        {/* Screen 2: The Dashboard */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                Their Dashboard
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
                They can see their <strong>Test Readiness</strong> score and upcoming lesson time immediately.
            </p>
            
            <div className="relative border-8 border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[9/19]">
                <Image 
                    src="/demo-dashboard.png" 
                    alt="Student Dashboard Preview"
                    fill
                    className="object-contain" // 🔴 Changed from object-cover
                    placeholder="empty"
                />
            </div>
        </div>

        {/* Screen 3: Lesson History */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                Lesson Logs
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
                They see every lesson you log, including your notes and the star ratings for that session.
            </p>
            
            <div className="relative border-8 border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[9/19]">
                <Image 
                    src="/demo-logs.png" 
                    alt="Student Logs Preview"
                    fill
                    className="object-contain" // 🔴 Changed from object-cover
                    placeholder="empty"
                />
            </div>
        </div>

        {/* Screen 4: Payments */}
        <div className="space-y-3">
            <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <span className="bg-blue-100 text-blue-700 w-6 h-6 rounded-full flex items-center justify-center text-xs">4</span>
                Payment Status
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
                They can clearly see which lessons are <strong>Unpaid</strong> (marked in red) so they know to bring cash or transfer money.
            </p>
            
            <div className="relative border-8 border-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-100 aspect-[9/19]">
                <Image 
                    src="/demo-payments.png" 
                    alt="Student Payments Preview"
                    fill
                    className="object-contain" // 🔴 Changed from object-cover
                    placeholder="empty"
                />
            </div>
        </div>

      </div>
    </div>
  );
}
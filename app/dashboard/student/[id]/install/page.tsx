"use client";

import Link from "next/link";
import { ArrowLeft, Download, Share, MoreVertical } from "lucide-react";
import { use } from "react";

export default function StudentInstallPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <Link 
            href={`/dashboard/student/${id}`} 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-800 font-bold text-sm mb-4"
          >
            <ArrowLeft size={16} /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Install App</h1>
          <p className="text-slate-500">Add ADIbase to your home screen for quick access.</p>
        </div>

        <div className="space-y-4">
          {/* iOS Instructions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
              iPhone (Safari)
            </h2>
            <div className="space-y-4 text-sm text-slate-600 font-medium">
              <p className="flex items-center gap-2">
                1. Tap the <Share size={16} className="text-blue-500" /> <span className="text-slate-900 font-bold">Share</span> button in the menu bar.
              </p>
              <p>2. Scroll down and tap <span className="font-bold text-slate-900">Add to Home Screen</span>.</p>
              <p>3. Tap <span className="font-bold text-slate-900">Add</span> in the top right.</p>
            </div>
          </div>

          {/* Android Instructions */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h2 className="font-bold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <span className="bg-emerald-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
              Android (Chrome)
            </h2>
            <div className="space-y-4 text-sm text-slate-600 font-medium">
              <p className="flex items-center gap-2">
                1. Tap the <MoreVertical size={16} className="text-slate-900" /> <span className="text-slate-900 font-bold">Three Dots</span> menu.
              </p>
              <p className="flex items-center gap-2">
                2. Tap <span className="font-bold text-slate-900 flex items-center gap-1"><Download size={14} /> Install App</span> or <span className="font-bold text-slate-900">Add to Home Screen</span>.
              </p>
              <p>3. Follow the on-screen prompts.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import Link from "next/link";
import { ArrowLeft, Share, MoreVertical, PlusSquare, Download } from "lucide-react";

export default function InstallApp() {
  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-200 sticky top-0 z-10 flex items-center gap-4">
        <Link 
            href="/dashboard" 
            className="p-2 -ml-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
        >
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-extrabold text-slate-900">Install App</h1>
      </div>

      <div className="max-w-md mx-auto p-6 space-y-8">
        
        <div className="text-center space-y-4">
            <div className="w-20 h-20 bg-blue-600 rounded-2xl mx-auto shadow-lg flex items-center justify-center text-white">
                <Download size={40} />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Get the App Experience</h2>
            <p className="text-slate-500">
                Add ADIbase to your home screen for faster access, no address bar, and a full-screen experience.
            </p>
        </div>

        {/* iOS Instructions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="bg-slate-900 text-white px-2 py-1 rounded text-xs font-bold">iOS</div>
                <h3 className="font-bold text-slate-900">iPhone & iPad</h3>
            </div>
            <ol className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex gap-3">
                    <span className="bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
                    <span>Tap the <strong className="text-blue-600">Share</strong> button in Safari's menu bar. <Share size={16} className="inline text-blue-600 mx-1" /></span>
                </li>
                <li className="flex gap-3">
                    <span className="bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
                    <span>Scroll down and tap <strong className="text-slate-900">Add to Home Screen</strong>. <PlusSquare size={16} className="inline text-slate-900 mx-1" /></span>
                </li>
                <li className="flex gap-3">
                    <span className="bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</span>
                    <span>Tap <strong className="text-blue-600">Add</strong> in the top right corner.</span>
                </li>
            </ol>
        </div>

        {/* Android Instructions */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
             <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
                <div className="bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">Android</div>
                <h3 className="font-bold text-slate-900">Chrome on Android</h3>
            </div>
            <ol className="space-y-4 text-sm text-slate-600 font-medium">
                <li className="flex gap-3">
                    <span className="bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">1</span>
                    <span>Tap the <strong className="text-slate-900">Three Dots</strong> menu in the top right. <MoreVertical size={16} className="inline text-slate-900 mx-1" /></span>
                </li>
                <li className="flex gap-3">
                    <span className="bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">2</span>
                    <span>Tap <strong className="text-slate-900">Install App</strong> or <strong>Add to Home Screen</strong>.</span>
                </li>
                <li className="flex gap-3">
                    <span className="bg-slate-100 w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold shrink-0">3</span>
                    <span>Confirm by tapping <strong className="text-blue-600">Install</strong>.</span>
                </li>
            </ol>
        </div>

      </div>
    </div>
  );
}
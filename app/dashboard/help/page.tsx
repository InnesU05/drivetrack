"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen, MessageCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 p-4 pb-10">
      
      {/* Header */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-6 flex items-center gap-4">
        <Link href="/dashboard" className="p-2 -ml-2 text-slate-400 hover:text-slate-900 rounded-full">
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl font-extrabold text-slate-900">Help Center</h1>
      </div>

      <div className="space-y-4">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 text-center">
            <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <BookOpen size={32} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Guides Coming Soon</h2>
            <p className="text-slate-500 text-sm">
                We are currently building video tutorials to help you get the most out of LearnerLog.
            </p>
        </div>

        <Link href="/dashboard/settings/contact" className="block bg-blue-600 p-6 rounded-2xl shadow-lg shadow-blue-600/20 text-white text-center active:scale-[0.98] transition-transform">
             <MessageCircle className="mx-auto mb-2" size={32} />
             <h2 className="text-lg font-bold">Contact Support</h2>
             <p className="text-blue-100 text-sm">Need help now? Send us a message.</p>
        </Link>
      </div>
    </div>
  );
}
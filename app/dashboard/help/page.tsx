"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 p-8 text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <BookOpen size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">How to Use</h1>
        <p className="text-slate-500 mb-6">User guides and video tutorials are coming soon!</p>
        <Link href="/dashboard" className="text-blue-600 font-bold hover:underline flex items-center justify-center gap-2">
            <ArrowLeft size={16} /> Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
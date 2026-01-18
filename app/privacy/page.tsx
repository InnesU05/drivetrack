import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <Shield size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        </div>

        <div className="prose prose-slate text-slate-600">
          <p className="font-bold text-slate-900">Last Updated: January 2026</p>
          
          <h3>1. What data do we track?</h3>
          <p>We store your name, email, and lesson progress (skills, dates, and payment status) solely for the purpose of managing your driving tuition.</p>

          <h3>2. How is it stored?</h3>
          <p>Your data is stored securely in an encrypted database using Supabase. Only your assigned instructor has access to your personal details.</p>

          <h3>3. Your Rights</h3>
          <p>You have the right to request a copy of your data or to have it permanently deleted at any time. To do so, please contact your instructor directly or use the "Contact Support" feature in the dashboard.</p>
          
          <h3>4. No Third Parties</h3>
          <p>We do not share, sell, or rent your personal data to advertisers or third parties.</p>
        </div>
      </div>
    </div>
  );
}
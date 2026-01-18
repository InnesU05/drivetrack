import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-6 font-medium">
          <ArrowLeft size={20} /> Back to Home
        </Link>
        
        <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                <FileText size={24} />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        </div>

        <div className="prose prose-slate text-slate-600">
          <p className="font-bold text-slate-900">Last Updated: January 2026</p>
          
          <h3>1. Acceptance of Terms</h3>
          <p>By creating an account on LearnerLog, you agree to these terms. If you do not agree, you must not use the app.</p>

          <h3>2. Educational Aid Only</h3>
          <p>LearnerLog is a progress tracking tool. The "Readiness Score" and skill logs are estimates based on instructor input. They do not guarantee a pass result in any official driving test.</p>

          <h3>3. Data Loss & Availability</h3>
          <p>While we back up data regularly, we are not liable for any data loss or service downtime. We recommend instructors keep a secondary record of official payments.</p>
          
          <h3>4. Account Termination</h3>
          <p>We reserve the right to delete accounts that are inactive for over 12 months or violate these terms.</p>
        </div>
      </div>
    </div>
  );
}
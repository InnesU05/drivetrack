"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Mail, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ForgotPassword() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // This sends an email with a link that logs them in and sends them to the update page
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (!error) {
        setSuccess(true);
    } else {
        alert("Error: " + error.message);
    }
    setLoading(false);
  };

  if (success) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
              <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
                  <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Check your email</h2>
              <p className="text-slate-500 mt-2 mb-6">We sent a password reset link to <br/><strong>{email}</strong></p>
              <Link href="/login" className="text-blue-600 font-bold hover:underline">Back to Login</Link>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <Link href="/login" className="inline-flex items-center gap-2 text-slate-400 hover:text-slate-600 mb-6 text-sm font-bold">
            <ArrowLeft size={16} /> Back to Login
        </Link>
        
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Reset Password</h1>
        <p className="text-slate-500 mb-6 text-sm">Enter your email and we'll send you a link to get back into your account.</p>

        <form onSubmit={handleReset} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Email Address</label>
                <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input 
                        required
                        type="email" 
                        placeholder="you@example.com"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
            </button>
        </form>
      </div>
    </div>
  );
}
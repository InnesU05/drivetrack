"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { UserCheck, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  
  const instructorId = searchParams.get("ref");
  
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          role: 'student',
          instructor_id: instructorId 
        }
      }
    });

    if (error) {
      alert("Error signing up: " + error.message);
      setLoading(false);
    } else {
      // 🔴 FIX: Send them to dashboard, not home
      router.refresh();
      router.push("/dashboard"); 
    }
  };

  if (!instructorId) return <div className="p-10 text-center text-red-500 font-bold">Invalid Invite Link. Ask your instructor to scan the QR code again.</div>;

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-8">
            <div className="bg-blue-100 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-blue-600">
                <UserCheck size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">Student Account</h1>
            <p className="text-slate-500 text-sm mt-1">Create your free account to join.</p>
        </div>
        
        <form onSubmit={handleSignup} className="space-y-4">
          <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Full Name</label>
              <input 
                type="text" 
                placeholder="Ex. Sarah Jones" 
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                onChange={e => setFormData({...formData, fullName: e.target.value})}
              />
          </div>
          <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email</label>
              <input 
                type="email" 
                placeholder="name@example.com" 
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
          </div>
          <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                required
                className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
          </div>

          <button 
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg mt-6"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Create Account & Join"}
          </button>
        </form>

        <div className="mt-8 text-center">
            <Link href="/login" className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center justify-center gap-2 p-2">
                <ArrowLeft size={16} /> Already have an account?
            </Link>
        </div>
      </div>
    </div>
  );
}

export default function StudentSignupPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-slate-400 font-bold">Loading...</div>}>
      <SignupForm />
    </Suspense>
  );
}
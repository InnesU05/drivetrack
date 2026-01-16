"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { UserCheck, Loader2 } from "lucide-react";

function SignupForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const supabase = createClient();
  
  // This grabs the Instructor ID from the QR code link
  const instructorId = searchParams.get("ref");
  
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Sign up and link to instructor
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
      alert("Success! You can now log in.");
      // In a real app, we'd redirect to the student dashboard here
      router.push("/"); 
    }
  };

  if (!instructorId) return <div className="p-10 text-center text-red-500">Invalid Invite Link. Ask your instructor to scan the QR code again.</div>;

  return (
    <div className="min-h-screen bg-blue-600 flex items-center justify-center p-6">
      <form onSubmit={handleSignup} className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full text-blue-600">
            <UserCheck size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2 text-slate-900">Create Student Account</h2>
        <p className="text-center text-slate-500 mb-6 text-sm">Join your instructor's class</p>
        
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Full Name" 
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            onChange={e => setFormData({...formData, fullName: e.target.value})}
          />
          <input 
            type="email" 
            placeholder="Email" 
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            onChange={e => setFormData({...formData, email: e.target.value})}
          />
          <input 
            type="password" 
            placeholder="Password" 
            required
            className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
            onChange={e => setFormData({...formData, password: e.target.value})}
          />
          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Join Instructor"}
          </button>
        </div>
      </form>
    </div>
  );
}

// We wrap the form in Suspense because it reads data from the URL (useSearchParams)
export default function StudentSignupPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading form...</div>}>
      <SignupForm />
    </Suspense>
  );
}
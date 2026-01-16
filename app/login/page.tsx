"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Car, Loader2 } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "", fullName: "" });

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
      // 1. SIGN UP (Instructors only)
      const { error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: 'instructor' // Hardcoded: Signups here are always Instructors
          }
        }
      });
      if (error) {
        alert(error.message);
      } else {
        alert("Account created! Logging you in...");
        router.push("/dashboard");
      }
    } else {
      // 2. LOGIN (Both Instructors and Students)
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        alert(error.message);
      } else {
        // --- SMART REDIRECT LOGIC ---
        const role = data.user?.user_metadata?.role;
        
        if (role === 'student') {
            router.push("/student-view");
        } else {
            router.push("/dashboard");
        }
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-blue-600 p-4 rounded-full mb-6 shadow-lg shadow-blue-200">
        <Car className="w-10 h-10 text-white" />
      </div>
      
      <div className="bg-white w-full max-w-sm p-8 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-2xl font-bold text-center mb-2 text-slate-900">
          {isSignUp ? "Instructor Sign Up" : "Welcome Back"}
        </h1>
        <p className="text-center text-slate-400 mb-6 text-sm">
          {isSignUp ? "Create your driving school account" : "Login to view progress"}
        </p>

        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <input 
              type="text" 
              placeholder="Full Name" 
              className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
              value={formData.fullName}
              onChange={e => setFormData({...formData, fullName: e.target.value})}
              required
            />
          )}
          
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            value={formData.email}
            onChange={e => setFormData({...formData, email: e.target.value})}
            required
          />
          
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-3 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-slate-900"
            value={formData.password}
            onChange={e => setFormData({...formData, password: e.target.value})}
            required
          />

          <button 
            disabled={loading}
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:scale-95 transition-all flex justify-center items-center"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? "Create Account" : "Sign In")}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-sm text-blue-600 font-semibold hover:underline"
          >
            {isSignUp ? "Already have an account? Sign In" : "New Instructor? Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
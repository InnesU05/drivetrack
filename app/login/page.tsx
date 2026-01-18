"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Mail, Lock, User } from "lucide-react";
import Link from "next/link";

export default function Login() {
  const supabase = createClient();
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState(""); // New State for Name
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignUp) {
        // --- SIGN UP LOGIC ---
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    // Save the real name they typed
                    full_name: fullName, 
                    role: 'instructor' // Default role
                }
            }
        });
        if (error) {
            alert(error.message);
        } else {
            router.push("/dashboard");
        }
    } else {
        // --- LOGIN LOGIC ---
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert(error.message);
        } else {
            router.push("/dashboard");
        }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">GoLesson</h1>
        <p className="text-slate-500 mt-2">The smart way to manage driving lessons.</p>
      </div>

      <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-slate-100">
        
        {/* Toggle Header */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-8">
            <button 
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${!isSignUp ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
            >
                Log In
            </button>
            <button 
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${isSignUp ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
            >
                Sign Up
            </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
            
            {/* NAME INPUT (Only shows during Sign Up) */}
            {isSignUp && (
                <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Full Name</label>
                    <div className="relative">
                        <User className="absolute left-4 top-3.5 text-slate-400" size={20} />
                        <input 
                            required
                            type="text" 
                            placeholder="e.g. John Smith"
                            className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                    </div>
                </div>
            )}

            {/* EMAIL INPUT */}
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

            {/* PASSWORD INPUT */}
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-3.5 text-slate-400" size={20} />
                    <input 
                        required
                        type="password" 
                        placeholder="••••••••"
                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            {/* Forgot Password Link - Only show in Login mode */}
            {!isSignUp && (
                <div className="text-right">
                    <Link href="/forgot-password" className="text-sm font-bold text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                </div>
            )}

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? "Start Free Trial" : "Sign In")}
            </button>
        </form>
      </div>

      <p className="mt-8 text-center text-xs text-slate-400">
        © 2026 GoLesson. Secure & Private.
      </p>
    </div>
  );
}
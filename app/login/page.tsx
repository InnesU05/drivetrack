"use client";

import { useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Car, Loader2, ArrowLeft } from "lucide-react";

function AuthForm() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const defaultView = searchParams.get("view") === "signup" ? "signup" : "login";
  const [view, setView] = useState<"login" | "signup">(defaultView);
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (view === "signup") {
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: fullName,
                    role: 'instructor',
                    subscription_status: 'trialing'
                }
            }
        });
        if (error) alert(error.message);
        else {
            router.refresh();
            router.push("/dashboard");
        }
    } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) alert("Invalid login details.");
        else {
            router.refresh();
            router.push("/dashboard");
        }
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
        <div className="text-center mb-6">
            <div className="bg-blue-600 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg shadow-blue-600/20">
                <Car size={28} />
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
                {view === 'login' ? 'Welcome Back' : 'Create Account'}
            </h1>
        </div>

        {/* Toggle - Big Hit Area */}
        <div className="flex bg-slate-100 p-1 rounded-2xl mb-6">
            <button 
                type="button"
                onClick={() => setView('login')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${view === 'login' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
            >
                Log In
            </button>
            <button 
                type="button"
                onClick={() => setView('signup')}
                className={`flex-1 py-3 text-sm font-bold rounded-xl transition-all ${view === 'signup' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400'}`}
            >
                Sign Up
            </button>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
            {view === 'signup' && (
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Full Name</label>
                    <input 
                        type="text" 
                        required 
                        autoComplete="name"
                        className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
            )}
            
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Email</label>
                <input 
                    type="email" 
                    required 
                    inputMode="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1 ml-1">Password</label>
                <input 
                    type="password" 
                    required 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 font-medium text-slate-900"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold h-14 rounded-2xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg mt-4"
            >
                {loading ? <Loader2 className="animate-spin" /> : (view === 'login' ? 'Log In' : 'Start Free Trial')}
            </button>
        </form>

        <div className="mt-8 text-center">
            <Link href="/" className="text-slate-400 hover:text-slate-600 text-sm font-bold flex items-center justify-center gap-2 p-2">
                <ArrowLeft size={16} /> Back to Home
            </Link>
        </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-[100dvh] bg-slate-50 flex items-center justify-center p-4">
        <Suspense fallback={<div className="text-slate-400 font-bold">Loading...</div>}>
            <AuthForm />
        </Suspense>
    </div>
  );
}
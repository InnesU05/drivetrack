"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { CheckCircle2, ShieldCheck, Zap, Loader2 } from "lucide-react";

export default function SubscribePage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  // 🛡️ STUDENT SAFETY CHECK 🛡️
  useEffect(() => {
    async function checkUser() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { router.push("/login"); return; }

        const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
        
        // IF STUDENT: KICK THEM OUT OF HERE IMMEDIATELY
        if (profile?.role === 'student') {
            router.replace("/dashboard"); 
            return;
        }
        setCheckingRole(false);
    }
    checkUser();
  }, [router]);

  const handleCheckout = async () => {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Call our API
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 🔴🔴 PASTE YOUR STRIPE PRICE ID BELOW 🔴🔴
        priceId: "price_1QmqUuK1i3...", 
        userId: user.id,
        email: user.email,
      }),
    });

    const { url } = await response.json();

    // Fix: Simple browser redirect
    if (url) {
        window.location.href = url;
    } else {
        setLoading(false);
        alert("Something went wrong with Stripe. Please check console.");
    }
  };

  if (checkingRole) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-slate-400" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-slate-200 text-center">
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Start your 30-Day Free Trial</h1>
        <p className="text-slate-500 mb-8">Full access to LearnerLog. Cancel anytime.</p>
        
        <button 
            onClick={handleCheckout}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
            {loading ? "Redirecting to Stripe..." : "Start Free Trial ->"}
        </button>
        <p className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-1"><ShieldCheck size={12} /> Secure payment via Stripe</p>
      </div>
    </div>
  );
}
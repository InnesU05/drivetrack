"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";

export default function UpdatePassword() {
  const supabase = createClient();
  const router = useRouter();
  
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.updateUser({ password: password });

    if (!error) {
        router.push("/dashboard");
    } else {
        alert("Error: " + error.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Set New Password</h1>
        <p className="text-slate-500 mb-6 text-sm">Please enter your new password below.</p>

        <form onSubmit={handleUpdate} className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">New Password</label>
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

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Update Password"}
            </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import QRCode from "react-qr-code";
import { ArrowLeft, Copy, Loader2 } from "lucide-react";
import Link from "next/link";

export default function InviteStudent() {
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function getUser() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserId(user.id);
      setLoading(false);
    }
    getUser();
  }, []);

  const finalId = userId || "demo-instructor-id"; 
  const inviteLink = typeof window !== "undefined" 
    ? `${window.location.origin}/signup/student?ref=${finalId}` 
    : "";

  if (loading) return <div className="flex h-screen items-center justify-center"><Loader2 className="animate-spin"/></div>;

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm">
        <Link href="/dashboard" className="text-slate-400 mb-8 inline-flex items-center gap-2 hover:text-white transition-colors">
          <ArrowLeft size={20} /> Back to Dashboard
        </Link>

        <div className="bg-white p-6 rounded-3xl shadow-2xl text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Join My Class</h1>
          <p className="text-slate-500 mb-6 text-sm">Scan this to register as my student.</p>
          
          <div className="bg-white border-4 border-slate-100 rounded-xl p-2 inline-block">
             {inviteLink && <QRCode value={inviteLink} size={200} />}
          </div>
          
          <div className="mt-6 pt-6 border-t border-slate-100">
             <p className="text-xs text-slate-400 mb-2">Or share this link manually</p>
             <button 
               onClick={() => navigator.clipboard.writeText(inviteLink)}
               className="w-full bg-slate-100 text-slate-700 py-3 rounded-lg font-mono text-xs flex items-center justify-center gap-2 active:bg-slate-200 hover:bg-slate-200 transition-colors"
             >
                <Copy size={14} /> Copy Link
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2, AlertTriangle, Trash2 } from "lucide-react";
import Link from "next/link";

export default function DeleteAccount() {
  const supabase = createClient();
  const router = useRouter();
  
  const [confirmation, setConfirmation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (confirmation !== "DELETE") return;
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // 1. Delete all lessons created by this instructor
        await supabase.from('lessons').delete().eq('instructor_id', user.id);

        // 2. Delete all student profiles created by this instructor
        await supabase.from('profiles').delete().eq('instructor_id', user.id);
        
        // 3. Delete the instructor profile itself
        await supabase.from('profiles').delete().eq('id', user.id);

        // 4. Sign out
        await supabase.auth.signOut();
        router.push("/login");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex items-center gap-4 sticky top-0">
        <Link href="/dashboard" className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full">
            <ArrowLeft />
        </Link>
        <h1 className="font-bold text-lg text-slate-900">Delete Account</h1>
      </div>

      <div className="p-6">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 text-center mb-8">
            <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle size={32} />
            </div>
            <h2 className="text-xl font-bold text-red-700 mb-2">Danger Zone</h2>
            <p className="text-red-600 text-sm">
                This action is <strong>irreversible</strong>. It will permanently delete:
            </p>
            <ul className="text-red-600 text-sm mt-2 text-left list-disc list-inside bg-white/50 p-4 rounded-lg inline-block">
                <li>Your Instructor Profile</li>
                <li>All your Students</li>
                <li>All Lesson History & Payment Data</li>
            </ul>
        </div>

        <div className="space-y-4">
            <label className="block text-sm font-bold text-slate-700">
                Type <span className="font-mono bg-slate-100 px-1 rounded">DELETE</span> to confirm
            </label>
            <input 
                type="text" 
                className="w-full p-4 rounded-xl border-2 border-slate-200 outline-none focus:border-red-500 font-mono uppercase"
                placeholder="DELETE"
                value={confirmation}
                onChange={(e) => setConfirmation(e.target.value)}
            />

            <button 
                onClick={handleDelete}
                disabled={confirmation !== "DELETE" || loading}
                className="w-full bg-red-600 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Trash2 size={20} /> Permanently Delete Account</>}
            </button>
        </div>
      </div>
    </div>
  );
}
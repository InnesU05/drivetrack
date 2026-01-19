"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Plus, 
  Search, 
  MoreVertical, 
  Settings, 
  BookOpen, 
  Loader2,
  CheckCircle2,
  Download
} from "lucide-react";

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  // "Syncing" state for when they return from Stripe
  const [isSyncing, setIsSyncing] = useState(false);
  const [loading, setLoading] = useState(true);
  
  const [students, setStudents] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.replace("/login");
      return;
    }

    // 1. Get Profile
    let { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .single();

    // 🏎️ RACE CONDITION FIX:
    // If they just paid (?payment=success) but DB says 'inactive',
    // we enter "Sync Mode" to poll the DB until the Webhook arrives.
    const justPaid = searchParams.get("payment") === "success";

    if (justPaid && (profile?.subscription_status !== 'active' && profile?.subscription_status !== 'trialing')) {
        setIsSyncing(true);
        // Poll every 2 seconds for up to 10 seconds
        const interval = setInterval(async () => {
            const { data: newProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
            if (newProfile?.subscription_status === 'active' || newProfile?.subscription_status === 'trialing') {
                clearInterval(interval);
                setIsSyncing(false);
                setProfile(newProfile);
                router.replace("/dashboard"); // Clear the URL param
            }
        }, 2000);
        
        // Safety timeout after 15s (just let them in or show error)
        setTimeout(() => { 
            clearInterval(interval); 
            setIsSyncing(false); 
        }, 15000);
        return; 
    }

    // Normal Check: If not paying right now, and not active, kick them out
    if (!justPaid && profile?.subscription_status !== 'active' && profile?.subscription_status !== 'trialing') {
        router.replace("/subscribe");
        return;
    }

    setProfile(profile);

    // 2. Get Students
    const { data: studentsData } = await supabase
      .from("profiles")
      .select("*")
      .eq("role", "student")
      .eq("instructor_id", user.id) // Only get MY students
      .order("created_at", { ascending: false });

    if (studentsData) setStudents(studentsData);
    setLoading(false);
  }

  // Filter Logic
  const filteredStudents = students.filter(s => 
    s.full_name?.toLowerCase().includes(search.toLowerCase()) &&
    (filter === 'all' || (filter === 'archived' ? s.archived : !s.archived))
  );

  // --- RENDER: SYNCING SCREEN (The Fix) ---
  if (isSyncing) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
              <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4 animate-pulse">
                  <CheckCircle2 size={48} />
              </div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Payment Successful!</h1>
              <p className="text-slate-500 mb-8 max-w-xs mx-auto">
                  We are activating your account. This usually takes about 5 seconds...
              </p>
              <div className="flex items-center gap-2 text-slate-400 font-bold text-sm">
                  <Loader2 className="animate-spin" /> Finalizing setup...
              </div>
          </div>
      );
  }

  if (loading) return <div className="p-6 text-center text-slate-400"><Loader2 className="animate-spin mx-auto" /></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER */}
      <div className="bg-white p-4 sticky top-0 z-10 border-b border-slate-200 flex justify-between items-center shadow-sm">
        <h1 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            🚗 LearnerLog
        </h1>
        <div className="flex gap-2">
             <Link href="/dashboard/install" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
                <Download size={24} />
            </Link>
            <Link href="/dashboard/settings" className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors">
                <Settings size={24} />
            </Link>
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="p-4 space-y-4">
        <div className="relative">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
                type="text" 
                placeholder="Search students..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* INVITE CARD */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 text-white shadow-lg shadow-blue-500/20 relative overflow-hidden">
            <div className="relative z-10">
                <h2 className="font-bold text-lg mb-1">Add New Student</h2>
                <p className="text-blue-100 text-sm mb-4">Send an invite link to onboard them instantly.</p>
                <Link href="/dashboard/invite" className="inline-flex items-center gap-2 bg-white text-blue-600 font-bold py-2.5 px-5 rounded-xl shadow-sm active:scale-95 transition-all">
                    <Plus size={18} /> Invite Student
                </Link>
            </div>
            <Users className="absolute -right-6 -bottom-6 text-white opacity-10" size={120} />
        </div>

        {/* STUDENT LIST */}
        <div className="flex justify-between items-end mt-6 mb-2 px-1">
            <h3 className="font-bold text-slate-900 text-lg">Your Students</h3>
            <select 
                className="text-xs font-bold text-slate-400 bg-transparent outline-none"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">Active Students</option>
                <option value="archived">Archived</option>
            </select>
        </div>

        <div className="space-y-3">
            {filteredStudents.length === 0 ? (
                <div className="text-center py-12 opacity-50">
                    <p>No students found.</p>
                </div>
            ) : (
                filteredStudents.map((student) => (
                    <Link key={student.id} href={`/dashboard/student/${student.id}`} className="block bg-white p-4 rounded-2xl border border-slate-200 shadow-sm active:scale-[0.99] transition-transform">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-lg font-bold text-slate-500">
                                    {student.full_name?.charAt(0) || "?"}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900">{student.full_name}</h4>
                                    <p className="text-xs text-slate-500 font-medium">Click to view progress</p>
                                </div>
                            </div>
                            <MoreVertical className="text-slate-300" />
                        </div>
                    </Link>
                ))
            )}
        </div>
      </div>
    </div>
  );
}
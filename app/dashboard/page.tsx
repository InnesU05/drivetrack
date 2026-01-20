"use client";

import { useEffect, useState, Suspense } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { 
  Search, Users, ChevronRight, QrCode, LogOut, Loader2, Archive, AlertCircle, Settings, BookOpen, Download, User
} from "lucide-react";

function DashboardContent() {
  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [instructorName, setInstructorName] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<'active' | 'archived'>('active');

  const handleSignOut = async () => {
    if (confirm("Are you sure you want to sign out?")) {
        await supabase.auth.signOut();
        router.push("/login");
    }
  };

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      
      let { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

      // --- 1. HANDLE RACE CONDITION ---
      const justPaid = searchParams.get("payment") === "success";

      if (justPaid && profile?.role === 'instructor' && profile?.subscription_status !== 'active' && profile?.subscription_status !== 'trialing') {
          setIsSyncing(true);
          const interval = setInterval(async () => {
              const { data: newProfile } = await supabase.from("profiles").select("*").eq("id", user.id).single();
              if (newProfile?.subscription_status === 'active' || newProfile?.subscription_status === 'trialing') {
                  clearInterval(interval);
                  setIsSyncing(false);
                  router.replace("/dashboard");
                  window.location.reload(); 
              }
          }, 2000);
          setTimeout(() => { clearInterval(interval); setIsSyncing(false); setLoading(false); }, 10000);
          return; 
      }

      // --- 2. NORMAL CHECK ---
      if (!justPaid && profile?.role === 'instructor') {
          if (profile.subscription_status !== 'active' && profile.subscription_status !== 'trialing') {
              router.replace("/subscribe");
              return;
          }
      }

      if (profile?.role === 'student') {
        router.replace(`/dashboard/student/${user.id}`);
        return;
      }

      // --- 3. LOAD DATA ---
      setInstructorName(user.user_metadata.full_name || "Instructor");

      const { data: studentData } = await supabase
        .from("profiles")
        .select("id, full_name, email, archived")
        .eq("instructor_id", user.id)
        .eq("role", "student")
        .order("full_name", { ascending: true });

      if (studentData) {
        const studentsWithCounts = await Promise.all(
            studentData.map(async (s) => {
                const { count } = await supabase.from("lessons").select("*", { count: 'exact', head: true }).eq("student_id", s.id).eq("is_paid", false);
                return { ...s, unpaid_count: count || 0 };
            })
        );
        setStudents(studentsWithCounts);
      }
      setLoading(false);
    }
    loadData();
  }, [router, searchParams]);

  useEffect(() => {
    let results = students;
    if (currentTab === 'active') results = results.filter(s => !s.archived);
    else results = results.filter(s => s.archived);
    if (searchTerm) results = results.filter(s => s.full_name.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredStudents(results);
  }, [searchTerm, currentTab, students]);

  if (isSyncing) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-white p-6 text-center">
              <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4 animate-pulse"><Loader2 size={48} className="animate-spin" /></div>
              <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Setting up account...</h1>
              <p className="text-slate-500">Please wait a moment.</p>
          </div>
      );
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium"><Loader2 className="animate-spin mr-2" /> Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white p-6 border-b border-slate-200 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <div>
            <h1 className="text-xl font-extrabold text-slate-900">Hello, {instructorName.split(' ')[0]} 👋</h1>
            <p className="text-xs text-slate-500 font-medium">ADIbase Instructor</p>
        </div>
        <div className="flex items-center gap-2">
            <Link href="/dashboard/settings" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg"><Settings size={20} /></Link>
            <button onClick={handleSignOut} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg"><LogOut size={20} /></button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {students.length === 0 ? (
           <div className="space-y-6 mt-4">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl text-center py-10 relative overflow-hidden">
                 <div className="relative z-10">
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-300 backdrop-blur-sm"><QrCode size={32} /></div>
                    <h2 className="text-2xl font-bold mb-2">Let's get started!</h2>
                    <p className="text-slate-400 mb-6 text-sm px-4">Invite your first learner to start tracking.</p>
                    <Link href="/dashboard/invite" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl inline-flex items-center gap-2 shadow-lg"><QrCode size={20} /> Invite Student</Link>
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  <Link href="/dashboard/help" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs"><BookOpen size={16} /> How to Use</Link>
                  <Link href="/dashboard/install" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs"><Download size={16} /> Install App</Link>
              </div>
           </div>
        ) : (
           <>
                <Link href="/dashboard/invite" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"><QrCode size={20} /> Invite New Student</Link>
                
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/dashboard/help" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs shadow-sm active:scale-95 transition-all">
                        <BookOpen size={16} /> How to Use
                    </Link>
                    <Link href="/dashboard/install" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs shadow-sm active:scale-95 transition-all">
                        <Download size={16} /> Install App
                    </Link>
                </div>

                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input type="text" placeholder="Search name..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div className="bg-white p-1 rounded-xl border border-slate-200 flex flex-shrink-0">
                        <button onClick={() => setCurrentTab('active')} className={`px-3 py-1.5 rounded-lg transition-colors ${currentTab === 'active' ? 'bg-slate-100 text-blue-600 shadow-sm' : 'text-slate-400'}`}><Users size={18} /></button>
                        <button onClick={() => setCurrentTab('archived')} className={`px-3 py-1.5 rounded-lg transition-colors ${currentTab === 'archived' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400'}`}><Archive size={18} /></button>
                    </div>
                </div>

                <div className="space-y-3 min-h-[300px]">
                    {filteredStudents.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                            <Users className="mx-auto text-slate-300 mb-3" size={40} />
                            <p className="text-slate-500 font-medium">No {currentTab} students found.</p>
                        </div>
                    ) : (
                        filteredStudents.map((student) => (
                            <Link key={student.id} href={`/dashboard/student/${student.id}`} className="block bg-white p-4 rounded-xl border border-slate-200 shadow-sm active:scale-[0.98] transition-transform group">
                                <div className="flex justify-between items-center mb-3">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`w-10 h-10 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-lg ${student.archived ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                                            {student.full_name.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className={`font-bold truncate ${student.archived ? 'text-slate-500' : 'text-slate-900'}`}>{student.full_name}</h3>
                                            <p className="text-xs text-slate-400 truncate">{student.email}</p>
                                        </div>
                                    </div>
                                    
                                    {student.unpaid_count > 0 && !student.archived ? (
                                        <div className="flex-shrink-0 bg-red-50 text-red-600 border border-red-100 px-3 py-1.5 rounded-lg text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1.5 shadow-sm">
                                            <AlertCircle size={12} strokeWidth={3} />
                                            {student.unpaid_count} Unpaid
                                        </div>
                                    ) : (
                                        <div className="flex-shrink-0"></div>
                                    )}
                                </div>

                                <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
                                        <User size={12} /> Student Profile
                                    </span>
                                    <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:underline">
                                        Tap to view <ChevronRight size={14} />
                                    </span>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
           </>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-slate-400" /></div>}>
      <DashboardContent />
    </Suspense>
  );
}
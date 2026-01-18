"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Search, 
  User, 
  ChevronRight, 
  QrCode, 
  LogOut, 
  Loader2, 
  Users, 
  Archive, 
  CheckCircle2, 
  AlertCircle,
  Settings,    // <--- Added back
  BookOpen,    // <--- Added back
  Download     // <--- Added back
} from "lucide-react";

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();

  // --- 1. STATE ---
  const [loading, setLoading] = useState(true);
  const [instructorName, setInstructorName] = useState("");
  const [students, setStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  
  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTab, setCurrentTab] = useState<'active' | 'archived'>('active');

  // --- 2. DATA LOADING ---
  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

      if (profile && profile.role === 'student') {
        router.replace(`/dashboard/student/${user.id}`);
        return;
      }
      
      // INSTRUCTOR PAYMENT CHECK
// If they are an instructor AND their status is NOT active or trialing...
if (profile.role === 'instructor') {
    const status = profile.subscription_status;
    if (status !== 'active' && status !== 'trialing') {
        router.replace("/subscribe"); // Send them to paywall
        return;
    }
}

      setInstructorName(user.user_metadata.full_name || "Instructor");

      const { data: studentData } = await supabase
        .from("profiles")
        .select("id, full_name, email, archived, created_at")
        .eq("instructor_id", user.id)
        .eq("role", "student")
        .order("full_name", { ascending: true });

      if (studentData) {
        const studentsWithCounts = await Promise.all(
            studentData.map(async (s) => {
                const { count } = await supabase
                    .from("lessons")
                    .select("*", { count: 'exact', head: true })
                    .eq("student_id", s.id)
                    .eq("is_paid", false);
                return { ...s, unpaid_count: count || 0 };
            })
        );
        setStudents(studentsWithCounts);
      }
      setLoading(false);
    }
    loadData();
  }, [router]);

  // --- 3. FILTERING ---
  useEffect(() => {
    let results = students;
    if (currentTab === 'active') results = results.filter(s => !s.archived);
    else results = results.filter(s => s.archived);

    if (searchTerm) {
        results = results.filter(s => s.full_name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    setFilteredStudents(results);
  }, [searchTerm, currentTab, students]);

  if (loading) return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-400 font-medium">
          <Loader2 className="animate-spin mr-2" /> Loading...
      </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-white p-6 border-b border-slate-200 sticky top-0 z-10 shadow-sm flex justify-between items-center">
        <div>
            <h1 className="text-xl font-extrabold text-slate-900">Hello, {instructorName.split(' ')[0]} 👋</h1>
            <p className="text-xs text-slate-500 font-medium">GoLesson Instructor</p>
        </div>
        
        {/* Header Actions: Settings & Sign Out */}
        <div className="flex items-center gap-2">
            <Link 
                href="/dashboard/settings" 
                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
                <Settings size={20} />
            </Link>
            <button 
                onClick={() => { supabase.auth.signOut(); router.push("/login"); }} 
                className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
                <LogOut size={20} />
            </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        
        {/* --- SCENARIO A: ZERO STUDENTS (Onboarding) --- */}
        {students.length === 0 ? (
           <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-4">
              <div className="bg-slate-900 text-white p-6 rounded-2xl shadow-xl text-center py-10 relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none"></div>
                 <div className="relative z-10">
                    <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-300 backdrop-blur-sm">
                        <QrCode size={32} />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Let's get started!</h2>
                    <p className="text-slate-400 mb-6 text-sm px-4">Invite your first learner to start tracking.</p>
                    <Link href="/dashboard/invite" className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-xl inline-flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-blue-900/50">
                        <QrCode size={20} /> Invite Student
                    </Link>
                 </div>
              </div>

              {/* Quick Links Row (Visible even during onboarding) */}
              <div className="grid grid-cols-2 gap-3">
                  <Link href="/dashboard/help" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:border-blue-300 transition-colors">
                      <BookOpen size={16} /> How to Use
                  </Link>
                  <Link href="/dashboard/install" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:border-blue-300 transition-colors">
                      <Download size={16} /> Install App
                  </Link>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <h3 className="font-bold text-slate-900 mb-4">Setup Checklist</h3>
                 <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400 opacity-50"><CheckCircle2 className="text-green-500" size={20} /><span className="text-sm font-medium line-through">Create Account</span></div>
                    <div className="flex items-center gap-3 text-slate-800"><div className="w-5 h-5 rounded-full border-2 border-blue-600 bg-blue-600"></div><span className="text-sm font-bold">Invite a Student</span></div>
                    <div className="flex items-center gap-3 text-slate-400"><div className="w-5 h-5 rounded-full border-2 border-slate-200"></div><span className="text-sm">Log first lesson</span></div>
                 </div>
              </div>
           </div>
        ) : (
           /* --- SCENARIO B: ACTIVE DASHBOARD --- */
           <>
                {/* 1. Invite Button */}
                <Link href="/dashboard/invite" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
                    <QrCode size={20} /> Invite New Student
                </Link>

                {/* 2. Quick Actions (Restored) */}
                <div className="grid grid-cols-2 gap-3">
                    <Link href="/dashboard/help" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:border-blue-300 transition-colors">
                        <BookOpen size={16} /> How to Use
                    </Link>
                    <Link href="/dashboard/install" className="flex items-center justify-center gap-2 p-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold text-xs hover:border-blue-300 transition-colors">
                        <Download size={16} /> Install App
                    </Link>
                </div>

                {/* 3. Search & Tabs */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-3 text-slate-400" size={16} />
                        <input 
                            type="text" 
                            placeholder="Search name..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                    </div>
                    <div className="bg-white p-1 rounded-xl border border-slate-200 flex flex-shrink-0">
                        <button onClick={() => setCurrentTab('active')} className={`px-3 py-1.5 rounded-lg transition-colors ${currentTab === 'active' ? 'bg-slate-100 text-blue-600 shadow-sm' : 'text-slate-400'}`}>
                            <Users size={18} />
                        </button>
                        <button onClick={() => setCurrentTab('archived')} className={`px-3 py-1.5 rounded-lg transition-colors ${currentTab === 'archived' ? 'bg-slate-100 text-slate-800 shadow-sm' : 'text-slate-400'}`}>
                            <Archive size={18} />
                        </button>
                    </div>
                </div>

                {/* 4. Student List */}
                <div className="space-y-3 min-h-[300px]">
                    {filteredStudents.length === 0 ? (
                        <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                            <User className="mx-auto text-slate-300 mb-3" size={40} />
                            <p className="text-slate-500 font-medium">No {currentTab} students found.</p>
                        </div>
                    ) : (
                        filteredStudents.map((student) => (
                            <Link key={student.id} href={`/dashboard/student/${student.id}`} className="block bg-white p-4 rounded-xl border border-slate-100 shadow-sm active:scale-[0.98] transition-transform group hover:border-blue-300">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${student.archived ? 'bg-slate-100 text-slate-400' : 'bg-blue-100 text-blue-600'}`}>
                                            {student.full_name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className={`font-bold ${student.archived ? 'text-slate-500' : 'text-slate-900'}`}>{student.full_name}</h3>
                                            <p className="text-xs text-slate-400 truncate max-w-[150px]">{student.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {student.unpaid_count > 0 && !student.archived && (
                                            <div className="bg-red-50 text-red-600 border border-red-100 px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide flex items-center gap-1">
                                                <AlertCircle size={10} />
                                                {student.unpaid_count} Unpaid
                                            </div>
                                        )}
                                        <ChevronRight className="text-slate-300 group-hover:text-blue-500 transition-colors" size={20} />
                                    </div>
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
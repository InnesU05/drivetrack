"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { User, ChevronRight, Loader2, QrCode, Search, Trash2, Archive, Users, AlertCircle, Settings, X, LogOut, Mail, UserX, Download, Share, MoreVertical, PlusSquare, BookOpen, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  full_name: string;
  email: string;
  archived: boolean;
  unpaid_count?: number;
};

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [instructorName, setInstructorName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState<'active' | 'archived'>('active');
  
  // Menu States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstallOpen, setIsInstallOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false); // NEW: Guide State
  const [installTab, setInstallTab] = useState<'ios' | 'android'>('ios');

 useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/login"); return; }
      
      // 1. Get the current user's profile to check their ROLE
      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      // --- NEW LOGIC: STUDENT REDIRECT ---
      if (profile && profile.role === 'student') {
        router.replace(`/dashboard/student/${user.id}`);
        return;
      }
      // -----------------------------------
      
      setInstructorName(user.user_metadata.full_name || "Instructor");

      const { data: studentData } = await supabase
        .from("profiles")
        .select("id, full_name, email, archived")
        .eq("instructor_id", user.id)
        .eq("role", "student");

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

  const handleDeleteStudent = async (studentId: string, e: React.MouseEvent) => {
    e.preventDefault(); e.stopPropagation(); 
    if (!confirm("Are you sure? This will delete the student PERMANENTLY.")) return;
    await supabase.from("lessons").delete().eq("student_id", studentId);
    const { error } = await supabase.from("profiles").delete().eq("id", studentId);
    if (!error) setStudents(students.filter(s => s.id !== studentId));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesView = view === 'active' ? !student.archived : student.archived;
    return matchesSearch && matchesView;
  });

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-24 relative overflow-x-hidden">
      
      {/* NEW: App Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsGuideOpen(false)} />
            <div className="bg-white rounded-2xl w-full max-w-sm relative z-10 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <button onClick={() => setIsGuideOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                    <X size={24} />
                </button>
                <div className="text-center mb-6">
                    <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <BookOpen size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Quick Start Guide</h2>
                </div>
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="mt-1"><div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">1</div></div>
                        <div><h3 className="font-bold text-slate-800">Invite a Student</h3><p className="text-sm text-slate-500">Click the blue "Invite Student" card to use the QR code.</p></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1"><div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">2</div></div>
                        <div><h3 className="font-bold text-slate-800">Log a Lesson</h3><p className="text-sm text-slate-500">Tap a student's name, then click "Log New Lesson" to track skills.</p></div>
                    </div>
                    <div className="flex gap-4">
                        <div className="mt-1"><div className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-500">3</div></div>
                        <div><h3 className="font-bold text-slate-800">Track Payments</h3><p className="text-sm text-slate-500">Use the Paid/Unpaid toggle on the lesson history to manage debts.</p></div>
                    </div>
                </div>
                <button onClick={() => setIsGuideOpen(false)} className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl">Close Guide</button>
            </div>
        </div>
      )}

      {/* Install Guide Modal */}
      {isInstallOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsInstallOpen(false)} />
            <div className="bg-white rounded-2xl w-full max-w-sm relative z-10 p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                <button onClick={() => setIsInstallOpen(false)} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600">
                    <X size={24} />
                </button>
                <div className="text-center mb-6">
                    <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Download size={24} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">Install App</h2>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-lg mb-6">
                    <button onClick={() => setInstallTab('ios')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${installTab === 'ios' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}>iPhone / iPad</button>
                    <button onClick={() => setInstallTab('android')} className={`flex-1 py-2 text-sm font-bold rounded-md transition-all ${installTab === 'android' ? 'bg-white shadow text-green-600' : 'text-slate-500'}`}>Android</button>
                </div>
                <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    {installTab === 'ios' ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-700"><Share size={16} className="text-blue-500" /><span>Tap <strong>Share</strong> on browser bar.</span></div>
                            <div className="flex items-center gap-3 text-sm text-slate-700"><PlusSquare size={16} className="text-slate-600" /><span>Tap <strong>Add to Home Screen</strong>.</span></div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 text-sm text-slate-700"><MoreVertical size={16} className="text-slate-600" /><span>Tap <strong>Three Dots</strong> menu.</span></div>
                            <div className="flex items-center gap-3 text-sm text-slate-700"><Download size={16} className="text-green-600" /><span>Select <strong>Install App</strong>.</span></div>
                        </div>
                    )}
                </div>
                <button onClick={() => setIsInstallOpen(false)} className="w-full mt-6 bg-slate-900 text-white font-bold py-3 rounded-xl">Got it</button>
            </div>
        </div>
      )}

      {/* Settings Menu */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSettingsOpen(false)} />
            <div className="relative w-2/3 max-w-sm bg-white h-full shadow-2xl p-6 flex flex-col animate-in slide-in-from-right duration-300">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-slate-900">Settings</h2>
                    <button onClick={() => setIsSettingsOpen(false)} className="p-2 bg-slate-100 rounded-full text-slate-500 hover:bg-slate-200">
                        <X size={20} />
                    </button>
                </div>
                <div className="space-y-2">
                    <Link href="/dashboard/settings/contact" className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        <Mail size={20} /> Contact Support
                    </Link>
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 rounded-xl bg-slate-50 text-slate-700 font-bold hover:bg-slate-100 transition-colors">
                        <LogOut size={20} /> Sign Out
                    </button>
                    <hr className="border-slate-100 my-4" />
                    <Link href="/dashboard/settings/delete" className="flex items-center gap-3 p-4 rounded-xl bg-red-50 text-red-600 font-bold hover:bg-red-100 transition-colors">
                        <UserX size={20} /> Delete Account
                    </Link>
                </div>
                <div className="mt-auto text-center text-xs text-slate-400"><p>GoLesson v1.0</p></div>
            </div>
        </div>
      )}

      {/* Top Bar */}
      <header className="bg-white p-6 border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-center">
             <div>
                <h1 className="text-2xl font-bold text-slate-900">GoLesson</h1>
                <p className="text-sm text-slate-500">Hi, {instructorName}</p>
             </div>
             <div className="flex items-center gap-2">
                {/* Profile Pic */}
                <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                    {instructorName[0]?.toUpperCase()}
                </div>
                {/* Settings Cog (No text) */}
                <button onClick={() => setIsSettingsOpen(true)} className="h-10 w-10 bg-slate-50 border border-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 transition-colors">
                    <Settings size={20} />
                </button>
             </div>
          </div>
          
          {/* NEW: Action Buttons Row (Guide + Install) */}
          <div className="flex gap-2">
             <button 
                onClick={() => setIsGuideOpen(true)}
                className="flex-1 bg-purple-50 hover:bg-purple-100 border border-purple-100 text-purple-700 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
             >
                <BookOpen size={16} />
                <span className="text-xs font-bold">App Guide</span>
             </button>
             
             <button 
                onClick={() => setIsInstallOpen(true)}
                className="flex-1 bg-blue-50 hover:bg-blue-100 border border-blue-100 text-blue-700 py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
             >
                <Download size={16} />
                <span className="text-xs font-bold">Install App</span>
             </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
            <Search className="absolute left-3 top-3 text-slate-400" size={20} />
            <input 
                type="text"
                placeholder="Search students..."
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-100 border-none text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none placeholder:text-slate-400"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
      </header>

      <div className="p-4">
        {/* Toggle Tabs */}
        <div className="flex bg-white p-1 rounded-xl border border-slate-100 shadow-sm mb-6">
            <button onClick={() => setView('active')} className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${view === 'active' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Users size={16} /> Current
            </button>
            <button onClick={() => setView('archived')} className={`flex-1 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all ${view === 'archived' ? 'bg-amber-100 text-amber-700 shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}>
                <Archive size={16} /> Past Students
            </button>
        </div>

        {searchTerm === "" && view === 'active' && (
            <Link href="/dashboard/invite" className="bg-blue-600 text-white p-4 rounded-xl flex items-center justify-between shadow-lg mb-8 active:scale-95 transition-transform">
            <div className="flex items-center gap-3">
                <div className="bg-blue-500 p-2 rounded-lg"><QrCode className="text-white" /></div>
                <div><h3 className="font-bold">Invite Student</h3><p className="text-xs text-blue-100">Show QR Code</p></div>
            </div>
            <ChevronRight />
            </Link>
        )}

        <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">
            {view === 'active' ? "Active Students" : "Past Students"} ({filteredStudents.length})
        </h2>
        
        <div className="space-y-3">
          {filteredStudents.length === 0 ? (
            <div className="text-center py-10">
               <p className="text-slate-400">{view === 'active' ? "No active students." : "No archived students."}</p>
            </div>
          ) : (
            filteredStudents.map((student) => (
              <div key={student.id} className="relative group">
                  <Link href={`/dashboard/student/${student.id}`} className="block bg-white p-4 rounded-xl border border-slate-100 shadow-sm active:bg-blue-50 transition-colors pr-16">
                    <div className="flex items-center gap-4">
                        <div className={`relative h-12 w-12 rounded-full flex items-center justify-center ${view === 'active' ? 'bg-slate-100' : 'bg-amber-50'}`}>
                            <User className={view === 'active' ? 'text-slate-400' : 'text-amber-400'} />
                            {student.unpaid_count && student.unpaid_count > 0 ? (
                                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                                    {student.unpaid_count}
                                </div>
                            ) : null}
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-slate-900 text-lg">{student.full_name}</h3>
                                {student.unpaid_count && student.unpaid_count > 0 ? (
                                    <span className="flex items-center gap-1 text-[10px] bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-bold">
                                        <AlertCircle size={10} /> Unpaid
                                    </span>
                                ) : null}
                            </div>
                            <p className="text-xs text-slate-500">{student.email}</p>
                        </div>
                    </div>
                  </Link>
                  <button onClick={(e) => handleDeleteStudent(student.id, e)} className="absolute right-2 top-1/2 -translate-y-1/2 p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all z-10" title="Delete Student"><Trash2 size={20} /></button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
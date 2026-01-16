"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Star, Calendar, LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";

type Lesson = {
  id: string;
  date: string;
  notes: string;
  skills_report: Record<string, number>;
};

export default function StudentDashboard() {
  const supabase = createClient();
  const router = useRouter();
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    async function loadData() {
      // 1. Get Current User
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setStudentName(user.user_metadata.full_name || "Student");

      // 2. Fetch My Lessons (RLS Policy ensures I only see mine)
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .order("date", { ascending: false }); // Newest first

      if (data) setLessons(data);
      setLoading(false);
    }
    loadData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-10">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 shadow-lg rounded-b-3xl mb-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-2xl font-bold">My Progress</h1>
            <p className="text-blue-100 text-sm">Welcome back, {studentName}</p>
          </div>
          <button onClick={handleLogout} className="bg-blue-700 p-2 rounded-lg hover:bg-blue-800">
            <LogOut size={18} />
          </button>
        </div>
        
        {/* Quick Stat Card */}
        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 flex items-center gap-3">
            <div className="bg-white text-blue-600 p-2 rounded-full font-bold h-10 w-10 flex items-center justify-center">
                {lessons.length}
            </div>
            <div>
                <p className="font-bold text-sm">Lessons Completed</p>
                <p className="text-xs text-blue-100">Keep up the good work!</p>
            </div>
        </div>
      </header>

      {/* Lesson List */}
      <div className="px-4 space-y-4">
        {loading ? (
            <p className="text-center text-slate-400 mt-10">Loading progress...</p>
        ) : lessons.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
                <p className="text-slate-400">No lessons logged yet.</p>
            </div>
        ) : (
            lessons.map((lesson) => (
              <div key={lesson.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
                {/* Date Header */}
                <div className="flex items-center gap-2 text-slate-400 mb-4 text-xs font-bold uppercase tracking-wider">
                   <Calendar size={14} />
                   {new Date(lesson.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                </div>

                {/* Skills Grid */}
                <div className="space-y-3 mb-4">
                    {lesson.skills_report && Object.entries(lesson.skills_report).map(([skill, score]: any) => (
                        score > 0 && (
                            <div key={skill} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                                <span className="text-slate-700 font-medium">{skill}</span>
                                <div className="flex gap-1">
                                    {[...Array(score)].map((_, i) => (
                                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                                    ))}
                                </div>
                            </div>
                        )
                    ))}
                </div>

                {/* Instructor Notes */}
                {lesson.notes && (
                    <div className="bg-blue-50 p-3 rounded-xl text-blue-800 text-sm italic border border-blue-100">
                        "{lesson.notes}"
                    </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
  );
}
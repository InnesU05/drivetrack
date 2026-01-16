"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar, Trash2, Star, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentProfile({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params for Next.js 15
  const { id } = use(params);
  const studentId = id;

  const supabase = createClient();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      // 1. Fetch Student Details
      const { data: studentData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", studentId)
        .single();
      
      setStudent(studentData);

      // 2. Fetch Lesson History
      const { data: lessonData } = await supabase
        .from("lessons")
        .select("*")
        .eq("student_id", studentId)
        .order("date", { ascending: false }); // Newest first

      if (lessonData) setLessons(lessonData);
      setLoading(false);
    }
    loadData();
  }, [studentId]);

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Delete this lesson record?")) return;

    const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
    
    if (!error) {
        // Remove from screen instantly
        setLessons(lessons.filter(l => l.id !== lessonId));
    }
  };

  if (loading) return <div className="p-6 text-center text-slate-400">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white p-6 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600">
                <ArrowLeft />
            </Link>
            <h1 className="text-xl font-bold text-slate-900 truncate">
                {student?.full_name}
            </h1>
        </div>

        {/* Big Action Button */}
        <Link 
            href={`/dashboard/student/${studentId}/log`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
            <Plus size={24} /> Log New Lesson
        </Link>
      </div>

      {/* History List */}
      <div className="p-4 space-y-4">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Lesson History</h2>
        
        {lessons.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                <Clock className="mx-auto text-slate-300 mb-2" size={32} />
                <p className="text-slate-400">No lessons logged yet.</p>
            </div>
        ) : (
            lessons.map((lesson) => (
                <div key={lesson.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative group">
                    {/* Date Header */}
                    <div className="flex items-center gap-2 text-blue-600 font-bold text-sm mb-3">
                        <Calendar size={16} />
                        {new Date(lesson.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>

                    {/* Summary of Skills (Shows top 2 skills worked on) */}
                    <div className="space-y-2 mb-3">
                        {lesson.skills_report && Object.entries(lesson.skills_report).slice(0, 3).map(([skill, score]: any) => (
                            <div key={skill} className="flex justify-between text-sm text-slate-600">
                                <span>{skill}</span>
                                <div className="flex text-amber-400">
                                    {[...Array(score)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Delete Button (Subtle) */}
                    <button 
                        onClick={() => handleDeleteLesson(lesson.id)}
                        className="absolute top-4 right-4 text-slate-300 hover:text-red-500 p-2"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
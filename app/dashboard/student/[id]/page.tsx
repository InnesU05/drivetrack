"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar, Trash2, Star, Clock, Trophy, Hourglass } from "lucide-react";
import { useRouter } from "next/navigation";
import ProgressChart from "@/components/ProgressChart";

export default function StudentProfile({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const studentId = id;

  const supabase = createClient();
  const router = useRouter();

  const [student, setStudent] = useState<any>(null);
  const [lessons, setLessons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Stats
  const [totalHours, setTotalHours] = useState(0);
  const [readiness, setReadiness] = useState(0);

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
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (lessonData) {
        setLessons(lessonData);

        // 3. Calculate Total Hours
        const hours = lessonData.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
        setTotalHours(hours);

        // 4. Calculate Readiness (Based on Latest Lesson)
        if (lessonData.length > 0) {
            const latestSkills = lessonData[0].skills_report || {};
            const scores = Object.values(latestSkills) as number[];
            
            // Logic: Count how many skills are at 4 or 5 stars
            // We assume there are 8 total core skills
            const passedSkills = scores.filter(s => s >= 4).length;
            const totalSkills = 8; // Based on your skills list
            const percentage = Math.round((passedSkills / totalSkills) * 100);
            
            setReadiness(percentage > 100 ? 100 : percentage);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [studentId]);

  const handleDeleteLesson = async (lessonId: string) => {
    if (!confirm("Delete this lesson record?")) return;

    const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
    
    if (!error) {
        const newLessons = lessons.filter(l => l.id !== lessonId);
        setLessons(newLessons);
        // Recalculate hours locally to avoid refresh
        setTotalHours(newLessons.reduce((sum, l) => sum + (l.duration || 0), 0));
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

        <Link 
            href={`/dashboard/student/${studentId}/log`}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
        >
            <Plus size={24} /> Log New Lesson
        </Link>
      </div>

      <div className="p-4 space-y-4">
        
        {/* NEW: Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
            {/* Total Hours Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
                <div className="bg-blue-50 p-2 rounded-full text-blue-600 mb-1">
                    <Hourglass size={20} />
                </div>
                <span className="text-2xl font-bold text-slate-900">{totalHours}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hrs Driven</span>
            </div>

            {/* Test Readiness Gauge */}
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
                <div className={`p-2 rounded-full mb-1 ${readiness >= 80 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}>
                    <Trophy size={20} />
                </div>
                <span className={`text-2xl font-bold ${readiness >= 80 ? 'text-green-600' : 'text-slate-900'}`}>
                    {readiness}%
                </span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Test Ready</span>
            </div>
        </div>

        {/* Progress Chart */}
        {!loading && <ProgressChart lessons={lessons} />}

        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Lesson History</h2>
        
        {lessons.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                <Clock className="mx-auto text-slate-300 mb-2" size={32} />
                <p className="text-slate-400">No lessons logged yet.</p>
            </div>
        ) : (
            lessons.map((lesson) => (
                <div key={lesson.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative group">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                <Calendar size={16} />
                                {new Date(lesson.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            {/* Show duration in history too */}
                            <span className="text-xs text-slate-400 mt-1 font-medium">{lesson.duration || 1} Hr Lesson</span>
                        </div>
                        
                        {!lesson.is_paid && (
                            <span className="bg-red-100 text-red-700 text-[10px] font-bold px-2 py-1 rounded-full border border-red-200">
                                UNPAID
                            </span>
                        )}
                        {lesson.is_paid && (
                            <span className="bg-green-50 text-green-600 text-[10px] font-bold px-2 py-1 rounded-full border border-green-100">
                                PAID
                            </span>
                        )}
                    </div>

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
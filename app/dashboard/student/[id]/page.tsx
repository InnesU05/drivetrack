"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { ArrowLeft, Plus, Calendar, Trash2, Star, Clock, Trophy, Hourglass, Edit3 } from "lucide-react";
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
  const [totalHours, setTotalHours] = useState(0);
  const [readiness, setReadiness] = useState(0);

  useEffect(() => {
    async function loadData() {
      const { data: studentData } = await supabase.from("profiles").select("*").eq("id", studentId).single();
      setStudent(studentData);

      const { data: lessonData } = await supabase
        .from("lessons")
        .select("*")
        .eq("student_id", studentId)
        .order("date", { ascending: false })
        .order("created_at", { ascending: false });

      if (lessonData) {
        setLessons(lessonData);
        const hours = lessonData.reduce((sum, lesson) => sum + (lesson.duration || 0), 0);
        setTotalHours(hours);

        if (lessonData.length > 0) {
            const latestSkills = lessonData[0].skills_report || {};
            const scores = Object.values(latestSkills) as number[];
            const passedSkills = scores.filter(s => s >= 4).length;
            const percentage = Math.round((passedSkills / 8) * 100); 
            setReadiness(percentage > 100 ? 100 : percentage);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [studentId]);

  const handleDeleteLesson = async (lessonId: string, e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (!confirm("Delete this lesson record?")) return;
    const { error } = await supabase.from("lessons").delete().eq("id", lessonId);
    if (!error) {
        const newLessons = lessons.filter(l => l.id !== lessonId);
        setLessons(newLessons);
        setTotalHours(newLessons.reduce((sum, l) => sum + (l.duration || 0), 0));
    }
  };

  const togglePayment = async (lessonId: string, currentStatus: boolean, e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    const updatedLessons = lessons.map(l => l.id === lessonId ? { ...l, is_paid: !currentStatus } : l);
    setLessons(updatedLessons);
    await supabase.from("lessons").update({ is_paid: !currentStatus }).eq("id", lessonId);
  };

  if (loading) return <div className="p-6 text-center text-slate-400">Loading profile...</div>;

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      <div className="bg-white p-6 border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-4 mb-4">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600"><ArrowLeft /></Link>
            <h1 className="text-xl font-bold text-slate-900 truncate">{student?.full_name}</h1>
        </div>
        <Link href={`/dashboard/student/${studentId}/log`} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Plus size={24} /> Log New Lesson
        </Link>
      </div>

      <div className="p-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
                <div className="bg-blue-50 p-2 rounded-full text-blue-600 mb-1"><Hourglass size={20} /></div>
                <span className="text-2xl font-bold text-slate-900">{totalHours}</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Hrs Driven</span>
            </div>
            <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col items-center justify-center gap-1">
                <div className={`p-2 rounded-full mb-1 ${readiness >= 80 ? 'bg-green-100 text-green-600' : 'bg-amber-100 text-amber-600'}`}><Trophy size={20} /></div>
                <span className={`text-2xl font-bold ${readiness >= 80 ? 'text-green-600' : 'text-slate-900'}`}>{readiness}%</span>
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Test Ready</span>
            </div>
        </div>

        {!loading && <ProgressChart lessons={lessons} />}

        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider ml-1">Lesson History</h2>
        
        {lessons.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-xl bg-white/50">
                <Clock className="mx-auto text-slate-300 mb-2" size={32} />
                <p className="text-slate-400">No lessons logged yet.</p>
            </div>
        ) : (
            lessons.map((lesson) => (
                <Link key={lesson.id} href={`/dashboard/lesson/${lesson.id}`} className="block bg-white p-5 rounded-xl border border-slate-100 shadow-sm relative group active:scale-[0.99] transition-transform pb-12">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col">
                            <div className="flex items-center gap-2 text-blue-600 font-bold text-sm">
                                <Calendar size={16} />
                                {new Date(lesson.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </div>
                            <span className="text-xs text-slate-400 mt-1 font-medium">{lesson.duration || 1} Hr Lesson</span>
                        </div>
                        
                        <button onClick={(e) => togglePayment(lesson.id, lesson.is_paid, e)} className={`relative w-24 h-9 rounded-full transition-colors duration-200 ease-in-out flex items-center px-1 shadow-inner ${lesson.is_paid ? 'bg-green-500' : 'bg-red-400'}`}>
                            <div className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-200 ${lesson.is_paid ? 'translate-x-[3.75rem]' : 'translate-x-0'}`} />
                            <span className={`absolute text-[10px] font-bold text-white uppercase tracking-wider ${lesson.is_paid ? 'left-3' : 'right-3'}`}>{lesson.is_paid ? 'Paid' : 'Unpaid'}</span>
                        </button>
                    </div>

                    <div className="space-y-2 mb-2">
                        {lesson.skills_report && Object.entries(lesson.skills_report).slice(0, 3).map(([skill, score]: any) => (
                            <div key={skill} className="flex justify-between text-sm text-slate-600">
                                <span>{skill}</span>
                                <div className="flex text-amber-400">{[...Array(score)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}</div>
                            </div>
                        ))}
                    </div>

                    {/* UPDATED TEXT HERE */}
                    <div className="absolute bottom-4 left-5 text-[10px] text-slate-300 font-bold italic flex items-center gap-1 group-hover:text-blue-400 transition-colors">
                        <Edit3 size={10} /> Click to edit
                    </div>

                    <button onClick={(e) => handleDeleteLesson(lesson.id, e)} className="absolute bottom-3 right-3 text-slate-300 hover:text-red-500 p-2 z-10"><Trash2 size={18} /></button>
                </Link>
            ))
        )}
      </div>
    </div>
  );
}
"use client";

import { useState, use, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, Calendar, Clock, Trash2 } from "lucide-react";
import Link from "next/link";
import StarRating from "@/components/StarRating";

const SKILLS = [
  "Cockpit Drill", "Moving Off & Stopping", "Junctions (Turning)", "Roundabouts",
  "Pedestrian Crossings", "Dual Carriageways", "Parallel Parking", "Emergency Stop"
];

export default function EditLesson({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const lessonId = id;
  
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [studentId, setStudentId] = useState("");
  
  const [notes, setNotes] = useState("");
  const [isPaid, setIsPaid] = useState(false); 
  const [lessonDate, setLessonDate] = useState("");
  const [duration, setDuration] = useState(1.0);
  const [ratings, setRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadLesson() {
      const { data, error } = await supabase.from("lessons").select("*").eq("id", lessonId).single();
      if (error || !data) {
        alert("Lesson not found");
        router.back();
        return;
      }
      setStudentId(data.student_id);
      setNotes(data.notes || "");
      setIsPaid(data.is_paid || false);
      setLessonDate(data.date);
      setDuration(data.duration || 1.0);
      setRatings(data.skills_report || {});
      setLoading(false);
    }
    loadLesson();
  }, [lessonId, router]);

  const handleRate = (skill: string, value: number) => {
    setRatings((prev) => ({ ...prev, [skill]: value }));
  };

  const updateLesson = async () => {
    setSaving(true);
    const { error } = await supabase
      .from("lessons")
      .update({ skills_report: ratings, notes: notes, is_paid: isPaid, date: lessonDate, duration: duration })
      .eq("id", lessonId);

    if (error) alert("Error updating lesson");
    else { router.refresh(); router.push(`/dashboard/student/${studentId}`); }
    setSaving(false);
  };

  const deleteLesson = async () => {
    if(!confirm("Are you sure you want to delete this lesson?")) return;
    await supabase.from("lessons").delete().eq("id", lessonId);
    router.refresh();
    router.push(`/dashboard/student/${studentId}`);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="min-h-screen bg-white pb-24">
      <div className="sticky top-0 bg-white z-50 border-b border-slate-100 p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
            <Link href={`/dashboard/student/${studentId}`} className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full"><ArrowLeft /></Link>
            <h1 className="font-bold text-lg text-slate-900">Edit Lesson</h1>
        </div>
        <button onClick={deleteLesson} className="text-red-500 p-2"><Trash2 size={20} /></button>
      </div>

      <div className="p-4 space-y-6">
        <div className="flex gap-4">
            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1"><Calendar size={16} /><span className="text-xs font-bold uppercase">Date</span></div>
                <input type="date" value={lessonDate} onChange={(e) => setLessonDate(e.target.value)} className="w-full bg-transparent font-bold text-slate-900 outline-none" />
            </div>
            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1"><Clock size={16} /><span className="text-xs font-bold uppercase">Duration</span></div>
                <select value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} className="w-full bg-transparent font-bold text-slate-900 outline-none">
                    <option value={1.0}>1 Hour</option><option value={1.5}>1.5 Hours</option><option value={2.0}>2 Hours</option><option value={2.5}>2.5 Hours</option><option value={3.0}>3 Hours</option>
                </select>
            </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Skill Progress</h2>
          {SKILLS.map((skill) => (
            <div key={skill} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800">{skill}</span>
                <span className="text-sm font-mono text-slate-400 font-bold">{ratings[skill] || 0}/5</span>
              </div>
              <div className="flex justify-center py-3"><StarRating rating={ratings[skill] || 0} onRate={(val) => handleRate(skill, val)} /></div>
            </div>
          ))}
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
                <h3 className="font-bold text-slate-800">Payment Status</h3>
            </div>
            <button onClick={() => setIsPaid(!isPaid)} className={`relative w-24 h-9 rounded-full transition-colors duration-200 ease-in-out flex items-center px-1 shadow-inner ${isPaid ? 'bg-green-500' : 'bg-red-400'}`}>
                <div className={`w-7 h-7 bg-white rounded-full shadow-md transform transition-transform duration-200 ${isPaid ? 'translate-x-[3.75rem]' : 'translate-x-0'}`} />
                <span className={`absolute text-[10px] font-bold text-white uppercase tracking-wider ${isPaid ? 'left-3' : 'right-3'}`}>{isPaid ? 'Paid' : 'Unpaid'}</span>
            </button>
        </div>

        <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes for Student</h2>
            {/* UPDATED: Added placeholder back */}
            <textarea 
                className="w-full border border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-blue-500 outline-none text-slate-800" 
                placeholder="Today went well! Remember to check mirrors..."
                value={notes} 
                onChange={(e) => setNotes(e.target.value)} 
            />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-100 z-40">
        <button onClick={updateLesson} disabled={saving} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform">
            {saving ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Update Lesson</>}
        </button>
      </div>
    </div>
  );
}
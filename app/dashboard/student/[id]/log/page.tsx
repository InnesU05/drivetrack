"use client";

import { useState, use, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2, History, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import StarRating from "@/components/StarRating";

const SKILLS = [
  "Cockpit Drill",
  "Moving Off & Stopping",
  "Junctions (Turning)",
  "Roundabouts",
  "Pedestrian Crossings",
  "Dual Carriageways",
  "Parallel Parking",
  "Emergency Stop"
];

export default function LogLesson({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const studentId = id;
  
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [isPaid, setIsPaid] = useState(false); 
  const [lessonDate, setLessonDate] = useState(new Date().toISOString().split('T')[0]);
  
  // NEW: Duration State (Default 1 hour)
  const [duration, setDuration] = useState(1.0);

  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [prevRatings, setPrevRatings] = useState<Record<string, number>>({});

  useEffect(() => {
    async function loadPreviousLesson() {
      const { data } = await supabase
        .from("lessons")
        .select("skills_report")
        .eq("student_id", studentId)
        .order("date", { ascending: false })
        .order("created_at", { ascending: false }) 
        .limit(1)
        .single();

      if (data && data.skills_report) {
        setPrevRatings(data.skills_report);
      }
    }
    loadPreviousLesson();
  }, [studentId]);

  const handleRate = (skill: string, value: number) => {
    setRatings((prev) => ({ ...prev, [skill]: value }));
  };

  const saveLesson = async () => {
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert("You must be logged in to save.");
        setLoading(false);
        return;
      }

      const finalSkillsReport = { ...prevRatings, ...ratings };

      const { error } = await supabase.from("lessons").insert({
        student_id: studentId,
        instructor_id: user.id,
        skills_report: finalSkillsReport,
        notes: notes,
        is_paid: isPaid,
        date: lessonDate,
        duration: duration // <--- Saving the duration
      });

      if (error) throw error;

      router.refresh(); 
      router.push(`/dashboard/student/${studentId}`);

    } catch (error: any) {
      console.error(error);
      alert("Error saving lesson: " + error.message);
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white z-50 border-b border-slate-100 p-4 flex items-center gap-4 shadow-sm">
        <Link href={`/dashboard/student/${studentId}`} className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <ArrowLeft />
        </Link>
        <h1 className="font-bold text-lg text-slate-900">Log Lesson</h1>
      </div>

      <div className="p-4 space-y-6">
        
        {/* Date & Duration Row */}
        <div className="flex gap-4">
            {/* Date Picker */}
            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Calendar size={16} />
                    <span className="text-xs font-bold uppercase">Date</span>
                </div>
                <input 
                    type="date" 
                    required
                    value={lessonDate}
                    onChange={(e) => setLessonDate(e.target.value)}
                    className="w-full bg-transparent font-bold text-slate-900 outline-none"
                />
            </div>

            {/* NEW: Duration Picker */}
            <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Clock size={16} />
                    <span className="text-xs font-bold uppercase">Duration</span>
                </div>
                <select 
                    value={duration}
                    onChange={(e) => setDuration(parseFloat(e.target.value))}
                    className="w-full bg-transparent font-bold text-slate-900 outline-none"
                >
                    <option value={1.0}>1 Hour</option>
                    <option value={1.5}>1.5 Hours</option>
                    <option value={2.0}>2 Hours</option>
                    <option value={2.5}>2.5 Hours</option>
                    <option value={3.0}>3 Hours</option>
                </select>
            </div>
        </div>

        {/* Helper Banner */}
        <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 flex gap-3 items-center">
            <div className="bg-amber-100 p-2 rounded-full text-amber-600">
                <History size={18} />
            </div>
            <p className="text-xs text-amber-800 leading-tight">
                <strong>Time Saver:</strong> Faded stars show the score from the last lesson. Tap a star to update it for today.
            </p>
        </div>

        {/* Skill List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Skill Progress</h2>
          
          {SKILLS.map((skill) => (
            <div key={skill} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800">{skill}</span>
                <span className="text-sm font-mono text-slate-400 font-bold">
                    {ratings[skill] ? ratings[skill] : (prevRatings[skill] || 0)}/5
                </span>
              </div>
              <div className="flex justify-center py-3">
                 <StarRating 
                    rating={ratings[skill] || 0} 
                    previousRating={prevRatings[skill] || 0}
                    onRate={(val) => handleRate(skill, val)} 
                 />
              </div>
            </div>
          ))}
        </div>

        {/* Payment Toggle */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center">
            <div>
                <h3 className="font-bold text-slate-800">Payment Status</h3>
                <p className="text-xs text-slate-400">Did the student pay for this lesson?</p>
            </div>
            <button
                onClick={() => setIsPaid(!isPaid)}
                className={`px-4 py-2 rounded-lg font-bold transition-colors ${
                    isPaid 
                    ? "bg-green-100 text-green-700 border border-green-200" 
                    : "bg-red-50 text-red-600 border border-red-100"
                }`}
            >
                {isPaid ? "PAID ✅" : "UNPAID ❌"}
            </button>
        </div>

        {/* Notes */}
        <div>
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Notes for Student</h2>
            <textarea
                className="w-full border border-slate-200 rounded-xl p-4 min-h-[120px] focus:ring-2 focus:ring-blue-500 outline-none text-slate-800"
                placeholder="Today went well! Remember to check mirrors..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
            />
        </div>
      </div>

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-100 z-40">
        <button
            onClick={saveLesson}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform disabled:opacity-70 disabled:scale-100"
        >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Progress</>}
        </button>
      </div>
    </div>
  );
}
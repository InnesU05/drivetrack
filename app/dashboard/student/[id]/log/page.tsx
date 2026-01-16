"use client";

import { useState, use } from "react"; // <--- Added 'use'
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Loader2 } from "lucide-react";
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

// Note the type change here: params is now a Promise
export default function LogLesson({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params using React.use()
  const { id } = use(params); // <--- This fixes the error
  
  const router = useRouter();
  const supabase = createClient();
  const studentId = id;

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState("");
  const [ratings, setRatings] = useState<Record<string, number>>({});

  const handleRate = (skill: string, value: number) => {
    setRatings((prev) => ({ ...prev, [skill]: value }));
  };

  const saveLesson = async () => {
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      alert("You must be logged in to save.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("lessons").insert({
      student_id: studentId,
      instructor_id: user.id,
      skills_report: ratings,
      notes: notes
    });

    if (error) {
      console.error(error);
      alert("Error saving lesson!");
    } else {
      alert("Lesson Saved!");
      router.push("/dashboard");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-4 flex items-center gap-4">
        <Link href="/dashboard" className="p-2 -ml-2 text-slate-600">
            <ArrowLeft />
        </Link>
        <h1 className="font-bold text-lg text-slate-900">Log Lesson</h1>
      </div>

      <div className="p-4 space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Skill Progress</h2>
          
          {SKILLS.map((skill) => (
            <div key={skill} className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-slate-800">{skill}</span>
                <span className="text-sm font-mono text-slate-400 font-bold">
                  {ratings[skill] || 0}/5
                </span>
              </div>
              <div className="flex justify-center py-3">
                 <StarRating 
                    rating={ratings[skill] || 0} 
                    onRate={(val) => handleRate(skill, val)} 
                 />
              </div>
            </div>
          ))}
        </div>

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

      <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-100">
        <button
            onClick={saveLesson}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
        >
            {loading ? <Loader2 className="animate-spin" /> : <><Save size={20} /> Save Progress</>}
        </button>
      </div>
    </div>
  );
}
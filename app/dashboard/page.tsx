"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Plus, User, ChevronRight, Loader2, QrCode } from "lucide-react";
import { useRouter } from "next/navigation";

type Student = {
  id: string;
  full_name: string;
  email: string;
};

export default function Dashboard() {
  const supabase = createClient();
  const router = useRouter();
  
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [instructorName, setInstructorName] = useState("");

  useEffect(() => {
    async function loadData() {
      // 1. Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login"); 
        return;
      }
      
      setInstructorName(user.user_metadata.full_name || "Instructor");

      // 2. Fetch students linked to this instructor
      const { data } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("instructor_id", user.id)
        .eq("role", "student");

      if (data) {
        setStudents(data);
      }
      setLoading(false);
    }

    loadData();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Top Bar */}
      <header className="bg-white p-6 border-b border-slate-200 shadow-sm sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <div>
             <h1 className="text-2xl font-bold text-slate-900">DriveTrack</h1>
             <p className="text-sm text-slate-500">Hi, {instructorName}</p>
          </div>
          <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
            {instructorName[0]?.toUpperCase()}
          </div>
        </div>
      </header>

      <div className="p-4">
        {/* Action Buttons */}
        <Link 
          href="/dashboard/invite" 
          className="bg-blue-600 text-white p-4 rounded-xl flex items-center justify-between shadow-lg mb-8 active:scale-95 transition-transform"
        >
          <div className="flex items-center gap-3">
             <div className="bg-blue-500 p-2 rounded-lg">
                <QrCode className="text-white" />
             </div>
             <div>
                <h3 className="font-bold">Invite Student</h3>
                <p className="text-xs text-blue-100">Show QR Code</p>
             </div>
          </div>
          <ChevronRight />
        </Link>

        {/* Student List */}
        <h2 className="text-lg font-bold text-slate-900 mb-4 px-1">My Students</h2>
        
        <div className="space-y-3">
          {students.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-xl border border-dashed border-slate-300">
               <p className="text-slate-400">No students yet.</p>
               <p className="text-sm text-slate-300">Invite someone to get started!</p>
            </div>
          ) : (
            students.map((student) => (
              <Link 
                key={student.id} 
                href={`/dashboard/student/${student.id}/log`}
                className="block"
              >
                <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex justify-between items-center active:bg-blue-50 transition-colors">
                  <div className="flex items-center gap-4">
                      <div className="bg-slate-100 h-12 w-12 rounded-full flex items-center justify-center">
                          <User className="text-slate-400" />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 text-lg">{student.full_name}</h3>
                          <p className="text-xs text-slate-500">{student.email}</p>
                      </div>
                  </div>
                  <ChevronRight className="text-slate-300" />
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
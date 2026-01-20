"use client";

import { useEffect, useState, use } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, UserPlus, ArrowRight, AlertTriangle } from "lucide-react"; // Added AlertTriangle
import Link from "next/link";

export default function JoinClass({ params }: { params: Promise<{ instructorId: string }> }) {
  const { instructorId } = use(params);
  const supabase = createClient();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [instructorName, setInstructorName] = useState("");
  const [status, setStatus] = useState<'checking' | 'success' | 'error' | 'conflict'>('checking'); // Added 'conflict'
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function checkInstructor() {
      // 1. Validate the QR Code (Instructor ID)
      const { data: instructor } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", instructorId)
        .single();

      if (!instructor) {
        setStatus("error");
        setErrorMsg("Invalid Invite Link.");
        setLoading(false);
        return;
      }

      setInstructorName(instructor.full_name);
      setLoading(false);
    }
    checkInstructor();
  }, [instructorId]);

  const handleJoin = async () => {
    setLoading(true);
    
    // 1. Check if user is logged in
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        // If no user, send to student signup
        router.push(`/signup/student?ref=${instructorId}`); 
        return;
    }

    // 2. SAFETY CHECK: Fetch their current profile to ensure they aren't an Instructor
    const { data: profile } = await supabase
        .from("profiles")
        .select("role, id")
        .eq("id", user.id)
        .single();

    if (profile?.role === 'instructor') {
        setStatus("conflict"); // Stop! Don't let an instructor become a student.
        setLoading(false);
        return;
    }

    // 3. Link them (Only if they are NOT an instructor)
    const { error } = await supabase
        .from("profiles")
        .update({ 
            instructor_id: instructorId,
            role: 'student' 
        })
        .eq("id", user.id);

    if (error) {
        setStatus("error");
        setErrorMsg("Failed to join class.");
        setLoading(false);
    } else {
        setStatus("success");
        setTimeout(() => router.push("/dashboard"), 2000);
    }
  };

  const handleLogout = async () => {
      await supabase.auth.signOut();
      window.location.reload(); // Refresh to clear state and allow signup
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-50"><Loader2 className="animate-spin text-blue-600" /></div>;

  // --- ERROR STATES ---

  if (status === 'success') return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-green-50">
        <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4"><CheckCircle size={48} /></div>
        <h1 className="text-2xl font-bold text-slate-900">You're in!</h1>
        <p className="text-slate-600 mt-2">Redirecting to your dashboard...</p>
    </div>
  );

  if (status === 'conflict') return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-amber-50">
        <div className="bg-amber-100 p-4 rounded-full text-amber-600 mb-4"><AlertTriangle size={48} /></div>
        <h1 className="text-xl font-bold text-slate-900">You are an Instructor</h1>
        <p className="text-slate-600 mt-2 mb-6 max-w-xs mx-auto text-sm">
            You are currently logged in as an Instructor. You cannot join another class as a student unless you log out first.
        </p>
        <button onClick={handleLogout} className="bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-50">
            Log Out & Create Student Account
        </button>
        <Link href="/dashboard" className="mt-4 block text-blue-600 font-bold text-sm">
            Return to my Dashboard
        </Link>
    </div>
  );

  if (status === 'error') return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-slate-50">
        <h1 className="text-xl font-bold text-red-600">Error</h1>
        <p className="text-slate-600 mt-2">{errorMsg}</p>
        <Link href="/dashboard" className="mt-4 text-blue-600 underline">Go Home</Link>
    </div>
  );

  // --- MAIN VIEW ---

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <UserPlus size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Join Class</h1>
        <p className="text-slate-500 mb-8">
            Do you want to join <strong>{instructorName || "this instructor"}'s</strong> class?
        </p>

        <button 
            onClick={handleJoin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2"
        >
            Yes, Join Class <ArrowRight size={20} />
        </button>
        
        <p className="text-xs text-slate-400 mt-6 font-medium">
            Don't have an account? We'll create one next.
        </p>

        <Link href="/login" className="block mt-4 text-sm font-bold text-blue-600 hover:underline">
            Already have an account? Log In
        </Link>
      </div>
    </div>
  );
}
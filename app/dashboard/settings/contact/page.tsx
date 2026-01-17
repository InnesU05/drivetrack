"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { ArrowLeft, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function ContactSupport() {
  const supabase = createClient();
  const router = useRouter();
  
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        const { error } = await supabase.from('support_messages').insert({
            user_id: user.id,
            email: user.email,
            message: message
        });

        if (!error) {
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 2000); // Redirect after 2s
        } else {
            alert("Error sending message. Please try again.");
        }
    }
    setLoading(false);
  };

  if (success) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white">
              <div className="bg-green-100 p-4 rounded-full text-green-600 mb-4">
                  <CheckCircle size={48} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Message Sent!</h2>
              <p className="text-slate-500 mt-2">We'll get back to you shortly.</p>
          </div>
      )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex items-center gap-4 sticky top-0">
        <Link href="/dashboard" className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full">
            <ArrowLeft />
        </Link>
        <h1 className="font-bold text-lg text-slate-900">Contact Support</h1>
      </div>

      <div className="p-6">
        <p className="text-slate-500 mb-6 text-sm">Having issues? Found a bug? Send us a message directly and we'll check it out.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">How can we help?</label>
                <textarea 
                    required
                    className="w-full h-48 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your issue here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={20} /> Send Message</>}
            </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Star, CheckCircle2 } from "lucide-react";
import StarRating from "@/components/StarRating";

export default function LeaveReview() {
  const supabase = createClient();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
        alert("Please select a star rating.");
        return;
    }
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
        // We will insert this into a new 'app_reviews' table
        const { error } = await supabase.from('app_reviews').insert({
            user_id: user.id,
            rating: rating,
            comment: feedback,
            email: user.email
        });

        if (!error) {
            setSuccess(true);
            setTimeout(() => router.push("/dashboard"), 2500); // Redirect after 2.5s
        } else {
            console.error(error);
            alert("Error submitting review. Please try again.");
        }
    }
    setLoading(false);
  };

  if (success) {
      return (
          <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-white animate-in fade-in zoom-in duration-500">
              <div className="bg-green-100 p-6 rounded-full text-green-600 mb-6 shadow-sm">
                  <CheckCircle2 size={64} />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Thank You!</h2>
              <p className="text-slate-500">Your feedback helps us improve ADIbase.</p>
          </div>
      );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-slate-200 flex items-center gap-4 sticky top-0">
        <Link href="/dashboard/settings" className="p-2 -ml-2 text-slate-600 hover:bg-slate-50 rounded-full">
            <ArrowLeft />
        </Link>
        <h1 className="font-bold text-lg text-slate-900">Leave a Review</h1>
      </div>

      <div className="p-6 max-w-lg mx-auto">
        <div className="text-center mb-8">
            <div className="bg-white w-20 h-20 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-4 text-amber-400">
                <Star size={40} className="fill-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">How are we doing?</h2>
            <p className="text-slate-500 text-sm mt-2">Rate your experience with ADIbase.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            
            {/* Star Rating Input */}
            <div className="flex justify-center py-2">
                <StarRating 
                    rating={rating} 
                    onRate={setRating} 
                />
            </div>
            
            <div className="text-center text-sm font-bold text-slate-400 h-6">
                {rating === 1 && "Terrible 😡"}
                {rating === 2 && "Bad 😞"}
                {rating === 3 && "Okay 😐"}
                {rating === 4 && "Good 🙂"}
                {rating === 5 && "Amazing! 🤩"}
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Anything to add? (Optional)</label>
                <textarea 
                    className="w-full h-32 p-4 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                    placeholder="What features should we add next?"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                />
            </div>

            <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-black text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-transform"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Submit Review"}
            </button>
        </form>
      </div>
    </div>
  );
}
"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;          // Current score (0-5)
  onRate: (r: number) => void; // Function to run when clicked
  disabled?: boolean;      // If true, buttons won't work (for read-only view)
}

export default function StarRating({ rating, onRate, disabled = false }: StarRatingProps) {
  return (
    // Increased gap for easier separation on mobile
    <div className="flex items-center justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => {
        const isLit = star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onRate(star)}
            // Added p-2 for larger touch target area around the star
            // Removed hover effects because they don't work well on touch screens
            className={`focus:outline-none transition-all p-2 rounded-full ${
              disabled ? "cursor-default" : "active:scale-110 active:bg-slate-100"
            }`}
          >
            <Star 
              // Increased size to 48px for extra chunkiness
              size={48} 
              // Using "fill" to make them solid gold instead of just an outline
              className={`${isLit ? "fill-amber-400 text-amber-400 drop-shadow-sm" : "fill-slate-100 text-slate-300"}`} 
              strokeWidth={isLit ? 0 : 1.5} // Removes outline when lit for a cleaner look
            />
          </button>
        );
      })}
    </div>
  );
}
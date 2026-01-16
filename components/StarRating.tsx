"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;          // The actual score for TODAY
  previousRating?: number; // The score from LAST TIME (optional)
  onRate: (r: number) => void;
  disabled?: boolean;
}

export default function StarRating({ rating, previousRating = 0, onRate, disabled = false }: StarRatingProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => {
        // Logic: Is this star lit up by a current selection?
        const isSelected = star <= rating;
        
        // Logic: Is this star lit up by history? (Only show if no current selection made)
        const isGhost = rating === 0 && star <= previousRating;

        return (
          <button
            key={star}
            type="button"
            disabled={disabled}
            onClick={() => onRate(star)}
            className={`focus:outline-none transition-all p-2 rounded-full ${
              disabled ? "cursor-default" : "active:scale-110 active:bg-slate-100"
            }`}
          >
            <Star 
              size={48} 
              className={`
                ${isSelected 
                    ? "fill-amber-400 text-amber-400 drop-shadow-sm" // Solid Gold (Selected)
                    : isGhost 
                        ? "fill-amber-200 text-amber-200 opacity-50" // Faded Ghost (History)
                        : "fill-slate-100 text-slate-300" // Grey (Empty)
                }
              `} 
              strokeWidth={isSelected || isGhost ? 0 : 1.5} 
            />
          </button>
        );
      })}
    </div>
  );
}
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define what a Lesson looks like
type Lesson = {
  id: string; // Added ID for unique keys
  date: string;
  skills_report: Record<string, number> | null;
};

export default function ProgressChart({ lessons }: { lessons: any[] }) {
  // 1. Transform data
  const data = lessons
    .slice() 
    .reverse() 
    .map((lesson: Lesson) => {
      const skills = lesson.skills_report || {};
      
      // Filter out 0s so they don't drag down the average
      const scores = Object.values(skills).filter((s) => typeof s === 'number' && s > 0) as number[];
      
      // If no skills were rated > 0, skip this lesson
      if (scores.length === 0) return null;

      const total = scores.reduce((a, b) => a + b, 0);
      const average = total / scores.length;

      return {
        // We use a unique ID for the key, but display the date
        id: lesson.id,
        date: new Date(lesson.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }),
        score: parseFloat(average.toFixed(1)),
        fullDate: new Date(lesson.date).toLocaleDateString()
      };
    })
    .filter((item) => item !== null); 

  if (data.length < 2) {
    return (
      <div className="h-32 flex items-center justify-center bg-white rounded-xl border border-slate-100 text-slate-400 text-xs mb-6">
        Log 2+ lessons to see the progress graph!
      </div>
    );
  }

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm mb-6">
      <h3 className="font-bold text-slate-700 mb-4 text-xs uppercase tracking-wide">Performance Trend</h3>
      <div className="h-48 w-full -ml-4"> 
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
                dataKey="date" 
                interval={0} // <--- Forces every single point to show, even if dates are the same
                tick={{fontSize: 10, fill: '#94a3b8'}} 
                axisLine={false}
                tickLine={false}
                dy={10}
            />
            <YAxis 
                domain={[0, 5]} 
                hide={true} 
            />
            <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ color: '#64748b', marginBottom: '0.25rem', fontSize: '12px' }}
                // Allows any value to satisfy TypeScript
                formatter={(value: any) => [`${value} Stars`, "Avg Score"]}
            />
            <Line 
                type="monotone" 
                dataKey="score" 
                stroke="#2563eb" 
                strokeWidth={3}
                dot={{ fill: '#2563eb', strokeWidth: 2, r: 4, stroke: '#fff' }}
                activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
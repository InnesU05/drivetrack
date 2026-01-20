"use client";

import { useState } from "react";
import { Check, Loader2, ShieldCheck, Star, ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscribePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  // Simple FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      // 1. Get current user
      const { data: { user } } = await import("@/utils/supabase/client").then(m => m.createClient().auth.getUser());
      
      if (!user) {
        router.push("/login?view=signup");
        return;
      }

      // 2. Call API to create checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          userId: user.id,
          // priceId is handled securely on the server now!
        }),
      });

      const { url } = await response.json();
      if (url) window.location.href = url;
      else alert("Something went wrong. Please try again.");
      
    } catch (error) {
      console.error(error);
      alert("Error starting subscription.");
    } finally {
      setLoading(false);
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Will I be charged today?",
      answer: "No. You have 7 days of full access completely free. We will only charge you £5.99 if you decide to keep using ADIbase after the trial ends."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, absolutely. You can cancel with one click from your settings dashboard. No phone calls, no emails, no hassle."
    },
    {
      question: "What happens to my data if I cancel?",
      answer: "We keep your data safe for 30 days in case you change your mind, after which it is securely deleted. You can also export your student data at any time."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* 1. HERO SECTION */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-700 text-xs font-extrabold uppercase tracking-wide mb-4">
                Early Access Offer
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
                Manage your driving school <br className="hidden md:block"/> like a professional.
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
                Join hundreds of ADIs who use ADIbase to track lessons, manage students, and automate their business—all from their pocket.
            </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8 items-start justify-center">
            
            {/* 2. PRICING CARD */}
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden relative order-1 md:order-2">
                <div className="bg-blue-600 p-2 text-center text-white text-xs font-bold uppercase tracking-widest">
                    Most Popular Choice
                </div>
                <div className="p-8">
                    <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-5xl font-extrabold text-slate-900">£5.99</span>
                        <span className="text-lg text-slate-500 font-medium">/month</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-6">Less than the price of a coffee.</p>

                    <button 
                        onClick={handleSubscribe}
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg mb-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : "Start 7-Day Free Trial"}
                    </button>
                    
                    <p className="text-center text-xs text-slate-400 font-medium flex items-center justify-center gap-1">
                        <ShieldCheck size={14} /> Secure payment via Stripe
                    </p>

                    <div className="my-6 border-t border-slate-100"></div>

                    <ul className="space-y-4">
                        {[
                            "Unlimited Students & Lessons",
                            "Automatic Progress Tracking",
                            "Payment & Finance Logs",
                            "Visual Skills Progress Charts",
                            "Student App Access (Free for them)",
                            "Export Data Anytime"
                        ].map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm font-medium text-slate-700">
                                <div className="bg-green-100 text-green-600 rounded-full p-1">
                                    <Check size={12} strokeWidth={4} /> 
                                </div>
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {/* 3. SOCIAL PROOF & FAQ (Left Column on Desktop) */}
            <div className="w-full max-w-lg order-2 md:order-1 space-y-10 py-4">
                
                {/* Testimonial */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex gap-1 text-amber-400 mb-3">
                        {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                    </div>
                    <p className="text-slate-700 italic mb-4">
                        "I used to use a paper diary and it was a nightmare. ADIbase handles everything for me now. I can't imagine working without it."
                    </p>
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500">
                            JD
                        </div>
                        <div>
                            <p className="text-sm font-bold text-slate-900">James D.</p>
                            <p className="text-xs text-slate-500">ADI for 12 years</p>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Frequently Asked Questions</h3>
                    <div className="space-y-3">
                        {faqs.map((faq, index) => (
                            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full flex items-center justify-between p-4 text-left font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                                >
                                    {faq.question}
                                    {openFaq === index ? <ChevronUp size={18} className="text-slate-400"/> : <ChevronDown size={18} className="text-slate-400"/>}
                                </button>
                                {openFaq === index && (
                                    <div className="p-4 pt-0 text-sm text-slate-500 leading-relaxed border-t border-slate-100 bg-slate-50">
                                        {faq.answer}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>

        {/* 4. FOOTER NOTE */}
        <div className="text-center mt-16 text-slate-400 text-sm">
            <p>© {new Date().getFullYear()} ADIbase. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
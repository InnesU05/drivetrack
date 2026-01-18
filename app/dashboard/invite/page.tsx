"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { ArrowLeft, Copy, Check, QrCode } from "lucide-react";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react"; // We will need to install this tiny library

export default function InvitePage() {
  const supabase = createClient();
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getLink() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        // Create a link to the 'join' page with the instructor's ID
        // Note: window.location.origin gets the current website domain (e.g. localhost or your-site.com)
        const link = `${window.location.origin}/join/${user.id}`;
        setInviteLink(link);
      }
      setLoading(false);
    }
    getLink();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) return <div className="p-6 text-slate-400">Loading invite...</div>;

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center text-center">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-slate-100">
        
        <div className="flex justify-start mb-6">
            <Link href="/dashboard" className="text-slate-400 hover:text-slate-600">
                <ArrowLeft />
            </Link>
        </div>

        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
            <QrCode size={32} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">Invite Student</h1>
        <p className="text-slate-500 mb-8">
            Ask your student to scan this code or open the link to join your class.
        </p>

        {/* QR Code */}
        <div className="bg-white p-4 rounded-xl border-2 border-slate-100 inline-block mb-8 shadow-sm">
             {/* If you haven't installed the library yet, this might error. See instructions below. */}
             {inviteLink && <QRCodeSVG value={inviteLink} size={180} />}
        </div>

        {/* Copy Link Button */}
        <div className="flex gap-2">
            <input 
                readOnly 
                value={inviteLink} 
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 text-sm text-slate-600 outline-none"
            />
            <button 
                onClick={copyToClipboard}
                className={`p-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${copied ? 'bg-green-500 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
            >
                {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
        </div>
      </div>
    </div>
  );
}
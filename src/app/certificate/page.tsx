"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useUser } from "@/context/UserContext";
import { PLATFORM_COURSES } from "@/data/courses";
import { Award, Download, Share2 } from "lucide-react";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function CertificatePage() {
  const { currentUser } = useUser();
  const [name, setName] = useState("");
  const certificateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  if (!currentUser) return null;

  const jsCourse = PLATFORM_COURSES.find(c => c.id === "jsverse");
  const jsEnrollment = currentUser.enrolledCourses.find(c => c.courseId === "jsverse");
  
  const completionPercentage = jsEnrollment ? jsEnrollment.progress : 0;
  const isEligible = completionPercentage === 100;
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const certId = "JSV-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  const handleDownload = () => {
    // In a real app we'd use html2canvas + jsPDF here
    alert("In a full environment, this triggers a PDF download using html2canvas and jsPDF.");
  };

  return (
    <AuthGuard>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4">Your Certificate</h1>
          <p className="text-zinc-400 text-lg">Generate and download your verified {jsCourse?.title} completion certificate.</p>
        </div>

        {!isEligible && (
          <div className="mb-8 p-4 bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 rounded-xl max-w-2xl text-center">
            <strong>Note:</strong> You have only completed {completionPercentage}% of the course. 
            You must complete 100% of the modules to generate an official certificate.
          </div>
        )}

        <div className="w-full max-w-md mb-8">
          <label className="block text-sm font-medium text-zinc-400 mb-2">Print Name on Certificate</label>
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white"
          />
        </div>

        {/* Certificate UI */}
        <motion.div 
          ref={certificateRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-4xl aspect-[1.414/1] bg-[#0a0a0a] relative border-[16px] border-zinc-800 p-12 flex flex-col items-center justify-center text-center overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-500 via-primary to-orange-500" />
          
          <Award className="w-24 h-24 text-primary mb-8" />
          
          <h2 className="text-xl tracking-[0.2em] text-zinc-400 uppercase mb-4">Certificate of Completion</h2>
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-white mb-6">{jsCourse?.title}</h1>
          <p className="text-lg text-zinc-400 mb-8">This is to proudly certify that</p>
          
          <div className="text-4xl md:text-5xl font-bold text-primary mb-8 pb-4 border-b-2 border-white/10 px-12 inline-block">
            {name || "Student Name"}
          </div>
          
          <p className="text-lg text-zinc-300 max-w-2xl mx-auto mb-12">
            has successfully completed {completionPercentage}% of the comprehensive JavaScript Mastery Syllabus, 
            demonstrating exceptional skills in modern web development, algorithms, and application architecture.
          </p>
          
          <div className="flex justify-between w-full mt-auto pt-8 border-t border-white/10 px-12">
            <div className="text-left">
              <div className="text-sm text-zinc-500 mb-1">Date</div>
              <div className="font-bold">{dateStr}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-zinc-500 mb-1">Certificate ID</div>
              <div className="font-mono font-bold text-zinc-300">{certId}</div>
            </div>
          </div>
        </motion.div>

        <div className="flex gap-4 mt-12">
          <button 
            onClick={handleDownload}
            disabled={!isEligible}
            className="flex items-center px-8 py-4 bg-primary text-black font-bold rounded-lg hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_4px_rgba(247,223,30,0.2)]"
          >
            <Download className="mr-2 w-5 h-5" /> Download PDF
          </button>
          <button 
            disabled={!isEligible}
            className="flex items-center px-8 py-4 glass text-white font-bold rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 border border-white/10"
          >
            <Share2 className="mr-2 w-5 h-5" /> Share
          </button>
        </div>
      </div>
    </AuthGuard>
  );
}

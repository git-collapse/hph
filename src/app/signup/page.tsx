"use client";

import { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { Lock, Mail, User } from "lucide-react";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { signup } = useUser();
  const router = useRouter();

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (signup(name, email)) {
      router.push("/dashboard");
    } else {
      setError("An account with this email already exists.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card p-8 rounded-3xl w-full max-w-md border border-white/10 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-green-500" />
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold mb-2">Create Account</h1>
          <p className="text-zinc-400">Join the ultimate learning platform.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl focus:outline-none focus:border-primary text-white transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-zinc-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
              <input 
                type="password" 
                value="password123" // Mock password
                readOnly
                className="w-full pl-10 pr-4 py-3 bg-black/50 border border-white/10 rounded-xl text-zinc-500 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-zinc-500 mt-2">Passwords are disabled for this prototype.</p>
          </div>

          {error && <p className="text-red-400 text-sm font-bold">{error}</p>}

          <button type="submit" className="w-full py-3 bg-primary text-black font-bold rounded-xl hover:bg-yellow-400 transition-colors">
            Sign Up
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-8">
          Already have an account? <Link href="/login" className="text-primary hover:underline font-bold">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}

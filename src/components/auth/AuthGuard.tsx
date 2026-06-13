"use client";

import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    // If not loaded from local storage yet, the state might be empty initially.
    // In a real app we'd wait for an isLoaded flag from context.
    // For this prototype, if after initial render currentUser is null, we redirect.
    const timer = setTimeout(() => {
      if (!currentUser) {
        router.push("/login");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentUser, router]);

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { currentUser } = useUser();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!currentUser || currentUser.role !== "admin") {
        router.push("/");
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [currentUser, router]);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}

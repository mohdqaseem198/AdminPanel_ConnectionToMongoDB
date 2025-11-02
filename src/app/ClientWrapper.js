"use client";
import { useEffect, useState } from "react";

export default function ClientWrapper({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    console.log("ClientWrapper mounted ✅");
    setMounted(true);
  }, []);

  // ❌ Don't render "Mounting..." during SSR
  // ✅ Return null so SSR and first client render match exactly
  if (!mounted) return null;

  return children;
};
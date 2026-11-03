"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Header and footer are hidden on the standalone ad landing page and thank-you page. */
export default function Chrome({ children }: { children: ReactNode }) {
  const path = usePathname() || "/";
  if (path.startsWith("/landing-page") || path.startsWith("/thank-you")) return null;
  return <>{children}</>;
}

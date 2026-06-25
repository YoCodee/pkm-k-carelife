"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function useFocusOnNavigation() {
  const pathname = usePathname();

  useEffect(() => {
    // Memberikan jeda mikrosekon untuk memastikan DOM baru telah dirender sepenuhnya
    const timeoutId = setTimeout(() => {
      const mainContent = document.getElementById("main-content");
      if (mainContent) {
        mainContent.setAttribute("tabIndex", "-1");
        mainContent.focus();
        mainContent.removeAttribute("tabIndex"); // Mengembalikan integritas DOM alami
        window.scrollTo({ top: 0, behavior: "instant" });
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);
}

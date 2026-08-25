"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

/** Shown once per visit; dismissing or submitting keeps it away until a new tab. */
const FLAG = "rb_lead_popup_shown";

/**
 * Opens the booking modal once the visitor scrolls below the fold — a full
 * viewport height down the page — to gather contact info from people who are
 * engaged enough to be reading, without ambushing the ones who just arrived.
 *
 * Ignores scrolling while the loading screen is still up, shows once per
 * visit, and is skipped on the contact page, which already is a form.
 */
export default function LeadPopup() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/contact") return;

    try {
      if (sessionStorage.getItem(FLAG) === "1") return;
    } catch {
      // Private browsing can throw on storage access; without the cap the
      // popup would nag on every page, so show nothing instead.
      return;
    }

    const onScroll = () => {
      if (window.scrollY < window.innerHeight) return;
      if (document.querySelector('div[class*="z-[9999]"]')) return;
      window.removeEventListener("scroll", onScroll);
      try {
        sessionStorage.setItem(FLAG, "1");
      } catch {}
      setOpen(true);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return <BookingModal isOpen={open} onClose={() => setOpen(false)} />;
}

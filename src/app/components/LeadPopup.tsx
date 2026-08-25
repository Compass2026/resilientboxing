"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import BookingModal from "./BookingModal";

/** Shown once per visit; dismissing or submitting keeps it away until a new tab. */
const FLAG = "rb_lead_popup_shown";

/** Seconds on the page before the popup appears. */
const DELAY_MS = 3000;

/**
 * Opens the booking modal on its own a few seconds into the visit, to gather
 * contact info from visitors who would otherwise browse and leave.
 *
 * Waits out the loading screen where one is running, so the countdown starts
 * from the moment the visitor can actually see the site. Skipped on the
 * contact page — a popup form over a contact form helps nobody.
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

    let poll: ReturnType<typeof setInterval> | undefined;
    const timer = setTimeout(() => {
      poll = setInterval(() => {
        const loadingScreenUp = document.querySelector('div[class*="z-[9999]"]');
        if (!loadingScreenUp) {
          clearInterval(poll);
          try {
            sessionStorage.setItem(FLAG, "1");
          } catch {}
          setOpen(true);
        }
      }, 400);
    }, DELAY_MS);

    return () => {
      clearTimeout(timer);
      if (poll) clearInterval(poll);
    };
  }, [pathname]);

  return <BookingModal isOpen={open} onClose={() => setOpen(false)} />;
}

"use client";

import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // We cannot read HttpOnly cookies → ask backend instead
    const checkConsent = async () => {
      try {
        const res = await fetch("/api/cookie/check");
        const data = await res.json();

        if (!data.accepted) {
          setShow(true);
        }
      } catch (e) {
        setShow(true); // fallback
      }
    };

    checkConsent();
  }, []);

  const accept = async () => {
    await fetch("/api/cookie/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accepted: true }),
    });

    setShow(false);
  };

  const decline = async () => {
    await fetch("/api/cookie/consent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accepted: false }),
    });

    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-0 right-0 flex justify-center z-50">
      <div className="bg-gray-900 text-white border border-gray-700 p-4 rounded-xl w-[90%] max-w-lg shadow-xl">
        <p className="text-sm mb-3">
          We use essential cookies to improve your experience. Read our 
          <a href="/privacy-policy" className="text-blue-400 underline ml-1">
            Cookies Policy
          </a>.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={decline}
            className="px-4 py-1 rounded bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Decline
          </button>

          <button
            onClick={accept}
            className="px-4 py-1 rounded bg-blue-600 hover:bg-blue-500 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

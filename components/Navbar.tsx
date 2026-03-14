"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";

interface NavLink {
  name: string;
  href: string;
  dropdown?: { name: string; href: string }[];
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
};

// Initialize Firebase safely
let app: any = null;
try {
  if (getApps().length === 0) {
    if (!firebaseConfig.apiKey) {
      console.error("Firebase API key missing. Set NEXT_PUBLIC_FIREBASE_API_KEY.");
    } else {
      app = initializeApp(firebaseConfig);
    }
  } else {
    app = getApps()[0];
  }
} catch (e) {
  console.error("Firebase init error:", e);
}

const auth = app ? getAuth(app) : null;
const provider = new GoogleAuthProvider();
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export default function Navbar() {
  const pathname = usePathname();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [lifeOpen, setLifeOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    {
      name: "About Us",
      href: "#",
      dropdown: [
        { name: "Mission & Vision", href: "/about/mission-and-vision" },
        { name: "Achievements", href: "/about/achievements" },
      ],
    },
    { name: "Products", href: "/products" },
    { name: "Courses", href: "/courses" },
    {
      name: "Media",
      href: "#",
      dropdown: [
        { name: "Blogs", href: "/media/blogs" },
        { name: "FAQ", href: "/media/faq" },
      ],
    },
    {
      name: "Life at Hyosene",
      href: "#",
      dropdown: [
        { name: "Workplace", href: "/life-at-hyosene" },
        { name: "Career", href: "/career" },
      ],
    },
    { name: "Contact Us", href: "/contact" },
  ];

  // Check server session on mount
  useEffect(() => {
    (async function checkSession() {
      try {
        const res = await fetch(`${BACKEND_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        const json = await res.json();
        if (res.ok && json?.user) {
          setUser({
            uid: json.user.uid,
            email: json.user.email,
          } as any);
        }
      } catch (e) {
        // ignore
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  // Track Firebase user state
  useEffect(() => {
    if (!auth) {
      setIsAuthLoading(false);
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    if (!auth) {
      alert("Authentication not configured.");
      return;
    }
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const idToken = await firebaseUser.getIdToken();

      const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ firebaseToken: idToken }),
      });

      const data = await res.json();
      if (!res.ok || !data?.ok) {
        console.error("Server login failed:", data);
        alert("Login failed. Try again or contact support.");
        return;
      }

      setUser(firebaseUser);
    } catch (err: any) {
      console.error("Google sign-in failed:", err);
      alert("Sign-in failed. Please try again.");
    }
  };

  const handleSignOut = async () => {
    try {
      if (auth) await signOut(auth);
    } catch (e) {
      console.error("Firebase signOut error", e);
    }

    try {
      await fetch(`${BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (e) {
      // ignore
    }

    setUser(null);
  };

  return (
    <nav className="bg-[#0b0b0d]/90 backdrop-blur-md text-white fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center px-6 py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logohyosene.jpg" alt="Hyosene Logo" className="h-8 w-40" />
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 md:gap-10 text-sm md:text-base relative">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="relative">
                {/* Dropdown Button */}
                <button
                  onClick={() => {
                    if (link.name === "About Us") {
                      setAboutOpen(!aboutOpen);
                      setLifeOpen(false);
                      setMediaOpen(false);
                    } else if (link.name === "Life at Hyosene") {
                      setLifeOpen(!lifeOpen);
                      setAboutOpen(false);
                      setMediaOpen(false);
                    } else if (link.name === "Media") {
                      setMediaOpen(!mediaOpen);
                      setAboutOpen(false);
                      setLifeOpen(false);
                    }
                  }}
                  className={`transition-colors ${
                    (link.name === "About Us" && pathname.startsWith("/about")) ||
                    (link.name === "Life at Hyosene" &&
                      (pathname.startsWith("/life-at-hyosene") ||
                        pathname.startsWith("/career"))) ||
                    (link.name === "Media" && pathname.startsWith("/media"))
                      ? "text-[#69aefc] font-semibold border-b-2 border-[#69aefc] pb-1"
                      : "text-gray-300 hover:text-[#69aefc]"
                  }`}
                >
                  {link.name}
                </button>

                {/* Dropdown Menu */}
                {((link.name === "About Us" && aboutOpen) ||
                  (link.name === "Life at Hyosene" && lifeOpen) ||
                  (link.name === "Media" && mediaOpen)) && (
                  <div className="absolute top-full left-0 mt-2 bg-[#0b0b0d] border border-gray-700 rounded shadow-lg py-2 w-48 z-50">
                    {link.dropdown.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => {
                          setAboutOpen(false);
                          setLifeOpen(false);
                          setMediaOpen(false);
                        }}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          pathname === item.href
                            ? "text-[#69aefc] font-semibold"
                            : "text-gray-300 hover:text-[#69aefc]"
                        }`}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? "text-[#69aefc] font-semibold border-b-2 border-[#69aefc] pb-1"
                    : "text-gray-300 hover:text-[#69aefc]"
                }`}
              >
                {link.name}
              </Link>
            )
          )}
        </div>

        {/* Desktop Auth Section */}
        <div className="hidden md:flex items-center gap-4">
          {!isAuthLoading && (
            user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-300">
                  Hi, {String((user as any).displayName || (user as any).email)}
                </span>
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={handleGoogleSignIn}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm"
              >
                Sign In with Google
              </button>
            )
          )}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-gray-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0b0b0d] border-t border-gray-700 w-full">
          <div className="flex flex-col gap-1 px-4 py-2">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name}>
                  {/* Dropdown Button */}
                  <button
                    className="w-full text-left py-2 px-2 text-gray-300 hover:text-[#69aefc] font-medium flex justify-between items-center"
                    onClick={() => {
                      if (link.name === "About Us") {
                        setAboutOpen(!aboutOpen);
                        setLifeOpen(false);
                        setMediaOpen(false);
                      } else if (link.name === "Life at Hyosene") {
                        setLifeOpen(!lifeOpen);
                        setAboutOpen(false);
                        setMediaOpen(false);
                      } else if (link.name === "Media") {
                        setMediaOpen(!mediaOpen);
                        setAboutOpen(false);
                        setLifeOpen(false);
                      }
                    }}
                  >
                    {link.name}
                    <span>
                      {((link.name === "About Us" && aboutOpen) ||
                        (link.name === "Life at Hyosene" && lifeOpen) ||
                        (link.name === "Media" && mediaOpen))
                        ? "▲"
                        : "▼"}
                    </span>
                  </button>

                  {/* Mobile Dropdown Menu */}
                  {((link.name === "About Us" && aboutOpen) ||
                    (link.name === "Life at Hyosene" && lifeOpen) ||
                    (link.name === "Media" && mediaOpen)) && (
                    <div className="flex flex-col pl-4">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => {
                            setAboutOpen(false);
                            setLifeOpen(false);
                            setMediaOpen(false);
                            setMobileOpen(false);
                          }}
                          className={`py-2 px-2 text-sm transition-colors ${
                            pathname === item.href
                              ? "text-[#69aefc] font-semibold"
                              : "text-gray-300 hover:text-[#69aefc]"
                          }`}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 px-2 text-gray-300 hover:text-[#69aefc] transition-colors ${
                    pathname === link.href ? "text-[#69aefc] font-semibold" : ""
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            {/* Mobile Auth Section */}
            <div className="border-t border-gray-700 mt-4 pt-4">
              {!isAuthLoading && (
                user ? (
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-300">
                      Hi, {String((user as any).displayName || (user as any).email)}
                    </span>
                    <button
                      onClick={() => {
                        handleSignOut();
                        setMobileOpen(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-white text-sm w-full"
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      handleGoogleSignIn();
                      setMobileOpen(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-white text-sm w-full"
                  >
                    Sign In with Google
                  </button>
                )
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Navbar from "../components/Navbar";
import { Monitor, Clock, Users, Award } from "lucide-react";
import RazorpayPaymentModal from "./RazorpayPaymentModal";
import { initializeApp, getApps } from "firebase/app";
import Link from "next/link";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  User,
} from "firebase/auth";
import { getDatabase, ref, set, get, child } from "firebase/database";

/*
  NOTE: security changes only — UI untouched.
  Backend URL placeholder (replace in .env):
  NEXT_PUBLIC_BACKEND_URL=https://api.yourbackend.com
*/
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

// Firebase configuration (unchanged)
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

// Initialize Firebase safely (avoid double init in dev)
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

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

/* -------------------------
   Small helpers (sanitization)
   ------------------------- */
function sanitizeText(s: unknown, max = 200) {
  return String(s ?? "").replace(/<\/?[^>]+(>|$)/g, "").trim().slice(0, max);
}
function parsePrice(price: unknown) {
  const n = String(price ?? "").replace(/[^\d]/g, "");
  const v = Number(n || 0);
  return Number.isFinite(v) ? v : 0;
}

/* -------------------------
   Component
   ------------------------- */
export default function StemCourses() {
  const [typedText, setTypedText] = useState("");
  const [count, setCount] = useState(0);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const fullText = "Launch Your Aerospace Journey";

  // Typing effect (unchanged)
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typing);
      }
    }, 80);
    return () => clearInterval(typing);
  }, []);

  // Count-up (unchanged)
  useEffect(() => {
    let n = 0;
    const interval = setInterval(() => {
      if (n <= 18) {
        setCount(n);
        n++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  // Track Firebase user and read enrolled courses from RTDB
  useEffect(() => {
    if (!auth) return;
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      if (u) {
        setUser(u);
        try {
          const db = getDatabase(app);
          const snapshot = await get(child(ref(db), `enrollments/${u.uid}`));
          if (snapshot.exists()) {
            const courses = Object.keys(snapshot.val());
            setEnrolledCourses(courses);
          } else {
            setEnrolledCourses([]);
          }
        } catch (err) {
          console.error("Error loading enrolled courses:", err);
          setEnrolledCourses([]);
        }
      } else {
        setUser(null);
        setEnrolledCourses([]);
      }
    });
    return () => unsubscribe();
  }, []);

  // Enrollment click (unchanged UI) — small sanitization
  const handleEnrollClick = (course: any) => {
    if (!user) {
      alert("Please sign in to enroll in a course. Use the Sign In button in the navigation bar.");
      return;
    }

    // Light validation of course object
    if (!course || typeof course.title !== "string") {
      alert("Invalid course selected.");
      return;
    }

    setSelectedCourse(course);
    setIsPaymentModalOpen(true);
  };

  /* -------------------------
     🔐 After successful client-side Razorpay payment:
     - Do NOT write enrollment directly from client.
     - Instead, call backend verify endpoint which:
         * validates signature
         * validates order amount matches DB price
         * writes enrollment server-side (using Admin SDK)
     - Here we call backend /api/razorpay/verify-payment with credentials included.
     ------------------------- */
  const handlePaymentSuccess = async (orderDetails: any) => {
    if (!selectedCourse || !user) return;

    try {
      // Basic sanity-check of order details
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = orderDetails || {};
      if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
        console.error("Invalid payment details", orderDetails);
        alert("Payment data missing. Contact support.");
        return;
      }

      // Sanitize course id and price before sending to backend
      const courseId = sanitizeText(selectedCourse.id || selectedCourse.title);
      const courseTitle = sanitizeText(selectedCourse.title);
      const amount = parsePrice(selectedCourse.price); // integer rupees

      // Call backend verify endpoint which will:
      //  - verify signature using server secret
      //  - check amount/course validity from DB
      //  - write enrollment via admin SDK (secure)
      const csrfToken = Cookies.get("XSRF-TOKEN");
      const res = await fetch(`/api/razorpay/verify-payment`, {
        method: "POST",
        credentials: "include", // send HttpOnly cookie for authentication
        headers: { "Content-Type": "application/json", "X-CSRF-Token": csrfToken ?? " " },
        body: JSON.stringify({
          razorpay_order_id,
          razorpay_payment_id,
          razorpay_signature,
          courseId,
          courseTitle,
          amount,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json?.success) {
        console.error("Payment verification failed", json);
        alert("Payment verification failed. Contact support if you were charged.");
        return;
      }

      // On success — refresh enrolled courses from RTDB (read-only)
      try {
        const db = getDatabase(app);
        const snapshot = await get(child(ref(db), `enrollments/${user.uid}`));
        if (snapshot.exists()) {
          setEnrolledCourses(Object.keys(snapshot.val()));
        } else {
          setEnrolledCourses([]);
        }
      } catch (err) {
        console.error("Error refreshing enrollments:", err);
      }

      console.log("✅ Enrollment confirmed by backend");
    } catch (err) {
      console.error("handlePaymentSuccess error:", err);
      alert("An error occurred while completing enrollment. Contact support.");
    }
  };

  /* -------------------------
     RENDER (UI unchanged)
     ------------------------- */
  return (
    <div className="bg-[#0b0b0d] text-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full bg-white">
        <div
          className="relative w-full h-[150px] sm:h-[200px] md:h-[250px] lg:h-[250px] bg-contain md:bg-cover bg-center bg-no-repeat flex items-center"
          style={{ backgroundImage: "url('/header.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/0"></div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="relative z-10 text-left pl-6 md:pl-20"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white">Courses</h1>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        custom={0}
        className="text-center py-12 px-6"
      >
        <h2 className="text-5xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
          {typedText}
        </h2>
        <p className="mt-4 text-gray-300 max-w-2xl mx-auto">
          Online STEM courses for students in Grades 6–10. Master rockets, drones, aircraft design, and space science from home!
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <a href="#catalog" className="bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-white px-6 py-3 rounded-lg inline-block hover:opacity-90">
            Explore Courses
          </a>
        </div>

        <div className="flex flex-wrap justify-center gap-10 mt-10 text-gray-300 text-lg">
          <motion.div variants={fadeUp} custom={1}>
            <p className="text-2xl font-semibold text-white">{count}+</p>
            <p>Courses Available</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={2}>
            <p className="text-2xl font-semibold text-white">100%</p>
            <p>Online Learning</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={3}>
            <p className="text-2xl font-semibold text-white">10–30</p>
            <p>Days Duration</p>
          </motion.div>
          <motion.div variants={fadeUp} custom={4}>
            <p className="text-2xl font-semibold text-white">₹599</p>
            <p>Starting Price</p>
          </motion.div>
        </div>
      </motion.section>

      {/* Courses */}
      <CourseSection
        id="catalog"
        title="Introductory Level"
        description="10 Days Online STEM Mini Courses — designed to spark curiosity and hands-on learning."
        courses={[
          {
            title: "Flight Fundamentals & Paper Glider Physics",
            price: "₹599",
            desc: "Lift, drag, thrust with simple paper experiments.",
            duration: "10 days × 1.5hr",
            project: "Understand flight basics + hands-on creativity",
            level: "Introductory",
          },
          {
            title: "Rocket Science at Home",
            price: "₹699",
            desc: "Propulsion & Newton's laws using household demos.",
            duration: "10 days",
            project: "Build curiosity in rocketry & space physics",
            level: "Introductory",
          },
          {
            title: "Drone Basics & Aerodynamic Simulation",
            price: "₹899",
            desc: "Drone parts, stability, and online flight simulator",
            duration: "10 days",
            project: "Intro to modern UAV tech + control concepts",
            level: "Introductory",
          },
           {
            title: "Science Behind Weather & Flight",
            price: "₹599",
            desc: "Atmospheric Pressure,turbulence,impact on flight",
            duration: "10 days x 1.5hr",
            project: "Links environment + aviation science ",
            level: "Introductory",
          },
        ]}
        bg="url('/course3.jpg')"
        enrolledCourses={enrolledCourses}
        onEnrollClick={handleEnrollClick}
      />
      {/* Intermediate Level */}
      <CourseSection
        title="Intermediate Level"
        description="15-day courses with exciting mini-projects. Learn 3D design, coding basics, and real aviation systems."
        courses={[
          {
            title: "Design Your Own Mini Aircraft (3D Virtual)",
            price: "₹799",
            desc: "3D design in TinkerCAD + airfoil visualization",
            duration: "15 days × 1.5hr",
            project: "Creates a virtual aircraft + learns geometry & physics",
            level: "Intermediate",
          },
          {
            title: "Drone Simulation & Control Workshop",
            price: "₹999",
            desc: "Virtual drone flying & control logic.",
            duration: "15 days",
            project: "Encourages STEM interest + space career focus",
            level: "Intermediate",
          },
          {
            title: "Space Mission & Rocket Launch Principle",
            price: "₹799",
            desc: "Rocket staging,orbit path,Satellite demo",
            duration: "15 days",
            project: "Encourages STEM interest + space career focus",
            level: "Intermediate",
          },
            {
            title: "Weather Sensor & Data Science Basics",
            price: "₹899",
            desc: "Virtual IoT sensor build + data graphing",
            duration: "15 days",
            project: "Encourages STEM interest + space career focus",
            level: "Intermediate",
          },
               {
            title: "Inside a Aircraft(Virtual Tour Series)",
            price: "₹899",
            desc: "VCockpit systems, engines,and aero controls",
            duration: "15 days x 1.5 hr",
            project: "Visual learning of real aviation systems",
            level: "Intermediate",
          },
        ]}
        bg="url('/course4.jpg')"
        enrolledCourses={enrolledCourses}
        onEnrollClick={handleEnrollClick}
      />

      {/* Advanced Level */}
      <CourseSection
        title="Advanced Level"
        description="Master complex concepts and create real-world projects that showcase your innovation and engineering skills"
        courses={[
          {
            title: "Virtual RC Aircraft Design Project",
            price: "₹1299",
            desc: "Full aircraft design to simulation",
            duration: "20 days × 1.5hr",
            project: "Creates virtual aircraft + learns geometry & physics",
            level: "Advanced",
          },
          {
            title: "Drone Fabrication & Autonomous Systems(Virtual)",
            price: "₹1499",
            desc: "Full aircraft design to simulation",
            duration: "30 x 1.5hr days",
            project: "Creates a virtual aircraft + learns geometry & physics",
            level: "Advanced",
          },
          {
            title: "Space Science & Satellite Modelling",
            price: "₹1199",
            desc: "Orbits, satellite design communication demo ",
            duration: "30 days x 1.5hr",
            project: "Combines physics,math & engineering",
            level: "Advanced",
          },
          {
            title: "Wind Tunnel & Aerodynamics simulation,lab",
            price: "₹1199",
            desc: "Virtuals testing of airfoils and data plotting ",
            duration: "30 days x 1.5hr",
            project: "Real-lab data interpretation skills",
            level: "Advanced",
          },
              {
            title: "Aircraft Innovation & Enterpreneurship Camp",
            price: "₹1099",
            desc: "Design thinking + aerospace startup pitch",
            duration: "30 days x 1.5hr",
            project: "Builds leadership,innovation & presentation skills",
            level: "Advanced",
          },
        ]}
        bg="url('/course5.jpg')"
        enrolledCourses={enrolledCourses}
        onEnrollClick={handleEnrollClick}
      />

      {/* Razorpay Modal */}
      <RazorpayPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        courseTitle={selectedCourse?.title || ""}
        courseId={selectedCourse?.title || ""}
        amount={parseInt(selectedCourse?.price.replace(/[^\d]/g, ""), 10) || 0}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* ---------- FOOTER ---------- */}
         <footer className="bg-gray-950 py-10 text-gray-400 text-center md:text-left px-8 md:px-16">
  <div className="flex flex-col md:flex-row justify-between items-start md:items-stretch gap-6 md:gap-8">
    
    <div className="md:w-1/3">
      <h4 className="font-semibold mb-2" style={gradientTextStyle}>
        HYOSENE BATTERY
      </h4>
      <p className="text-sm">
        Pioneering graphene-based energy solutions for the future of aerospace
        and drone technology. Research-driven innovation for tomorrow’s flight
        systems.
      </p>
    </div>

    <div className="md:w-1/4">
      <h4 className="font-semibold mb-2" style={gradientTextStyle}>
        COMPANY
      </h4>

      <ul className="space-y-1 text-sm">
        <li>
          <Link
            href="/about/achievements"
            className="text-gray-400 hover:text-[#69aefc] transition-colors duration-200"
          >
            About Us
          </Link>
        </li>
        <li>
          <Link
            href="/career"
            className="text-gray-400 hover:text-[#69aefc] transition-colors duration-200"
          >
            Careers
          </Link>
        </li>

        <li>
          <Link
            href="/contact"
            className="text-gray-400 hover:text-[#69aefc] transition-colors duration-200"
          >
            Contact Us
          </Link>
        </li>
      </ul>
    </div>

  </div>

  <p className="text-xs text-gray-500 mt-8 text-center">
    © 2024 Hyosene Battery Pvt. Ltd. All rights reserved. | Confidential
    Research Technology
  </p>
</footer>
    </div>
  );
}

// CourseSection component unchanged (UI preserved)
function CourseSection({
  id,
  title,
  description,
  courses,
  bg,
  enrolledCourses,
  onEnrollClick,
}: any) {
  return (
    <motion.section
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ amount:0.2 }}
      variants={fadeUp}
      custom={0}
      className="bg-contain md:bg-cover bg-center bg-no-repeat py-16 px-6"
      style={{ backgroundImage: bg } as any}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
          {title}
        </h2>
        <p className="text-gray-300 mt-2 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {courses.map((course: any, i: number) => {
          const isEnrolled = enrolledCourses.includes(course.title);

          return (
            <motion.div
              key={i}
              variants={fadeUp}
              custom={i + 1}
              className="relative border border-[#002479]/70 bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] rounded-2xl p-6 shadow-[0_0_20px_#00247933] hover:shadow-[0_0_25px_#7EC3E6] transition-all hover:scale-105"
            >
              <div className="flex justify-between items-center mb-4">
                <span className="bg-[#222] px-3 py-1 rounded-full text-xs text-gray-300 border border-[#333]">
                  {course.level}
                </span>
                <span className="text-transparent bg-clip-text bg-[#7EC3E6] font-semibold text-lg">
                  {course.price}
                </span>
              </div>

              <h4 className="text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-lg font-semibold mb-2 leading-snug">
                {course.title}
              </h4>
              <p className="text-gray-300 text-sm mb-3">{course.desc}</p>

              <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                <span>{course.duration}</span>
                <span className="text-transparent bg-clip-text bg-[#7EC3E6] font-medium">
                  {course.price}
                </span>
              </div>

              <div className="border-t border-[#7EC3E6]/40 my-3"></div>

              <p className="text-gray-300 text-sm mb-4">{course.project}</p>

              <button
                onClick={() => !isEnrolled && onEnrollClick({ ...course, id: course.title })}
                disabled={isEnrolled}
                className={`w-full font-medium py-2 rounded-full transition ${
                  isEnrolled
                    ? "bg-green-500/20 border border-green-500/50 text-green-400 cursor-default"
                    : "bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-white hover:opacity-90"
                }`}
              >
                {isEnrolled ? "✓ Enrolled" : "Enroll Now"}
              </button>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { motion } from "framer-motion";
import { FaYoutube, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import Link from "next/link";

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

const slideInLeft = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
};

export default function ContactPage(){
  const [formData, setFormData] = useState({
    full_name: "",
    country: "",
    email: "",
    phone: "",
    job_title: "",
    company: "",
    message: "",
  });

  const [isHuman, setIsHuman] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [csrfToken, setCsrfToken] = useState<string>("");

  // Fetch CSRF token on component mount
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/csrf-token`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();
        if (data.csrfToken) {
          setCsrfToken(data.csrfToken);
          console.log("CSRF token fetched and stored successfully");
        } else {
          console.error("CSRF token not in response:", data);
        }
      } catch (error) {
        console.error("Failed to fetch CSRF token:", error);
      }
    };
    fetchCsrfToken();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isHuman) {
      alert("Please confirm you're not a robot.");
      return;
    }

    setSubmitting(true);
    try {
      // Debug: Log the token to verify it's available
      console.log("CSRF Token from state:", csrfToken ? "Found" : "Missing");
      
      if (!csrfToken) {
        alert("⚠️ Security token missing. Please refresh the page and try again.");
        setSubmitting(false);
        return;
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        credentials: "include",
        body: JSON.stringify({ ...formData, is_human: isHuman}),
      });

      let result: any = null;
      try {
        result = await res.json();
      } catch {
        // ignore parse errors
      }

      if (res.ok && result?.ok !== false) {
        alert("✅ Message submitted successfully!");
        setFormData({
          full_name: "",
          country: "",
          email: "",
          phone: "",
          job_title: "",
          company: "",
          message: "",

        });
        setIsHuman(false);
      } else {
       const msg = result?.error ?? "Please sign up/login to continue";
alert("❌ " + msg);
      }
    } catch (unknownErr) {
      const errMsg = unknownErr instanceof Error ? unknownErr.message : String(unknownErr);
      console.error("Submit error:", errMsg);
      alert("❌ Network or server error: " + errMsg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="bg-[#020b18] text-white min-h-screen font-sans">
      {/* HERO */}
      <section
        className="relative bg-contain md:bg-cover bg-center bg-no-repeat h-[35vh] flex items-center justify-start px-10 md:px-20"
        style={{ backgroundImage: "url('/header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/10" />
        <motion.h1 variants={fadeUp} initial="hidden" animate="visible"
          className="relative z-10 text-5xl md:text-6xl font-bold text-white bg-clip-text text-transparent">
          Contact Us
        </motion.h1>
      </section>

      {/* FORM */}
      <motion.section variants={slideInLeft} initial="hidden" whileInView="visible" viewport={{ once: true }}
        className="py-20 px-6 md:px-20">
        <div className="max-w-5xl mx-auto bg-black rounded-2xl p-10 shadow-lg border border-gray-800">
          <h2 className="text-4xl font-semibold text-center mb-10 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent">
            Get in Touch
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit} >
            <input name="full_name" type="text" placeholder="Full Name" className="input-field"
              value={formData.full_name} onChange={handleChange} required />
            <input name="country" type="text" placeholder="Country" className="input-field"
              value={formData.country} onChange={handleChange} />
            <input name="email" type="email" placeholder="Email ID" className="input-field"
              value={formData.email} onChange={handleChange} required />
            <input name="phone" type="tel" placeholder="Phone No" className="input-field"
              value={formData.phone} onChange={handleChange} />
           <select
  name="job_title"
  className="input-field bg-[#020b18] text-white"
  value={formData.job_title}onChange={handleChange}
>
  <option value="">Select Job Title</option>
  <option value="Student">Student</option>
  <option value="Researcher">Researcher</option>
  <option value="Engineer">Engineer</option>
  <option value="Professor">Professor</option>
  <option value="Founder / CEO">Founder / CEO</option>
  <option value="Investor">Investor</option>
  <option value="Other">Other</option>
</select>

            <input name="company" type="text" placeholder="Company" className="input-field"
              value={formData.company} onChange={handleChange} />
            <textarea name="message" placeholder="Your Message (5+ characters)" rows={6}
              className="md:col-span-2 input-field resize-none h-36"
              value={formData.message} onChange={handleChange} />

            <label className="flex items-center gap-2 mt-4 md:col-span-2">
              <input id="robotCheck" type="checkbox" className="accent-[#7EC3E6] scale-110"
                checked={isHuman} onChange={(e) => setIsHuman(e.target.checked)} />
              <span className="font-medium text-gray-200">I’m not a robot</span>
            </label>

            <div className="md:col-span-2 text-center mt-6">
              <button id="submitBtn" type="submit" className="gradient-button"
                disabled={!isHuman || submitting} aria-disabled={!isHuman || submitting}>
                {submitting ? "SENDING..." : "SUBMIT"}
              </button>
            </div>
          </form>
        </div>
      </motion.section>

      {/* CONTACT DETAILS & FOOTER (unchanged) */}
      <section className="bg-black py-16 px-8 md:px-20 border-t border-gray-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent">
              Contact Details
            </h3>
            <p className="text-gray-400 mb-6">Follow for regular news, media, and updates</p>
            <div className="flex items-center gap-6 text-xl">
              {[{ icon: <FaYoutube />, link: "/contact" }, { icon: <FaFacebook />, link: "/contact" },
                { icon: <FaInstagram />, link: "/contact" }, { icon: <FaTwitter />, link: "/contact" }].map((item, index) => (
                <motion.a key={index} href={item.link} whileHover={{ y: -4, scale: 1.1 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="social-ring hover:shadow-[0_0_18px_rgba(126,195,230,0.7)] hover:bg-gradient-to-r hover:from-[#9fd9ff] hover:to-[#002479]">
                  {item.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent">
              Address
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Sathyabama University, Chennai<br /> Tamil Nadu, India
            </p>
            <p className="text-gray-400 mt-4">
              Mailbox: <a href="mailto:info@hyosene.com" className="text-[#7EC3E6] hover:underline">info@hyosene.com</a><br />
              Phone: +91 98765 43210
            </p>
          </div>
        </div>
      </section>

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
    </main>
  );
}


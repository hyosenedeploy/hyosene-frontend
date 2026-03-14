
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import Link from "next/link";
import { Roboto_Slab, Work_Sans } from "next/font/google";

// Google Fonts setup
const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Gradient text style
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};

// Motion animation
const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

export default function CareerPage() {
  // Form state
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeName, setResumeName] = useState("Choose File");

  const [isRobotChecked, setIsRobotChecked] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<null | { type: "success" | "error"; text: string }>(null);
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

  const handleRobotCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setIsRobotChecked(checked);
    if (checked) setTimeout(() => setIsVerified(true), 300);
    else setIsVerified(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setResumeFile(file);
    setResumeName(file?.name ?? "Choose File");
  };

  const resetForm = () => {
    setFullName("");
    setCountry("");
    setEmail("");
    setPhone("");
    setJobTitle("");
    setCompany("");
    setMessage("");
    setResumeFile(null);
    setResumeName("Choose File");
    setIsRobotChecked(false);
    setIsVerified(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMsg(null);

    if (!isVerified) {
      setStatusMsg({ type: "error", text: "Please verify you are not a robot." });
      return;
    }
    if (!fullName || !email) {
      setStatusMsg({ type: "error", text: "Please fill the required fields (Full Name, Email)." });
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("full_name", fullName);
      formData.append("country", country);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("job_title", jobTitle);
      formData.append("company", company);
      formData.append("message", message);
      formData.append("is_human", "1");
      if (resumeFile) formData.append("resume", resumeFile);
      
      // Debug: Log the token to verify it's available
      console.log("CSRF Token from state:", csrfToken ? "Found" : "Missing");
      
      if (!csrfToken) {
        setStatusMsg({ type: "error", text: "⚠️ Security token missing. Please refresh the page and try again." });
        setLoading(false);
        return;
      }
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/career`, {
        method: "POST",
        body: formData,
        credentials: "include",
        headers: {
          "X-CSRF-Token": csrfToken,
        },
      });

      let json;
      try {
        json = await res.json();
      } catch (err) {
        console.error("Career submit: invalid JSON response", err);
        setStatusMsg({ type: "error", text: "Server returned invalid response." });
        return;
      }

      if (json.ok === false) {
        console.error("Career submit error:", json);
        setStatusMsg({ type: "error", text: json.error || "Failed to submit. Try again." });
      } else {
        setStatusMsg({ type: "success", text: "Application submitted successfully. Thank you!" });
        resetForm();
      }
    } catch (err) {
      console.error("Network error:", err);
      setStatusMsg({ type: "error", text: "Network error — please try again later." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={`${workSans.className} bg-[#020b18] text-white min-h-screen`}>
      {/* ---------- HERO SECTION ---------- */}
      <section
        className="relative bg-contain md:bg-cover bg-center bg-no-repeat h-[35vh] flex items-center justify-start px-10 md:px-20"
        style={{ backgroundImage: "url('/header.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className={`${robotoSlab.className} relative z-10 text-5xl md:text-6xl font-bold `}
        >
          Career
        </motion.h1>
      </section>

      {/* ---------- CAREER FORM ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-6 md:px-20"
      >
        <div className="max-w-5xl mx-auto bg-black rounded-2xl p-10 shadow-lg border border-gray-800">
          <h2 className={`${robotoSlab.className} text-4xl font-semibold text-center mb-10 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent`}>
            Join Our Team
          </h2>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black" onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" className="input-field" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="text" placeholder="Country" className="input-field" value={country} onChange={(e) => setCountry(e.target.value)} />
            <input type="email" placeholder="Email ID" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type="tel" placeholder="Phone No" className="input-field" value={phone} onChange={(e) => setPhone(e.target.value)} />
            <select
  className="input-field"
  value={jobTitle}
  onChange={(e) => setJobTitle(e.target.value)}
>
  <option value="">Select Job Title</option>
  <option value="Student">Student</option>
  <option value="Software Engineer">Software Engineer</option>
  <option value="Marketing Manager">Marketing Manager</option>
  <option value="Data Analyst">Data Analyst</option>
  <option value="HR Manager">HR Manager</option>
  <option value="Teacher">Teacher</option>
  <option value="Sales Executive">Sales Executive</option>
  <option value="Designer">Designer</option>
  <option value="Business Owner">Business Owner</option>
  <option value="Freelancer">Freelancer</option>
  <option value="Other">Other</option>
</select>

            <input type="text" placeholder="Company" className="input-field" value={company} onChange={(e) => setCompany(e.target.value)} />

            {/* Upload Resume */}
            <div className="md:col-span-2">
              <label className="block text-gray-300 text-sm mb-2">Upload Your Resume</label>
              <label htmlFor="resumeUpload" className="relative cursor-pointer block w-full rounded-lg px-[2px] py-[2px] bg-gradient-to-r from-[#7EC3E6] to-[#002479] hover:opacity-90 transition-all">
                <div className="flex items-center justify-between bg-[#0b1220] rounded-md px-4 py-3 text-gray-300 text-sm">
                  <span id="fileName" className="truncate">{resumeName}</span>
                  <span className="bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-black font-semibold text-sm px-4 py-2 rounded-full hover:opacity-90">
                    Browse
                  </span>
                </div>
                <input id="resumeUpload" type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileChange} />
              </label>
              <p className="text-xs text-gray-500 mt-2">Accepted: .pdf, .doc, .docx — max recommended 5MB</p>
            </div>

            {/* Message Box */}
            <textarea placeholder="Your Message (5+ characters)" rows={6} className="md:col-span-2 input-field resize-none h-36" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>

            {/* Checkbox */}
            <div className="md:col-span-2 text-gray-300 space-y-2 text-sm">
              <div className="mt-4 flex items-center justify-between bg-[#0b1220] border border-gray-700 p-4 rounded-lg w-full max-w-sm">
                <label className="flex items-center gap-3">
                  <input type="checkbox" checked={isRobotChecked} onChange={handleRobotCheck} className="accent-[#7EC3E6] scale-125" />
                  <span className="font-medium text-gray-200">I’m not a robot</span>
                </label>
                <div className={`transition-all duration-300 ${isVerified ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"} flex items-center gap-2`}>
                  <span className="text-green-400 text-lg">✅</span>
                  <span className="text-sm text-green-400 font-medium">Verified</span>
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="md:col-span-2 text-center mt-6">
              <button id="submitBtn" type="submit" disabled={!isVerified || loading} className={`gradient-button transition-all ${isVerified ? "opacity-100 hover:opacity-90" : "opacity-60 cursor-not-allowed"} ${loading ? "cursor-wait" : ""}`}>
                {loading ? "Submitting..." : "SUBMIT"}
              </button>
            </div>

            {/* Status */}
            {statusMsg && (
              <div className={`md:col-span-2 text-center mt-2 ${statusMsg.type === "error" ? "text-red-400" : "text-green-400"}`}>
                {statusMsg.text}
              </div>
            )}
          </form>
        </div>

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
      </motion.section>
    </main>
  );
}

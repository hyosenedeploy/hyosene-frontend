"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaAward, FaGlobe, FaUserTie, FaSchool, FaLightbulb, FaUserGraduate } from "react-icons/fa6";
import Link from "next/link";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { GiChemicalDrop } from "react-icons/gi";
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const achievementsData = [
  {
  title: "Hackathon Runner-Up",
  desc: "Achieved runner-up position in a competitive hackathon, recognized for developing an innovative solution that demonstrated strong technical execution, creativity, and real-world applicability.",  
     icon: <FaAward size={40} />,
    image: "/grant.jpg",
  },
  {
    title: "Strategic Mentorship with GUVI Founder",
    desc: "Participated in an exclusive knowledge-exchange session with the Founder of GUVI, gaining deep insights into scalable tech entrepreneurship, product innovation, and emerging industry pathways.",
    icon: <FaUserTie size={40} />,
    image: "/guvi.jpg",
  },
  {
    title: "Innovation Winner – SRM Institution",
    desc: "Honored as the Innovation Winner at SRM College for presenting a breakthrough battery concept, celebrated for its engineering excellence and forward-thinking design.",
    icon: <FaLightbulb size={40} />,
    image: "/srm.jpg",
  },
  {
     title: "Prize Recognition by Dr. Myilswamy",
  desc: "Received an award from Dr. Myilswamy Sir as one of the top 25 contestants, recognizing outstanding performance and potential in advancing innovative technological solutions.",
   icon: <FaUserTie size={40} />,
    image: "/mayilswamy.jpg",
  },
  {
    title: "Startup Pitch Runner – CIT College",
    desc: "Achieved the Runner Position in the prestigious startup pitch event at CIT College, recognized for exceptional clarity in vision, technical feasibility, and entrepreneurial potential.",    icon: <FaAward size={40} />,
    image: "/cit.jpg",
  },
  {
    title: "National conference on sathyabama institute",
    desc: "Delivered a technical presentation on our battery innovation at a reputed National Conference, contributing to academic discourse and showcasing significant advancements in energy technology.",    icon: <FaSchool size={40} />,
    image: "/national.jpg",
  },
  {
    title: "Legal & Compliance Collaboration",
    desc: "Collaborated with Mr. M. Haridoss, Legal Advisor at Hyosene Battery Pvt. Ltd., on regulatory frameworks, IP protection, and legal structuring relevant to deep-tech innovations.",   icon: <FaUserTie size={40} />,
    image: "/legal.jpg",
  },
  {
    title: "Startup TN Ecosystem Engagement",
    desc: "Represented our team at the Startup TN event, actively engaging with the state’s innovation ecosystem and exploring pathways for incubation, funding, and strategic partnerships.",
    icon: <FaGlobe size={40} />,
    image: "/startup.jpg",
  },
  {
    title: "DR. Dilli Babu DRDO Scientist Interaction",
    desc: "Gained valuable technical insights after meeting Dr.Dilli Babu DRDO scientist, helping our team refine research directions and understand real-world defence technology applications.",
    icon: <FaUserGraduate size={40} />,
   image:"/drdo.jpg"
  },
   {
    title: "Sathyabama Institute Grant Support",
    desc: "Received a ₹2,00,000 project grant from Sathyabama Institute of Science and Technology to accelerate the development and prototyping of our innovative battery technology.",
     icon: <FaMoneyCheckAlt size={40} />,
   image:"/sgrant.jpg"
  },
];


export default function Achievements() {
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  // Typing effect
  const [text, setText] = useState("");
  const fullText = "Celebrating Our Milestones!";
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black text-white font-sans min-h-screen overflow-x-hidden">
      {/* ---------- HERO ---------- */}
    {/* ---------- HERO ---------- */}
<motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative bg-contain md:bg-cover bg-center bg-no-repeat w-full h-[35vh] flex items-center justify-start px-8 md:px-20 text-white"
  style={{ backgroundImage: "url('/header.jpg')" }}
>
  <div className="absolute inset-0 bg-black/10" /> {/* Adds a slight overlay for clarity */}
  <div className="relative z-10 flex flex-col justify-center h-full">
    <h1 className="text-4xl md:text-5xl font-bold text-left bg-clip-text text-transparent text-white">
      Our Achievements
    </h1>
  </div>
</motion.section>


      {/* ---------- TYPING HEADING & DESCRIPTION ---------- */}
      <motion.header
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={sectionVariant}
        className="text-center py-16 px-8 md:px-20"
      >
        <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
          {text}
        </h2>
        <p className="text-lg md:text-2xl text-gray-400">
          A showcase of the milestones and recognitions that Hyosene Battery Pvt Ltd has achieved.
        </p>
      </motion.header>

    {/* ---------- ACHIEVEMENTS CARDS ---------- */}
<motion.section
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={sectionVariant}
  className="py-16 px-8 md:px-20"
>
  <div className="grid md:grid-cols-3 gap-10">
    {achievementsData.map((achieve, idx) => (
      <motion.div
        key={idx}
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: idx * 0.15 }}
        whileHover={{
          scale: 1.05,
          boxShadow:
            "0 0 25px rgba(126, 195, 230, 0.8), 0 0 40px rgba(0, 36, 121, 0.6)",
          transition: { type: "spring", stiffness: 400, damping: 20 },
        }}
        className="bg-[#0B0B0B] rounded-2xl overflow-hidden text-center border border-[#1A1A1A] hover:border-[#7EC3E6]/60 cursor-pointer transition-all duration-200"
      >
        {/* --- Image Section --- */}
        <div className="w-full h-56 md:h-64 overflow-hidden">
          <motion.img
            src={achieve.image}
            alt={achieve.title}
            className="w-full h-full object-contain md:object-cover origin-center transition-transform duration-500 hover:scale-105 bg-black"
          />
        </div>

        {/* --- Content --- */}
        <div className="p-6">
          <div className="flex justify-center mb-3 text-[#7EC3E6]">
            {achieve.icon}
          </div>
          <h3 className="font-bold text-xl mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
            {achieve.title}
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            {achieve.desc}
          </p>
        </div>
      </motion.div>
    ))}
  </div>
</motion.section>


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

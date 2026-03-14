"use client";

import { motion ,Variants} from "framer-motion";
import { FaLightbulb, FaHandshake, FaShieldAlt } from "react-icons/fa";
import Link from "next/link";
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
// === Animation Variants ===
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const slideIn = (direction: "left" | "right"): Variants => ({
  hidden: { opacity: 0, x: direction === "left" ? -80 : 80 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.9, ease: "easeOut" } },
});
export default function LifeAtHyosene() {
  return (
    <main className="bg-black text-white overflow-hidden">
      {/* ---------- HERO SECTION ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative bg-contain md:bg-cover bg-center bg-no-repeat w-full h-[40vh] flex items-center px-8 md:px-16 text-white"
        style={{ backgroundImage: "url('/header.jpg')" }as any}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <motion.h1
            variants={fadeUp}
            className=" text-5xl md:text-6xl font-bold  text-left text-white bg-clip-text text-transparent"
          >
            Life at Hyosene
          </motion.h1>
        </div>
      </motion.section>

      {/* ---------- OUR CULTURE ---------- */}
    <motion.section
  initial={{ opacity: 0, x: -100 }} // Start from left
  whileInView={{ opacity: 1, x: 0 }} // Slide in to center
  transition={{ duration: 1, ease: "easeOut" }}
  viewport={{ once: true }}
  className="py-20 px-6 md:px-16 bg-gradient-to-b from-black via-[#0a0a20] to-black text-center"
>
  <motion.h2
    initial={{ opacity: 0, x: -80 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.9, ease: "easeOut" }}
    viewport={{ once: true }}
    className="text-5xl font-semibold mb-8 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent"
  >
    Our Culture
  </motion.h2>

  <motion.p
    initial={{ opacity: 0, x: -60 }}
    whileInView={{ opacity: 1, x: 0 }}
    transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
    viewport={{ once: true }}
    className="max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed"
  >
    At Hyosene, we cultivate an environment where ideas are nurtured,
    diversity is celebrated, and innovation thrives. Our team believes in
    pushing boundaries and redefining possibilities in aerospace and
    energy technologies.
  </motion.p>
</motion.section>

      {/* ---------- CORE VALUES ---------- */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-10 px-6 md:px-16 text-center"
      >
        <h2 className="text-5xl font-semibold mb-12 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent">
          Core Values
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: "Innovation",
              text: "We continuously explore and innovate to achieve breakthroughs in clean energy and aerospace.",
              icon: <FaLightbulb className="text-5xl text-[#7EC3E6] mx-auto mb-4" />,
            },
            {
              title: "Integrity",
              text: "We uphold transparency, honesty, and responsibility in every aspect of our work.",
              icon: <FaShieldAlt className="text-5xl text-[#7EC3E6] mx-auto mb-4" />,
            },
            {
              title: "Collaboration",
              text: "We believe that great ideas are born when passionate minds come together.",
              icon: <FaHandshake className="text-5xl text-[#7EC3E6] mx-auto mb-4" />,
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 0 25px rgba(126,195,230,0.5), 0 0 40px rgba(0,36,121,0.3)",
              }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className="bg-gradient-to-b from-[#0d0d1f] to-[#1a1a2e] p-8 rounded-2xl shadow-lg border border-[#002479]/40"
            >
              {value.icon}
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent mb-4">
                {value.title}
              </h3>
              <p className="text-gray-400">{value.text}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ---------- WORKPLACE SHOWCASE ---------- */}
      <section className="bg-black text-white py-24 px-8 md:px-20 font-sans">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-5xl font-bold text-center mb-16 bg-black bg-clip-text text-transparent"
        >
          Our Workplace
        </motion.h2>

        {[
          {
            img: "/workplace1.jpg",
            title: "Research workspace",
            text: "This is where our work began. Our research area includes the essential tools required for battery testing and analysis. It provides a focused environment where our team collaborates and continues refining our approach to graphene-based battery development.",
          },
          {
            img: "/workplace2.jpg",
            title: "Material Study Center",
            text: "Here, our team uses precise observation tools to examine battery materials and understand their behaviour. The insights we gain from this center help us improve performance and guide our future development efforts.",
          },
          {
            img: "/workplace3.jpg",
            title: "Performance Testing Zone",
            text: "This zone is dedicated to checking how each battery prototype performs under different conditions. From voltage tracking to temperature behaviour, every test is carried out systematically to ensure reliability and safety",
          },
          {
            img: "/workplace4.jpg",
            title: "Prototype Development Lab",
            text: "This is where our early ideas are built and tested. Through hands-on development and continuous refinement, our team transforms concepts into working prototypes, taking each step closer to real-world application.",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            variants={slideIn(idx % 2 === 0 ? "left" : "right")}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={`flex flex-col ${
              idx % 2 === 1 ? "md:flex-row-reverse" : "md:flex-row"
            } items-center justify-between gap-12 mb-20`}
          >
            {/* Image */}
            <div className="md:w-1/2 flex justify-center">
              <motion.img
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
                src={item.img}
                alt={item.title}
                className="rounded-2xl shadow-lg w-full max-w-md object-contain md:object-cover border border-[#002479]/40 bg-black"
              />
            </div>

            {/* Description */}
            <motion.div
              variants={fadeIn}
              className="md:w-1/2 space-y-4 text-center md:text-left"
            >
              <h3 className="text-2xl font-semibold bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent">
                {item.title}
              </h3>
              <p className="text-lg text-gray-300 leading-relaxed">
                {item.text}
              </p>
            </motion.div>
          </motion.div>
        ))}
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
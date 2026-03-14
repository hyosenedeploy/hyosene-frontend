"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactTyped } from "react-typed";
import { useState, useEffect } from "react";
import Link from "next/link";
export default function ProductsPage() {
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const fadeInUp = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };
  const products = [
    {
      title: "Drone Power Solutions",
      img: "/drone-battery.jpg",
      details: [
        "Hyosene DR-5000 — 14.8V | 5000mAh | 74Wh | 0.6kg | Industrial Drones",
        "Hyosene DR-3300 — 22.2V | 3300mAh | 73Wh | 0.4kg | Racing Drones",
        "Hyosene DR-4000 Graphene — Graphene LFP Prototype | 59Wh | 0.7kg",
      ],
      highlights: [
        "Lightweight graphene-based electrodes",
        "Fast-charge capability ≤ 20 min",
        "2000+ charge cycles (target)",
        "Thermally stable and high-safety",
      ],
    },
    {
      title: "Renewable Energy Storage Systems",
      img: "/solar-battery.jpg",
      details: [
        "SOL-100Ah — 12.8V | 1.28kWh | Home Solar",
        "SOL-200Ah — 25.6V | 5.12kWh | Off-Grid Systems",
        "GRID-200Ah — 51.2V | 10.24kWh | Graphene LFP Prototype",
      ],
      highlights: [
        "Optimized for solar/wind integration",
        "High efficiency and charge rate",
        "Lightweight compact design",
        "Smart BMS with CAN/RS-485",
      ],
    },
  ];

  const services = [
    {
      title: "Aerospace & Rocket Systems",
      img: "/aerospace.jpg",
      desc: [
        "Graphene-powered systems for high altitude and space.",
        "Lightweight design minimizes payload mass.",
        "Exceptional thermal stability and power output.",
      ],
    },
    {
      title: "Drone Power Systems",
      img: "/drone-service.jpg",
      desc: [
        "High power density with low weight.",
        "Long flight duration and rapid recharge.",
        "Reduced heat for consistent performance.",
      ],
    },
    {
      title: "Renewable Energy Storage",
      img: "/renewable.jpg",
      desc: [
        "Next-gen graphene batteries for solar & wind systems.",
        "Superior charge/discharge efficiency.",
        "Scalable and sustainable for industrial use.",
      ],
    },
  ];

  const comingSoon = [
    {
      title: "⚡ Hyosene EV Series – Two-wheelers & Light EVs",
      img: "/ev.jpg",
    },
    {
      title: "🌊 Hyosene Marine Series – Waterproof Graphene-LFP Modules",
      img: "/marine.jpg",
    },
    {
      title: "🔋 Hyosene Grid-X – 100kWh Modular Rack for Renewable Farms",
      img: "/grid.png",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-contain md:bg-cover bg-center bg-no-repeat w-full h-[35vh] flex items-center justify-start px-8 md:px-20 text-white"
        style={{ backgroundImage: "url('/header.jpg')" }as any}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-bold text-left text-white">
            Products
          </h1>
        </div>
      </motion.section>

      {/* Typed Heading */}
      <section className="text-center py-20 bg-black">
        <motion.h1
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ duration: 0.8 }}
          className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]"
        >
          <ReactTyped
            strings={[
              "Hyosene Battery — Product Portfolio & Services",
              "Powering the Future of Energy",
              "Innovating with Graphene Technology",
            ]}
            typeSpeed={50}
            backSpeed={30}
            loop
          />
        </motion.h1>

        <motion.p
          initial="hidden"
          whileInView="visible"
          variants={fadeInUp}
          transition={{ delay: 0.3 }}
          className="max-w-3xl mx-auto text-lg text-gray-300"
        >
          Next-generation graphene-integrated batteries designed for drones,
          aerospace, and renewable energy — powering the future sustainably.
        </motion.p>
      </section>

      {/* Products */}
      <section className="px-6 py-16">
        <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-center mb-10">
          ⚙ Our Products
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {products.map((p, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              className="bg-gray-900 rounded-2xl shadow-lg hover:shadow-[#7EC3E6]/30 p-6 border border-[#7EC3E6]/20 relative"
            >
              {/* Status Badge */}
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                🔬 Yet to be Manufactured
              </div>

             <Image
  src={p.img}
  alt={p.title}
  width={600}
  height={400}
  className="w-full h-64 object-contain md:object-cover rounded-xl mb-4 bg-black"
/>

              <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-3">
                {p.title}
              </h3>
              <ul className="list-disc list-inside mb-4 space-y-1 text-gray-300">
                {p.details.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
              <h4 className="text-xl font-semibold mb-2 text-[#7EC3E6]">
                Key Highlights
              </h4>
              <ul className="space-y-1 text-gray-400 list-disc list-inside">
                {p.highlights.map((h, j) => (
                  <li key={j}>{h}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="px-6 py-16 bg-black">
        <h2 className="text-5xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-12">
          🔧 Our Services
        </h2>
        <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-[#7EC3E6]/20 hover:shadow-[#002479]/40"
   ><Image
          src={s.img}
          alt={s.title}
          width={400}
          height={600}
          className="w-full h-96 object-contain md:object-cover rounded-xl mb-4 bg-black"
        />

              <h3 className="text-2xl font-semibold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
                {s.title}
              </h3>
              <ul className="space-y-2 text-gray-400 list-disc list-inside">
                {s.desc.map((d, j) => (
                  <li key={j}>{d}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Coming Soon */}
     {/* Coming Soon */}
<section className="relative px-6 py-20 overflow-hidden text-center">
  <div className="absolute inset-0 bg-gradient-to-b from-[#001B44]/40 to-black blur-3xl"></div>

  <motion.h2
    initial="hidden"
    whileInView="visible"
    variants={fadeInUp}
    className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-6 relative z-10"
  >
    🧩 Coming Soon
  </motion.h2>

  <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-14 relative z-10">
    Get ready for the next wave of Hyosene innovation — breakthrough
    graphene battery technologies designed to power EVs, marine systems,
    and large-scale renewable applications.
  </p>

  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto relative z-10">
    {comingSoon.map((item, i) => (
      <motion.div
        key={i}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: i * 0.2 }}
        className="bg-gray-900 rounded-2xl p-4 shadow-lg border border-[#7EC3E6]/20 hover:shadow-[#002479]/40 hover:scale-105 transition-transform duration-300"
      >
        <Image
          src={item.img}
          alt={item.title}
          width={400}
          height={300}
          className="w-full h-56 object-contain md:object-cover rounded-xl mb-4 bg-black"
        />
        <h3 className="text-xl font-semibold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
          {item.title}
        </h3>
       
      </motion.div>
    ))}
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
    </div>
  );
}

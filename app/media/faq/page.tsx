"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
export default function FAQPage() {
  const faqs = [
    {
      icon: "🔋",
      q: "Are these batteries commercially available?",
      a: "Not yet. All listed products are R&D prototypes under testing and validation. Commercial release will follow after performance optimization, safety certification, and partner integration.",
    },
    {
      icon: "🧩",
      q: "How is graphene integrated into these battery prototypes?",
      a: "Our prototypes use graphene-based nano-structured electrodes combined with LiFePO₄ (LFP) chemistry. This enhances conductivity, thermal stability, charging speed, and overall cycle life.",
    },
    {
      icon: "🔁",
      q: "What is the expected cycle life of Hyosene batteries?",
      a: "Drone battery prototypes target 2000+ cycles, while renewable storage systems are projected to achieve 3000–6000 cycles, depending on usage conditions.",
    },
     {
      icon: "🤝",
      q: "Does Hyosene Pvt Ltd collaborate with any other organizations?",
      a: "Yes, Hyosene works with TANCAM–TIDCO to enhance its battery research and prototyping efforts.",
    },
    {
      icon: "🪶",
      q: "Are these batteries lighter than traditional lithium-ion or lead-acid batteries?",
      a: "Yes. Graphene integration helps reduce internal resistance and improve energy density, allowing lighter and more compact battery designs—especially for drone applications.",
    },
    {
      icon: "⚡",
      q: "Can these drone batteries support fast charging?",
      a: "Yes. The drone series is being engineered for ≤20-minute fast-charge capability, subject to charger compatibility and final testing.",
    },
    {
      icon: "🏠",
      q: "What applications are the renewable energy batteries suitable for?",
      a: "The SOL and GRID series are designed for home solar storage, backup power systems, off-grid & hybrid microgrids, wind–solar integrated systems, and industrial renewable setups.",
    },
    {
      icon: "🧠",
      q: "Do your renewable storage systems include a Battery Management System (BMS)?",
      a: "Yes. All renewable prototypes integrate smart BMS with protection features, health monitoring, and communication interfaces such as CAN / RS-485.",
    },
    {
      icon: "⚖",
      q: "How heavy are the renewable storage prototypes?",
      a: "Weights range from ~15 kg for home solar units to ~100 kg for microgrid-scale modules, depending on capacity and configuration.",
    },
    {
      icon: "❗",
      q: "Are the specifications final?",
      a: "No. All values such as weight, capacity, voltage, and energy are prototype-level estimates and may change after optimization and certification.",
    },
    {
      icon: "🔧",
      q: "Can these batteries be customized for specific industry applications?",
      a: "Yes. Custom voltage, capacity, form factor, thermal design, and BMS configurations can be developed for drones, renewable systems, EVs, and industrial use cases.",
    },
    {
      icon: "🗺",
      q: "What new products are planned in the roadmap?",
      a: "Upcoming R&D projects include Hyosene EV Series (two-wheelers & light EVs), Hyosene Marine Series (waterproof graphene-LFP modules), and Hyosene Grid-X (100 kWh scalable renewable rack).",
    },
    {
      icon: "🛡",
      q: "How do these graphene-enhanced LFP batteries improve safety?",
      a: "Graphene integration improves heat dissipation and reduces thermal runaway risk. LFP chemistry already has high safety, and graphene further stabilizes performance under load.",
    },
    {
      icon: "🚀",
      q: "Do drone batteries support high discharge rates?",
      a: "Yes. Products like DR-5000 and DR-3300 are designed as high-discharge packs suitable for heavy-lift drones, mapping drones, and high-performance UAV systems.",
    },
    {
      icon: "🤝",
      q: "How can businesses or researchers collaborate with Hyosene Battery?",
      a: "You can contact our R&D partnership team through our website or corporate email for joint development, pilot testing, or bulk prototype inquiries.",
    },
  ];

  return (
    <div className="min-h-screen bg-black text-white px-6 pt-0 py-16">
         <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative bg-contain md:bg-cover bg-center bg-no-repeat w-full h-[35vh] flex items-center justify-start px-8 py-10 md:px-20 text-white"
        style={{ backgroundImage: "url('/header.jpg')" }as any}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col justify-center h-full">
          <h1 className="text-5xl md:text-6xl font-bold text-left text-white">
            FAQ
          </h1>
        </div>
      </motion.section>


      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl mt-16 font-bold text-center mb-12 bg-gradient-to-r from-[#7EC3E6] to-[#002479] bg-clip-text text-transparent"
      >
        Frequently Asked Questions
      </motion.section>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden"
          >
            <details className="group">
              <summary className="cursor-pointer py-5 px-6 text-lg font-semibold text-[#7EC3E6] flex justify-between items-center bg-gray-900 transition-all duration-300 group-hover:bg-gray-800 group-hover:shadow-[0_0_15px_rgba(126,195,230,0.3)]">
                <span className="flex items-center gap-3">
                  <span className="text-xl transition-colors duration-300 group-hover:text-white">{item.icon}</span>
                  <span className="transition-colors duration-300 group-hover:text-white">{item.q}</span>
                </span>
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 0 }}
                  className="transition-transform duration-300 group-open:rotate-180 text-2xl"
                >
                  ⌄
                </motion.span>
              </summary>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                whileInView={{ opacity: 1, height: "auto" }}
                transition={{ duration: 0.36 }}
                className="px-6 pb-5 text-gray-300 leading-relaxed bg-gray-900/80 border-t border-gray-700"
              >
                {item.a}
              </motion.div>
            </details>
          </motion.div>
        ))}
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
    </div>
  );
}

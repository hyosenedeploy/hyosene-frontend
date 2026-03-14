"use client";

   
    import React from "react";
    import { motion } from "framer-motion";
    import Link from "next/link";
import { Raleway } from "next/font/google";
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
const raleway = Raleway({
  subsets: ["latin"],
  weight: ["600", "700"],
});


    const MissionAndVision: React.FC = () => {
      const gradientTextStyle = {
        background: "linear-gradient(90deg, #7EC3E6, #002479)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      };
    
      const gradientBorder =
        "border-[1px] border-transparent bg-gradient-to-r from-[#7EC3E6] to-[#002479] p-[1px] rounded-xl";
    
      const gradientHoverBg = "hover:bg-gradient-to-r hover:from-[#7EC3E6]/20 hover:to-[#002479]/20";
    
      return (
        <main className="bg-black text-white font-sans overflow-x-hidden">
          {/* ---------- HERO SECTION ---------- */}
         <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative bg-contain md:bg-cover bg-center bg-no-repeat w-full h-[30vh] flex items-start px-8 md:px-12 pt-20 xt-white"
  style={{ backgroundImage: "url('/header.jpg')" }as any}
>

            <div className="absolute inset-0 bg-black/0" />
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-left">Mission and Vision</h1>
            </div>
          </motion.section>
    
          {/* ---------- HERO TEXT BELOW IMAGE ---------- */}
         <section className="text-center bg-black text-white py-8 md:mt-8 px-6">
      <motion.div
        initial="hidden"
        animate="visible"
        viewport={{ once: true }}
      >
        {/* Dynamic reveal for gradient text */}
  <h2
  className="text-4xl font-semibold mb-2 inline-block overflow-hidden tracking-wide text-[#7EC3E6]"
>
   {"REDEFINING BATTERIES FOR FLIGHTS AND ROCKETS".split(" ").map((word, i) => (
  <React.Fragment key={i}>
    {word.split("").map((char, j) => (
      <motion.span
        key={j}
        style={{
          color: "#7EC3E6", // 🔵 change this to any color you want
          display: "inline-block",
        }as any}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: (i * 8 + j) * 0.03, type: "spring", stiffness: 100 }}
      >
        {char}
      </motion.span>
    ))}
    {"\u00A0"}
  </React.Fragment>
))}


</h2>

        <p className="text-lg text-gray-300 mb-6">
          NEXT-GENERATION GRAPHENE BATTERY SYSTEMS FOR AEROSPACE AND DRONE INNOVATION
        </p>
      </motion.div>
    </section>
    
    
          {/* ---------- ABOUT SECTION ---------- */}
         <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      viewport={{ once: true }}
      className="flex flex-col md:flex-row justify-between items-start px-8 md:px-16 py-12 gap-6"
    >
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-semibold" style={{ background: "linear-gradient(90deg, #7EC3E6, #002479)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          About Hyosene Battery Pvt. Ltd.
        </h2>
        <p className="text-gray-300">
          At Hyosene Battery, we are pioneering the future of energy storage
          through advanced graphene-based battery systems specifically
          engineered for aerospace and drone applications.
        </p>
        <p className="text-gray-300">
          Our research focuses on pushing the boundaries of what’s possible in
          flight technology, combining cutting-edge materials science with
          aerospace engineering principles.
        </p>
    
              <motion.div
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
                className={`${gradientBorder} mt-6 bg-black`}
              >
                <div className="rounded-xl bg-black p-6">
                  <h3 className="text-xl font-semibold mb-3" style={gradientTextStyle}>
                    Our Vision:
                  </h3>
                  <p className="text-gray-300">
                    To extend flight duration, reduce weight, and eliminate thermal
                    issues through revolutionary graphene battery technology.
                  </p>
                </div>
              </motion.div>
            </div>
    
            <motion.div
              whileInView={{ opacity: 1, scale: 1 }}
              initial={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="md:w-1/2 flex justify-center"
            >
              <img
                src="/Vision image.jpg"
                alt="Objective 1"
                className="w-full max-w-sm  h-80 object-contain md:object-cover rounded-lg mb-4 bg-black"
              />
            </motion.div>
          </motion.section>
    
          {/* ---------- OBJECTIVE SECTION ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="px-8 md:px-16 py-16 bg-black"
          >
            <h2 className="text-center text-4xl font-semibold mb-12" style={gradientTextStyle}>
              Our Objective
            </h2>
    
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center">
              {[
                {
                  title: "High Power Density",
                  desc: "Graphene-enhanced electrodes delivering unprecedented energy storage capacity for extended flight operations.",
                  image: "/High power density.jpg",
                },
                {
                  title: "Longer Flight Time",
                  desc: "Maximizing mission duration with lightweight, high-capacity battery systems designed for aerospace demands.",
                  image: "/Longer flight time.jpg",
                },
                {
                  title: "Faster Charging Cycles",
                  desc: "Rapid recharge capabilities utilizing graphene’s superior conductivity for minimal downtime between flights.",
                  image: "/Faster charging cycles.jpg",
                },
                {
                  title: "Minimal Heat Generation",
                  desc: "Advanced thermal management through graphene’s exceptional heat dissipation properties, ensuring safe operations.",
                  image: "/Minimal heat generation.jpg",
                },
                {
                  title: "Improved Structural Integration",
                  desc: "Seamless battery integration into aircraft and drone frames, optimizing weight distribution and aerodynamics.",
                  image: "/Improved structural integration.jpg",
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 25px rgba(126,195,230,0.5)",
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 w-full max-w-xs mx-auto rounded-xl text-center border border-transparent ${gradientHoverBg} transition-all duration-300`}
                >
                  <div className="w-full h-56 mb-4 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center text-gray-500">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain md:object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={gradientTextStyle}>
                    {item.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.section>
    
          {/* ---------- CONFIDENTIAL SECTION ---------- */}
          <motion.section
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="px-8 md:px-16 py-16 bg-black text-center"
          >
            <motion.div
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(126,195,230,0.6)",
              }}
              transition={{ duration: 0.3 }}
              className={`max-w-3xl mx-auto rounded-xl p-8 border border-transparent ${gradientHoverBg} transition-all duration-300`}
            >
              <div className="flex justify-center mb-6">
                <img
                  src="/Confidential research scope.jpg"
                  alt="Confidential Research Scope"
                  className="w-[85%] h-80 object-contain md:object-cover rounded-lg shadow-md bg-black"
                />
              </div>
    
              <h3 className="text-xl font-semibold mb-4" style={gradientTextStyle}>
                Confidential Research Scope
              </h3>
              <p className="text-gray-300 mb-4">
                While our research process and proprietary methodologies remain
                confidential, our vision is crystal clear:
              </p>
              <h4 className="font-semibold mb-4" style={gradientTextStyle}>
                To redefine energy for flight.
              </h4>
              <p className="text-gray-300">
                Our breakthrough innovations in graphene battery technology are
                protected under strict confidentiality agreements as we work towards
                revolutionizing the aerospace and drone industries.
              </p>
            </motion.div>
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
        </main>
      );
    };
    
   

export default MissionAndVision;

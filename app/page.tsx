"use client";
import "./animations.css"; // We'll create this small file for animations
import { FaBatteryFull, FaRocket, FaBolt } from "react-icons/fa6";
import { GiHexagonalNut } from "react-icons/gi";
import { FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa6";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
const gradientTextStyle: React.CSSProperties = {
  background: "linear-gradient(to right, #3b82f6, #06b6d4)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
};
export default function Home() {
  return (
  <main className="bg-[#020b18] text-white min-h-screen overflow-x-hidden">
    {/* === Header Image Section === */}
<section className="relative h-[300px] w-full overflow-hidden">
  {/* Background Image */}
  <img
    src="/header.jpg" // Replace with your header image path
    alt="Header Background"
    className="absolute inset-0 w-full h-full object-cover"
  />
  {/* Dark Overlay */}
  <div className="absolute inset-0 bg-black/30"></div>

  {/* Left-aligned & vertically centered Heading */}
  <div className="relative z-10 flex flex-col justify-center h-full px-12">
    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text text-white">
      Welcome to Hyosene
    </h1>
  </div>
</section>

  {/* Hero Section */}
  <section className="pt-24 pb-24 text-center bg-[#020b18] relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-cover opacity-10" />

    {/* Animated Headings */}
    <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-4 animate-text-reveal">
      Redefining Batteries
       for Aerospace and Renewable Energy
    </h1>

    <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl mb-10 mt-6 animate-fade-in delay-1000">
      Next-generation graphene battery systems for aerospace and drone
      innovation.
    </p>

  </section>

 {/* About Section */}
<section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 py-24 bg-[#020b18]">
  <div className="md:w-1/2 space-y-6">
    {/* Light Glass Button */}
    <div className="inline-block bg-gradient-to-r from-[#7EC3E6]/30 to-[#002479]/30 border border-[#7EC3E6]/50 text-sky-200 px-6 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-md">
      About Us
    </div>

    <h2 className="text-5xl font-extrabold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
  About Hyosene Battery
</h2>


    <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
      At Hyosene Battery, we are pioneering the future of energy storage
      through advanced graphene-based battery systems specifically
      engineered for aerospace and drone applications. Our research focuses
      on pushing the boundaries of what's possible in-flight technology,
      combining cutting-edge materials science with aerospace engineering
      principles.
    </p>
  </div>

 <div className="md:w-1/2 flex justify-center">
    <div className="w-72 h-72 md:w-96 md:h-96 rounded-lg overflow-hidden border border-gray-600/50 shadow-lg">
      <Image
        src="/graphene-battery.jpg"      
        alt="Drone Image"
        width={320}
        height={320}
        className="object-contain md:object-cover w-full h-full"
        priority
      />
    </div>
  </div>
</section>

 {/* Vision Section */}

<section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-24 bg-[#020b18]">
  <div className="md:w-1/2 flex justify-center">
   <div className="w-72 h-72 md:w-96 md:h-96 rounded-lg overflow-hidden border border-gray-600/50 shadow-lg">
      <Image
        src="/drone.jpg"      
        alt="Drone Image"
        width={320}
        height={320}
        className="object-contain md:object-cover w-full h-full"
        priority
      />
    </div>
  </div>


  <div className="md:w-1/2 mt-10 md:mt-0 space-y-6">
    {/* Light Glass Button */}
    <div className="inline-block bg-gradient-to-r from-[#7EC3E6]/40 to-[#002479]/40 border border-[#7EC3E6]/50 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-md">
      Our Vision
    </div>

    {/* Gradient Heading */}
    <h2 className="text-5xl font-extrabold mt-3 text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
      The Future of Flight
    </h2>

    <p className="text-gray-300 leading-relaxed text-lg md:text-xl">
      To extend flight duration, reduce weight, and eliminate thermal
      issues through revolutionary graphene battery innovation — making
      future aerospace missions more efficient, reliable, and sustainable.
    </p>

    <div className="flex flex-wrap gap-4 pt-3 text-base text-sky-300">
      <span className="bg-sky-400/10 border border-sky-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
        ⚡ Extended Duration
      </span>
      <span className="bg-sky-400/10 border border-sky-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
        🪶 Lightweight Design
      </span>
      <span className="bg-sky-400/10 border border-sky-500/30 px-4 py-2 rounded-full backdrop-blur-sm">
        🔷 Thermal Stability
      </span>
    </div>
  </div>
</section>

{/* === Our Team Section === */}
<section className="px-8 md:px-20 py-24 bg-[#020b18] border-t border-gray-800">
 <div className="text-center mb-16 max-w-7xl mx-auto">
  {/* Light Glass Gradient Button */}
  <div className="inline-block bg-gradient-to-r from-[#7EC3E6]/40 to-[#002479]/40 border border-[#7EC3E6]/50 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-md mb-6">
    Our Team
  </div>

  {/* Gradient Heading */}
  <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-3">
    Meet the Team
  </h2>

  <p className="text-gray-400 max-w-3xl mx-auto text-lg">
    Led by visionary experts in aerospace, battery technology, and innovation
  </p>
</div>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

<motion.div
  className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full mx-auto overflow-hidden"
  whileHover={{
    scale: 1.06,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {/* CEO Image */}
  <div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-8">
  <img
    src="/Karthi.jpg"
    alt="CEO"
    className="object-contain md:object-cover w-full h-full"
  />
</div>


  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Founder & CEO
  </p>

  {/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    KARTHIKESH HARIDOSS
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    Aeronautical Engineer
  </p>

  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
  An Aeronautical Engineer with multidisciplinary expertise across aerospace, battery technology, and advanced materials. With over 5 years of hands-on experience in battery innovation and space technology, Karthikesh leads Hyosene Battery Pvt. Ltd. with a mission to redefine sustainable energy systems. He has served as a judge and speaker at national-level hackathons, inspiring innovators in clean energy and deep-tech domains. As Founder and CEO, his visionary leadership combines technical depth with strategic execution, driving Hyosene toward global impact.
</p>

  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
    Graphene battery architecture & aerospace energy
  </div>

  {/* Social Media Icons */}
  <div className="flex justify-center gap-2 mt-8">
    <a href="https://www.linkedin.com/in/karthikesh-haridoss-551499232?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
   className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 
               text-[#7EC3E6] hover:text-white hover:scale-125 
               hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition">
      <FaLinkedin className="text-xl" />
    </a>
    <a href="mailto:karthikeshdenver@gmail.com" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 text-[#7EC3E6] hover:text-white hover:scale-125 hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition">
      <FaEnvelope className="text-xl" />
    </a>
  </div>
</motion.div>

<motion.div
  className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full mx-auto overflow-hidden"
  whileHover={{
    scale: 1.04,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {/* CEO Image */}
<div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6">
  <img
    src="/Shane.jpg"
    alt="CEO"
    className="object-contain md:object-cover w-full h-full"
  />
</div>
  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Chief Technology Officer
  </p>

  {/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    ARSIN SHANE
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    Chemical Engineer
  </p>
<div className="h-5"></div>
  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
  A Chemical Engineer specializing in electrochemical cell fabrication and material science, Arsin has 3 years of experience in developing and optimizing next-generation graphene-based and lithium-derived battery systems. His expertise in cell chemistry, electrolyte formulation, and electrode optimization ensures safety and performance efficiency. As CTO, he drives the R&D division and plays a pivotal role in product innovation and scalability.
</p>
<div className="h-5"></div>

  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
    Graphene-based & lithium-derived battery systems
  </div>

<div className="h-5"></div>
  {/* Social Media Icons */}
  <div className="flex justify-center mt-8">
    <a href="https://www.linkedin.com/in/arsin-shane-1b2819327?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
    className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 
               text-[#7EC3E6] hover:text-white hover:scale-125 
               hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition"
               >
      <FaLinkedin className="text-xl" />
    </a>
  </div>
</motion.div>

<motion.div
  className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full mx-auto overflow-hidden"
  whileHover={{
    scale: 1.04,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>

  {/* CEO Image */}
<div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6">
  <img
    src="/saravanan.jpg"
    alt="CEO"
    className="object-contain md:object-cover w-full h-full"
  />
</div>

  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Chief Financial Officer
  </p>

{/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    SARAVANAN
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    Simulation Specialist & Finance
  </p>
<div className="h-5"></div>
  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
  Saravanan brings over 3 years of experience in battery module simulation, thermal management, and structural analysis. Known for his analytical mindset and technical fluency, he has represented the team as a speaker and strategist in several technical forums. His dual expertise in engineering and finance ensures a balanced approach toward cost management and technological excellence.
  </p>
<div className="h-10"></div>
  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
   Thermal management & structural analysis
  </div>
<div className="h-9"></div>
  {/* Social Media Icons */}
  <div className="flex justify-center  mt-8">
    <a href="https://www.linkedin.com/in/saravananr777?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
    className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 
               text-[#7EC3E6] hover:text-white hover:scale-125 
               hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition">
      <FaLinkedin className="text-xl" />
    </a>
  </div>
</motion.div>


<motion.div
  className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full mx-auto overflow-hidden"
  whileHover={{
    scale: 1.04,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>

  {/* CEO Image */}
<div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6">
  <img
    src="/Ajay.jpg"
    alt="CEO"
    className="object-contain md:object-cover w-full h-full"
  />
</div>


  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Chief Inforamtion Officer
  </p>

  {/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    AJAY
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    AI Innovation Lead & Cybersecurity Expert
  </p>

  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
  Ajay specializes in cybersecurity, AI integration, and advanced computer-data systems. His expertise in machine learning and predictive analytics enhances battery performance monitoring, fault detection, and safety intelligence. At Hyosene, he leads digital innovation — merging data science with battery technology to create smart, connected, and adaptive energy systems.
</p>

  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
   Machine learning for battery monitoring
  </div>

 


  {/* Social Media Icons */}
  <div className="flex justify-center  mt-8">
    <a href="https://www.linkedin.com/in/ajay-a-n-a763442a6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 
               text-[#7EC3E6] hover:text-white hover:scale-125 
               hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition">
      <FaLinkedin className="text-xl" />
    </a>

  </div>
</motion.div>

<motion.div
  className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full mx-auto overflow-hidden"
  whileHover={{
    scale: 1.04,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>

  {/* CEO Image */}
<div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6">
  <img
    src="/ceo.png"
    alt="CEO"
    className="object-contain md:object-cover w-full h-full"
  />
</div>


  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Chief Operating  Officer 
  </p>

  {/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    LOHITHANATHAN
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    Electronics & Electrical  Specialist
  </p>

  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
 Lohithanathan is an expert in electrical systems design, embedded electronics, and smart energy management for EV and drone applications. With 3 years of project experience, he has led multiple innovations in power electronics, BMS design, and IoT-integrated prototypes. As COO, he oversees operations, hardware integration, and production scaling. A frequent technical speaker, he brings precision and reliability to Hyosene’s product development.
</p>
  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
   EV & drone power electronics, BMS design
  </div>



  {/* Social Media Icons */}
 <div className="flex justify-center mt-8">
  <a
    href="https://www.linkedin.com/in/lohithanathan-d-176b5a27a?utm_source=share_via&utm_content=profile&utm_medium=member_android"
    className="w-10 h-10 flex items-center justify-center rounded-full 
               bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 
               text-[#7EC3E6] hover:text-white hover:scale-125 
               hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition"
  >
    <FaLinkedin className="text-xl" />
  </a>
</div>

</motion.div>
  </div>
</section>

  {/* === Meet Our Mentors Section === */}
    {/* === Mentors Section === */}
<section className="px-4 sm:px-8 md:px-20 py-16 md:py-24 bg-[#020b18] border-t border-gray-800">
  <div className="text-center mb-16">
    <div className="inline-block bg-sky-400/10 border border-sky-500/30 text-sky-300 px-6 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-sm mb-6">
      Our Mentors
    </div>
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3">Meet our Mentors</h2>
    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
     Guilding our vision with decades of expertise
    </p>
  </div>

  {/* === Mentor Cards Grid === */}
  <div className="flex flex-col md:flex-row justify-center items-stretch gap-6">

    {/* === Mentor 1 === */}
    <motion.div
 className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full max-w-[500px] mx-auto w-full"
  whileHover={{
    scale: 1.06,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {/* CEO Image */}
<div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6">
  <img
    src="/sridharan.png"
    alt="Mentor"
    className="object-contain md:object-cover w-full h-full"
  />
</div>
  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Technical Mentor 
  </p>

  {/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    DR. D.SRIDHARAN
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    Professor,Department of Chemisstry,SNS College of  Technology
  </p>

  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
 Sridharan is a seasoned professional with over 25 years of experience in Chemistry and Electrochemistry, working as a Chemist, Researcher, and Teaching Faculty. He has extensive expertise in managing and administering research laboratories and has successfully led numerous product-focused projects across sensors and biosensors, energy storage devices, metal–air batteries, electroplating technologies, graphene oxide synthesis, and microbial fuel cells and flow batteries for wastewater treatment. With a strong product development approach and deep technical knowledge, Sridharan is known for his excellent analytical abilities, coordination skills, scientific presentation, interpersonal communication, and leadership. He is passionate about interdisciplinary research and dedicated to developing innovative and impactful scientific solutions.
 </p>

  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
   Expert in electrochemistry & metal-air batteries
  </div>

  {/* Social Media Icons */}
  <div className="flex justify-center space-x-6 mt-8">
    <a href="https://www.linkedin.com/in/dr-sridharan-d?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 text-[#7EC3E6] hover:text-white hover:scale-125 hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition">
      <FaLinkedin className="text-xl" />
    </a>
  </div>
</motion.div>

     <motion.div
  className="bg-[#020b18] p-6 md:p-10 rounded-2xl border border-gray-800 text-center shadow-lg w-full max-w-[500px] mx-auto w-full"
  whileHover={{
    scale: 1.06,
    boxShadow: `
      0 0 20px 5px rgba(126,195,230,0.4),
      0 0 40px 10px rgba(0,36,121,0.3)
    `
  }}
  transition={{ type: "spring", stiffness: 300, damping: 20 }}
>
  {/* CEO Image */}
<div className="mx-auto w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden mb-6">
  <img
    src="/anderson.jpg"
    alt="Mentor"
    className="object-contain md:object-cover w-full h-full"
  />
</div>

  {/* Position Badge */}
  <p className="inline-block bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 border border-[#7EC3E6]/30 text-[#7EC3E6] text-xs px-3 py-1 rounded-full font-semibold mb-3">
    Business Mentor 
  </p>

  {/* Name */}
  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-2">
    DR. A.ANDERSON
  </h3>

  {/* Role */}
  <p className="text-[#7EC3E6] mb-3 text-sm font-medium">
    Professor & Head,Department of Aeronautical Engineering,Sathyabama Institute
  </p>

  {/* Description */}
  <p className="text-gray-300 text-sm mb-5 leading-relaxed text-justify">
  Dr.A.Anderson is currently an Professor of the School of Mechanical Engineering, Sathyabama Institute of Science and Technology, Chennai. He is having a long association with this Institute as a faculty since 2006. Prior to joining the Institute. He has total experience of 22 years. He had been conferred Ph.D. for his research on High Temperature Coatings in the year 2013 from Sathyabama Institute of Science and Technology. His areas of Research Interests are High temperature coatings, Hydrophobic and Antimicrobial coatings, Thin films and Hard Coatings, Fuel cells, Alternate Fuels, Solar thermal technology, Thermal Storage and Heat Transfer.
  </p>

  {/* Expertise Badge */}
  <div className="bg-[#020f20] p-3 rounded-md mb-4 text-[#7EC3E6] text-sm font-semibold">
   22+ years in aerospace research & energy systems
  </div>

  {/* Social Media Icons */}
  <div className="flex justify-center space-x-6 mt-8">
    <a href="https://www.linkedin.com/in/dr-anderson-a-231910a4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-[#7EC3E6]/20 to-[#002479]/20 text-[#7EC3E6] hover:text-white hover:scale-125 hover:shadow-lg hover:shadow-[#7EC3E6]/50 transition">
      <FaLinkedin className="text-xl" />
    </a>
  </div>
</motion.div>
  </div>
</section>


{/* === Innovative Solutions Section === */}
    <section className="bg-[#010913] text-white py-24 px-6 md:px-20 text-center relative overflow-hidden">
      <div className="inline-block bg-gradient-to-r from-[#7EC3E6]/40 to-[#002479]/40 border border-[#7EC3E6]/50 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-sm backdrop-blur-md mb-6">
    Our Products
  </div>
       {/* ↓ reduced mb-16 to mb-6 */}
  <h2 className="text-5xl font-extrabold mb-6 bg-gradient-to-r from-[#7EC3E6] to-[#002479] text-transparent bg-clip-text">
    Innovative Solutions
  </h2>

  {/* ↓ added mb-14 to increase space below grey text */}
  <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-14">
    Cutting-edge graphene battery technology designed for the most demanding aerospace applications.
  </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10 justify-center">
        {/* === Graphene Battery Cells === */}
        <motion.div
          className="bg-[#0b1220] p-10 rounded-2xl w-full max-w-[280px] mx-auto border border-gray-800 text-center shadow-lg"
          whileHover={{
            scale: 1.06,
            boxShadow: `
              0 0 20px 5px rgba(126,195,230,0.4),
              0 0 40px 10px rgba(0,36,121,0.3)
            `,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#7EC3E6]/10 border border-[#7EC3E6]/30 p-4 rounded-full">
              <FaBatteryFull className="text-[#7EC3E6] text-4xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-3">
            Graphene Battery Cells
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Advanced graphene composite batteries engineered for efficiency,
            lightweight design, and superior thermal resistance.
          </p>
        </motion.div>

        {/* === Aerospace Integration === */}
        <motion.div
          className="bg-[#0b1220] p-10 rounded-2xl w-[280px] mx-auto border border-gray-800 text-center shadow-lg"
          whileHover={{
            scale: 1.06,
            boxShadow: `
              0 0 20px 5px rgba(126,195,230,0.4),
              0 0 40px 10px rgba(0,36,121,0.3)
            `,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#7EC3E6]/10 border border-[#7EC3E6]/30 p-4 rounded-full">
              <FaRocket className="text-[#7EC3E6] text-4xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-3">
            Aerospace Integration
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Precision-engineered energy systems integrated into aerospace
            platforms, ensuring reliability and peak performance.
          </p>
        </motion.div>

        {/* === Drone Power Solutions === */}
        <motion.div
          className="bg-[#0b1220] p-10 rounded-2xl w-[280px] mx-auto border border-gray-800 text-center shadow-lg"
          whileHover={{
            scale: 1.06,
            boxShadow: `
              0 0 20px 5px rgba(126,195,230,0.4),
              0 0 40px 10px rgba(0,36,121,0.3)
            `,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#7EC3E6]/10 border border-[#7EC3E6]/30 p-4 rounded-full">
              <GiHexagonalNut className="text-[#7EC3E6] text-4xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-3">
            Drone Power Solutions
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Long-endurance graphene cells optimized for UAV propulsion —
            lightweight, thermally stable, and flight-efficient.
          </p>
        </motion.div>

        {/* === Thermal Efficiency System === */}
        <motion.div
          className="bg-[#0b1220] p-10 rounded-2xl w-[280px] mx-auto border border-gray-800 text-center shadow-lg"
          whileHover={{
            scale: 1.06,
            boxShadow: `
              0 0 20px 5px rgba(126,195,230,0.4),
              0 0 40px 10px rgba(0,36,121,0.3)
            `,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="flex justify-center mb-6">
            <div className="bg-[#7EC3E6]/10 border border-[#7EC3E6]/30 p-4 rounded-full">
              <FaBolt className="text-[#7EC3E6] text-4xl" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479] mb-3">
            Thermal Efficiency System
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            Innovative thermal management systems that regulate battery
            temperature and boost performance under extreme environments.
          </p>
        </motion.div>
      </div>
    </section>

{/* === Collaborate Section === */}
<section className="bg-black py-16 md:py-24 text-center text-white relative overflow-hidden">

  {/* Background Pattern */}
  <div className="absolute inset-0 bg-[url('/gradient-bg.svg')] bg-cover bg-center opacity-10"></div>

  <div className="relative z-10 px-4 sm:px-6">
    
    <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold 
                   bg-gradient-to-r from-[#7EC3E6] to-[#002479] 
                   text-transparent bg-clip-text mb-4 md:mb-6">
      Collaborate with Hyosene
    </h2>

    <p className="max-w-xl mx-auto text-gray-300 text-base sm:text-lg mb-8 md:mb-10 leading-relaxed">
      Join us in building the next generation of flight power systems. 
      Let's shape the future of aerospace technology together.
    </p>

    <Link href="/contact">
      <motion.button
        whileHover={{
          scale: 1.08,
          boxShadow:
            "0 0 25px rgba(126,195,230,0.6), 0 0 45px rgba(0,36,121,0.4)",
          background: "linear-gradient(to right, #7EC3E6, #002479)",
          color: "#000",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="px-6 py-3 sm:px-8 sm:py-3 rounded-full font-semibold border 
                   border-[#7EC3E6]/40 bg-[#7EC3E6]/10 backdrop-blur-md 
                   shadow-md transition-all duration-300 ease-out 
                   text-transparent bg-clip-text 
                   bg-gradient-to-r from-[#7EC3E6] to-[#002479]
                   text-sm sm:text-base"
      >
        Contact Our Team →
      </motion.button>
    </Link>
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

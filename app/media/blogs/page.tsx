"use client";

import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Blog {
  id: number;
  title: string;
  heroImage: string;
  content: string;
  snippet: string;
}

const blogs: Blog[] = [
  // Blog 1
  {
   id: 1,
    title: "Renewable Energy Revolution: The Role of Graphene Batteries in a Sustainable Future",
    heroImage: "/first-blog.jpg",
    snippet: `In the global pursuit of renewable energy, one breakthrough material is redefining how we store and use clean power — graphene. As the world transitions from fossil fuels to sustainable alternatives such as solar, wind, and hydro energy, the need for efficient, reliable, and eco-friendly energy storage has never been greater. Graphene batteries, with their extraordinary conductivity, durability, and scalability, are emerging as the next-generation solution powering the renewable energy revolution.`,
    content: `**Understanding Renewable Energy and Its Storage Challenges**

Renewable energy sources are the cornerstone of a cleaner, greener planet. However, one of the biggest challenges facing renewable energy systems is energy storage. Solar and wind power generation are intermittent — the sun doesn’t always shine, and the wind doesn’t always blow. Without high-capacity, fast-charging, and long-lasting batteries, the full potential of renewables cannot be realized.

Traditional lithium-ion batteries, while effective, come with limitations: slow charging rates, limited life cycles, safety risks, and environmental concerns due to heavy metal extraction. That’s where graphene batteries step in to transform the future of renewable energy storage.

**What Makes Graphene Ideal for Renewable Energy?**

Graphene, often hailed as the “wonder material”, is a single layer of carbon atoms arranged in a hexagonal lattice. It possesses a strength nearly 200 times greater than steel, yet remains astonishingly light, flexible, and transparent, making it one of the most remarkable materials ever discovered.
More importantly, graphene exhibits superior electrical and thermal conductivity, making it a perfect candidate for energy storage systems.

**Key Advantages of Graphene for Energy Storage:**

- Exceptional Electrical Conductivity: Enables rapid charge and discharge cycles for maximum efficiency.
- High Surface Area: Allows for greater energy storage density.
- Thermal Stability: Prevents overheating, ensuring safety and longevity.
- Environmental Sustainability: Can be produced from carbon-based materials, reducing dependence on toxic metals.

By integrating graphene into renewable energy systems, we can overcome storage limitations and enable a smoother, more reliable energy supply.

**Graphene Batteries: Powering the Renewable Energy Transition**

1. Ultra-Fast Charging and Discharging

In renewable energy setups, the ability to quickly store and release power is vital. Graphene batteries offer up to five times faster charging speeds compared to traditional lithium-ion counterparts. This means that solar and wind farms can store excess power in real-time and release it instantly during high-demand periods — maximizing energy efficiency.

2. Higher Energy Density

Graphene’s atomic structure allows more ions to be stored per unit volume, giving graphene batteries significantly higher energy density. This ensures that renewable power systems can store larger quantities of electricity without increasing battery size or weight — a game-changer for both grid-scale and residential energy storage.

3. Extended Lifespan and Durability

Unlike lithium-ion batteries that degrade after a few hundred charge cycles, graphene batteries can last thousands of cycles with minimal performance loss. This durability translates to lower replacement costs and reduced environmental waste, making graphene batteries a long-term sustainable choice for renewable energy applications.

4. Enhanced Safety and Thermal Control

One of the most critical advantages of graphene batteries is their superior thermal management. Graphene dissipates heat efficiently, minimizing the risk of thermal runaway — a common issue that can cause battery fires or explosions. For large-scale renewable installations, this added safety is invaluable.

5. Eco-Friendly Manufacturing and Disposal

The production of graphene batteries relies on carbon-based raw materials, which are abundant and recyclable. This contrasts with traditional batteries that depend on rare earth metals like cobalt and nickel, whose extraction causes significant environmental harm. Graphene batteries therefore offer a greener lifecycle, from production to disposal.

**Integration of Graphene Batteries in Renewable Energy Systems**

**Solar Energy Storage**

In solar farms, graphene-enhanced batteries can efficiently capture and store surplus sunlight during peak hours and release it at night or during cloudy periods. This ensures a consistent power supply and drastically improves the efficiency of solar grids. Additionally, residential solar panels equipped with graphene battery storage enable homeowners to achieve complete energy independence.

**Wind Energy Optimization**

Wind power is unpredictable, varying with weather patterns. Graphene batteries can smooth out fluctuations in power generation by rapidly charging when wind output is high and discharging during calm periods. Their fast response time makes them ideal for stabilizing wind energy grids, ensuring continuous power flow.

**Hydropower and Off-Grid Applications**

In hydropower and off-grid renewable systems, graphene supercapacitors play a crucial role. Their instantaneous charge/discharge ability makes them suitable for remote applications where reliability and quick power delivery are essential — such as emergency power systems, remote monitoring stations, and microgrids.

**Graphene Supercapacitors: The Next Leap in Clean Energy Storage**

Beyond traditional batteries, graphene supercapacitors are redefining energy storage technology. These devices combine the high energy density of batteries with the rapid charge-discharge capability of capacitors. Graphene’s large surface area and conductivity allow supercapacitors to store and deliver immense bursts of energy within seconds, making them ideal for balancing renewable energy fluctuations.

When paired with solar panels or wind turbines, graphene supercapacitors provide instant backup power, reducing energy loss and enhancing overall system reliability.

**Economic and Environmental Benefits of Graphene Energy Storage**

1. Reduced Operational Costs

Although initial graphene battery production costs are higher, their longer lifespan and minimal maintenance requirements significantly reduce lifetime operational costs. Over time, they prove to be a cost-effective solution for renewable infrastructure projects.

2. Job Creation and Technological Growth

The rise of graphene-based energy technologies is spurring new industries, research initiatives, and manufacturing opportunities. From nanotechnology research labs to battery production plants, graphene energy development contributes to economic growth and green innovation.

3. Sustainable Energy for All

By improving energy efficiency and storage, graphene batteries make renewable power more accessible and affordable, especially for developing regions where energy poverty remains a challenge. Portable graphene-powered systems can bring clean electricity to off-grid communities worldwide.

**Future Outlook: Graphene and the Global Energy Transition**

The future of renewable energy is inextricably linked to advancements in energy storage, and graphene sits at the forefront of this transformation. With ongoing research, the mass production of graphene batteries is becoming more viable. Industry leaders like Tesla, Samsung, and Huawei are already exploring graphene-lithium hybrid technologies for electric vehicles and energy grids.

In the coming decade, we can expect to see graphene-integrated renewable systems powering smart cities, electric transportation networks, and decentralized microgrids. This evolution will not only accelerate the global transition to net-zero emissions but also create a resilient, sustainable energy ecosystem for future generations.

**Conclusion**

The integration of graphene batteries in renewable energy systems marks a revolutionary step toward a sustainable, efficient, and eco-friendly energy future. With their superior charging speed, energy density, and environmental safety, graphene-based storage technologies hold the key to unlocking the full potential of solar, wind, and other renewable sources. As innovation continues, graphene will not just power devices — it will power the planet.`

  },
  // Blog 2
  {
    id: 2,
    title: "Graphene Batteries in Drones and Flights: Transforming the Future of Aerial Technology",
    heroImage: "/second-blog.jpg",
  snippet: `
The aerospace and drone industries are undergoing a monumental transformation with the introduction of graphene batteries — a groundbreaking innovation redefining the limits of power, endurance, and efficiency in flight technology. As we push towards a cleaner, faster, and more sustainable aviation future, graphene-based energy systems are emerging as the cornerstone of next-generation air mobility.
`,

content:`
**The Power Revolution: What Are Graphene Batteries?**

Graphene batteries integrate graphene, a single layer of carbon atoms arranged in a honeycomb lattice, into traditional battery structures. This remarkable material is nearly 200 times stronger than steel, yet incredibly lightweight, flexible, and conductive. Its extraordinary properties enable faster electron transfer, better heat dissipation, and significantly higher energy density than conventional lithium-ion batteries.

In aviation, where every gram matters and efficiency defines performance, these qualities position graphene batteries as the ultimate solution to longstanding limitations in drone and flight technology.

**The Need for Advanced Energy Storage in Aviation**

Traditional lithium-ion batteries, while widely used, face serious challenges in aerospace applications:

- Limited energy capacity, restricting flight duration
- Slow charging times, reducing operational readiness
- Thermal instability, posing safety risks at high altitudes
- Short lifecycle, leading to frequent replacements

As aviation evolves — from electric drones to urban air mobility (UAM) aircraft and electric commercial planes — the demand for high-performance, lightweight, and safe energy systems continues to grow. Graphene batteries answer this call with unmatched precision and capability.

**Why Graphene Batteries Are Ideal for Drones and Flights**

1. Ultra-Lightweight Design for Greater Efficiency

Weight reduction is the holy grail of flight engineering. Graphene batteries offer exceptional energy-to-weight ratios, enabling aircraft and drones to carry heavier payloads, fly longer, and consume less energy. This lightweight advantage directly enhances fuel efficiency in hybrid systems and extends operational range in fully electric models.

2. Rapid Charging for Continuous Operation  

One of graphene’s most celebrated benefits is its ultra-fast charging capability. Drones equipped with graphene batteries can achieve full charge within minutes instead of hours. This is a revolutionary improvement for commercial drone operators, military surveillance missions, and emergency response systems, where every second counts.

3. Extended Flight Time and Range

The higher energy density of graphene batteries allows drones and electric aircraft to store more power in smaller, lighter packages. This translates to longer flight durations and greater coverage areas, enabling drones to operate beyond the visual line of sight (BVLOS) — a critical advancement for delivery systems, mapping, and surveillance.

4. Superior Thermal Management and Safety

Safety is paramount in aviation. Traditional lithium-ion batteries are prone to overheating and thermal runaway, which can lead to fires or explosions. Graphene’s exceptional thermal conductivity ensures efficient heat dispersion, maintaining optimal operating temperatures even under extreme conditions. This not only enhances safety but also prolongs the battery’s lifespan, making it ideal for long-duration flights and high-altitude operations.

5. Eco-Friendly and Sustainable Power Source 

Graphene batteries are composed primarily of carbon-based materials, significantly reducing the reliance on environmentally harmful metals like cobalt or nickel. Their recyclability and long lifecycle make them a sustainable solution aligned with the global push toward green aviation.

**Graphene Batteries in Drone Technology**

**Enhanced Performance for Commercial Drones** 

For delivery drones, the integration of graphene batteries enables longer travel distances, increased payload capacities, and faster recharging cycles. Companies engaged in logistics, medical supply transport, and agriculture can operate around-the-clock drone fleets with minimal downtime, optimizing both costs and efficiency.

**Precision and Endurance in Military and Surveillance Drones**  

Military-grade drones require high endurance and stealth performance. Graphene batteries provide consistent power output and low heat signatures, essential for covert operations and long-range reconnaissance missions. Their reliability in extreme temperatures ensures operational stability across diverse terrains and climates.

**Innovation in Consumer Drones**  

For hobbyists and filmmakers, graphene batteries mean longer flight sessions, quicker recharge cycles, and stable voltage output, resulting in smoother footage and extended creative potential.

**Graphene Batteries in Aviation and Electric Flights**

1. The Rise of Electric Aircraft

The aviation industry is entering an era of electrification, driven by the need to reduce carbon emissions. Graphene batteries are paving the way for electric aircraft (eVTOLs) and regional electric flights by providing lightweight, high-energy systems that match the stringent performance and safety requirements of flight.  
Their fast-charging capabilities make them perfect for short-haul flights and urban air mobility (UAM) systems, where quick turnaround times are critical.

2. Hybrid Power Systems  

In hybrid aircraft, graphene batteries work in tandem with traditional fuel systems to enhance energy efficiency and reduce fuel consumption. By storing regenerative power during descent and braking, these batteries minimize waste and contribute to smoother, cleaner operation.

3. Advanced Thermal Regulation for High Altitudes 

At high altitudes, temperature fluctuations can severely affect battery performance. Graphene’s thermal conductivity stabilizes performance in both extreme cold and heat, ensuring consistent power delivery and long-term reliability in flight.

4. Revolutionizing eVTOL and Air Taxi Technology

Electric Vertical Takeoff and Landing (eVTOL) aircraft represent the future of urban transportation. Graphene batteries’ lightweight nature, rapid charge time, and high power density make them a perfect fit for air taxis, cargo drones, and aerial shuttles, enabling quiet, efficient, and sustainable urban air mobility.


**Challenges in Graphene Battery Adoption**  

- High production costs due to complex graphene synthesis processes  
- Limited large-scale manufacturing infrastructure  
- Need for standardized integration protocols within the aviation industry  

However, with ongoing research and increased industrial investment, these barriers are rapidly being addressed. Companies like Tesla, Airbus, and Samsung are actively exploring commercial graphene applications, signaling a swift shift toward mass adoption.

**The Future of Flight Powered by Graphene**  

The integration of graphene batteries in drones and aircraft will redefine aviation’s future. From silent electric air taxis cruising above cities to autonomous drones conducting long-range missions, graphene-powered systems promise unprecedented efficiency, sustainability, and performance.  

In the near future, we can expect:  
- Graphene-supercapacitor hybrids for instant energy bursts  
- Smart AI-driven battery management systems  
- Widespread implementation in commercial and defense aviation  

As advancements continue, graphene batteries will not only power aircraft — they will power the future of global air mobility.

**Conclusion**  

Graphene batteries represent the next evolutionary leap in drone and flight technology, offering lightweight design, rapid charging, enhanced safety, and long-term sustainability. Their potential to revolutionize both civilian and commercial aviation is immense, bridging the gap between performance and environmental responsibility. The sky is no longer the limit — with graphene, it’s only the beginning.
`

  },
  // Blog 3
  {
    id: 3,
    title: "Graphene Batteries: The Future of Energy Storage and Power Innovation",
    heroImage: "/third-blog.jpg",
    snippet:
      "Graphene batteries are revolutionizing energy storage across EVs, renewable energy, aerospace, and consumer electronics with ultra-fast charging and high energy density...",
   content: `

In today’s fast-paced world of technological advancement, graphene batteries have emerged as one of the most transformative innovations in the field of energy storage. With their unmatched efficiency, rapid charging capabilities, and eco-friendly design, these next-generation batteries are set to revolutionize industries ranging from electric vehicles (EVs) to renewable energy and consumer electronics.

**What Are Graphene Batteries?**

Graphene batteries are advanced energy storage devices that incorporate graphene, a single layer of carbon atoms arranged in a hexagonal lattice, into traditional battery structures. Graphene’s unique physical and chemical properties—including high electrical conductivity, lightweight structure, and superior mechanical strength—make it an ideal material for enhancing the performance of lithium-ion, lithium-sulfur, and supercapacitor batteries.

Unlike conventional lithium-ion batteries, which rely on graphite electrodes, graphene-enhanced electrodes allow for faster electron and ion movement, resulting in quicker charging times, higher capacity, and longer battery lifespan.

**How Graphene Batteries Work**

The secret to graphene batteries lies in their electrode composition. Graphene, being an excellent conductor of both heat and electricity, reduces internal resistance within the battery. This enables rapid energy transfer, minimizing energy loss during charge and discharge cycles.

In graphene-lithium batteries, for example:

- The anode (negative electrode) is often made from graphene composite materials.
- The cathode (positive electrode) can incorporate metal oxides combined with graphene for enhanced conductivity.
- Electrolytes used in these batteries are also optimized for better ion diffusion.

This combination results in faster charging, greater energy density, and enhanced safety, since graphene effectively dissipates heat, reducing the risk of overheating or explosion.

**Key Advantages of Graphene Batteries**

1. Ultra-Fast Charging  

One of the most remarkable benefits of graphene batteries is their incredibly short charging time. Studies have shown that graphene-enhanced lithium-ion batteries can charge up to five times faster than traditional lithium batteries. Imagine charging an electric vehicle in minutes instead of hours—that’s the potential of graphene technology.

2. Higher Energy Density 

Graphene’s unique structure enables more efficient energy storage. This means that graphene batteries can store more power within the same physical size as traditional batteries. As a result, devices last longer, and electric vehicles can travel greater distances on a single charge.

3. Enhanced Durability and Lifespan  

Traditional batteries degrade over time due to electrode wear and tear. However, graphene’s mechanical flexibility and thermal stability drastically reduce this issue. These batteries can withstand thousands of charge cycles without significant loss of capacity, ensuring longer operational life and lower maintenance costs.

4. Improved Safety

Graphene batteries are less prone to thermal runaway, a common problem in lithium-ion technology. Because graphene conducts heat efficiently, it prevents the formation of hot spots and reduces the risk of fire or explosion. This makes graphene batteries particularly suitable for electric vehicles and aerospace applications where safety is paramount.

5. Eco-Friendly Composition  

Graphene batteries contribute to a sustainable energy future. They can be produced using carbon-based materials, which are abundant and less environmentally damaging than the mining of heavy metals like cobalt and nickel used in lithium-ion batteries.

**Applications of Graphene Batteries**

**Electric Vehicles (EVs)**  

The automotive industry stands to gain the most from graphene battery integration. With faster charging times and extended driving ranges, graphene-powered EVs will redefine the standards for performance, reliability, and sustainability. Companies like Tesla, Samsung, and Huawei are actively investing in graphene battery research to drive the next wave of electric mobility.

**Consumer Electronics** 

Smartphones, laptops, and wearable devices can benefit from ultra-fast charging and extended battery life. A graphene battery-powered smartphone could reach full charge in just 10–15 minutes, while maintaining superior performance and temperature control.

**Renewable Energy Storage** 

Graphene batteries are ideal for solar and wind energy storage systems. Their high charge/discharge efficiency ensures better utilization of renewable energy sources, reducing dependency on fossil fuels.

**Aerospace and Defense**  

In aerospace and military applications, lightweight and powerful energy sources are crucial. Graphene’s exceptional energy-to-weight ratio and thermal management make it the perfect candidate for powering satellites, drones, and advanced defense systems.

**Medical Devices** 

From implantable sensors to portable diagnostic tools, graphene batteries can provide consistent and safe power to critical medical technologies, enhancing both reliability and patient safety.

**Challenges Facing Graphene Battery Development**

1. Production Costs  

Currently, high-quality graphene production remains expensive due to the complex synthesis process. Researchers are exploring cost-effective and scalable manufacturing methods to make graphene batteries commercially viable.

2. Integration and Standardization 

Adapting existing battery technologies to integrate graphene requires new manufacturing infrastructure and standardization guidelines. Industry-wide collaboration is essential to streamline this process.

3. Material Purity and Consistency 

The performance of graphene batteries depends heavily on graphene quality. Ensuring uniform thickness, purity, and defect control is vital to achieving consistent energy output and efficiency.

**The Future of Graphene Batteries**

As innovation accelerates, graphene battery technology is rapidly moving from the laboratory to real-world applications. Researchers predict that within the next 5–10 years, graphene batteries will begin to replace conventional lithium-ion systems across multiple industries.

Companies are already developing hybrid graphene-lithium cells that combine the best of both worlds—affordable manufacturing and extraordinary performance. Furthermore, ongoing breakthroughs in graphene supercapacitors could lead to instant-charging energy storage devices, revolutionizing not only mobility but also global energy infrastructure.

The integration of AI-driven battery management systems with graphene batteries will further optimize power usage, prolong lifespan, and enhance safety. Together, these advancements are paving the way for a cleaner, faster, and more energy-efficient future.

**Conclusion**

Graphene batteries represent the next frontier in energy storage technology. Their unmatched speed, capacity, and safety features make them the cornerstone of tomorrow’s smart devices, electric vehicles, and renewable energy systems. As research continues and production costs decline, we can expect graphene to power the sustainable world of the future—efficiently and responsibly.
`

  },
];

export default function BlogsPage() {
     const [typedText, setTypedText] = useState("");
  const fullText = "Blogs";

  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) clearInterval(typing);
    }, 100);

    return () => clearInterval(typing);
  }, []);
  const gradientTextStyle = {
    background: "linear-gradient(90deg, #7EC3E6, #002479)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  const gradientBorder =
    "border-[1px] border-transparent bg-gradient-to-r from-[#7EC3E6] to-[#002479] p-[1px] rounded-xl";

  const gradientHoverBg =
    "hover:bg-gradient-to-r hover:from-[#7EC3E6]/20 hover:to-[#002479]/20";

  const [expanded, setExpanded] = useState<Record<number, boolean>>({});

  const toggleExpand = (id: number) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderContent = (content: string) => {
    const processInlineBold = (text: string) => {
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} style={gradientTextStyle}>
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      });
    };

    return content.split("\n\n").map((block, idx) => {
      // Headings
      if (block.startsWith("**") && block.endsWith("**")) {
        return (
          <h3 key={idx} className="text-lg md:text-xl font-semibold mb-3">
            {processInlineBold(block)}
          </h3>
        );
      }
      // Bullet points
      else if (block.startsWith("- ")) {
        return (
          <ul key={idx} className="list-disc list-inside text-gray-300 mb-4">
            {block.split("\n").map((li, i) => (
              <li key={i}>{processInlineBold(li.replace("- ", ""))}</li>
            ))}
          </ul>
        );
      }
      // Numbered points
      else if (block.match(/^\d+\./)) {
        return (
          <div key={idx} className="mb-4">
            {block.split("\n").map((li, i) => {
              const match = li.match(/^(\d+\.)\s*(.*)/);
              if (match) {
                return (
                  <p key={i} className="text-white-300 mb-2 font-semibold">
                    <span>{match[1]}</span>{" "}
                    {processInlineBold(match[2])}
                  </p>
                );
              }
              return <p key={i}>{processInlineBold(li)}</p>;
            })}
          </div>
        );
      }
      // Regular paragraph
      else {
        return (
          <p key={idx} className="text-gray-300 mb-4">
            {processInlineBold(block)}
          </p>
        );
      }
    });
  };

  return (
    <main className="bg-black text-white font-sans">
         
      {/* Hero Section */}
  <motion.section
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  viewport={{ once: true }}
  className="relative bg-contain md:bg-cover bg-center bg-no-repeat w-full h-[35vh] flex items-start px-8 md:px-16 pt-20 text-white"
  style={{ backgroundImage: "url('/header.jpg')" } as any}
>
  <div className="absolute inset-0 " />
  <div className="relative z-10">
    <h1 className="text-5xl md:text-6xl font-bold text-left">
     Blogs
    </h1>
  </div>
</motion.section>

      <section className="text-center bg-black py-12 px-6">
           <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#7EC3E6] to-[#002479]">
          {typedText}
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Explore the latest insights and breakthroughs on graphene batteries
          and their impact across renewable energy, aviation, drones, and
          technology.
        </p>
      </section>

      {/* Blogs Section */}
      <section className="px-6 md:px-16 py-12 flex flex-col gap-16">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            whileHover={{
              scale: 1.03,
              boxShadow: "0 0 25px rgba(126,195,230,0.5)",
            }}
            transition={{ duration: 0.3 }}
            className={`rounded-xl overflow-hidden ${gradientBorder} ${gradientHoverBg} transition-all duration-300 max-w-3xl mx-auto`}
          >
            <img
              src={blog.heroImage}
              alt={blog.title}
              className="w-full max-h-72 object-contain md:object-cover"
            />
            <div className="bg-black p-6">
              <h2
                className="text-xl font-semibold mb-2"
                style={gradientTextStyle}
              >
                {blog.title}
              </h2>
              <p className="text-gray-300 mb-4">{blog.snippet}</p>
              <button
                className="text-[#69aefc] font-semibold hover:underline"
                onClick={() => toggleExpand(blog.id)}
              >
                {expanded[blog.id] ? "Show Less" : "Read More"}
              </button>

              {expanded[blog.id] && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.5 }}
                  className="mt-4"
                >
                  {renderContent(blog.content)}
                </motion.div>
              )}
            </div>
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
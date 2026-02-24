// components/ChristmasLightingSection.jsx
"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image"; // Add this import
import {
  FaCheckCircle,
  FaClock
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";
import heroowner from "../../public/images/heroowner.jpg";

const ChristmasLightingSection = () => {
  const boxRef = useRef(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data.json");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };
    loadData();
  }, []);

  if (!data) {
    return (
      <section className="w-full min-h-[600px] flex items-center justify-center">
        <div className="text-base">Loading...</div>
      </section>
    );
  }

  const { hero, workShowcase } = data;

  return (
    <section ref={boxRef} className="relative w-full overflow-hidden bg-white py-12 md:py-16 lg:py-20">

      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">

        {/* TWO DIV LAYOUT */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* LEFT DIV - TALL IMAGE for owner's vertical selfie */}
          <div className="w-full lg:w-1/2">
            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <div className="relative pb-[125%] lg:pb-[133%]"> {/* Tall aspect ratio for vertical image */}
                  <Image
                    src={heroowner}
                    alt="Owner - Christmas Lights Over Columbus"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                </div>

                {/* Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                    <span className="text-sm font-semibold bg-gradient-to-r from-rose-600 to-amber-600 bg-clip-text text-transparent">
                      {hero.imageBadge}
                    </span>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-amber-400/20 rounded-full blur-2xl" />
                <div className="absolute -top-3 -left-3 w-20 h-20 bg-rose-400/20 rounded-full blur-2xl" />
              </div>
            </div>
          </div>

          {/* RIGHT DIV - ONLY Heading, Paragraph, Features, CTA */}
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-8">

            {/* Heading */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full">
                <GiSparkles className="w-4 h-4 text-amber-600" />
                <span className="text-sm font-medium text-amber-700">Premium Service</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                <span className="text-slate-900">Serving Columbus with</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600">
                  Stress-Free Holiday Lighting
                </span>
              </h1>
            </div>

            {/* Paragraph - EXACT TEXT */}
            <div className="space-y-4">
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                The holiday season is all about making memories, and nothing brings that magic to life like a beautifully lit home. At Christmas Lights Over Columbus, we take the stress out of decorating with professional Christmas lighting services designed just for you.
              </p>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed">
                From custom design and installation to maintenance, removal, and storage, we handle everything — so all you have to do is enjoy the season. Let us create a stunning display while you focus on what matters most.
              </p>
            </div>

            {/* Features - Clean grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {hero.features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                    <FaCheckCircle className="w-4 h-4 text-emerald-600" />
                  </div>
                  <span className="text-sm md:text-base text-slate-700 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            {/* CTA - Clean buttons */}
            <div className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`tel:${hero.cta.phone}`}
                  className="px-8 py-4 bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 text-center"
                >
                  {hero.cta.subtext}
                </a>

                <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-amber-300 hover:bg-amber-50/50 transition-all duration-300">
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChristmasLightingSection;
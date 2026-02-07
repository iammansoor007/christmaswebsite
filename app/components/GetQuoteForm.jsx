// components/ModernQuoteForm.jsx
"use client";
import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaHome,
  FaTree,
  FaCalendarAlt,
  FaCheckCircle,
  FaArrowRight,
  FaQuoteRight,
} from "react-icons/fa";
import { GiSparkles } from "react-icons/gi";

const ModernQuoteForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    treeHeight: "",
    date: "",
    notes: "",
    service: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [data, setData] = useState(null);

  // Load data
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-gray-600">Loading quote form...</div>
        </div>
      </div>
    );
  }

  const { quoteForm } = data;
  const { badge, title, subtitle, services, contactInfo, benefits, stats } =
    quoteForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      treeHeight: "",
      date: "",
      notes: "",
      service: "",
    });

    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-4 px-3 xs:px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 xs:mb-10 sm:mb-12">
          <div className="inline-flex items-center justify-center gap-1.5 xs:gap-2 px-3 xs:px-4 py-1.5 xs:py-2 bg-gradient-to-r from-red-600/10 via-amber-500/10 to-red-600/10 rounded-full border border-amber-500/30 shadow-sm mb-4 xs:mb-5">
            <GiSparkles className="text-xs xs:text-sm text-amber-500" />
            <span className="text-xs xs:text-sm font-medium text-gray-800 uppercase tracking-wide">
              {badge}
            </span>
          </div>

          <h1 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Get Your{" "}
            <span className="bg-gradient-to-r from-red-600 via-amber-500 to-emerald-600 bg-clip-text text-transparent">
              Custom
            </span>{" "}
            Quote
          </h1>
          <p className="text-sm xs:text-base text-gray-600 max-w-2xl mx-auto px-2">
            {subtitle}
          </p>
        </div>

        {/* Success Message */}
        {isSubmitted && (
          <div className="mb-6 p-4 xs:p-5 bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-xl shadow-sm animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center">
                <FaCheckCircle className="text-white text-lg xs:text-xl" />
              </div>
              <div>
                <h3 className="text-base xs:text-lg font-bold text-emerald-800">
                  Quote Request Sent!
                </h3>
                <p className="text-emerald-600 text-sm">
                  We'll contact you within 24 hours with your custom quote.
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-6 xs:gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
            {/* Form Header */}
            <div className="p-4 xs:p-5 sm:p-6 bg-gradient-to-r from-red-600/5 via-amber-500/5 to-red-600/5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 xs:w-12 xs:h-12 bg-gradient-to-r from-red-600 to-amber-500 rounded-lg flex items-center justify-center">
                  <FaQuoteRight className="text-white text-lg xs:text-xl" />
                </div>
                <div>
                  <h2 className="text-lg xs:text-xl font-bold text-gray-900">
                    Quote Details
                  </h2>
                  <p className="text-gray-600 text-xs xs:text-sm">
                    All fields marked * are required
                  </p>
                </div>
              </div>
            </div>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="p-4 xs:p-5 sm:p-6 space-y-4 xs:space-y-5"
            >
              {/* Name & Email */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Full Name *
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base"
                      placeholder="John Smith"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Email *
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
              </div>

              {/* Phone & Address */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Phone *
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Property Address *
                  </label>
                  <div className="relative">
                    <FaHome className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base"
                      placeholder="123 Main St, City, State"
                    />
                  </div>
                </div>
              </div>

              {/* Tree Height & Date */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Tree Height (ft)
                  </label>
                  <div className="relative">
                    <FaTree className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="number"
                      name="treeHeight"
                      value={formData.treeHeight}
                      onChange={handleChange}
                      min="0"
                      className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base"
                      placeholder="e.g., 12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Preferred Date
                  </label>
                  <div className="relative">
                    <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base"
                    />
                  </div>
                </div>
              </div>

              {/* Services */}
              <div>
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-1.5">
                    Service Needed
                  </label>
                  <div className="relative">
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base appearance-none"
                    >
                      <option value="">Select a service...</option>
                      {services.map((service) => (
                        <option
                          key={service.id}
                          value={service.id}
                          className="text-gray-700"
                        >
                          {service.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-3 py-2.5 xs:py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 outline-none transition text-sm xs:text-base resize-none"
                  placeholder="Any special requests or requirements..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-red-600 via-amber-500 to-red-600 hover:from-red-500 hover:via-amber-400 hover:to-red-500 text-white font-semibold rounded-lg py-3 xs:py-3.5 px-4 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <div className="relative flex items-center justify-center gap-2 xs:gap-3">
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 xs:w-5 xs:h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span className="text-sm xs:text-base">
                        Processing...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="text-sm xs:text-base font-bold">
                        Get Instant Quote
                      </span>
                      <FaArrowRight className="text-sm xs:text-base transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </div>
              </button>

              {/* Form Footer */}
              <p className="text-center text-gray-500 text-xs xs:text-sm pt-2">
                By submitting, you agree to our Privacy Policy. No credit card
                required.
              </p>
            </form>
          </div>

          {/* Benefits Section */}
          <div className="space-y-6 xs:space-y-8">
            {/* Stats */}
            <div className="bg-gradient-to-br from-red-600/5 via-amber-500/5 to-red-600/5 rounded-xl xs:rounded-2xl border border-amber-500/20 p-4 xs:p-5 sm:p-6">
              <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-4">
                Why Choose Us
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`text-2xl xs:text-3xl font-bold ${stat.color}`}
                    >
                      {stat.value}
                    </div>
                    <div className="text-gray-700 text-xs xs:text-sm font-medium">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-xl xs:rounded-2xl shadow-lg border border-gray-100 p-4 xs:p-5 sm:p-6">
              <h3 className="text-lg xs:text-xl font-bold text-gray-900 mb-4">
                What You Get
              </h3>
              <div className="space-y-3">
                {benefits.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 xs:w-6 xs:h-6 rounded-full bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-xs" />
                    </div>
                    <span
                      className={`text-sm xs:text-base font-medium ${item.color}`}
                    >
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-red-600 to-amber-500 rounded-xl xs:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 text-white">
              <h3 className="text-lg xs:text-xl font-bold mb-3">
                Need Immediate Help?
              </h3>
              <div className="space-y-3">
                <a
                  href={`tel:${contactInfo.phone.replace(/[^\d]/g, "")}`}
                  className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaPhone className="text-sm xs:text-base" />
                  </div>
                  <div>
                    <div className="text-xs text-white/80">Call us 24/7</div>
                    <div className="text-base xs:text-lg font-bold">
                      {contactInfo.phone}
                    </div>
                  </div>
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 hover:opacity-90 transition-opacity"
                >
                  <div className="w-8 h-8 xs:w-10 xs:h-10 bg-white/20 rounded-lg flex items-center justify-center">
                    <FaEnvelope className="text-sm xs:text-base" />
                  </div>
                  <div>
                    <div className="text-xs text-white/80">Email us</div>
                    <div className="text-base xs:text-lg font-bold">
                      {contactInfo.email}
                    </div>
                  </div>
                </a>
              </div>
              <p className="text-xs text-white/70 mt-4">
                Emergency services available 24/7 for urgent lighting needs
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        /* Extra small screen optimizations */
        @media (max-width: 374px) {
          input,
          select,
          textarea,
          button {
            font-size: 16px !important;
            min-height: 44px;
          }

          .text-2xl {
            font-size: 1.375rem;
          }

          .text-lg {
            font-size: 1rem;
          }

          .grid-cols-2 {
            grid-template-columns: 1fr;
            gap: 0.75rem;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin {
          animation: spin 1s linear infinite;
        }

        /* Prevent text zoom on iOS */
        @media screen and (max-width: 768px) {
          input,
          select,
          textarea {
            font-size: 16px;
          }
        }

        /* Custom date picker */
        input[type="date"] {
          min-height: 44px;
        }

        input[type="date"]::-webkit-calendar-picker-indicator {
          opacity: 0.5;
          padding: 0.5rem;
        }

        /* Remove number input spinners */
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Button active state */
        button:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
};

export default ModernQuoteForm;

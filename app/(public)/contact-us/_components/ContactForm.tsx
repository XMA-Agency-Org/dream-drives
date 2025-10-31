"use client";

import { useState, FormEvent } from "react";
import { Loader2 } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    vehicleInterest: "not-specified",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      // In a real implementation, you would send this data to your backend
      // This is a simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulated success
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        vehicleInterest: "not-specified",
      });
    } catch (err) {
      setError(
        "There was an error submitting your message. Please try again later.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg p-6 text-center">
        <div className="inline-flex items-center justify-center bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 p-3 rounded-full mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-white mb-2">
          Thank You!
        </h3>
        <p className="text-secondary-600 dark:text-secondary-400 mb-4">
          Your message has been received. Our team at Business Bay will get back
          to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="name"
            className="block text-secondary-700 dark:text-secondary-300 mb-2 font-medium"
          >
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            placeholder="Your full name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-secondary-700 dark:text-secondary-300 mb-2 font-medium"
          >
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            placeholder="Your email address"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="phone"
            className="block text-secondary-700 dark:text-secondary-300 mb-2 font-medium"
          >
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
            placeholder="Your phone number"
          />
        </div>

        <div>
          <label
            htmlFor="vehicleInterest"
            className="block text-secondary-700 dark:text-secondary-300 mb-2 font-medium"
          >
            Vehicle Interest
          </label>
          <select
            id="vehicleInterest"
            name="vehicleInterest"
            value={formData.vehicleInterest}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          >
            <option value="not-specified">Not Specified</option>
            <option value="luxury">Luxury Sedans</option>
            <option value="sports">Sports Cars</option>
            <option value="suv">Premium SUVs</option>
            <option value="economy">Economy Cars</option>
            <option value="special">Custom Request</option>
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="subject"
          className="block text-secondary-700 dark:text-secondary-300 mb-2 font-medium"
        >
          Subject <span className="text-red-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="What's this regarding?"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-secondary-700 dark:text-secondary-300 mb-2 font-medium"
        >
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-secondary-300 dark:border-secondary-700 bg-white dark:bg-secondary-900 text-secondary-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
          placeholder="How can we help you?"
        />
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-4 rounded-lg">
          {error}
        </div>
      )}

      <div className="flex items-center">
        <input
          id="privacy"
          type="checkbox"
          required
          className="h-4 w-4 text-primary-600 dark:text-primary-400 border-secondary-300 dark:border-secondary-700 rounded focus:ring-primary-500 dark:focus:ring-primary-400"
        />
        <label
          htmlFor="privacy"
          className="ml-2 block text-sm text-secondary-600 dark:text-secondary-400"
        >
          I agree to the{" "}
          <a
            href="/privacy-policy"
            className="text-primary-600 dark:text-primary-400 hover:underline"
          >
            privacy policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 px-6 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors duration-200 disabled:opacity-70 flex items-center justify-center"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}

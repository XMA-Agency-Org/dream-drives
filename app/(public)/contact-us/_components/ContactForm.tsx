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
    >
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
      // TODO: Implement Resend email service
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
    } catch {
      setError(
        "There was an error submitting your message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="card card-bordered p-6 text-center bg-accent-50 dark:bg-accent-900/20 border-accent-200 dark:border-accent-800">
        <div className="inline-flex items-center justify-center bg-accent-100 dark:bg-accent-900/40 text-accent-600 dark:text-accent-400 p-3 rounded-full mb-4">
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
        <h3 className="title-card mb-2">Thank You!</h3>
        <p className="text-muted mb-4">
          Your message has been received. Our team at Business Bay will get back
          to you shortly.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-accent-600 dark:text-accent-400 font-medium hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">
            Full Name <span className="text-error-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="email" className="form-label">
            Email <span className="text-error-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="form-input"
            placeholder="john@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            className="form-input"
            placeholder="+971 50 123 4567"
          />
        </div>

        <div>
          <label htmlFor="vehicleInterest" className="form-label">
            Vehicle Interest
          </label>
          <select
            id="vehicleInterest"
            name="vehicleInterest"
            value={formData.vehicleInterest}
            onChange={handleChange}
            className="form-select"
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
        <label htmlFor="subject" className="form-label">
          Subject <span className="text-error-500">*</span>
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          required
          className="form-input"
          placeholder="How can we help you?"
        />
      </div>

      <div>
        <label htmlFor="message" className="form-label">
          Message <span className="text-error-500">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="form-textarea"
          placeholder="Tell us about your rental needs..."
        />
      </div>

      {error && (
        <div className="bg-error-50 dark:bg-error-900/20 text-error-700 dark:text-error-300 px-4 py-3 rounded-xl border border-error-200 dark:border-error-800 text-sm">
          {error}
        </div>
      )}

      <div className="flex items-start gap-3 pt-1">
        <input
          id="privacy"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 accent-success-500 dark:accent-success-600 border-secondary-300 dark:border-secondary-600 rounded focus:ring-2 focus:ring-success-500 cursor-pointer"
        />
        <label htmlFor="privacy" className="text-sm text-muted cursor-pointer">
          I agree to the{" "}
          <a
            href="/privacy-policy"
            className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 transition-colors"
          >
            privacy policy
          </a>
        </label>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-ghost-accent w-full"
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

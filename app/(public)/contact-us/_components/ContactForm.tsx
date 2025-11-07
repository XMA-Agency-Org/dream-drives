"use client";

import { useState, FormEvent } from "react";
import { Input, Textarea, Select, Checkbox } from "@/components/ui/form";
import Button from "@/components/ui/Button";
import { CheckCircle2 } from "lucide-react";

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
      <div className="bg-primary-subtle border border-primary rounded-2xl p-8 text-center">
        <div className="inline-flex items-center justify-center bg-primary/10 text-primary p-4 rounded-full mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-default mb-2">
          Thank You!
        </h3>
        <p className="text-muted mb-6">
          Your message has been received. Our team will get back to you shortly.
        </p>
        <Button
          variant="ghost-accent"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Full Name"
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />

        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="john@example.com"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="+971 50 123 4567"
        />

        <Select
          label="Vehicle Interest"
          id="vehicleInterest"
          name="vehicleInterest"
          value={formData.vehicleInterest}
          onChange={handleChange}
        >
          <option value="not-specified">Not Specified</option>
          <option value="luxury">Luxury Sedans</option>
          <option value="sports">Sports Cars</option>
          <option value="suv">Premium SUVs</option>
          <option value="economy">Economy Cars</option>
          <option value="special">Custom Request</option>
        </Select>
      </div>

      <Input
        label="Subject"
        id="subject"
        name="subject"
        type="text"
        value={formData.subject}
        onChange={handleChange}
        required
        placeholder="How can we help you?"
      />

      <Textarea
        label="Message"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        rows={5}
        placeholder="Tell us about your rental needs..."
      />

      {error && (
        <div className="bg-error-subtle border border-error text-error px-4 py-3 rounded-xl text-sm">
          {error}
        </div>
      )}

      <div className="flex items-start gap-3 pt-1">
        <Checkbox
          id="privacy"
          required
          className="mt-0.5"
        />
        <label htmlFor="privacy" className="text-sm text-muted cursor-pointer">
          I agree to the{" "}
          <a
            href="/privacy-policy"
            className="text-primary hover:text-primary-hover transition-colors"
          >
            privacy policy
          </a>
        </label>
      </div>

      <Button
        type="submit"
        variant="ghost-accent"
        fullWidth
        isLoading={isSubmitting}
      >
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

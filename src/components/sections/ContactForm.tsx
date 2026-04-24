'use client';

import { useState } from 'react';
import { Phone } from 'lucide-react';

interface Props {
  displayPhone: string;
  phoneTel: string;
}

export default function ContactForm({ displayPhone, phoneTel }: Props) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#1cdc38]" aria-hidden>
            <svg className="h-4 w-4 text-white" viewBox="0 0 12 12" fill="currentColor">
              <path d="M10.3 2.3a1 1 0 00-1.4 0L4.5 6.7 3.1 5.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4z" />
            </svg>
          </span>
          <p className="font-bold text-[#131a1c]">Thank you! We&apos;ll be in touch shortly.</p>
        </div>
        <p className="mb-4 text-sm text-[#414042]">For urgent requests, call us directly:</p>
        <a
          href={phoneTel}
          className="inline-flex items-center gap-2 rounded-full bg-[#1cdc38] px-6 py-3 text-sm font-bold text-[#414042] transition-colors hover:bg-[#0d402e] hover:text-white"
        >
          <Phone className="h-4 w-4" aria-hidden />
          {displayPhone}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Name */}
      <div className="mb-4">
        <label htmlFor="contact-name" className="mb-1.5 block text-sm font-medium text-[#131a1c]">
          Name<span className="text-[#1cdc38]">*</span>
        </label>
        <input
          id="contact-name"
          type="text"
          required
          placeholder="First name"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full rounded-lg border border-[#c8c8c8] bg-white px-4 py-3 text-sm text-[#414042] placeholder-[#aaa] outline-none transition focus:border-[#1cdc38] focus:ring-1 focus:ring-[#1cdc38]"
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="contact-phone" className="mb-1.5 block text-sm font-medium text-[#131a1c]">
          Phone number<span className="text-[#1cdc38]">*</span>
        </label>
        <input
          id="contact-phone"
          type="tel"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="w-full rounded-lg border border-[#c8c8c8] bg-white px-4 py-3 text-sm text-[#414042] placeholder-[#aaa] outline-none transition focus:border-[#1cdc38] focus:ring-1 focus:ring-[#1cdc38]"
        />
      </div>

      {/* Message */}
      <div className="mb-5">
        <label htmlFor="contact-message" className="mb-1.5 block text-sm font-medium text-[#131a1c]">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
          className="w-full resize-none rounded-lg border border-[#c8c8c8] bg-white px-4 py-3 text-sm text-[#414042] placeholder-[#aaa] outline-none transition focus:border-[#1cdc38] focus:ring-1 focus:ring-[#1cdc38]"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-full bg-[#414042] py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#131a1c] sm:text-[15px]"
      >
        Submit enquiry
      </button>

      {/* 24-hour guarantee */}
      <div className="mt-5 flex items-center gap-3 border-t border-[#e5e5e5] pt-5">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#1cdc38]" aria-hidden>
          <svg className="h-3.5 w-3.5 text-white" viewBox="0 0 12 12" fill="currentColor">
            <path d="M10.3 2.3a1 1 0 00-1.4 0L4.5 6.7 3.1 5.3a1 1 0 00-1.4 1.4l2 2a1 1 0 001.4 0l5-5a1 1 0 000-1.4z" />
          </svg>
        </span>
        <p className="text-sm font-medium text-[#414042] sm:text-[15px]">24 hour response time guarantee</p>
      </div>

      <p className="mt-3 text-xs text-[#888]">*required fields</p>
    </form>
  );
}

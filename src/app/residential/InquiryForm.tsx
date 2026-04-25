'use client';

import { SITE_CONFIG } from '@/lib/constants';

export default function InquiryForm() {
  return (
    <div className="mx-auto max-w-lg rounded-[20px] bg-[#F8F5F2] px-5 py-8 shadow-sm sm:max-w-xl sm:px-8 sm:py-10">
      <h2 className="mb-2 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px]">Get a free quote</h2>
      <p className="mb-6 text-center text-[14px] text-[#414042]">Tell us about your pest problem and we&apos;ll call you back within 2 hours.</p>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Your name *" required className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <input type="tel" placeholder="Phone number *" required className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <input type="text" placeholder="Suburb" className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <select className="w-full appearance-none rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] focus:border-[#3fa535] focus:outline-none">
          <option value="">Select pest type</option>
          <option>Ants</option>
          <option>Cockroaches</option>
          <option>Spiders</option>
          <option>Termites</option>
          <option>Rodents (Mice &amp; Rats)</option>
          <option>Bed Bugs</option>
          <option>Fleas</option>
          <option>Wasps &amp; Bees</option>
          <option>Possums</option>
          <option>Birds</option>
          <option>Silverfish</option>
          <option>Moths</option>
          <option>Other</option>
        </select>
        <textarea placeholder="Tell us more about the issue..." rows={3} className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none resize-none" />
        <button type="submit" className="w-full rounded-xl bg-[#3fa535] py-3.5 text-[16px] font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Request a Callback
        </button>
        <p className="text-center text-[11px] text-[#AFAAA4]">Or call us directly: <a href={SITE_CONFIG.phoneTel} className="font-semibold text-[#3fa535] underline">{SITE_CONFIG.phone}</a></p>
      </form>
    </div>
  );
}

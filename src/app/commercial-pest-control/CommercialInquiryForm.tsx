'use client';

import { SITE_CONFIG } from '@/lib/constants';

const INDUSTRIES = [
  'Restaurant / Café',
  'Supermarket / Grocery',
  'Warehouse / Storage',
  'Office / Commercial Property',
  'Aged Care / Hospital',
  'School / Education',
  'Government Building',
  'Food Manufacturing',
  'Hotel / Function Venue',
  'Retail / Shopping Centre',
  'Other',
] as const;

export default function CommercialInquiryForm() {
  return (
    <div className="mx-auto max-w-lg rounded-[20px] bg-[#F8F5F2] px-5 py-8 shadow-sm sm:max-w-xl sm:px-8 sm:py-10">
      <h2 className="mb-2 text-center text-[22px] font-bold text-[#131a1c] sm:text-[26px]">Get a commercial quote</h2>
      <p className="mb-6 text-center text-[14px] text-[#414042]">Tell us about your business and we&apos;ll tailor a pest management plan for you.</p>
      <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
        <input type="text" placeholder="Business name *" required className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <input type="text" placeholder="Contact name *" required className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <input type="tel" placeholder="Phone number *" required className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <input type="email" placeholder="Email address" className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none" />
        <select className="w-full appearance-none rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] focus:border-[#3fa535] focus:outline-none">
          <option value="">Select industry type</option>
          {INDUSTRIES.map((ind) => (
            <option key={ind}>{ind}</option>
          ))}
        </select>
        <textarea placeholder="Tell us about your premises and any current pest issues..." rows={3} className="w-full rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-[15px] text-[#414042] placeholder:text-[#AFAAA4] focus:border-[#3fa535] focus:outline-none resize-none" />
        <button type="submit" className="w-full rounded-xl bg-[#3fa535] py-3.5 text-[16px] font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]">
          Request a Site Assessment
        </button>
        <p className="text-center text-[11px] text-[#AFAAA4]">Or call us directly: <a href={SITE_CONFIG.phoneTel} className="font-semibold text-[#3fa535] underline">{SITE_CONFIG.phone}</a></p>
      </form>
    </div>
  );
}

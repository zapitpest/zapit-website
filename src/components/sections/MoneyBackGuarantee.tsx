export default function MoneyBackGuarantee() {
  return (
    <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#64FF01]/20 bg-[#0d402e] px-5 py-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#64FF01]">
        <span className="text-[16px] font-black leading-none text-[#0d402e]">200%</span>
      </div>
      <div>
        <p className="text-[14px] font-bold text-white">200% Money-Back Guarantee</p>
        <p className="text-[12px] leading-[1.5] text-white/70">
          Not satisfied after re-treatment? We&apos;ll refund 200% of your treatment cost — no questions asked.
        </p>
      </div>
    </div>
  );
}

export default function MoneyBackGuarantee() {
  return (
    <div className="mx-auto flex max-w-md items-center gap-3 rounded-2xl border border-[#64FF01]/20 bg-[#0d402e] px-5 py-4">
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#64FF01]">
        <svg className="h-7 w-7 text-[#0d402e]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" /></svg>
      </div>
      <div>
        <p className="text-[14px] font-bold text-white">Satisfaction Commitment</p>
        <p className="text-[12px] leading-[1.5] text-white/70">
          Not satisfied? We&apos;ll return to re-treat at no extra charge. Talk to us and we&apos;ll make it right.
        </p>
      </div>
    </div>
  );
}

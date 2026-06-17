export default function HeroSlider() {
  // Mobile-baked PNG: brand green bleeds full-width while the image stays at a
  // tasteful canvas width on desktop. lg:rounded-3xl + lg:my-6 gives it a framed
  // "card" treatment so it reads as a deliberate composition, not an orphan asset.
  return (
    <section className="w-full bg-[#0d402e] py-2 sm:py-3 lg:py-10">
      <div className="mx-auto w-full max-w-[560px] px-3 sm:px-4 lg:max-w-[640px] lg:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/residential/hero-cottage.png"
          alt="Protecting your family and home from pest damage and harm - 5 star Google rating"
          className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          loading="eager"
        />
      </div>
    </section>
  );
}

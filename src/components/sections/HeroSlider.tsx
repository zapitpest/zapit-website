export default function HeroSlider() {
  // Photography from the Figma design (House_02). Brand green bleeds full-width
  // while the image stays at a tasteful canvas width on desktop. The headline that
  // sits over this image in the design is not yet built as markup — see the audit.
  return (
    <section className="w-full bg-[#0d402e] py-2 sm:py-3 lg:py-10">
      <div className="mx-auto w-full max-w-[560px] px-3 sm:px-4 lg:max-w-[640px] lg:px-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/residential/hero-cottage.webp"
          alt="A Melbourne weatherboard home protected by Zapit pest control"
          className="h-auto w-full lg:rounded-3xl lg:shadow-2xl"
          loading="eager"
        />
      </div>
    </section>
  );
}

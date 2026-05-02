export default function HeroSlider() {
  return (
    <section className="w-full bg-[#0d402e]">
      <div className="w-full px-3 py-2 sm:px-4 sm:py-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/residential/hero-cottage.png"
          alt="Protecting your family and home from pest damage and harm - 5 star Google rating"
          className="h-auto w-full"
          loading="eager"
        />
      </div>
    </section>
  );
}

import { Button } from "./ui/button";

export default function Hero({ onOpenModal }) {
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

      {/* 🔥 LIGHTER background glow */}
      <div className="absolute w-[300px] h-[300px] bg-red-500/10 blur-[60px] rounded-full top-[-80px] left-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <div className="z-10 max-w-3xl">
        
        {/* Tagline */}
        <p className="text-sm text-gray-300 mb-4 tracking-wide uppercase">
          Anonymous hiring experiences
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold ">
          They said{" "}
          <span className="text-red-500">“we’ll get back to you”</span>.
          <br />
          They didn’t.
        </h1>

        {/* Subtext */}
        <p className="text-gray-300 mt-6 text-lg">
          Real stories from candidates who got ghosted after interviews.
        </p>

        {/* CTA */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onOpenModal}
            className="bg-[#AC1111] hover:bg-[#860E0E] text-white px-8 py-6 text-lg rounded-xl shadow-lg"
          >
            Tell your story
          </Button>

          <Button
            variant="outline"
            onClick={() => {
              document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-6 text-lg rounded-xl border-gray-500 text-gray-300 hover:bg-white/10"
          >
            See the data
          </Button>
        </div>

        {/* Trust */}
        <p className="text-xs text-gray-400 mt-4">
          Takes 30 seconds • No login • Anonymous
        </p>
      </div>
    </section>
  );
}
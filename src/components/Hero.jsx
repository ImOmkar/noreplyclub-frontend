import { motion } from "framer-motion";
import { Button } from "./ui/button";

export default function Hero({ onOpenModal }) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute w-[500px] h-[500px] bg-red-500/20 blur-[120px] rounded-full top-[-100px] left-1/2 -translate-x-1/2"></div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10 max-w-3xl"
      >
        {/* Tagline */}
        <p className="text-sm text-gray-400 mb-4 tracking-wide uppercase">
          Anonymous hiring experiences
        </p>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight glow">
          They said{" "}
          <span className="text-red-500">“we’ll get back to you”</span>.
          <br />
          They didn’t.
        </h1>

        {/* Subtext */}
        <p className="text-gray-400 mt-6 text-lg">
          Real stories from candidates who got ghosted after interviews.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={onOpenModal}
            className="bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg rounded-xl shadow-lg"
          >
            Tell your story
          </Button>

          <Button
            variant="outline"
            onClick={() => {
                document.getElementById("stats")?.scrollIntoView({ behavior: "smooth" });
              }}
            className="px-8 py-6 text-lg rounded-xl border-gray-600 text-gray-300 hover:bg-white/10"
          >
            See the data
          </Button>
        </div>

        {/* Micro trust text */}
        <p className="text-xs text-gray-500 mt-4">
          Takes 30 seconds • No login • Anonymous
        </p>
      </motion.div>
    </section>
  );
}
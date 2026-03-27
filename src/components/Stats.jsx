import { motion } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import API from "../lib/api";

export default function Stats() {
  const [stats, setStats] = useState(null);

  const fetchStories = useCallback(() => {
    API.get("/stats").then((res) => setStats(res.data));
  }, []);

  useEffect(() => {
    fetchStories()
  }, [fetchStories]);

  if (!stats) return null;

  const data = [
    { label: "Stories shared", value: stats.total },
    { label: "Ghosted after final round", value: stats.final_percent + "%" },
    { label: "Ghosted after verbal offer", value: stats.offer_percent + "%" },
    { label: "Avg wait before ghosting", value: "—" }, // skip for now
  ];

  return (
    <section id="stats" className="px-6 py-20 relative">
      
      <div className="absolute w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full top-10 left-1/2 -translate-x-1/2"></div>

      <div className="max-w-6xl mx-auto relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            This isn’t rare.
          </h2>
          <p className="text-gray-400 mt-4">
            Patterns from real candidate experiences.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur hover:bg-white/10 transition"
            >
              <h3 className="text-3xl font-bold text-white glow">
                {stat.value}
              </h3>
              <p className="text-gray-400 mt-2 text-sm">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
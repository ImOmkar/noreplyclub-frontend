import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import API from "../lib/api";

export default function StoryWall({ stories, onLoadMore, total, loading }) {

    return (
        <section className="px-6 py-20 max-w-6xl mx-auto">

            {/* Heading */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center mb-12"
            >
                <h2 className="text-3xl md:text-5xl font-bold">
                    You’re not the only one.
                </h2>
                <p className="text-gray-400 mt-4">
                    Real stories from people who got ghosted.
                </p>
            </motion.div>

            {/* Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stories.map((story, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur hover:bg-white/10 transition duration-300">

                            {/* Company */}
                            <p className="text-sm font-medium text-gray-300 mb-2">
                                {story.company}
                            </p>

                            {/* Story text */}
                            <p className="text-gray-200 text-lg leading-relaxed">
                                “{story.story}”
                            </p>

                            {/* Footer */}
                            <div className="mt-6 flex items-center justify-between">

                                <Badge className="bg-red-500/20 text-red-400 border-none">
                                    {story.stage}
                                </Badge>

                                <span className="text-xs text-gray-500">
                                    Anonymous
                                </span>
                            </div>

                        </Card>
                    </motion.div>
                ))}
            </div>
            {stories.length < total && (
                <div className="text-center mt-10">
                    <button
                        onClick={onLoadMore}
                        disabled={loading}
                        className={`px-6 py-3 rounded-xl text-sm transition 
                            ${loading 
                            ? "bg-white/5 text-gray-500 cursor-not-allowed" 
                            : "bg-white/10 hover:bg-white/20"
                            }`}
                        >
                        {loading ? "Loading..." : "Load more"}
                    </button>
                </div>
            )}
        </section>
    );
}
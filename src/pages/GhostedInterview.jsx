import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function GhostedInterview() {

    useEffect(() => {
        document.title = "Ghosted after interview? Share your experience";
    }, []);

    return (
        <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto text-center">

            <h1 className="text-3xl md:text-5xl font-bold">
                Ghosted after an interview?
            </h1>

            <p className="text-gray-400 mt-6 text-lg">
                You’re not the only one.
                Thousands of candidates never hear back after interviews.
            </p>

            <p className="text-gray-400 mt-4">
                No rejection. No update. Just silence.
            </p>

            <div className="mt-10">
                <Button
                    onClick={() => window.location.href = "/?openModal=true"}
                    className="bg-red-500 hover:bg-red-600 px-8 py-6 text-lg rounded-xl"
                >
                    Share your story
                </Button>
            </div>

        </main>
    );
}
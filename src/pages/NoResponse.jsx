import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function NoResponse() {
    useEffect(() => {
        document.title = "No response after interview? You're not alone";
    }, []);

    return (
        <main className="min-h-screen px-6 py-20 max-w-3xl mx-auto text-center">

            <h1 className="text-3xl md:text-5xl font-bold">
                No response after interview?
            </h1>

            <p className="text-gray-400 mt-6 text-lg">
                You cleared rounds. You waited.
                And then… nothing.
            </p>

            <p className="text-gray-400 mt-4">
                This happens more often than people think.
            </p>

            <div className="mt-10">
                <Button
                    onClick={() => window.location.href = "/?openModal=true"}
                    className="bg-red-500 hover:bg-red-600 px-8 py-6 text-lg rounded-xl"
                >
                    Tell your story
                </Button>
            </div>

        </main>
    );
}
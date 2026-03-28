import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "./ui/dialog";
import { Sheet, SheetContent } from "./ui/sheet";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";
import { motion } from "framer-motion";
import API from "../lib/api";
import { Button } from "./ui/button";

export default function SubmitModal({ open, setOpen, onSuccess }) {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    company: "",
    role: "",
    rounds: "",
    stage: "",
    story: "",
  });

  const [isMobile, setIsMobile] = useState(false);
  const [loading, setLoading] = useState(false);

  // detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // reset form when modal opens
  useEffect(() => {
    if (open) {
      setStep(1);
      setForm({
        company: "",
        role: "",
        rounds: "",
        stage: "",
        story: "",
      });
    }
  }, [open]);

  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const next = () => setStep((s) => s + 1);
  const prev = () => setStep((s) => s - 1);

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true)

    try {
      const res = await API.post("/report", form);

      // ✅ use backend response
      if (onSuccess) onSuccess(res.data);

      toast.success("Submitted 🚀", {
        description: "You’re now part of the No Reply Club.",
      });

      setStep(6);

      setTimeout(() => {
        setOpen(false);
      }, 1200);
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false)
    }
  };

  // 🔥 shared content (no duplication)
  const renderContent = () => (
    <div className="min-h-[250px] flex flex-col justify-between">

      {/* STEP 1 */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">
            Which company was this?
          </h2>
          <Input
            placeholder="e.g. TCS, Swiggy..."
            value={form.company}
            onChange={(e) => handleChange("company", e.target.value)}
          />
          <Button
            disabled={!form.company.trim()}
            className="mt-6 w-full"
            onClick={next}
          >
            Continue
          </Button>
        </motion.div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">
            What role did you apply for?
          </h2>
          <Input
            placeholder="Frontend Developer"
            value={form.role}
            onChange={(e) => handleChange("role", e.target.value)}
          />
          <div className="flex mt-6">
            <Button variant="outline" onClick={prev}>
              Back
            </Button>
            <Button
              disabled={!form.role.trim()}
              className="w-full"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">
            How many rounds did you clear?
          </h2>
          <Input
            type="number"
            placeholder="e.g. 3"
            value={form.rounds}
            onChange={(e) => handleChange("rounds", e.target.value)}
          />
          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={prev}>
              Back
            </Button>
            <Button
              disabled={!form.rounds || form.rounds <= 0}
              className="w-full"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 4 */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">
            Where did they ghost you?
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {["HR", "Technical", "Final", "Offer"].map((s) => (
              <Button
                key={s}
                variant={form.stage === s ? "default" : "outline"}
                onClick={() => handleChange("stage", s)}
              >
                {s}
              </Button>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={prev}>
              Back
            </Button>
            <Button
              disabled={!form.stage}
              className="w-full"
              onClick={next}
            >
              Continue
            </Button>
          </div>
        </motion.div>
      )}

      {/* STEP 5 */}
      {step === 5 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h2 className="text-xl font-semibold mb-4">
            What happened?
          </h2>

          <Textarea
            placeholder="Keep it short..."
            value={form.story}
            onChange={(e) => handleChange("story", e.target.value)}
          />

          <p className="text-xs text-gray-500 mt-2">
            {form.story.length}/300 characters
          </p>

          {form.story.length > 300 && (
            <p className="text-red-400 text-xs">Story too long</p>
          )}

          <div className="flex gap-3 mt-6">
            <Button variant="outline" onClick={prev}>
              Back
            </Button>
            <Button
              disabled={
                loading || 
                !form.story.trim() || 
                form.story.length > 300
              }
              className="w-full disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}>
              {loading ? "⏳ Submitting..." : "Submit"}
            </Button>
          </div>
        </motion.div>
      )}

      {/* SUCCESS */}
      {step === 6 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold">
            You’re now part of the No Reply Club.
          </h2>
          <p className="text-gray-400 mt-4">
            Your story helps others see the truth.
          </p>
        </motion.div>
      )}
    </div>
  );

  // 🔥 FINAL RENDER
  return isMobile ? (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="bottom"
        className="backdrop-blur-xl bg-black text-white rounded-t-3xl h-[90vh] p-0 border-none flex flex-col"
      >
        {/* Header */}
        <div className="pt-3 pb-2 flex flex-col items-center border-b border-white/10">
          <div className="w-12 h-1.5 bg-gray-600 rounded-full mb-3" />

          <div className="w-full px-4 flex justify-between items-center">
            <span className="text-sm text-gray-400">Anonymous</span>
            {/* <button
          onClick={() => setOpen(false)}
          className="text-gray-400 text-xl"
        >
          ×
        </button> */}
          </div>
        </div>

        {/* Content */}
        <div className="px-4">
          {renderContent()}
        </div>
      </SheetContent>
    </Sheet>
  ) : (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bg-black border border-white/10 text-white max-w-lg rounded-2xl">
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
}
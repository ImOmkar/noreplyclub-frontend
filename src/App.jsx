import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<main><Home /></main>} />

        {/* 🔥 Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          className: "bg-zinc-900 text-white border border-white/10",
        }}
      />
    </BrowserRouter>
  );
}

export default App;
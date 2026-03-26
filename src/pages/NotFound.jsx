import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-6 bg-black text-white">

      <h1 className="text-6xl font-bold mb-4">404</h1>

      <p className="text-gray-400 mb-6">
        This page doesn’t exist (just like HR replies).
      </p>

      <Link
        to="/"
        className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-xl">
        Go back home
      </Link>

    </div>
  );
}
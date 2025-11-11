import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-neutral-950 text-white">
      <h1 className="text-7xl font-bold text-red-500">404</h1>
      <p className="mt-4 text-xl text-white/70">This page doesn’t exist.</p>
      <Button className="mt-6" asChild>
        <Link to="/">Go back home</Link>
      </Button>
    </div>
  );
}

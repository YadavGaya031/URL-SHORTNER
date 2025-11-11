import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rocket, Heart } from "lucide-react";

export default function About() {
  return (
    <section className="container py-24 space-y-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">About Linkly</h1>
        <p className="text-lg text-white/70">
          We started Linkly with one idea: short links should be smart, secure,
          and beautiful. Built with cutting-edge AI and privacy-first analytics,
          Linkly helps thousands of creators and businesses share their world.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="bg-neutral-900 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-indigo-400" /> Community First
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/70">
            Built with developers and marketers in mind — every feature was
            requested by real users.
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="h-5 w-5 text-purple-400" /> Lightning Fast
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/70">
            Optimized with Groq + Mongo + Vite — sub-millisecond redirects and
            analytics that never slow you down.
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Heart className="h-5 w-5 text-pink-400" /> Built with Love
            </CardTitle>
          </CardHeader>
          <CardContent className="text-white/70">
            We obsess over details, polish every pixel, and write code we’re
            proud of. That’s Linkly.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

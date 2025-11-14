/* eslint-disable no-unused-vars */
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Rocket, Heart } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

function FeatureCard({ title, desc, Icon, colorFrom, colorTo }) {
  // motion values for subtle tilt based on cursor position
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-100, 100], [8, -8]);
  const rotateX = useTransform(mouseY, [-100, 100], [-8, 8]);
  const shadow = useTransform(rotateY, [-8, 8], ["0px 10px 30px rgba(2,6,23,0.6)", "0px 12px 40px rgba(20,24,40,0.65)"]);

  function handleMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, boxShadow: shadow }}
      whileHover={{ scale: 1.02 }}
      className="w-full rounded-2xl p-6 bg-linear-to-b from-slate-800/60 to-slate-900/60 border border-white/6"
    >
      <header className="flex items-start gap-4">
        <div className={`inline-flex items-center justify-center h-12 w-12 rounded-lg bg-linear-to-br ${colorFrom} ${colorTo} text-white shadow-inner`}>
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="mt-2 text-sm text-white/70 max-w-xs">{desc}</p>
        </div>
      </header>
    </motion.article>
  );
}

export default function About() {
  return (
    <section className="bg-linear-to-b from-slate-800/70 to-slate-700 py-16">
      <div className="container mx-auto px-14 mt-22">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">About Linkly</h1>
          <p className="mt-3 text-base text-white/70">Linkly makes short links smart, secure, and beautiful — trusted by creators and teams worldwide.</p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="p-0">
              <FeatureCard
                title="Community First"
                desc="Features shaped by real users — built for developers and marketers."
                Icon={Users}
                colorFrom="from-indigo-500"
                colorTo="to-purple-500"
              />
            </CardContent>
          </Card>

          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="p-0">
              <FeatureCard
                title="Lightning Fast"
                desc="Optimized for speed — instant redirects and lightweight analytics."
                Icon={Rocket}
                colorFrom="from-purple-500"
                colorTo="to-pink-500"
              />
            </CardContent>
          </Card>

          <Card className="bg-transparent border-transparent shadow-none">
            <CardContent className="p-0">
              <FeatureCard
                title="Built with Love"
                desc="Attention to detail, clean design, and code we’re proud to ship."
                Icon={Heart}
                colorFrom="from-pink-500"
                colorTo="to-rose-500"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

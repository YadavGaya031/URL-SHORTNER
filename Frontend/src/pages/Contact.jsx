import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="container py-24">
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Get in touch
        </h1>
        <p className="text-white/70 text-lg">
          Have a question or partnership idea? We’d love to hear from you.
        </p>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="max-w-xl mx-auto space-y-4 bg-neutral-900 border border-white/10 p-6 rounded-xl"
      >
        <Input placeholder="Your name" required />
        <Input placeholder="Your email" type="email" required />
        <Textarea placeholder="Your message" rows={5} required />
        <Button type="submit" className="w-full">
          Send message
        </Button>
      </form>

      <div className="max-w-xl mx-auto mt-12 space-y-4 text-white/70">
        <p className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-indigo-400" /> support@linkly.io
        </p>
        <p className="flex items-center gap-2">
          <Phone className="h-5 w-5 text-indigo-400" /> +91 90000 00000
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-indigo-400" /> Indore, M.P., India
        </p>
      </div>
    </section>
  );
}

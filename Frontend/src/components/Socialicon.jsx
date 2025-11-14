import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    href: "https://github.com/dashboard",
    icon: <Github className="w-8 h-8 text-cyan-900" />,
  },
  {
    href: "https://linkedin.com/in/nitish-kumar-748580296/", 
    icon: <Linkedin className="w-8 h-8 text-cyan-900" />,
  },
  {
    href: "mailto:kumarnitishbxr07@gmail.com",
    icon: <Mail className="w-8 h-8 text-cyan-800" />,
  },
];

export default function SocialIcons() {
  return (
    <div className="flex justify-center gap-6 mt-12">
      {socialLinks.map((item, index) => (
        <a
          key={index}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="p-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-full hover:border-red-500 hover:scale-110 transition-all duration-300"
        >
          {item.icon}
        </a>
      ))}
    </div>
  );
}

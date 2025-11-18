// export default function Loader() {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
//       <div className="h-10 w-10 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
//     </div>
//   );
// }


export default function Loader({ label = "Loading..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed inset-0 z-[100] grid place-items-center bg-neutral-950/70 backdrop-blur"
    >
      <div className="relative">
        {/* soft glow */}
        <div className="absolute -inset-6 rounded-full bg-[conic-gradient(from_0deg,rgba(245,158,11,0.20),rgba(244,63,94,0.20),rgba(16,185,129,0.16),rgba(245,158,11,0.20))] blur-3xl opacity-70 animate-pulse-slow" />

        {/* spinner */}
        <div className="relative w-28 h-28">
          {/* spinning gradient ring */}
          <div className="absolute inset-0 rounded-full p-[3px] bg-[conic-gradient(#f59e0b,#f43f5e,#10b981,#f59e0b)] animate-[spin_1.8s_linear_infinite]">
            <div className="w-full h-full rounded-full bg-neutral-950" />
          </div>

          {/* orbiting dot */}
          <div className="absolute inset-0 animate-[spin_1.8s_linear_infinite]">
            <span className="absolute top-0 left-1/2 -translate-x-1/2 h-2 w-2 rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
          </div>

          {/* center badge */}
          <div className="absolute inset-0 grid place-items-center">
            <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 grid place-items-center font-bold text-white tracking-tight">
              SL
            </div>
          </div>
        </div>

        {/* label + shimmer */}
        <div className="mt-5 text-center">
          <div className="relative mx-auto w-36 h-2 rounded-full bg-white/10 overflow-hidden">
            <span className="absolute inset-y-0 left-0 w-1/3 translate-x-[-100%] bg-gradient-to-r from-white/0 via-white/60 to-white/0 animate-shimmer" />
          </div>
          <p className="mt-3 text-sm text-zinc-300">{label}</p>
        </div>
      </div>

      {/* Local keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: .55; }
          50% { opacity: .9; }
        }
        .animate-pulse-slow { animation: pulseSlow 3s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-[spin_1.8s_linear_infinite],
          .animate-shimmer,
          .animate-pulse-slow { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
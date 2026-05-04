import { useEffect, useState, useRef } from 'react';
import saadAvatar from '@/assets/saad-avatar-nobg.png';

export default function Avatar3D() {
  const [visible, setVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    setTilt({ x: dy * -8, y: dx * 10 });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full aspect-square max-w-[260px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[480px] mx-auto transition-all duration-1000 ${
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
      style={{ perspective: '1000px' }}
    >
      {/* Outer rotating dashed ring */}
      <div
        className="absolute inset-0 rounded-full border-2 border-dashed border-primary/40 animate-[spin_20s_linear_infinite]"
        style={{ transform: 'scale(1.08)' }}
      />

      {/* Counter-rotating accent ring */}
      <div
        className="absolute inset-0 rounded-full border border-accent/50 animate-[spin_15s_linear_infinite_reverse]"
        style={{ transform: 'scale(1.14)', borderStyle: 'dotted', borderWidth: '2px' }}
      />

      {/* Glow halos */}
      <div className="absolute inset-0 rounded-full bg-primary/20 blur-3xl animate-pulse-glow" style={{ transform: 'scale(0.95)' }} />
      <div
        className="absolute inset-0 rounded-full bg-accent/20 blur-2xl animate-pulse-glow"
        style={{ transform: 'scale(0.85)', animationDelay: '1.5s' }}
      />

      {/* Tilting card with image */}
      <div
        className="relative w-full h-full rounded-full overflow-hidden transition-transform duration-200 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          background:
            'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.25), hsl(var(--accent) / 0.15) 50%, hsl(var(--background)) 100%)',
          boxShadow:
            '0 0 60px hsl(var(--primary) / 0.35), inset 0 0 40px hsl(var(--accent) / 0.15), 0 20px 50px -10px hsl(var(--primary) / 0.4)',
        }}
      >
        {/* Conic gradient border ring */}
        <div
          className="absolute inset-0 rounded-full opacity-70 animate-[spin_8s_linear_infinite]"
          style={{
            background:
              'conic-gradient(from 0deg, hsl(var(--primary)), transparent 25%, hsl(var(--accent)), transparent 50%, hsl(var(--primary)), transparent 75%, hsl(var(--accent)))',
            mask: 'radial-gradient(circle, transparent 92%, black 93%, black 100%)',
            WebkitMask: 'radial-gradient(circle, transparent 92%, black 93%, black 100%)',
          }}
        />

        {/* Inner soft backdrop */}
        <div className="absolute inset-[6%] rounded-full bg-gradient-to-br from-background via-card to-background" />

        {/* The avatar image */}
        <img
          src={saadAvatar}
          alt="Saad Shakil — SQA Engineer"
          className="absolute inset-[6%] w-[88%] h-[88%] object-cover object-top rounded-full"
          style={{ filter: 'brightness(1.05) contrast(1.05) saturate(1.1)' }}
        />

        {/* Inner highlight glow */}
        <div className="absolute inset-[6%] rounded-full pointer-events-none" style={{
          background: 'radial-gradient(circle at 30% 20%, hsl(var(--primary) / 0.18), transparent 50%)',
        }} />

        {/* Scanline overlay for tech feel */}
        <div
          className="absolute inset-[6%] rounded-full pointer-events-none opacity-20"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, hsl(var(--primary) / 0.15) 3px)',
          }}
        />
      </div>

      {/* Orbiting dots */}
      <div className="absolute inset-0 animate-[spin_12s_linear_infinite] pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary shadow-[0_0_15px_hsl(var(--primary))]" />
      </div>
      <div className="absolute inset-0 animate-[spin_18s_linear_infinite_reverse] pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-accent shadow-[0_0_15px_hsl(var(--accent))]" />
      </div>
      <div className="absolute inset-0 animate-[spin_25s_linear_infinite] pointer-events-none">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-primary/80 shadow-[0_0_10px_hsl(var(--primary))]" />
      </div>

      {/* Status badge */}
      <div className="absolute -bottom-1 sm:bottom-2 right-2 sm:right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full glass border border-primary/40 backdrop-blur-md">
        <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-400 animate-pulse-glow shadow-[0_0_8px_hsl(142_76%_45%)]" />
        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-foreground/90">ONLINE</span>
      </div>
    </div>
  );
}

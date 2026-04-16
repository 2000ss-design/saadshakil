import { useState, useCallback } from 'react';
import Avatar3D from './Avatar3D';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVoiceIntro = useCallback(() => {
    if (isPlaying || !('speechSynthesis' in window)) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(
      "Hi, I'm Saad Shakil. A certified SQA Engineer with over 3.5 years of experience in software quality assurance. I specialize in test automation, performance testing, and API testing. Let's build quality software together!"
    );
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    speechSynthesis.speak(utterance);
  }, [isPlaying]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,hsl(var(--primary)/0.02)_50%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 grid md:grid-cols-2 gap-6 md:gap-8 items-center pt-20 pb-8">
        <div className="space-y-4 sm:space-y-6 text-center md:text-left order-2 md:order-1">
          <div className="inline-block px-3 py-1 rounded-full glass border border-primary/30 text-primary font-mono text-[10px] sm:text-xs tracking-widest opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            ⚡ PLAYER 1 READY
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-foreground">Saad</span>{' '}
            <span className="gradient-text">Shakil</span>
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto md:mx-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            SQA Engineer — Certified by ISTQB & PSTB with 3.5+ years of experience in quality assurance & test automation.
          </p>
          <div className="flex gap-3 sm:gap-4 justify-center md:justify-start flex-wrap opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a href="#projects" className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm sm:text-base hover:opacity-90 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5">
              View Projects
            </a>
            <a href="#contact" className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg glass glow-border text-foreground font-medium text-sm sm:text-base hover:border-primary/50 transition-all hover:-translate-y-0.5">
              Get in Touch
            </a>
            <button
              onClick={playVoiceIntro}
              disabled={isPlaying}
              className="px-4 sm:px-5 py-2.5 sm:py-3 rounded-lg glass glow-border text-foreground font-medium text-sm sm:text-base hover:border-primary/50 transition-all flex items-center gap-2 disabled:opacity-60 hover:-translate-y-0.5"
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  Speaking...
                </>
              ) : (
                <>🎙 Voice Intro</>
              )}
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <Avatar3D />
        </div>
      </div>

      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] sm:text-xs tracking-widest font-mono">SCROLL ▼</span>
        <div className="w-px h-6 sm:h-8 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
}

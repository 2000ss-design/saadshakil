import { useState, useCallback } from 'react';
import Avatar3D from './Avatar3D';

export default function HeroSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  const playVoiceIntro = useCallback(() => {
    if (isPlaying || !('speechSynthesis' in window)) return;
    setIsPlaying(true);
    const utterance = new SpeechSynthesisUtterance(
      "Hi, I'm Saad Shakil. An ISTQB-certified, fintech-focused SQA Engineer with over 4 years of experience in automation and performance testing. I specialize in API validation, ATM transaction flows, and instant payment systems like Raast. I build automation frameworks with Playwright and Cypress, and optimize system performance using JMeter and simulators like PaySim and FimSIM. Let's build reliable fintech software together!"
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
        <div className="absolute top-1/4 -left-32 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-48 sm:w-96 h-48 sm:h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,hsl(var(--primary)/0.02)_50%)] bg-[length:100%_4px] animate-[scanline_8s_linear_infinite]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-center pt-16 sm:pt-20 pb-6">
        {/* Avatar - always on top on mobile */}
        <div className="w-full flex justify-center md:order-2 py-2 sm:py-4">
          <Avatar3D />
        </div>

        {/* Text content */}
        <div className="space-y-3 sm:space-y-5 text-center md:text-left md:order-1">
          <div className="inline-block px-3 py-1 rounded-full glass border border-primary/30 text-primary font-mono text-[10px] sm:text-xs tracking-widest opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            ⚡ PLAYER 1 READY
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-foreground">Saad</span>{' '}
            <span className="gradient-text">Shakil</span>
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto md:mx-0 opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            ISTQB-certified <span className="text-primary font-semibold">fintech-focused SQA Engineer</span> with 4+ years in automation & performance testing — Playwright, Cypress, JMeter, Raast, ATM flows & PaySim/FimSIM simulators.
          </p>
          <div className="flex gap-2 sm:gap-3 justify-center md:justify-start flex-wrap opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a href="#projects" className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg bg-primary text-primary-foreground font-medium text-xs sm:text-sm hover:opacity-90 transition-all hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:-translate-y-0.5">
              View Projects
            </a>
            <a href="#contact" className="px-3 sm:px-5 py-2 sm:py-2.5 rounded-lg glass glow-border text-foreground font-medium text-xs sm:text-sm hover:border-primary/50 transition-all hover:-translate-y-0.5">
              Get in Touch
            </a>
            <button
              onClick={playVoiceIntro}
              disabled={isPlaying}
              className="px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg glass glow-border text-foreground font-medium text-xs sm:text-sm hover:border-primary/50 transition-all flex items-center gap-1.5 disabled:opacity-60 hover:-translate-y-0.5"
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
      </div>

      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-[10px] sm:text-xs tracking-widest font-mono">SCROLL ▼</span>
        <div className="w-px h-5 sm:h-8 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
}

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
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      </div>

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center pt-20">
        {/* Text */}
        <div className="space-y-6 text-center md:text-left order-2 md:order-1">
          <p className="text-primary font-mono text-sm tracking-widest opacity-0 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            HELLO, I'M
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <span className="text-foreground">Saad</span>{' '}
            <span className="gradient-text">Shakil</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg opacity-0 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            SQA Engineer — Certified by ISTQB & PSTB with 3.5+ years of experience in quality assurance & test automation.
          </p>
          <div className="flex gap-4 justify-center md:justify-start flex-wrap opacity-0 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <a href="#projects" className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 rounded-lg glass glow-border text-foreground font-medium hover:border-primary/50 transition-colors">
              Get in Touch
            </a>
            <button
              onClick={playVoiceIntro}
              disabled={isPlaying}
              className="px-5 py-3 rounded-lg glass glow-border text-foreground font-medium hover:border-primary/50 transition-all flex items-center gap-2 disabled:opacity-60"
            >
              {isPlaying ? (
                <>
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
                  Speaking...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.08" />
                  </svg>
                  🎙 Voice Intro
                </>
              )}
            </button>
          </div>
        </div>

        {/* 3D Avatar */}
        <div className="order-1 md:order-2">
          <Avatar3D />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
        <span className="text-xs tracking-widest">SCROLL</span>
        <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent animate-pulse-glow" />
      </div>
    </section>
  );
}

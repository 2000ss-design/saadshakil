import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div ref={ref} className={`text-center mb-16 space-y-3 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="flex items-center justify-center gap-4 mb-2">
        <div className={`h-px bg-gradient-to-r from-transparent to-primary transition-all duration-1000 ${isVisible ? 'w-16' : 'w-0'}`} />
        <span className="text-primary font-mono text-xs tracking-[0.3em] uppercase">{'<'}{title}{' />'}</span>
        <div className={`h-px bg-gradient-to-l from-transparent to-primary transition-all duration-1000 ${isVisible ? 'w-16' : 'w-0'}`} />
      </div>
      <h2 className="text-3xl md:text-4xl font-bold">
        <span className="gradient-text">{title}</span>
      </h2>
      {subtitle && <p className="text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

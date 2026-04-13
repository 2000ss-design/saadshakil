import SectionHeading from './SectionHeading';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <SectionHeading title="About Me" subtitle="Passionate about building things that live on the internet." />
        <div className="glass rounded-2xl p-8 md:p-12 glow-border space-y-4 text-secondary-foreground leading-relaxed">
          <p>
            I'm Saad Shakil — a full-stack developer who thrives at the intersection of design and engineering.
            With expertise spanning modern web technologies, cloud infrastructure, and creative problem-solving,
            I build performant, accessible, and visually compelling applications.
          </p>
          <p>
            My journey in tech has taken me through startups and enterprises alike, where I've shipped products
            used by thousands. I'm driven by curiosity, a love for clean code, and the belief that great
            software should feel effortless.
          </p>
        </div>
      </div>
    </section>
  );
}

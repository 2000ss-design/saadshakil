import SectionHeading from './SectionHeading';
import ScrollReveal from './ScrollReveal';

export default function AboutSection() {
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <ScrollReveal>
          <SectionHeading title="About Me" subtitle="Ensuring software quality, one test at a time." />
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <div className="glass rounded-2xl p-8 md:p-12 glow-border space-y-4 text-secondary-foreground leading-relaxed">
            <p>
              I'm Saad Shakil — a certified SQA Engineer from ISTQB and PSTB with over 3.5+ years of experience
              helping companies improve software quality and reliability. Based in Karachi, Pakistan, I specialize
              in test planning, execution, defect identification, and automation.
            </p>
            <p>
              I hold a Bachelor's in Computer Science from Dawood University of Engineering & Technology.
              My expertise spans manual and automated testing, performance testing, API testing, and blockchain
              transaction testing. I'm committed to continuous learning and delivering exceptional results
              in fast-paced environments.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

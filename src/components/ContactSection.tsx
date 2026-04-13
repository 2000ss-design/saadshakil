import SectionHeading from './SectionHeading';

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding bg-secondary/20">
      <div className="container mx-auto max-w-2xl text-center">
        <SectionHeading title="Get in Touch" subtitle="I'm always open to new opportunities and collaborations." />
        <div className="glass rounded-2xl p-8 md:p-12 glow-border space-y-6">
          <p className="text-muted-foreground">
            Whether you have a project in mind, want to collaborate, or just want to say hello — feel free to reach out.
          </p>
          <a
            href="mailto:saad@example.com"
            className="inline-block px-8 py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity"
          >
            Say Hello
          </a>
          <div className="flex justify-center gap-6 pt-4">
            {['GitHub', 'LinkedIn', 'Twitter'].map((platform) => (
              <a key={platform} href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {platform}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

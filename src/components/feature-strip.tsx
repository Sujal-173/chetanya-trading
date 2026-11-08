import { valuePillars } from "@/content/site-content";

export function FeatureStrip() {
  return (
    <section className="feature-strip" aria-label="Our principles">
      <div className="container feature-strip__grid">
        {valuePillars.map((item) => {
          const Icon = item.icon;
          return (
            <div className="feature-item" key={item.title}>
              <span className="feature-item__icon"><Icon size={23} strokeWidth={1.8} aria-hidden="true" /></span>
              <span className="feature-item__copy"><strong>{item.title}</strong><small>{item.text}</small></span>
            </div>
          );
        })}
      </div>
    </section>
  );
}

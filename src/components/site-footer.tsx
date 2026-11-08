import Link from "next/link";
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { navigation, services } from "@/content/site-content";
import { siteConfig } from "@/config/site";
import { BrandLogo } from "@/components/logo";
import { FooterConsultationButton } from "@/components/footer-consultation-button";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const hasSocial = siteConfig.social.linkedin || siteConfig.social.instagram || siteConfig.social.youtube;

  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div className="footer-brand">
          <BrandLogo compact />
          <p>Research-led market perspectives, practical trading discussions and a disciplined approach to market decisions.</p>
          {hasSocial ? (
            <div className="footer-social" aria-label="Social media links">
              {siteConfig.social.linkedin ? <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><ExternalLink size={17} /></a> : null}
              {siteConfig.social.instagram ? <a href={siteConfig.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><ExternalLink size={17} /></a> : null}
              {siteConfig.social.youtube ? <a href={siteConfig.social.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"><ExternalLink size={17} /></a> : null}
            </div>
          ) : null}
        </div>
        <div className="footer-column">
          <h3>Explore</h3>
          {navigation.map((item) => <Link href={item.href} key={item.href}>{item.label}</Link>)}
        </div>
        <div className="footer-column">
          <h3>Our Services</h3>
          {services.map((item) => <Link href="/services" key={item.title}>{item.title}</Link>)}
        </div>
        <div className="footer-column footer-contact">
          <h3>Contact Information</h3>
          {siteConfig.phone ? <a href={`tel:${siteConfig.phone.replace(/\s+/g, "")}`}><Phone size={16} />{siteConfig.phone}</a> : null}
          {siteConfig.email ? <a href={`mailto:${siteConfig.email}`}><Mail size={16} />{siteConfig.email}</a> : null}
          <span><MapPin size={16} />{siteConfig.city}, {siteConfig.region}, {siteConfig.country}</span>
          {!siteConfig.phone && !siteConfig.email ? <p>Use the enquiry form to start a conversation with our team.</p> : null}
        </div>
        <div className="footer-action">
          <h3>Start a Conversation</h3>
          <p>Tell us what you would like to discuss. We&apos;ll review your enquiry and respond using your preferred contact details.</p>
          <FooterConsultationButton />
        </div>
      </div>
      <div className="footer-bottom container">
        <p>© {year} {siteConfig.name}. All rights reserved.</p>
        <nav aria-label="Legal links">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/disclaimer">Disclaimer</Link>
        </nav>
        <span className="footer-credit">Built for clarity. Designed for every screen.</span>
      </div>
    </footer>
  );
}

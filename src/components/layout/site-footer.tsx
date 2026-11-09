import Link from "next/link";
import { absoluteUrl, siteConfig, socialLinks } from "@/config/site";
import { services } from "@/content/services";
import { Logo } from "./logo";

export function SiteFooter() {
  const { contact, legal } = siteConfig;
  const { regulatory } = legal;
  const year = new Date().getFullYear();
  const hasContact = Boolean(contact.email || contact.phone);

  return (
    <footer className="site-footer theme-dark">
      <div className="container">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo />
            <p>{siteConfig.description}</p>
            {socialLinks.length > 0 ? (
              <ul className="site-footer__social" aria-label="Social media">
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {link.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Company" className="site-footer__col">
            <h2 className="site-footer__heading">Company</h2>
            <ul>
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Services" className="site-footer__col">
            <h2 className="site-footer__heading">Services</h2>
            <ul>
              {services.map((service) => (
                <li key={service.slug}>
                  <Link href={`/services#${service.slug}`}>{service.title}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="site-footer__col">
            <h2 className="site-footer__heading">Contact</h2>
            <address>
              {contact.email ? (
                <p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </p>
              ) : null}
              {contact.phone && contact.phoneHref ? (
                <p>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </p>
              ) : null}
              <p>
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
                <span className="block">
                  {contact.city}, {contact.region}
                  {contact.postalCode ? ` ${contact.postalCode}` : ""}
                </span>
                <span className="block">{contact.country}</span>
              </p>
              {contact.hours ? <p>{contact.hours}</p> : null}
            </address>
            {!hasContact ? (
              <p>
                <Link href="/contact">Send an enquiry</Link>
              </p>
            ) : null}
          </div>
        </div>

        <div className="site-footer__disclosure">
          <h2 className="site-footer__heading">Risk disclosure</h2>
          <p>
            Trading and investing in securities involve risk, including the loss of capital. Past
            performance does not indicate future results, and nothing on this website guarantees any
            outcome. Content on this website is general information and is not a personalised
            recommendation to buy, sell or hold any security. Read the full{" "}
            <Link href="/disclaimer">risk disclosure</Link>.
          </p>
          {regulatory.registrationNumber ? (
            <p>
              {regulatory.authority}
              {regulatory.registrationType ? ` ${regulatory.registrationType}` : ""} registration number:{" "}
              {regulatory.registrationNumber}
            </p>
          ) : null}
        </div>

        <div className="site-footer__bottom">
          <p>
            &copy; {year} {legal.legalName ?? siteConfig.name}. All rights reserved.
            {legal.registeredAddress ? ` Registered address: ${legal.registeredAddress}.` : ""}
          </p>
          <ul>
            {siteConfig.footerLinks.legal.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
          <p className="site-footer__credit">
            Designed &amp; developed by{" "}
            <br />
            <a
              className="site-footer__credit-link"
              href="https://aventracreative.in"
              target="_blank"
              rel="noopener noreferrer"
            >
              Sujal Patidar (Aventra Creative) , Indore
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

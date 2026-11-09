import { siteConfig, socialLinks } from "@/config/site";

/** Renders only the details the business has actually configured. */
export function ContactDetails() {
  const { contact } = siteConfig;
  const hasDirect = Boolean(contact.email || contact.phone || contact.whatsapp);

  return (
    <dl className="details">
      {contact.email ? (
        <div>
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
          </dd>
        </div>
      ) : null}
      {contact.phone && contact.phoneHref ? (
        <div>
          <dt>Phone</dt>
          <dd>
            <a href={contact.phoneHref}>{contact.phone}</a>
          </dd>
        </div>
      ) : null}
      {contact.whatsapp ? (
        <div>
          <dt>WhatsApp</dt>
          <dd>
            <a href={`https://wa.me/${contact.whatsapp}`} target="_blank" rel="noopener noreferrer">
              Message us on WhatsApp<span className="sr-only"> (opens in a new tab)</span>
            </a>
          </dd>
        </div>
      ) : null}
      <div>
        <dt>Office</dt>
        <dd>
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
        </dd>
      </div>
      {contact.hours ? (
        <div>
          <dt>Business hours</dt>
          <dd>{contact.hours}</dd>
        </div>
      ) : null}
      {socialLinks.length > 0 ? (
        <div>
          <dt>Follow</dt>
          <dd className="details__social">
            {socialLinks.map((link) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ))}
          </dd>
        </div>
      ) : null}
      {!hasDirect ? (
        <div>
          <dt>Reply</dt>
          <dd>Send the form and we will reply using the details you share.</dd>
        </div>
      ) : null}
    </dl>
  );
}

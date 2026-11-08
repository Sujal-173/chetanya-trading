import { MessageCircle } from "lucide-react";
import { siteConfig } from "@/config/site";

export function WhatsAppShortcut() {
  if (!siteConfig.whatsapp) return null;
  const message = encodeURIComponent(
    "Hello chaitanya Trading Consultancy, I would like to make an enquiry.",
  );
  return (
    <a
      className="whatsapp-shortcut"
      href={`https://wa.me/${siteConfig.whatsapp}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message chaitanya Trading Consultancy on WhatsApp"
    >
      <MessageCircle size={24} aria-hidden="true" />
    </a>
  );
}

type JsonLdValue = Record<string, unknown>;

/**
 * Renders JSON-LD. The "<" escape prevents a string inside the data from
 * closing the script tag (XSS), as recommended in the Next.js docs.
 */
export function JsonLd({ data }: { data: JsonLdValue | JsonLdValue[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}

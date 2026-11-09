import "server-only";

const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;
const FORMULA_TRIGGER = /^[=+\-@\t\r]/;

/** Normalise text and cap its length. Newlines are kept only when asked for. */
export function cleanText(value: string, max: number, keepNewlines = false): string {
  let text = value.normalize("NFKC").replace(CONTROL_CHARS, "");
  text = keepNewlines
    ? text.replace(/\r\n?/g, "\n").replace(/\n{3,}/g, "\n\n")
    : text.replace(/\s+/g, " ");
  return text.trim().slice(0, max);
}

/**
 * Spreadsheet cells that start with = + - @ can execute as formulas when the
 * sheet is exported and opened in Excel. A leading apostrophe forces text.
 */
export function neutraliseFormula(value: string): string {
  return FORMULA_TRIGGER.test(value) ? `'${value}` : value;
}

/** Strip anything that could leak through logs: keep short, single-line text. */
export function safeErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);
  return message.replace(/\s+/g, " ").slice(0, 200);
}

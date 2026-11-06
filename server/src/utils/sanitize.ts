/**
 * Input sanitization utility
 * Removes dangerous characters, scripts, and normalizes user input.
 */

export function sanitizeString(val: unknown, maxLength = 500): string {
  if (typeof val !== 'string') return '';
  return val
    .replace(/[<>]/g, '') // Strip HTML tags
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '') // Strip control chars
    .trim()
    .slice(0, maxLength);
}

export function sanitizeMobile(val: unknown): string {
  if (typeof val !== 'string' && typeof val !== 'number') return '';
  return String(val).replace(/\D/g, '').slice(0, 10);
}

export function sanitizeAmount(val: unknown): number {
  if (typeof val === 'number') return Math.max(0, Math.floor(val));
  if (typeof val === 'string') {
    const cleaned = parseInt(val.replace(/[^0-9]/g, ''), 10);
    return isNaN(cleaned) ? 0 : cleaned;
  }
  return 0;
}

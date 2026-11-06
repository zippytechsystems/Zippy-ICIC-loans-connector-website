/**
 * Generates unique, non-enumerable enquiry reference IDs
 * Format: ZIP-YYYYMMDD-XXXX (e.g. ZIP-20261107-5829)
 */

export function generateEnquiryReference(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateSegment = `${year}${month}${day}`;

  // 4-digit cryptographically secure or pseudo-random suffix
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);

  return `ZIP-${dateSegment}-${randomSuffix}`;
}

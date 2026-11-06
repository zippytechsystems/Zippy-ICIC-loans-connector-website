import type { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  // Handle Zod schema validation errors
  if (err instanceof ZodError) {
    const formattedErrors: Record<string, string> = {};
    for (const issue of err.issues) {
      const field = issue.path.join('.') || 'root';
      formattedErrors[field] = issue.message;
    }

    res.status(400).json({
      success: false,
      error: 'VALIDATION_ERROR',
      message: 'Invalid loan enquiry details. Please review and correct the errors.',
      details: formattedErrors
    });
    return;
  }

  // Handle JSON parsing errors
  if ('type' in err && (err as { type: string }).type === 'entity.parse.failed') {
    res.status(400).json({
      success: false,
      error: 'BAD_REQUEST',
      message: 'Malformed JSON payload in request body.'
    });
    return;
  }

  // General server errors (do not leak stack traces or internal secrets)
  console.error('[UNHANDLED_ERROR]', err.message);

  res.status(500).json({
    success: false,
    error: 'INTERNAL_SERVER_ERROR',
    message: 'An internal error occurred while processing your loan enquiry. Please try again or reach out directly via WhatsApp (+91 63026 90251).'
  });
}

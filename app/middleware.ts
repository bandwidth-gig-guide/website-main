import type { NextRequest } from 'next/server';
import { reservedUuidRedirect } from './middleware/reservedUuidRedirect';

export function middleware(req: NextRequest) {
  return reservedUuidRedirect(req);
}

export const config = {
  matcher: ['/:path*'],
};

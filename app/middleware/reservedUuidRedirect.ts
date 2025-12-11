import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { RESERVED_UUIDS } from '@/constants';

export function reservedUuidRedirect(req: NextRequest) {
  const url = req.nextUrl.clone();
  const segments = url.pathname.split('/').filter(Boolean);
  const queryParams = Array.from(url.searchParams.values());

  if (segments.some(seg => RESERVED_UUIDS.includes(seg)) || 
      queryParams.some(param => RESERVED_UUIDS.includes(param))) {
    url.pathname = '/';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './core/i18n/routing';

const isDev = process.env.NODE_ENV !== 'production';

// In production, use full next-intl middleware
// In dev with single locale, use minimal custom middleware for performance
const intlMiddleware = !isDev ? createMiddleware(routing) : null;

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_vercel') ||
    pathname.startsWith('/monitoring') ||
    pathname.startsWith('/healthcheck') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Extract locale from pathname
  const localeMatch = pathname.match(/^\/(en|es|ja)/);
  const locale = localeMatch ? localeMatch[1] : 'en';

  if (isDev) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    const response = NextResponse.rewrite(url);
    response.headers.set('x-locale', 'en');
    return response;
  }

  const response = intlMiddleware!(request);
  response.headers.set('x-locale', locale);
  return response;
}

export const config = {
  // More restrictive matcher - only match actual page routes
  // Excludes: api, _next, _vercel, static files, and common bot endpoints
  matcher: ['/((?!api|_next|_vercel|monitoring|healthcheck|.*\\..*).*)']
};

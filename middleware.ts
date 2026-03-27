import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  const pathname = request.nextUrl.pathname;

  // Unprotected routes
  const unprotectedRoutes = ['/login', '/register', '/'];

  // If accessing unprotected route, allow it
  if (unprotectedRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // For protected routes, check if user has token
  if (!token && !unprotectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};

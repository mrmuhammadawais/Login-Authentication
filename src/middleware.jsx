import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log("Middleware triggered:", pathname);
  console.log("Token:", token ? "Token found" : "No token found");

  if (!token && pathname !== '/login') {
    console.log('Redirecting to /login');
    return NextResponse.redirect(new URL('/login', req.url));
  }
  

  if (token && pathname === '/login') {
    console.log("Towards Dashboard");
    console.log('Redirecting to /dashboard');
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

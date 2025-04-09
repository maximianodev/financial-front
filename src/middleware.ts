import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { authValidate } from './lib/auth'

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('Authorization') ?? null
  const isAuthenticated = await authValidate(authToken?.value)

  if (isAuthenticated.status !== 200) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
}

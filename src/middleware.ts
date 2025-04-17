import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

import { authValidate } from './lib/auth'

export async function middleware(
  request: NextRequest
): Promise<NextResponse<unknown>> {
  const { redirect, next } = NextResponse
  const {
    nextUrl: { pathname, origin },
  } = request

  const cookie = await cookies()

  if (pathname.startsWith('/auth')) {
    cookie.delete('Authorization')
    return next()
  }

  const loginUrl = new URL('/auth/sign-in', origin)
  const authToken = cookie.get('Authorization') ?? null

  if (!authToken?.value?.length) {
    return redirect(loginUrl)
  }

  const isAuthenticated = await authValidate(authToken?.value)

  if (isAuthenticated.status !== 200) {
    return redirect(loginUrl)
  }

  return next()
}

export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

import { NextResponse, NextRequest } from 'next/server'
import { cookies } from 'next/headers'

import { authValidate } from './lib/auth'

export async function middleware({
  url,
}: NextRequest): Promise<NextResponse<unknown>> {
  const loginUrl = new URL('/login', url)
  const { redirect, next } = NextResponse

  const { get } = await cookies()
  const authToken = get('Authorization') ?? null

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
  matcher: '/((?!api|_next/static|_next/image|favicon.ico|login).*)',
}

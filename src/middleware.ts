import cors from 'cors';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    console.log('midlware')
    cors()
  return NextResponse.next()
}
 

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers'

export async function GET() {
cookies().set('test','toooooooooooooooooo')
  return Response.json({md:'kkkkkkkkkkkkkkk'});
}
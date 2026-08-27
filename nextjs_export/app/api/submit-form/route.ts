import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log('Form submission received:', body);
    return NextResponse.json({ success: true, status: 'success', message: 'Form received successfully' });
  } catch (error) {
    return NextResponse.json({ status: 'error', message: 'Failed to process form' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    const response = await fetch('https://gelataskia.prescribe.ng/clinician/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    const contentType = response.headers.get('content-type');
    const raw = await response.text();
    
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Unexpected response:', raw);
      return NextResponse.json(
        { message: 'Unexpected response from backend', raw },
        { status: 500 }
      );
    }
    
    const data = JSON.parse(raw);
    return NextResponse.json(data, { status: response.status });
    
  
  } catch (error) {
    console.error('Login API error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
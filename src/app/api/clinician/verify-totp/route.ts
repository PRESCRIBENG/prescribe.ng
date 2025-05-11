import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Get authorization header
    const authHeader = req.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'Missing or invalid token' }, { status: 401 });
    }
    
    const response = await fetch('https://gelataskia.prescribe.ng/clinician/verify_totp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authHeader, 
      },
      body: JSON.stringify(body),
    });
    
    const data = await response.json();
    
    // Return response
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('TOTP verification API error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request
    if (!body.email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }
    
    const response = await fetch('https://gelataskia.prescribe.ng/generate_password_reset_link', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: body.email }),
    });
    
    const data = await response.json();
    
    return NextResponse.json(
      data,
      { status: response.status }
    );
  } catch (error) {
    console.error('Error generating password reset link:', error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
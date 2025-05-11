import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request
    if (!body.email || !body.code || !body.newPassword || !body.newPasswordRepeat) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }
    
    if (body.newPassword !== body.newPasswordRepeat) {
      return NextResponse.json(
        { message: "Passwords do not match" },
        { status: 400 }
      );
    }

    const response = await fetch('https://gelataskia.prescribe.ng/change_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: body.email,
        code: body.code,
        newPassword: body.newPassword,
        newPasswordRepeat: body.newPasswordRepeat
      }),
    });
    
    const data = await response.json();
    
    // Return response
    return NextResponse.json(
      data,
      { status: response.status }
    );
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}

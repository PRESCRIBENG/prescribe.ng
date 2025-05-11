import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // authorization header
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Validate request
    if (!body.oldPassword || !body.newPassword || !body.newPasswordRepeat) {
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
        'Authorization': authHeader
      },
      body: JSON.stringify({
        oldPassword: body.oldPassword,
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
    console.error('Error changing password:', error);
    return NextResponse.json(
      { message: "An error occurred while processing your request" },
      { status: 500 }
    );
  }
}
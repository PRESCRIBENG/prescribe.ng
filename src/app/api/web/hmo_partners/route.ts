import { request } from 'http';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        // const body = await request.json()

    const response = await fetch('https://gelataskia.prescribe.ng/web/hmo_partners', {
     method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const data = await response.json()
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

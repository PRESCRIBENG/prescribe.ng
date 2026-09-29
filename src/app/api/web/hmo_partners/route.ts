// import { request } from 'http';
import { NextResponse } from 'next/server';
import { API_BASE_URL } from '@/app/lib/config';

export async function GET() {
    try {
        // const body = await request.json()

    const response = await fetch(`${API_BASE_URL}/web/hmo_partners`, {
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

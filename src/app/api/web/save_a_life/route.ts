import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const shareCode = searchParams.get('shareCode');

    if (shareCode===null) {
      //shareCode = 'all';
      return NextResponse.json({ message: 'Missing shareCode parameter' }, { status: 400 });
    }

    
    const response = await fetch(`https://gelataskia.prescribe.ng/web/save_a_life?shareCode=${encodeURIComponent(shareCode)}`, {
    //const response = await fetch(`http://127.0.0.1:5002/web/save_a_life?shareCode=${encodeURIComponent(shareCode)}`, {  //
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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
    console.error('Account Verification API error:', error);
    return NextResponse.json(
      { message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

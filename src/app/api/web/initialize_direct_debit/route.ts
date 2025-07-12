import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const accessCode = searchParams.get('accessCode');
    const Authorization = req.headers.get('Authorization'); // or 'Authorization'

    if (!accessCode) {
      return NextResponse.json({ message: 'Missing accessCode parameter' }, { status: 400 });
    }

    // Determine backend URL based on environment
    //const BASE_URL =
      //process.env.NODE_ENV === 'development'
        //? 'http://127.0.0.1:5002'
        //: 'https://gelataskia.prescribe.ng';

        //const response = await fetch(`${BASE_URL}/web/verify_account?accessCode=${encodeURIComponent(accessCode)}`, {
        //  method: 'GET',
        //  headers: {
        //    'Content-Type': 'application/json',
        //  },
        //});

    const response = await fetch(`https://gelataskia.prescribe.ng/web/initialize_direct_debit?accessCode=${encodeURIComponent(accessCode)}`, {
    //const response = await fetch(`http://127.0.0.1:5002/web/initialize_direct_debit?accessCode=${encodeURIComponent(accessCode)}`, {  
    method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${Authorization}`,
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

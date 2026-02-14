import { NextRequest, NextResponse } from 'next/server';

// 🔥 This is the magic: Increase the body size limit for this specific API route
export const config = {
    api: {
        bodyParser: {
            sizeLimit: '5mb', // Or higher if needed
        },
    },
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const response = await fetch('https://gelataskia.prescribe.ng/web/partner_signup', {
            //const response = await fetch('http://192.168.1.144:5002/web/partner_signup', {
            //const response = await fetch('http://127.0.0.1:5002/web/partner_signup', {
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

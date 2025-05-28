import { NextResponse } from "next/server";

export async function GET() {
    try {
    const response = await fetch ('https://gelataskia.prescribe.ng/web/pre_signup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    } catch (error) {
        console.error('Error fetching paystack', error)
        return NextResponse.json(
            {message: 'An error occurred while processing your request'},
            {status: 500}
        )
    }

        try {
    const response = await fetch ('https://gelataskia.prescribe.ng/web/pre_signup', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    } catch (error) {
        console.error('Error fetching paystack', error)
        return NextResponse.json(
            {message: 'An error occurred while processing your request'},
            {status: 500}
        )
    }
}
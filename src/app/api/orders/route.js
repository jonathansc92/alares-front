import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`${process.env.API_URL}/orders`);
    const data = await res.json();

    return NextResponse.json(data);
}

export async function POST(request) {

    const requestData = await request.json();

    const res = await fetch(`${process.env.API_URL}/orders`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: requestData.name,
            email: requestData.email,
            phone: requestData.phone,
            plan_id: requestData.plan_id
        }),
    })

    const data = await res.json();

    return NextResponse.json({ data });
}
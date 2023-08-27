import { NextResponse } from "next/server";

export async function GET() {
    const res = await fetch(`${process.env.API_URL}/plans`);
    const data = await res.json();

    return NextResponse.json(data);
}

export async function POST(request) {

    const requestData = await request.json();

    const res = await fetch(`${process.env.API_URL}/plans`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            speed: requestData.speed,
            price: requestData.price,
            wifi: requestData.wifi,
            movies: requestData.movies,
            games: requestData.games,
            best: requestData.best,
            giga: requestData.giga
        }),
    })

    const data = await res.json();

    return NextResponse.json({ data });
}
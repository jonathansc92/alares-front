import { NextResponse } from "next/server";

const url = 'http://localhost:8080/api';

export async function PUT(request, { params }) {
    const { id } = params;
    const requestData = await request.json();

    const res = await fetch(`${url}/plans/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            price: requestData.price,
            wifi: requestData.wifi,
            games: requestData.games,
            movies: requestData.movies,
            best: requestData.best,
            giga: requestData.giga,
            speed: requestData.speed
        }),
    })

    const data = await res.json();

    return NextResponse.json({ data });
}

export async function DELETE(request, { params }) {

    const { id } = params;

    const res = await fetch(`${url}/plans/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const data = await res.json()

    return NextResponse.json({ data })
}
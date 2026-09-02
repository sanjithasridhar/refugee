import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const lat = searchParams.get('lat') || '0';
    const lng = searchParams.get('lng') || '0';
    const type = searchParams.get('type') || 'help';

    // 1. Simulate a network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // 2. Generate fake data directly around your coordinates
    const baseLat = parseFloat(lat);
    const baseLng = parseFloat(lng);

    const mockData = {
        results: [
            {
                name: `City ${type} Center`,
                vicinity: "Main Street Plaza",
                geometry: { location: { lat: baseLat + 0.005, lng: baseLng + 0.005 } },
                rating: 4.8
            },
            {
                name: `Emergency ${type} Station`,
                vicinity: "Relief Avenue",
                geometry: { location: { lat: baseLat - 0.003, lng: baseLng - 0.004 } },
                rating: 4.2
            },
            {
                name: `Community Support (${type})`,
                vicinity: "Westside District",
                geometry: { location: { lat: baseLat + 0.008, lng: baseLng - 0.002 } },
                rating: 4.5
            }
        ]
    };

    // 3. Return the fake data
    return NextResponse.json(mockData);
}
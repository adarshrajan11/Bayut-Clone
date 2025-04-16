import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    // Extract all possible query parameters
    const query = searchParams.get('query') || 'developer jobs in chicago';
    const page = searchParams.get('page') || '1';
    const num_pages = searchParams.get('num_pages') || '1';
    const country = searchParams.get('country') || 'us';
    const date_posted = searchParams.get('date_posted') || 'all';

    try {
        const apiUrl = new URL('https://jsearch.p.rapidapi.com/search');
        apiUrl.searchParams.set('query', query);
        apiUrl.searchParams.set('page', page);
        apiUrl.searchParams.set('num_pages', num_pages);
        apiUrl.searchParams.set('country', country);
        apiUrl.searchParams.set('date_posted', date_posted);

        const response = await fetch(apiUrl.toString(), {
            headers: {
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY || '',
                'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data.data || data); // Handle different response formats
    } catch (error) {
        console.error('JSearch API Error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch jobs' },
            { status: 500 }
        );
    }
}
import { NextResponse } from 'next/server';

const NEWS_CDN_URL = 'https://d2hxvzw7msbtvt.cloudfront.net/news.json';

export async function GET() {
  try {
    const res = await fetch(NEWS_CDN_URL, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch news' },
        { status: res.status }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching news:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

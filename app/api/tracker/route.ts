import { NextResponse } from 'next/server';
import { getTrackerConfig } from '@/lib/trackerService';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const config = getTrackerConfig();
    return NextResponse.json(config, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || 'Failed to load tracker config' },
      { status: 500 }
    );
  }
}

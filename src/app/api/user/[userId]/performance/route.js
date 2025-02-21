import { connectDb } from '@/utils/connectDb';
import { NextResponse } from 'next/server';
import PerformanceMetrics from '@/models/Performance.model';

export async function GET(req, { params }) {
  await connectDb();

  try {
    const { userId } = params;

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    const performance = await PerformanceMetrics.find({ user_id: userId })
      .populate('project_id task_id');

    if (!performance || performance.length === 0) {
      return NextResponse.json({ error: 'No performance data found' }, { status: 404 });
    }

    return NextResponse.json({ performance }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

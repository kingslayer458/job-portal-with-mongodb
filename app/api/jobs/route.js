import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Job from '@/lib/models/Job';

export async function GET() {
  try {
    await dbConnect();
    const jobs = await Job.find({}).sort({ createdAt: -1 });
    return NextResponse.json(jobs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    await dbConnect();
    
    // Format the job description as an array if it's a single string
    let description = body.description;
    if (typeof description === 'string') {
      description = description.split('\n').filter(line => line.trim().length > 0);
    }
    
    // Calculate timeAgo field
    const timeAgo = '1h Ago'; // This would be calculated dynamically in a real app
    
    // Create the job with the updated data
    const job = await Job.create({
      ...body,
      description,
      timeAgo
    });
    
    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

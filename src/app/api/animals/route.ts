import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function GET() {
  return NextResponse.json(db.animals.getAll());
}

export async function POST(request: Request) {
  const body = await request.json();
  const newAnimal = db.animals.add(body);
  return NextResponse.json(newAnimal, { status: 201 });
}

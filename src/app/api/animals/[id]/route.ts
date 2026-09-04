import { NextResponse } from 'next/server';
import { db } from '@/lib/store';

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  db.animals.remove(params.id);
  return NextResponse.json({ success: true });
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const body = await request.json();
  const updated = db.animals.update(params.id, body);
  if (updated) return NextResponse.json(updated);
  return NextResponse.json({ error: 'Not found' }, { status: 404 });
}

import { NextResponse } from 'next/server';
import Budget from '@/models/Budget';
import dbConnect from '@/lib/db';

export async function GET() {
  await dbConnect();
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  
  const budgets = await Budget.find({ 
    month: currentMonth,
    year: currentYear 
  });
  return NextResponse.json(budgets);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const budget = await Budget.create(body);
  return NextResponse.json(budget, { status: 201 });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await Budget.findByIdAndDelete(id);
  return NextResponse.json({ message: 'Budget deleted' });
}
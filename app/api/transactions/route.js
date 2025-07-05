import Transaction from '@/models/Transaction';
import dbConnect from '@/lib/db';

export async function GET() {
  await dbConnect();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(request) {
  await dbConnect();
  const body = await request.json();
  const transaction = await Transaction.create(body);
  return Response.json(transaction, { status: 201 });
}

export async function DELETE(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  await Transaction.findByIdAndDelete(id);
  return Response.json({ message: 'Transaction deleted' });
}
export async function PUT(request) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const body = await request.json();
  
  try {
    const updatedTransaction = await Transaction.findByIdAndUpdate(id, body, { new: true });
    return Response.json(updatedTransaction);
  } catch (error) {
    return Response.json({ error: 'Failed to update transaction' }, { status: 400 });
  }
}
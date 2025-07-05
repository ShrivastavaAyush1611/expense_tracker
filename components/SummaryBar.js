'use client';

export default function SummaryBar({ transactions }) {
  // Calculate totals
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return (
    <div className="bg-white rounded-lg shadow p-6 mb-6">
      <h1 className="text-4xl text-blue-700 flex justify-center font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text  mb-2">
            Expense Tracker Dashboard
      </h1>
      <p className="text-gray-600 mb-6 flex justify-center gap-y-2">Track your income and expenses, visualize spending patterns, and take control of your finances.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-green-800">Total Income</h3>
          <p className="text-2xl font-bold text-green-600">₹{totalIncome.toFixed(2)}</p>
        </div>
        
        <div className="bg-red-50 p-4 rounded-lg">
          <h3 className="text-sm font-medium text-red-800">Total Expenses</h3>
          <p className="text-2xl font-bold text-red-600">₹{totalExpenses.toFixed(2)}</p>
        </div>
        
        <div className={`p-4 rounded-lg ₹{netBalance >= 0 ? 'bg-blue-50' : 'bg-orange-50'}`}>
          <h3 className="text-sm font-medium">Net Balance</h3>
          <p className={`text-2xl font-bold ₹{netBalance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
            ₹{netBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}
'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function BudgetChart({ budgets, transactions }) {
  
  const chartData = budgets.map(budget => {
    const spent = transactions
      .filter(t => t.category === budget.category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      name: budget.category,
      budget: budget.amount,
      spent: spent,
      remaining: Math.max(0, budget.amount - spent)
    };
  });

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`₹${value.toFixed(2)}`, 'Amount']}
          />
          <Legend />
          <Bar dataKey="budget" fill="#8884d8" name="Budget" />
          <Bar dataKey="spent" fill="#82ca9d" name="Spent" />
          <Bar dataKey="remaining" fill="#ffc658" name="Remaining" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
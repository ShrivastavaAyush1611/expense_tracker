'use client';
import { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function MonthlyChart({ transactions }) {
  const processData = () => {
    const monthlyData = {};
    
    transactions.forEach(transaction => {
      if (transaction.type === 'expense') {
        const month = new Date(transaction.date).toLocaleString('default', { month: 'short' });
        monthlyData[month] = (monthlyData[month] || 0) + transaction.amount;
      }
    });

    return Object.entries(monthlyData).map(([name, amount]) => ({ name, amount }));
  };



  const data = processData();

  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
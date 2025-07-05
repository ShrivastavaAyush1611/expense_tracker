'use client';

import { useEffect, useState } from 'react';
import SummaryBar from '@/components/SummaryBar';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Toaster } from 'react-hot-toast';

export default function Home() {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter(t => t._id !== id));
  };

  const handleUpdateTransaction = (updatedTransaction) => {
    setTransactions(transactions.map(t => 
      t._id === updatedTransaction._id ? updatedTransaction : t
    ));
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <main className="container mx-auto py-8 space-y-8">
      <Toaster />
      <SummaryBar transactions={transactions} />
      
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Monthly Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart transactions={transactions} />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <CategoryPieChart transactions={transactions} />
          </CardContent>
        </Card>
        
      </div>

      <Card className="">
          <CardHeader>
            <CardTitle className="flex justify-center">Add Transaction</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionForm onAdd={handleAddTransaction} />
          </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl" >Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList 
              transactions={recentTransactions} 
              onDelete={handleDeleteTransaction}
              onUpdate={handleUpdateTransaction}
            />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">All Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <TransactionList 
              transactions={transactions} 
              onDelete={handleDeleteTransaction}
              onUpdate={handleUpdateTransaction}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
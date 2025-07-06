'use client';

import { useEffect, useState } from 'react';
import SummaryBar from '@/components/SummaryBar';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import MonthlyChart from '@/components/MonthlyChart';
import CategoryPieChart from '@/components/CategoryPieChart';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Toaster } from 'react-hot-toast';
import BudgetForm from '@/components/BudgetForm';
import BudgetChart from '@/components/BudgetChart';
import Insights from '@/components/Insights';

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const[budgets,setBudgets] = useState([])

  const fetchTransactions = async () => {
    try {
      const response = await fetch('/api/transactions');
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error('Failed to fetch transactions', error);
    }
  };

  const fetchBudgets = async()=> {
    try{
      const response = await fetch('/api/budgets');
      const data = await response.json();
      setBudgets(data);
    }
    catch(error){
      console.log('Failed to fetch Budget',error);
    }
  }

  const handleAddBudget = (newBudget) =>{
    setBudgets([...budgets,newBudget]);
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  useEffect(()=>{
    fetchBudgets();
  },[]);

  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeleteTransaction = async (id) => {
  try {
    await fetch(`/api/transactions?id=${id}`, {
      method: "DELETE",
    });
    fetchTransactions(); 
  } catch (error) {
    console.error("Failed to delete transaction", error);
  }
};


  const handleUpdateTransaction = async (updatedTransaction) => {
    const res = await fetch('/api/transactions');
  const freshTransactions = await res.json();
  setTransactions(freshTransactions);
  };

  const recentTransactions = transactions.slice(0, 5);

  return (
    <main className="container mx-auto py-8 space-y-8">
      <Toaster />
      <SummaryBar transactions={transactions} />

                  {/* Section for monthly chart and category breakdown */}
      
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

         {/* Section for adding transactions and setting budgets */}

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className="">
            <CardHeader>
             <CardTitle className="flex justify-center">Add Transaction</CardTitle>
            </CardHeader>
             <CardContent>
            <TransactionForm onAdd={handleAddTransaction} />
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
              <CardTitle>Set Budget</CardTitle>
            </CardHeader>
          <CardContent>
            <BudgetForm onAddBudget={handleAddBudget} />
          </CardContent>
        </Card>
      </div>

                   {/* Section showing budget vs. actual expenses */}

      <div className='h-100px'>
      <Card>
          <CardHeader>
            <CardTitle>Budget vs Actual</CardTitle>
          </CardHeader>
           <CardContent>
            <BudgetChart budgets={budgets} transactions={transactions} />
          </CardContent>
        </Card>
      
      </div>
  
             {/* Insights based on current transactions and budgets */}

      <Card className="mt-6">
          <CardHeader>
            <CardTitle>Spending Insights</CardTitle>
          </CardHeader>
           <CardContent>
             <Insights budgets={budgets} transactions={transactions} />
           </CardContent>
      </Card>
      
                 {/* Recent and All Transactions tables */}

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
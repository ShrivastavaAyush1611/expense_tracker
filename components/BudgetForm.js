'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const categories = [
  'Food', 'Transportation', 'Utilities', 
  'Entertainment', 'Healthcare', 'Shopping', 'Other'
];

export default function BudgetForm({ onAddBudget }) {
  const [formData, setFormData] = useState({
    category: 'Food',
    amount: '',
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const budget = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    const response = await fetch('/api/budgets', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget)
    });
    const data = await response.json();
    onAddBudget(data);
    setFormData({ ...formData, amount: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Category</label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData({...formData, category: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm mb-1">Amount (₹)</label>
          <Input
            type="number"
            value={formData.amount}
            onChange={(e) => setFormData({...formData, amount: e.target.value})}
            placeholder="Budget amount"
            required
          />
        </div>
      </div>
      <Button type="submit" className="w-full">Set Budget</Button>
    </form>
  );
}
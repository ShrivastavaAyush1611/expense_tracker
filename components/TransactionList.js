'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';

export default function TransactionList({ transactions, onDelete, onUpdate }) {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({});

  const handleEditClick = (transaction) => {
    setEditingId(transaction._id);
    setEditForm({
      description: transaction.description,
      amount: transaction.amount.toString(),
      category: transaction.category,
      type: transaction.type
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/transactions?id=₹{id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...editForm,
          amount: parseFloat(editForm.amount)
        })
      });
      const data = await response.json();
      onUpdate(data);
      setEditingId(null);
    } catch (error) {
      console.error('Failed to update transaction', error);
    }
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction._id}>
              <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
              
              <TableCell>
                {editingId === transaction._id ? (
                  <input
                    name="description"
                    value={editForm.description}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  />
                ) : (
                  transaction.description
                )}
              </TableCell>
              
              <TableCell>
                {editingId === transaction._id ? (
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  >
                    {['Food', 'Transportation', 'Utilities', 'Entertainment', 'Healthcare', 'Shopping', 'Income', 'Other'].map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 rounded-full text-sm">
                    {transaction.category}
                  </span>
                )}
              </TableCell>
              
              <TableCell>
                {editingId === transaction._id ? (
                  <select
                    name="type"
                    value={editForm.type}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
                  >
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                ) : (
                  <span className="capitalize">{transaction.type}</span>
                )}
              </TableCell>
              
              <TableCell>
                {editingId === transaction._id ? (
                  <input
                    name="amount"
                    type="number"
                    value={editForm.amount}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-20"
                  />
                ) : (
                  <span className={transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}>
                    {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toFixed(2)}
                  </span>
                )}
              </TableCell>
              
              <TableCell className="space-x-2">
                {editingId === transaction._id ? (
                  <>
                    <Button 
                      variant="default" 
                      size="sm" 
                      onClick={() => handleUpdate(transaction._id)}
                    >
                      Save
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      onClick={() => handleEditClick(transaction)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => onDelete(transaction._id)}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
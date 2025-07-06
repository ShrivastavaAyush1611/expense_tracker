'use client';

export default function Insights({ budgets, transactions }) {
  // Calculate insights
  const currentMonth = new Date().getMonth() + 1;
  const monthlyExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const budgetUtilization = budgets.map(budget => {
    const spent = transactions
      .filter(t => t.category === budget.category && t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    return {
      category: budget.category,
      percentage: (spent / budget.amount) * 100
    };
  });

  const topCategories = [...budgetUtilization]
    .sort((a, b) => b.percentage - a.percentage)
    .slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium">Monthly Overview</h3>
        <p className="text-2xl font-bold">₹{monthlyExpenses.toFixed(2)} spent this month</p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Top Categories</h3>
        <ul className="space-y-2">
          {topCategories.map((cat, index) => (
            <li key={index} className="flex justify-between">
              <span>{cat.category}</span>
              <span className="font-medium">{cat.percentage.toFixed(0)}% utilized</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-medium mb-2">Budget Status</h3>
        {budgetUtilization.map((budget, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between text-sm mb-1">
              <span>{budget.category}</span>
              <span>{budget.percentage.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${
                  budget.percentage > 90 ? 'bg-red-500' : 
                  budget.percentage > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(100, budget.percentage)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
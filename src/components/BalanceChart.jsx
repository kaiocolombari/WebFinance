import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const BalanceChart = ({ transactions }) => {
  // Sort transactions by date
  const sortedTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

  // Calculate cumulative balance
  let balance = 0;
  const data = sortedTransactions.map(t => {
    balance += t.type === 'income' ? parseFloat(t.amount) : -parseFloat(t.amount);
    return {
      date: new Date(t.date).toLocaleDateString('pt-BR'),
      balance: balance,
    };
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Evolução do Saldo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${value.toFixed(2)}`} />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
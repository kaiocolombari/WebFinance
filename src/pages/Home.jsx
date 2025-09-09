import { useState } from 'react';
import { Link } from 'react-router-dom';
import useTransactions from '../utils/useTransactions';
import { useTheme } from '../contexts/ThemeContext';
import SummaryCard from '../components/SummaryCard';
import CategoryChart from '../components/CategoryChart';
import BalanceChart from '../components/BalanceChart';
import TransactionList from '../components/TransactionList';

const Home = () => {
  const { transactions } = useTransactions();
  const { darkMode, toggleDarkMode } = useTheme();

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const totalExpense = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + parseFloat(t.amount), 0);

  const balance = totalIncome - totalExpense;

  const recentTransactions = transactions.slice(-5).reverse();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-center dark:text-white">Dashboard de Finanças Pessoais</h1>
          <button
            onClick={toggleDarkMode}
            className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-4 py-2 rounded"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <SummaryCard title="Entradas" value={`R$ ${totalIncome.toFixed(2)}`} color="green" />
          <SummaryCard title="Saídas" value={`R$ ${totalExpense.toFixed(2)}`} color="red" />
          <SummaryCard title="Saldo" value={`R$ ${balance.toFixed(2)}`} color={balance >= 0 ? 'blue' : 'red'} />
        </div>

        <div className="flex justify-center mb-8">
          <Link to="/add" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Adicionar Transação
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <CategoryChart transactions={transactions} />
          <div>
            <h2 className="text-2xl font-bold mb-4">Últimas Transações</h2>
            <TransactionList transactions={recentTransactions} showDelete={false} />
            <Link to="/history" className="text-blue-500 hover:text-blue-700 mt-4 inline-block">
              Ver todas as transações
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <BalanceChart transactions={transactions} />
        </div>
      </div>
    </div>
  );
};

export default Home;
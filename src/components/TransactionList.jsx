import { useState } from 'react';
import useTransactions from '../utils/useTransactions';

const TransactionList = ({ transactions, showDelete = true }) => {
  const { deleteTransaction } = useTransactions();

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta transação?')) {
      deleteTransaction(id);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="px-4 py-2 text-left dark:text-white">Data</th>
            <th className="px-4 py-2 text-left dark:text-white">Descrição</th>
            <th className="px-4 py-2 text-left dark:text-white">Categoria</th>
            <th className="px-4 py-2 text-left dark:text-white">Tipo</th>
            <th className="px-4 py-2 text-left dark:text-white">Valor</th>
            {showDelete && <th className="px-4 py-2 text-left dark:text-white">Ações</th>}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id} className="border-t dark:border-gray-600">
              <td className="px-4 py-2 dark:text-white">{new Date(transaction.date).toLocaleDateString('pt-BR')}</td>
              <td className="px-4 py-2 dark:text-white">{transaction.description}</td>
              <td className="px-4 py-2 dark:text-white">{transaction.category}</td>
              <td className="px-4 py-2">
                <span className={`px-2 py-1 rounded text-xs ${
                  transaction.type === 'income' ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                }`}>
                  {transaction.type === 'income' ? 'Entrada' : 'Saída'}
                </span>
              </td>
              <td className="px-4 py-2 font-semibold dark:text-white">
                R$ {parseFloat(transaction.amount).toFixed(2)}
              </td>
              {showDelete && (
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(transaction.id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded text-sm"
                  >
                    Excluir
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      {transactions.length === 0 && (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          Nenhuma transação encontrada.
        </div>
      )}
    </div>
  );
};

export default TransactionList;
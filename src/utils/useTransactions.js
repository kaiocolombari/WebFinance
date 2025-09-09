import { useContext } from 'react';
import { TransactionContext } from '../contexts/TransactionContext';

const useTransactions = () => {
  return useContext(TransactionContext);
};

export default useTransactions;
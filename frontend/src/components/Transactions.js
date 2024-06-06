import React, { useEffect, useState } from 'react';
import data from './data.json'; // Import the JSON file

const Transactions = () => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        // Set the transactions from the imported JSON data
        setTransactions(data.transactions);
    }, []);

    return (
        <div>
            {transactions.map((transaction) => (
                <div key={transaction.productId}>
                    {transaction.title} - {transaction.price}
                </div>
            ))}
        </div>
    );
};

export default Transactions;

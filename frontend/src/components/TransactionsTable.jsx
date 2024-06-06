// TransactionTable.jsx
import React from "react";

// export default TransactionTable;
const TransactionTable = ({ transactions }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Description</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Sold</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((transaction, index) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.title}</td>
            <td>{transaction.description}</td>
            <td>₹{transaction.price.toFixed(2)}</td>
            <td>{transaction.category}</td>
            <td>
              <img src={transaction.image} alt={transaction.title} />
            </td>
            <td>{transaction.sold ? "Yes" : "No"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;

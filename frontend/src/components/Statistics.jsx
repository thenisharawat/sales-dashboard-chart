import React from "react";

const TransactionsStatistics = ({ barStatisticsData, selectedMonth }) => {
  console.log("barStatisticsData:-", barStatisticsData);
  return (
    <div class="transactions-statistics">
      <h2>Statistics {selectedMonth}</h2><p>(Selected month name from the dropdown)</p>
      <div class="statistics-box">
        <div class="statistic-item">
          <p>Total Sale Amount: ₹ {barStatisticsData.totalSaleAmount}</p>
          <p>Total Sold Items: {barStatisticsData.totalSoldItems}</p>
          <p>Total Not Sold Items: {barStatisticsData.totalNotSoldItems}</p>
        </div>
      </div>
    </div>
  );
};

export default TransactionsStatistics;

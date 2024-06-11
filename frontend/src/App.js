// App.js
import React, { useState, useEffect } from 'react';
import TransactionTable from './components/TransactionsTable';
import MonthDropdown from './components/monthDropdown';
import SearchBox from './components/searchBox';
import PaginationButtons from './components/paginationButtons';
import { fetchTransactions } from './components/transactionData'; // Import fetchTransactions

import "./App.css";
import { MyBarChart, MyPieChart } from './components/BarChart';
import { fetchBarChartData } from './components/barChartData';
import TransactionsStatistics from './components/Statistics';
import { fetchStatisticsData } from './components/statisticsData';
import { fetchPieChartData } from './components/pieChartData';

const App = () => {
  const [transactions, setTransactions] = useState([]);
  const [barStatisticsData, setStatisticsData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [transactionsCount, setTransactionsCount] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('MARCH'); // Preset selected month
  const [currentPage, setCurrentPage] = useState(1); // Start from page 1
  const [perPage, setPerPage] = useState(5); // Items per page
  const [searchTerm, setSearchTerm] = useState(''); // Search term

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions(selectedMonth, currentPage, perPage, searchTerm);
      setTransactions(data);
    };
    fetchData();
  }, [selectedMonth, currentPage, perPage, searchTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTransactions(selectedMonth, "", "", "");
      setTransactionsCount(data);
    };
    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStatisticsData(selectedMonth, "", "", "");
      setStatisticsData(data);
    };
    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBarChartData(selectedMonth);
      setBarChartData(data);
    };
    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPieChartData(selectedMonth);
      setPieChartData(data);
    };
    fetchData();
  }, [selectedMonth]);

  const handleSelectMonth = (month) => setSelectedMonth(month);
  const handleSearch = (term) => setSearchTerm(term);
  const handlePageChange = (page) => setCurrentPage(page);
  const handleSetPerPage = (page) => setPerPage(page);

  return (
    <div>
      <h1 className='App-header'>Transaction Dashboard</h1>
      <MonthDropdown selectedMonth={selectedMonth} onSelectMonth={handleSelectMonth} />
      <SearchBox searchTerm={searchTerm} onSearch={handleSearch} />
      <TransactionTable transactions={transactions} />
      <PaginationButtons currentPage={currentPage}
        onPageChange={handlePageChange}
        totalPages={Math.ceil(transactionsCount.length / perPage)}
        selectPerPage={perPage}
        onSetPerPage={handleSetPerPage}
      />
      <br></br>
      <br></br>
      <br></br>
      <h1 className='App-header'>Transactions Statistics - {selectedMonth}</h1>
      <TransactionsStatistics barStatisticsData={barStatisticsData} selectedMonth={selectedMonth} />
      <br></br>
      <br></br>
      <br></br>
      <h1 className='App-header'>Bar Chart Stats - {selectedMonth}</h1>
      <MyBarChart selectedMonth={selectedMonth} barChartData={barChartData} />
      <br></br>
      <br></br>
      <br></br>
      <h1 className='App-header'>Pie Chart Stats - {selectedMonth}</h1>
      <MyPieChart selectedMonth={selectedMonth} pieChartData={pieChartData} />
    </div>
  );
};

export default App;

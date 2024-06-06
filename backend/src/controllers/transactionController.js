const axios = require('axios');
const Transaction = require('../models/Transaction');

const Months = {
    JANUARY: 1,
    FEBRUARY: 2,
    MARCH: 3,
    APRIL: 4,
    MAY: 5,
    JUNE: 6,
    JULY: 7,
    AUGUST: 8,
    SEPTEMBER: 9,
    OCTOBER: 10,
    NOVEMBER: 11,
    DECEMBER: 12
};

// Initialize database with seed data
exports.initializeDatabase = async (req, res) => {
    try {
        const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
        await Transaction.deleteMany({});
        await Transaction.insertMany(response.data);
        res.status(200).send('Database initialized');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// List transactions with search and pagination
exports.listTransactions = async (req, res) => {
    const { month, page = 1, perPage = 10, search = '' } = req.query;

    const query = {
        $expr: { $eq: [{ $month: "$dateOfSale" }, monthNameToNumber(month)] }
    };

    if (search) {
        const searchRegex = new RegExp(`.*${search}.*`, 'i');
        query.$or = [
            { title: { $regex: searchRegex } },
            { description: { $regex: searchRegex } }
        ];

        // Check if the search is a valid number, also search the price field
        if (!isNaN(search)) {
            query.$or.push({ price: Number(search) });
        }
    }

    try {
        console.log("query:--", JSON.stringify(query));
        const transactions = await Transaction.find(query)
            .skip((page - 1) * perPage)
            .limit(parseInt(perPage));
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get statistics for a selected month
exports.getStatistics = async (req, res) => {
    const { month } = req.query;
    try {
        const { totalSaleAmount, totalSoldItems, totalNotSoldItems } = await getStatisticsFn(month);
        res.status(200).json({
            totalSaleAmount: totalSaleAmount[0]?.total || 0,
            totalSoldItems,
            totalNotSoldItems
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get data for bar chart
exports.getBarChartData = async (req, res) => {
    try {
        const { month } = req.query;
        let data = await getBarChartDataFn(month);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Get data for pie chart
exports.getPieChartData = async (req, res) => {
    try {
        const { month } = req.query;
        let categories = await getPieChartDataFn(month);
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// Combine data from multiple APIs
exports.getCombinedData = async (req, res) => {
    try {
        const { month } = req.query;
        const [statistics, barChartData, pieChartData] = await Promise.all([
            await getStatisticsFn(month),
            await getBarChartDataFn(month),
            await getPieChartDataFn(month)
        ]);

        console.log("statistics:-", statistics);
        console.log("barChartData:-", barChartData);
        console.log("pieChartData:-", pieChartData);

        res.status(200).json({
            statistics,
            barChartData,
            pieChartData
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const monthNameToNumber = (month) => {
    let monthString = (month + "").toUpperCase();
    return Months[monthString];
}

const getStatisticsFn = async (month) => {
    let monthExpression = { $eq: [{ $month: "$dateOfSale" }, monthNameToNumber(month)] };
    console.log("monthExpression:-", monthExpression);
    const totalSaleAmount = await Transaction.aggregate([
        {
            $match: {
                $expr: monthExpression,
                sold: true
            }
        },
        { $group: { _id: null, total: { $sum: '$price' } } }
    ]);

    const totalSoldItems = await Transaction.countDocuments({ $expr: monthExpression, sold: true });
    const totalNotSoldItems = await Transaction.countDocuments({ $expr: monthExpression, sold: false });

    return {
        totalSaleAmount,
        totalSoldItems,
        totalNotSoldItems
    }
}

const getBarChartDataFn = async (month) => {
    const monthNumber = monthNameToNumber(month);

    if (monthNumber === 0) {
        return res.status(400).send('Invalid month provided');
    }

    const priceRanges = [
        { range: '0-100', min: 0, max: 100 },
        { range: '101-200', min: 101, max: 200 },
        { range: '201-300', min: 201, max: 300 },
        { range: '301-400', min: 301, max: 400 },
        { range: '401-500', min: 401, max: 500 },
        { range: '501-600', min: 501, max: 600 },
        { range: '601-700', min: 601, max: 700 },
        { range: '701-800', min: 701, max: 800 },
        { range: '801-900', min: 801, max: 900 },
        { range: '901-above', min: 901, max: Infinity }
    ];

    const dataPromises = priceRanges.map(async ({ range, min, max }) => {
        const count = await Transaction.countDocuments({
            $expr: { $eq: [{ $month: "$dateOfSale" }, monthNumber] },
            price: { $gte: min, $lte: max === Infinity ? Number.MAX_SAFE_INTEGER : max }
        });
        return { range, count };
    });

    const data = await Promise.all(dataPromises);
    return data;
}

const getPieChartDataFn = async (month) => {
    let monthExpression = { $eq: [{ $month: "$dateOfSale" }, monthNameToNumber(month)] };

    const categories = await Transaction.aggregate([
        { $match: { $expr: monthExpression } },
        { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);
    return categories;
}
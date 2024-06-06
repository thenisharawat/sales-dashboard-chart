const mongoose = require('mongoose');

const db_url = process.env.DB_URL;

// mongoose.connect(db_url.toString()

mongoose.connect('mongodb://127.0.0.1:27017/transactionDB'
)
    .then((link) => {
        console.log("DB connected.");
    })
    .catch((error) => {
        console.log("DB not connected:-", error);
    })

const db = mongoose.connection;
module.exports = db;
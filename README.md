# sales-dashboard-chart
Developed a MERN stack sales dashboard with APIs for data initialization, transaction listing, and statistics.Implemented search,pagination,and data visualization,and created a React frontend for transactions and sales insights.

## Prerequisites

Before running any of the scripts, make sure you have [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.com/try/download/community) installed on your machine.

### Intialize Database For The First Time When The Backend Server Is Up.
[Intialize Database](http://127.0.0.1:8000)

## Available Scripts

In the project root directory of frontend and backend, you can run:

### `npm install`

Backend/Frontend: Run this command to install all the dependencies and modules available in the `package.json` file.

### `npm start`

Backend: Runs the application in development mode. It uses `nodemon` to run the server file directly. It also enables hot reloading, allowing you to see changes in real-time during development.

### `npm run build`

Builds the TypeScript files into JavaScript files. It transpile the TypeScript code to JavaScript using the TypeScript compiler (`tsc`) and generates the output in the `build` directory.

### `ENV File Variables For Backend`
```
DB_URL='mongodb://127.0.0.1:27017/transactionDB'
PORT=8000
```

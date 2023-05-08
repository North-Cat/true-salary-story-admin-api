require('module-alias/register');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('config/database');
const adminsRouter = require('routes/admins');
const notFoundHandler = require('service/notFoundHandler');
const globalErrorHandler = require('service/globalErrorHandler');

const app = express();
connectDB();
app.use(cors());
app.use(express.json());
app.use('/api/admin', adminsRouter);
app.use(notFoundHandler);
app.use(globalErrorHandler);

process.on('unhandledRejection', (reason, promise) => {
  console.error('未捕捉到的 rejection：', promise, '原因：', reason);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

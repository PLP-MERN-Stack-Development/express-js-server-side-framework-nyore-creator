const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoutes');
const { logger } = require('./middleware/loggerMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware'); 


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(logger);


mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection failed:', err.message));


app.get('/', (req, res) => {
  res.send('Welcome to the Product API connected to MongoDB Atlas!');
});


app.use('/api/products', productRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);

module.exports = app;

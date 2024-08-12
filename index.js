require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const vehicleRoutes = require('./routes/vehicalRoute');4
const  createVehicleRoute=require('./routes/postVehicle')
const orgRoute=require("./routes/createorgRoute")
const getRoute=require("./routes/getVehicle")
const app = express();
const getOrg=require("./routes/getOrg")
// Connect to MongoDB
const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use('/api',getOrg)
app.use('/api', vehicleRoutes);
app.use('/api',createVehicleRoute);
app.use('/api',orgRoute)
app.use('/api',getRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
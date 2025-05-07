const express = require("express")
const dotenv=require('dotenv')
const mongoose=require('mongoose')
const authRoutes=require('./routes/authRoutes')
const userRoutes=require('./routes/bookingRoutes')
const activityRoutes = require('./routes/activityRoutes');
const app = express()
const PORT = process.env.PORT || 5000;




dotenv.config();
app.use(express.json());


app.use('/api/auth',authRoutes)
app.use('/api/activities', activityRoutes);
app.use('/api/user',userRoutes)

app.get('/', (req, res) => {
    res.send("hello world")
})

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  }).catch((err) => {
    console.error("DB connection failed:", err);
  });
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
//The routes
const userRoutes = require('./routes/user');

dotenv.config();

const options = {
    origin: 'http://localhost:3000',
    useSucessStatus: 200
}

const PORT = process.env.PORT || 5000;

app.use(cors(options));
app.use(express.json());
//Routes middleware
app.use('/', userRoutes);
//Database connection
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser: true
})
.then(()=>console.log('Database connected successfully'))
.catch((err)=>console.log(err))

app.get('/',(req, res)=>{
    res.json({
        "success": true,
        "data": "Francis"
    })
})

app.listen(PORT,()=>console.log(`The server is running on port: ${PORT}`))
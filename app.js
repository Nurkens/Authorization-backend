import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import router from './routes/authRoutes.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use('/api',router);
const PORT = process.env.PORT;
const DB_URL = process.env.DB_URL;

async function startApp(){
    try{
        await mongoose.connect(DB_URL);
        app.listen(PORT,()=>{
            console.log(`Server is working on PORT ${PORT}`);
        })
    }catch(error){
        console.log(error);
    }
    

}

startApp();
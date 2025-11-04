import express from 'express';
import { ConnectToDB } from './src/config/db.js';
import dotenv from 'dotenv';
dotenv.config();



const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("API is running!!!");
})

const initializeConnection = async () => {
    try{
        await ConnectToDB();
        app.listen(port || 4000, () => {
            console.log(`server is running on port, ${port}`)
        })
    }catch(err){
        console.error("Failed to start server: ", err);
        process.exit(1);
    }
}

initializeConnection();
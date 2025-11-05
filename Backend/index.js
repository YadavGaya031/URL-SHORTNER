import express from 'express';
import { ConnectToDB } from './src/config/db.js';
import dotenv from 'dotenv';
import urlSchema from './src/models/urlSchema.model.js';
import shortUrl from './src/routes/url.route.js'
import { redirectShortUrl } from './src/controllers/url.controller.js';
dotenv.config();

const app = express()
const port = process.env.PORT;
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("API is running !!!")
})

app.use('/api/create', shortUrl)

app.get("/:id", redirectShortUrl)

const initializeConnection = async () => {
    try{
        ConnectToDB();
        app.listen(port || 4000, () => {
            console.log(`server is running on port, ${port}`)
        })
    }catch(err){
        console.error("Failed to start server: ", err);
        process.exit(1);
    }
}

initializeConnection();
import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./src/config/db.js"
import short_url from "./src/routes/short_url.route.js"
import user_routes from "./src/routes/user.routes.js"
import auth_routes from "./src/routes/auth.routes.js"
import { redirectFromShortUrl } from "./src/controllers/short_url.controller.js";
import { errorHandler } from "./src/utils/errorHandler.js";
import cors from "cors"
import { attachUser } from "./src/utils/attachUser.js";
import cookieParser from "cookie-parser"
import admin_routes from "./src/routes/admin.route.js";
import analytics_routes from "./src/routes/analytics.route.js"
import ai_routes from "./src/routes/ai.route.js";
import paymentRoutes from "./src/routes/payment.routes.js"
import qrRoutes from "./src/routes/qr.routes.js";
dotenv.config("./.env")

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true 
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.set("trust proxy: ", true)
app.use(attachUser)

app.use("/api/user",user_routes)
app.use("/api/auth",auth_routes)
app.use("/api/create",short_url)
app.use("/api/admin", admin_routes);
app.use("/api/analytics", analytics_routes);
app.use("/api/ai", ai_routes);
app.use("/api", qrRoutes);
app.use("/api/payment", paymentRoutes);
app.get("/:id",redirectFromShortUrl)

app.use(errorHandler)
const port = process.env.PORT || 3000
app.listen(port, async()=>{
    await connectDB()
    console.log(`Server is running on ${port}`);
})

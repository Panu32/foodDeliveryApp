import express from "express"

const app = express();
import cors from "cors"
import cookieParser from "cookie-parser"

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true,limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'
import foodRouter from './routes/food.route.js'

//routes declaration
app.use("/users", userRouter)// it will activate userRouter on given url
app.use("/food",foodRouter)
app.get("/", (req, res) => {
    res.send("API is working ✅");
  });
  
// app.js
export default app;

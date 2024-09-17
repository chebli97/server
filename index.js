import "dotenv/config.js";
import database from "./config/dbConfig.js"
import express from "express"
import bodyParser from 'body-parser'
import cors from "cors"
import { rateLimit } from 'express-rate-limit'
import { userRouter } from "./src/routes/user.js";


const app = express()
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 10,
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  
app.use(limiter)
app.use(express.json())
app.use(bodyParser.json({limit : '30mb' , extended : true}))
app.use(bodyParser.urlencoded({limit : '30mb' , extended : true}))
app.use(cors())

app.use('/api/user', userRouter)


app.get('/', (req, res) => {
    res.send('Welcome to API')
  });

const PORT = process.env.PORT || 6001

app.listen(PORT, () => console.log("Server listening on port " + PORT))
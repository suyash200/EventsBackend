import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//routes imports
import authroute from "./src/routes/auth.routes.js";
import roleRoute from "./src/routes/roles.routes.js";
import permissionRoute from "./src/routes/permission.routes.js";
import eventsRoute from "./src/routes/event.routes.js";
import categoryRoute from "./src/routes/category.routes.js";
import ticketRoute from "./src/routes/tickets.routes.js";

//middleware functions
import { AuthCheck } from "./src/middleware/authCheck.js";
import rateLimiter from './src/middleware/rate-limiting.js'

//util functions
import { corsOptions } from "./src/config/corsConfig.js";
import { DbConnect } from "./src/config/DbConfig.js";
import cookieParser from "cookie-parser";

dotenv.config();

//app declaration
var app = express();

//global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors(corsOptions));
app.use(cookieParser());

// routes declaration

app.get('/', (req, res) => {
  res.status(200).send('response hellow')
})

app.use(rateLimiter);
app.use("/api/auth", authroute);
app.use("/api/roles", AuthCheck(), roleRoute);
app.use("/api/permissions", AuthCheck(), permissionRoute);
app.use("/api/events", AuthCheck(), eventsRoute);
app.use("/api/category", AuthCheck(), categoryRoute);
app.use("/api/tickets", AuthCheck(), ticketRoute);

//dbConnection
app.listen(4000, () => {
  DbConnect(`${process.env.Mongo_Url}`);
});

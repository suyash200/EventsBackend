import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import * as cluster from "cluster";

//routes imports
import authroute from "./src/routes/auth.routes.js";
import roleRoute from "./src/routes/roles.routes.js";
import permissionRoute from "./src/routes/permission.routes.js";
import eventsRoute from "./src/routes/event.routes.js";
import categoryRoute from "./src/routes/category.routes.js";
import ticketRoute from "./src/routes/tickets.routes.js";

//middleware functions
import { AuthCheck } from "./src/middleware/authCheck.js";

//util functions
import { corsOptions } from "./src/config/corsConfig.js";
import { DbConnect } from "./src/config/DbConfig.js";
import cookieParser from "cookie-parser";
import ClusterService from "./src/services/clusterService.js";

dotenv.config();

//app declaration
var app = express();

if (cluster.isPrimary) {
  for (var i = 0; i < 13; i++) {
    cluster.fork();
  }
  ClusterService(cluster)
} else {

  //global middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use(cookieParser());
  // routes declaration

  app.use("/auth", authroute);
  app.use("/roles", AuthCheck(), roleRoute);
  app.use("/permissions", AuthCheck(), permissionRoute);
  app.use("/events", AuthCheck(), eventsRoute);
  app.use("/category", AuthCheck(), categoryRoute);
  app.use("/tickets", AuthCheck(), ticketRoute);
}

//dbConnection
app.listen(4000, () => {
  DbConnect(`${process.env.Mongo_Url}`);
});

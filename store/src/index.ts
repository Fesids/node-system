import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import {config} from "dotenv";
import { AuthRoutes } from "./routes/Auth/AuthRoutes";
import { DepartmentRoutes } from "./routes/Department/DepartmentRoutes";
import { MongoDBConnect } from "./databases/MongoDbConnect";
import { RequestRouter } from "./routes/Request/RequestRoute";
import { STDRouter } from "./routes/SiteType/SiteTypeRoute";
import { ChatRouter } from "./routes/Chat/ChatRoutes";
import { MessageRoutes } from "./routes/message/MessageRoute";


const main = ()=>{
    config();
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    app.use("/api/auth", AuthRoutes);
    app.use("/api/department", DepartmentRoutes);
    app.use("/api/request", RequestRouter);
    app.use("/api/std", STDRouter);
    app.use("/api/chat", ChatRouter);
    app.use("/api/message", MessageRoutes);

    const port = process.env.PORT || 8080;
    const mongodburl = process.env.MONGODB_URL || "mongodb://localhost:27017/";
    const dbName = process.env.database || "department_db";

    MongoDBConnect(mongodburl, dbName);

    app.listen(port, ()=>{
        console.log(`The server has started at port ${port}`)
    })

}

main();
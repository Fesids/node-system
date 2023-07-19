import {Router} from "express";
import { CreateMessage, getMessages } from "./MessageFunction";



const route = Router();

route.post("/new", CreateMessage);
route.get("/all/:chatId", getMessages);

export const MessageRoutes = route;
import {Router} from 'express';
import { CreateChat, findChat, userChats } from './ChatFunction';


const router = Router();

router.post("/new", CreateChat);
router.get("/user/:userId", userChats);
router.get("/find/:firstId/:secondId", findChat);

export const ChatRouter = router;
import {Router} from "express"
import { CreateConnection, GetConnectionByProfileId, GetConnectionDetail } from "./ConnectionFunction";

const router = Router();

router.post("/new", CreateConnection);
router.get("/detail/profile/:profileId", GetConnectionByProfileId);
router.get("/detail/:connectionId", GetConnectionDetail);


export const ConnectionRouter = router; 
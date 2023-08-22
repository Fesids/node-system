import {Router} from "express";
import { AddFriend, CreateProfile, GetAllProfiles, GetProfile, GetProfileByUserId } from "./ProfileFunction";

const router = Router();

router.post("/new", CreateProfile);
router.get("/user/:userId", GetProfileByUserId);
router.get("/all", GetAllProfiles);
router.post("/:profileId/connection/:connectionId", AddFriend);
router.get("/detail/:profileId", GetProfile);

export const ProfileRouter = router;



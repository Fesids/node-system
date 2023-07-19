import {Router} from "express";
import { siteTypeCreate, siteTypeDetail, siteTypeList } from "./SiteTypeFunction";

const router = Router();

router.post('/new/:type', siteTypeCreate);
router.get('/list', siteTypeList);
router.get("/detail/:id", siteTypeDetail);

export const STDRouter = router; 
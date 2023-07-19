import express from "express";
import { createRequest, createSaleRequest, deleteSaleRequest, getAllRequestByDeptId, getAllSalesRequestByDeptId, getRequestDetail, getRequestsBySentId, getSaleRequestDetail } from "./RequestFunction";
import { deleteModel } from "mongoose";
import { GetRequestsBySentIdController } from "../../controllers/RequestControllers/GetRequestsBySentId";
import { uploadFile } from "../../UploadMiddleware/upload";


const router = express.Router();

router.post("/new/:user_id", uploadFile.single("request_image") ,createRequest);
router.post("/create/sale", createSaleRequest);
router.get("/sales/department/:dept_id", getAllSalesRequestByDeptId);
router.get("/all/department/:dept_id", getAllRequestByDeptId);
router.get("/salesRequest/detail/:id", getSaleRequestDetail);
router.get("/requests/detail/:id", getRequestDetail);
router.delete("/salesRequest/delete/:id", deleteSaleRequest);
router.get("/sent/department/:sent_id", getRequestsBySentId);


router.post("/teste", uploadFile.single("request_image"))

export const RequestRouter = router;
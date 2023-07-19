import {Router} from "express";
import { DepartmentCreate, DepartmentDelete, DepartmentUpdate, GetAllDepartments, GetDepartment } from "./DepartmentFunction";
import { GetAllDepartmentsController } from "../../controllers/DepartmentControllers/GetAllDepartments";
import { Auth, isAdmin, isEmployee } from "../../Middleware/AuthenticationMiddleware";

const router = Router();

router.post("/new",/*Auth, isAdmin, isEmployee,*/ DepartmentCreate);
router.patch("/update/:id",Auth, isAdmin, DepartmentUpdate);
router.delete("/delete/:id", DepartmentDelete);
router.get("/detail/:id", GetDepartment);
router.get("/all", GetAllDepartments);

export const DepartmentRoutes = router
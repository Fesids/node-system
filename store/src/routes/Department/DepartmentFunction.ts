import {Request, Response, NextFunction} from "express"
import { DepartmentRepository } from "../../repositories/DepartmentRepository"
import { CreateDepartmentController } from "../../controllers/DepartmentControllers/CreateDepartmentCtrl";
import { UpdateDepartmentController } from "../../controllers/DepartmentControllers/UpdateDepartmentCTRL";
import { DeleteDepartmentController } from "../../controllers/DepartmentControllers/DeleteDepartment";
import { GetDepartmentController } from "../../controllers/DepartmentControllers/GetDepartmentCtrl";
import { GetAllDepartmentsController } from "../../controllers/DepartmentControllers/GetAllDepartments";
import { UserRepository } from "../../repositories/UserRepository";



export const DepartmentCreate = async (req:Request, res:Response, next:NextFunction)=>{

    const departmentRepository = new DepartmentRepository();

    const departmentController = new CreateDepartmentController(
        departmentRepository
    );

    const {body, statusCode} = await departmentController.handle({
        body: req.body
    })

    res.status(statusCode).json(body);

}

export const DepartmentUpdate = async (req:Request, res:Response, next:NextFunction) =>{

    const departmentRepository = new DepartmentRepository();

    const departmentController = new UpdateDepartmentController(
        departmentRepository
    );

    const {body, statusCode} = await departmentController.handle({
       body: req.body,
       params: req.params
    });

    res.status(statusCode).send(body);

}

export const DepartmentDelete = async (req:Request, res:Response) =>{

    const departmentRepository = new DepartmentRepository();

    const departmentController = new DeleteDepartmentController(
        departmentRepository
    );

    const {statusCode, body} = await departmentController.handle({
        params: req.params,
    });

    return res.status(statusCode).json(body);




}

export const GetDepartment = async (req:Request, res:Response) =>{

    const departmentRepository = new DepartmentRepository();

    const departmentController = new GetDepartmentController(
        departmentRepository
    );

    const {statusCode,body} = await departmentController.handle({
        params: req.params
    });

    return res.status(statusCode).json(body);


}

export const GetAllDepartments = async (req: Request, res:Response) =>{

    const departmentRepository = new DepartmentRepository();

    const departmentController = new GetAllDepartmentsController(
        departmentRepository
    );

    const {statusCode, body} = await departmentController.handle();

    return res.status(statusCode).json(body);

}




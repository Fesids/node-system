import {Request, Response} from "express";
import { RequestRepository } from "../../repositories/RequestRepository";
import { CreateRequestController } from "../../controllers/RequestControllers/CreateRequest";
import { CreateSalesRequestController } from "../../controllers/RequestControllers/CreateSaleRequest";
import { GetSalesRequestByDeptController } from "../../controllers/RequestControllers/GetSalesRequestByDept";
import { GetAllRequestsByDestinationId } from "../../controllers/RequestControllers/GetAllRequestsByDestinationId";
import { GetSaleRequestDetail } from "../../controllers/RequestControllers/GetSaleRequestDetail";
import { GetRequestDetail } from "../../controllers/RequestControllers/GetRequestDetail";
import { DeleteSaleRequest } from "../../controllers/RequestControllers/DeleteSaleRequest";
import { GetRequestsBySentIdController } from "../../controllers/RequestControllers/GetRequestsBySentId";


/**
 * 
 */

export const testeUpload = (req:Request, res:Response) =>{
    console.log("funfou "+ req.file?.filename)
}

export const createRequest = async (req:Request, res:Response)=>{

    const requestRepository = new RequestRepository();

    const requestController = new CreateRequestController(
        requestRepository
    );

    const {sender_dept_id,
        destination_dept_id,
        subject,
        request_body} = req.body;

        const file = req.file?.filename;

        const b =  {
            sender_dept_id,
            destination_dept_id,
            subject,
            request_body,
            request_image: file
        }

    const {body, statusCode} = await requestController.handle({
        body: b,
        params: req.params
    });

    

    res.status(statusCode).json(body);
}

export const createSaleRequest = async (req:Request, res:Response) =>{

    const requestRepository = new RequestRepository();

    const requestController = new CreateSalesRequestController(requestRepository);

    const {body, statusCode} = await requestController.handle({
        body: req.body
    });

    res.status(statusCode).json(body);
}

export const getAllSalesRequestByDeptId = async (req:Request, res:Response) =>{

    const requestRepository = new RequestRepository();

    const requestController = new GetSalesRequestByDeptController(
        requestRepository
    );

    const {body, statusCode} = await requestController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}

export const getAllRequestByDeptId = async (req:Request, res:Response) =>{
    const requestRepository = new RequestRepository();

    const requestController = new GetAllRequestsByDestinationId(requestRepository);

    const {statusCode, body} = await requestController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}

export const getSaleRequestDetail = async (req:Request, res:Response) =>{

    const requestRepository = new RequestRepository();

    const requestController = new GetSaleRequestDetail(
        requestRepository
    );

    const {statusCode, body} = await requestController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);
}

export const getRequestDetail = async (req: Request, res: Response) =>{
    const requestRepository = new RequestRepository();

    const requestController = new GetRequestDetail(requestRepository);

    const {statusCode, body} = await requestController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}

export const deleteSaleRequest = async (req:Request, res:Response) =>{

    const requestRepository = new RequestRepository();

    const requestController = new DeleteSaleRequest(requestRepository);

    const {statusCode, body} = await requestController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}

export const getRequestsBySentId = async (req:Request, res:Response) =>{
    const requestRepository = new RequestRepository();

    const requestController = new GetRequestsBySentIdController(
        requestRepository
    );

    const {statusCode, body} = await requestController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);
}
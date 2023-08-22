import express, {Request, Response, NextFunction} from "express"
import { ConnectionRepository } from "../../repositories/Chat/ConnectionRepository"
import { GetConnectionByProfileIdController } from "../../controllers/ConnectionControllersd/GetConnectionByProfileId";
import { CreateConnectionController } from "../../controllers/ConnectionControllersd/CreateConnection";
import { GetConnectionDetailController } from "../../controllers/ConnectionControllersd/GetConnectionDetail";


export const CreateConnection = async (req:Request, res:Response) =>{
    const connectionRepository = new ConnectionRepository();

    const connectioController = new CreateConnectionController(
        connectionRepository
    );

    const {body, statusCode} = await connectioController.handle({
        body: req.body
    });

    res.status(statusCode).json(body);

}



export const GetConnectionByProfileId = async (req:Request, res:Response) =>{
    const connectionRepository = new ConnectionRepository();

    const connectionController = new GetConnectionByProfileIdController(
        connectionRepository
    );

    const {body, statusCode} = await connectionController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}

export const GetConnectionDetail = async (req:Request, res:Response) =>{

    const connectionRepository = new ConnectionRepository();

    const connectioController = new GetConnectionDetailController(
        connectionRepository
    );

    const {statusCode, body} = await connectioController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);



}
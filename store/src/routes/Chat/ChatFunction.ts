import {Request, Response, NextFunction} from "express";
import { ChatRepository } from "../../repositories/Chat/ChatRepository";
import { CreateChatController } from "../../controllers/ChatControllers/CreateChat";
import { UserChatController } from "../../controllers/ChatControllers/UserChat";
import { FindChatController } from "../../controllers/ChatControllers/FindChat";

export const CreateChat = async (req:Request, res:Response) =>{

    const chatRepository = new ChatRepository();

    const chatController = new CreateChatController(
        chatRepository
    );

    const {statusCode, body} = await chatController.handle({
        body: req.body
    });

    res.status(statusCode).json(body);

};

export const userChats = async (req:Request, res:Response) =>{
    const chatRepository = new ChatRepository();

    const chatController = new UserChatController(
        chatRepository
    );
    
    const {statusCode, body} = await chatController.handle({
        params: req.params
    });

    const {userId} = req.params

    res.status(statusCode).json(body);
}


export const findChat = async (req:Request, res:Response) =>{
    const chatRepository = new ChatRepository();

    const chatController = new FindChatController(
        chatRepository
    );

    const {statusCode, body} = await chatController.handle({
        params: req.params
    })

    res.status(statusCode).json(body);
}
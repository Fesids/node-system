import {Request, Response} from "express";
import { MessageRepository } from "../../repositories/Chat/MessageRepository";
import { CreateMessageChatController } from "../../controllers/MessageController/CreateMessageChat";
import { GetMessagesByChatIdController } from "../../controllers/MessageController/GetMessagesByChatId";

export const CreateMessage = async (req:Request, res:Response) =>{
    const messageRepository = new MessageRepository();

    const messageController = new CreateMessageChatController(
        messageRepository
    );

    const {body, statusCode} = await messageController.handle({
        body: req.body
    });

    res.status(statusCode).json(body);

}

export const getMessages = async (req:Request, res:Response) =>{
    
    const messageRepository = new MessageRepository();

    const messageController = new GetMessagesByChatIdController(
        messageRepository
    );

    const {body, statusCode} = await messageController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}
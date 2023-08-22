import {Request, Response, NextFunction} from "express";
import { Profile } from "../../databases/ChatDBModels/ProfileModel";
import { ProfileRepository } from "../../repositories/Chat/ProfileRepository";
import { CreateProfileController } from "../../controllers/ProfileControllers/CreateProfile";
import { GetProfileByUserIdController } from "../../controllers/ProfileControllers/GetProfileByUserId";
import { getAllProfilesController } from "../../controllers/ProfileControllers/GetAllProfiles";
import { AddProfileController } from "../../controllers/ProfileControllers/AddProfile";
import { GetProfileDetailController } from "../../controllers/ProfileControllers/GetProfileDetail";



export const AddFriend = async (req:Request, res:Response) =>{

    const profileRepository = new ProfileRepository();

    const profileController = new AddProfileController(
        profileRepository
    );

    const {body, statusCode} = await profileController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);


}

export const GetProfileByUserId = async (req:Request, res:Response) =>{
    const profileRepository = new ProfileRepository();

    const profileController = new GetProfileByUserIdController(
        profileRepository
    );

    const {body, statusCode} = await profileController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);


}

export const CreateProfile = async (req:Request, res:Response) =>{

    const profileRepository = new ProfileRepository();

    const profileController = new CreateProfileController(
        profileRepository
    );

    const {statusCode, body} = await profileController.handle({
        body: req.body
    });

    res.status(statusCode).json(body);


}

export const GetAllProfiles = async (req:Request, res:Response)=>{

    const profileRepository = new ProfileRepository();

    const profileController = new getAllProfilesController(
        profileRepository
    );

    const {body, statusCode} = await profileController.handle({});

    res.status(statusCode).json(body);

}

export const GetProfile = async (req:Request, res:Response) =>{

    const profileRepository = new ProfileRepository();

    const profileController = new GetProfileDetailController(
        profileRepository
    );

    const {body, statusCode} = await profileController.handle({
        params: req.params
    });

    res.status(statusCode).json(body);

}
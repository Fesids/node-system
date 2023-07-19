import {Request, Response} from "express";
import { SiteTypeDescriptionRepository } from "../../repositories/SiteTypeDescriptionRepository";
import { CreateTypeDescController } from "../../controllers/SiteTypeDescriptionControllers.ts/CreateSiteTypeDesc";
import { Linter } from "eslint";
import { ListSiteTypeController } from "../../controllers/SiteTypeDescriptionControllers.ts/ListSiteType";
import { DetailSiteTypeController } from "../../controllers/SiteTypeDescriptionControllers.ts/DetailSiteType";

export const siteTypeDetail = async (req:Request, res:Response) =>{
    const siteTypeRepository = new SiteTypeDescriptionRepository();
    const siteTypeController = new DetailSiteTypeController(siteTypeRepository);

    const {body, statusCode} = await siteTypeController.handle({
        params: req.params
    });

    res.status(statusCode).json(body)
}

export const siteTypeList = async (req:Request, res:Response) =>{

    const siteTypeRepository = new SiteTypeDescriptionRepository();

    const controller = new ListSiteTypeController(siteTypeRepository);

    const {body, statusCode} = await controller.handle({
        
    });

    res.status(statusCode).json(body);


}
export const siteTypeCreate = async (req:Request, res:Response) =>{

    const siteTypeRepository = new SiteTypeDescriptionRepository();
    
    const siteTypeController = new CreateTypeDescController(siteTypeRepository);

    const {body, statusCode} = await siteTypeController.handle({
        params: req.params,
        body: req.body
    })

    return res.status(statusCode).json(body);
}
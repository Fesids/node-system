import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { SiteTypeDescRequest } from "../../DTO/SiteTypeRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { ISTD } from "../../models/SiteTypeDescription";
import { SiteTypeDescriptionRepository } from "../../repositories/SiteTypeDescriptionRepository";

export class CreateTypeDescController implements IController{
    constructor(private readonly siteTypeDescRepository:SiteTypeDescriptionRepository){}
    async handle(httpRequest: HttpRequest<SiteTypeDescRequest>): 
    Promise<HttpResponse<ISTD | string>> {
        const {type} = httpRequest.params;

        try{
            if(!httpRequest.body){
                return badRequest("Please, specify a body");
            }

            const req = await this.siteTypeDescRepository.save(httpRequest.body, type);

            return ok(req);
        } catch(err){
            return badRequest("failed to create type");
        }

    }
    
}
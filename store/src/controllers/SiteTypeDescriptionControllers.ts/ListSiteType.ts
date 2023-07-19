import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { ISTD } from "../../models/SiteTypeDescription";
import { SiteTypeDescriptionRepository } from "../../repositories/SiteTypeDescriptionRepository";

export class ListSiteTypeController implements IController{
    constructor(private readonly siteTypeDescriptionRepository: SiteTypeDescriptionRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<ISTD[] | String>> {
        try{
            const typeList = await this.siteTypeDescriptionRepository.getSTList();

            return ok(typeList);
        } catch(err){
            return badRequest("Failed to retrieve type list");
        }
        
    }
    
}
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { ISTDRepository } from "../../DTO/SiteTypeRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { ISTD } from "../../models/SiteTypeDescription";

export class DetailSiteTypeController implements IController{
    constructor(private readonly siteTypeRepository:ISTDRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<ISTD | string>> {

        try{
            const {id} = httpRequest.params;

            if(!id){
                return badRequest("typed id is required");
            }

            const siteType = await this.siteTypeRepository.STDetail(id);
            return ok(siteType);
        } catch(err){
            return badRequest("error to retrieve siteType");
        }
        
    }

}
import { IProfileRepository } from "../../DTO/Chat/ProfileDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IProfile } from "../../models/Profile";

export class getAllProfilesController implements IController{
    constructor(private readonly profileRepository:IProfileRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IProfile[] | string>> {
        try{
            
            const profile_list = await this.profileRepository.getAllProfiles();

            return ok(profile_list);
        }catch(err){
            return badRequest("Failed to retrieve profile list");
        }
    }
    
}
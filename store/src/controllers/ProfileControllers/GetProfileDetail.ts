import { IProfileRepository } from "../../DTO/Chat/ProfileDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IProfile } from "../../models/Profile";

export class GetProfileDetailController implements IController{
    constructor(private readonly profileRepository: IProfileRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IProfile | String>> {

        try{
            const {profileId} = httpRequest.params;

            if(!profileId){
                return badRequest("No profile id provided");
            }

            const profile = await this.profileRepository.getProfileById(profileId);

            return ok(profile);
        }catch(err){
            return badRequest("Failed to retrieve profile");
        }
        
    }
    
}
import { IProfileRepository } from "../../DTO/Chat/ProfileDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IProfile } from "../../models/Profile";

export class GetProfileByUserIdController implements IController{
    constructor(private readonly profileRepository:IProfileRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IProfile | string>> {
        
        try{

            const {userId} = httpRequest.params;

            const resp = await this.profileRepository.getProfileByUserId(userId);

            return ok(resp);
        }catch(err){
            return badRequest("failed to retrieve profile")
        }

    }
    
}
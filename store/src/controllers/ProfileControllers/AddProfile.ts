import { AddConnection, IProfileRepository } from "../../DTO/Chat/ProfileDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IProfile } from "../../models/Profile";

export class AddProfileController implements IController{
    constructor(private readonly profileRepository:IProfileRepository){}
    async handle(httpRequest: HttpRequest<AddConnection>): 
    Promise<HttpResponse<IProfile | string>> {
        const {profileId, connectionId} = httpRequest.params;

        if(!profileId || !connectionId){
            return badRequest("Some required params wasn't provided");

        }


        const profile = await this.profileRepository.addConnection({profileId, connectionId});

        return ok(profile);

    }
    
}
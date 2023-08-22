import { IProfileCreate, IProfileRepository } from "../../DTO/Chat/ProfileDTO";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IProfile } from "../../models/Profile";

export class CreateProfileController implements IController{
    constructor(private readonly profileRepository:IProfileRepository){}
    async handle(httpRequest: HttpRequest<IProfileCreate>): 
    Promise<HttpResponse<IProfile | string>> {
        
        try{

            const {body} = httpRequest

            if(!body){
                return badRequest("No body found. Please, insert a body");
            }

            const profile = await this.profileRepository.save(body);

            return ok(profile)


        }catch(err){
            return badRequest("Failed to create profile");
        }
    }
    
}
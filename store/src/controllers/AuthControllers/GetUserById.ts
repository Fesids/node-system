import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IUserRepository } from "../../DTO/UserRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { IUser } from "../../models/User";

export class GetUserDetailController implements IController{
    constructor(private readonly userRepository: IUserRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IUser | string>> {
        try{
            const {userId} = httpRequest.params;

            if(!userId){
                return badRequest("User id is required");
            }

            const resdpUser = await this.userRepository.getUser(userId);

            return ok(resdpUser);
        }catch(err){
            return badRequest("failed to retrieve user detail")
        }
    }
    
}
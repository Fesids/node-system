
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IUserRepository } from "../../DTO/UserRequest";
import { badRequest, ok } from "../../UTILS/Helper";

export class DeleteUserController implements IController{
    constructor(private readonly userRepository:IUserRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<string>> {
        
        try{
            const id = httpRequest?.params?.id;

            if(!id){
                return badRequest("Missing id user");
            }

            const user = await this.userRepository.deleteUser(id);

            return ok(user)

        } catch(err){
            return badRequest("Something went wrong trying to delete user")
        }


    }
    
}
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IUserRepository } from "../../DTO/UserRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { IUser } from "../../models/User";

export class SearchUserController implements IController{
    constructor(private readonly userRepository:IUserRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IUser[] | string>> {
        const searchBody = httpRequest.body.search;
        const deptId = httpRequest.params.dept_id;
        

        if(!searchBody){
            return badRequest("No Body found")
        }

        const searchUsersList = await this.userRepository.searchUser(searchBody, deptId);
        return ok(searchUsersList);
    }

}
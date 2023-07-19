import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IUser } from "../../models/User";
import { UserRepository } from "../../repositories/UserRepository";

export class GetUsersByDeptIdController implements IController{
    constructor(private readonly userRepository:UserRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IUser[] | string>> {
        const id = httpRequest.params.id;


        if(!id){
            return badRequest(`department with id ${id} not found`);
        }

        const listUsers = await this.userRepository.getUsersByDepartment(id);

        return ok(listUsers);
    }
    
}
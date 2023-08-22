import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IUserRepository } from "../../DTO/UserRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { IUser } from "../../models/User";

export class GetUsersController implements IController{
    constructor(private readonly UserRepository:IUserRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IUser[] | string>> {
        //throw new Error("Method not implemented.");
        try{

            const {start, end} = httpRequest.params;

            if(!start || !end){
                throw new Error("Some parameter are missing");
            }

            const END = parseInt(end);
            const START = parseInt(start);

            const user_list = await this.UserRepository.getUsers(START, END);

            return ok(user_list);

        }catch(err){
            return badRequest("Something went wrong when trying to retrieve user list");
        }

    }
    
}
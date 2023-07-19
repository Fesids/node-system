import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IUserRepository, UserRequest } from "../../DTO/UserRequest";
import { badRequest, created } from "../../UTILS/Helper";
import { IUser } from "../../models/User";

export class RegisterController implements IController{
    constructor(private readonly userRepository: IUserRepository){}
    async handle(httpRequest: HttpRequest<UserRequest>):
     Promise<HttpResponse<IUser | String>> {
        try{
            const requiredFields = ["username", "email", "password", "uRole"];

            for(const field of requiredFields){
                if(!httpRequest?.body?.[field as keyof UserRequest]){
                    return badRequest(`Field ${field} is required`);
                }
            }

            if(!httpRequest.body){
                return badRequest("Please, specify a body");
            }

            const user = await this.userRepository.createUser(httpRequest.body);
            return created<IUser>(user);




        } catch(error){
            return badRequest("Something went wrong");
        }
    }
    
}
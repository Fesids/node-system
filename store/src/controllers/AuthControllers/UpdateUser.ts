import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { IUserRepository, UserUpdateRequest } from "../../DTO/UserRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { IUser } from "../../models/User";

export class UpdateUserController implements IController{
    constructor(private readonly userRepository:IUserRepository){}
    async handle(httpRequest: HttpRequest<UserUpdateRequest>): 
    Promise<HttpResponse<IUser | string>> {
        try{
            const id = httpRequest?.params?.id;
            const {body} = httpRequest;

            if(!id){
                return badRequest("Missing user id");
            }

            if(!body){
                return badRequest("Missing fields");
            }

            const allowedFieldsToUpdate: (keyof UserUpdateRequest)[]=[
                "email",
                "username",
                "password"
            ];


            const someFieldsNotAllowed = Object.keys(body)
            .some(
                (key) => !allowedFieldsToUpdate
                .includes(key as keyof UserUpdateRequest)
            );

            if(someFieldsNotAllowed){
                return badRequest("some included fields are not allowed");
            }

            const user = await this.userRepository.updateUser(id, body);

            return ok(user);

        } catch(err){
            return badRequest("failed to update user");
        }
    }
    
}
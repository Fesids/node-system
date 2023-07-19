import { HttpRequest, HttpResponse, HttpResponseLogin, IController, IControllerLogin, IUserLogin } from "../../DTO/ComunProtocols";
import { IUserRepository, UserLoginRequest, UserRequest } from "../../DTO/UserRequest";
import jwt from "jsonwebtoken"
import { MysqlDB } from "../../databases/MysqlDB";
import { IUser } from "../../models/User";
import { badRequest, created } from "../../UTILS/Helper";

export class LoginController implements IControllerLogin{
    constructor(private readonly userRepository: IUserRepository){}
    async handle(httpRequest: HttpRequest<UserRequest>): 
    Promise<HttpResponseLogin<IUser | string>> {

        try{

            const user = await this.userRepository.loginUser(httpRequest.body);
            const token = jwt.sign({id:user.id, role:user.uRole, emal: user.email}, "jwtkey");
            const body = {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "password": user.password,
                "token": token

            }
            return {
                body: user,
                statusCode: 201,
                token: token
            }
        }catch(err){
            return badRequest("Failed to login")
        }
        
    }

}
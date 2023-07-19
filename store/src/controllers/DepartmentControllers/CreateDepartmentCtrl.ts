import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { DepartmentRequest } from "../../DTO/DepartmentRequest";
import { badRequest, created } from "../../UTILS/Helper";
import { IDepartment } from "../../models/Department";
import { DepartmentRepository } from "../../repositories/DepartmentRepository";

export class CreateDepartmentController implements IController{
    constructor(private readonly departmentRepository: DepartmentRepository){}
    async handle(httpRequest: HttpRequest<DepartmentRequest>):
     Promise<HttpResponse<IDepartment | String>> {
        try{
            
            /*const requiredFields = ["department_name"];

            for(const field in requiredFields){
                if(!httpRequest?.body?.[field as keyof DepartmentRequest]){
                    return badRequest(`Field ${field} is required`)
                }
            }*/

            if(!httpRequest.body){
                return badRequest("Please, specify a body");
            }

            const dept = await this.departmentRepository.createDepartment(httpRequest.body);

            return created<IDepartment>(dept);

        }catch(error){
            return badRequest("Something went wrong")
        }




    }
    
}
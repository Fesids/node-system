import { ok } from "assert";
import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest } from "../../UTILS/Helper";
import { DepartmentRepository } from "../../repositories/DepartmentRepository";

export class DeleteDepartmentController implements IController{
    constructor(private readonly departmentRepository: DepartmentRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<String>> {
        try{
            const id = httpRequest?.params?.id;

            if(!id){
                return badRequest("Missing department id");
            }

            const department = await this.departmentRepository.deleteDepartment(id);

            return {
                statusCode: 200,
                body: department
            } 


        } catch(err){
            return badRequest("something went wrong trying to delete");
        }

    }
    
}
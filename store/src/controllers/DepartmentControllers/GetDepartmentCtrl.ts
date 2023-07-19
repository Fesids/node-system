import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IDepartment } from "../../models/Department";
import { DepartmentRepository } from "../../repositories/DepartmentRepository";

export class GetDepartmentController implements IController{
    constructor(private readonly departmentRepository: DepartmentRepository){}
    async handle(httpRequest: HttpRequest<any>): 
    Promise<HttpResponse<IDepartment | string>> {
        try{
            const id = httpRequest?.params?.id;


            if(!id){
                return badRequest("Missing department id");
            }

            const department = await this.departmentRepository.getDepartment(id);

            return ok(department);
        } catch(err){
            return badRequest("Something went wrong when trying to delete department");
        }
    }

}
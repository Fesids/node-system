import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { badRequest, ok } from "../../UTILS/Helper";
import { IDepartment } from "../../models/Department";
import { DepartmentRepository } from "../../repositories/DepartmentRepository";

export class GetAllDepartmentsController implements IController{
    constructor(private readonly departmentRepository: DepartmentRepository){}
    async handle(): 
    Promise<HttpResponse<IDepartment[] | string>> {
       try{
            const departments = await this.departmentRepository.getDepartments();

            return ok(departments);
       } catch(err){
            return badRequest("failed to return departments");
       }
    }
    
}
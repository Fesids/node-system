import { HttpRequest, HttpResponse, IController } from "../../DTO/ComunProtocols";
import { DepartmentRequest } from "../../DTO/DepartmentRequest";
import { badRequest, ok } from "../../UTILS/Helper";
import { IDepartment } from "../../models/Department";
import { DepartmentRepository } from "../../repositories/DepartmentRepository";

export class UpdateDepartmentController implements IController{
    constructor(private readonly departmentRepository: DepartmentRepository){}
    async handle(httpRequest: HttpRequest<DepartmentRequest>): 
    Promise<HttpResponse<IDepartment | string>> {
        try{
            const id = httpRequest.params.id;
            const {body} = httpRequest

            if(!id){
                return badRequest("Missing department id");
            }
            const allowedFields: (keyof DepartmentRequest)[]=[
                "department_name"
            ]
            const fieldsNotAllowedToUpdated = Object.keys(body)
            .some(
                (key) => !allowedFields.includes(key as keyof DepartmentRequest)
            );

            if(fieldsNotAllowedToUpdated){
                return badRequest("some included fields are not allowed to update");
            }

            const department = await this.departmentRepository.updateDepartment(id, body);

            return ok(department);
            
        } catch(err){
            return badRequest("something went wrong when triyng to update department");
        }
    }
    
}
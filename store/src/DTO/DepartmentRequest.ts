import { List } from "lodash";
import { IDepartment } from "../models/Department"


export interface DepartmentRequest{

    department_name: string


}

/*export interface UpdateDepartmentRequest extends DepartmentRequest{
    dept_id: string

}*/

export interface IDepartmentRepository{

    createDepartment(params: DepartmentRequest): Promise<IDepartment>;

    updateDepartment(id:string, params: DepartmentRequest): Promise<IDepartment>;

    deleteDepartment(id:string): Promise<String>;

    getDepartment(id:string): Promise<IDepartment>;

    getDepartments(): Promise<IDepartment[]>


}
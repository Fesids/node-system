import { List } from "lodash";
import { DepartmentRequest, IDepartmentRepository} from "../DTO/DepartmentRequest";
import { Department, DepartmentInput } from "../databases/DepartmentMongoDB";
import { IDepartment, IDepartmentResponse } from "../models/Department";

export class DepartmentRepository implements IDepartmentRepository{

    async getDepartments(): Promise<IDepartment[]> {
       
      

        const departments = await Department.find<IDepartmentResponse>({});

        if(!departments.length){
            throw new Error("No departments find");
        }

        return departments.map(({_id, department_name})=>({
            department_name,
            id: _id
        }));
    }

    async getDepartment(id: string): Promise<IDepartment> {
        
        const departmentExist = await Department.findById(id);

        if(!departmentExist){
            throw new Error(`department with id ${id} doesn't exist`);
        }

        const {_id, department_name} = departmentExist;

        return {id:_id, department_name: department_name}

    }

    async deleteDepartment(id: string): Promise<String> {
        const departmentExist = await Department.findById(id);

        if(!departmentExist){
            throw new Error(`department with ${id} doesn't exist`);
        };

        try{
            const deptDeleted = await Department.findByIdAndDelete(id);
            return "department deleted";
        } catch(err){
            throw new Error("failed to delete department");
        }
    }

    async updateDepartment(id:string, params: DepartmentRequest): Promise<IDepartment> {
        
        const deptExist = await Department.findById(id);

        if(!deptExist){
            throw new Error(`department with id ${id} not exist`);
        }

        const deptWithName = await Department.findOne({department_name: params.department_name});

        if(!deptWithName){
            throw new Error(`department ${params.department_name} already exist`);
        }

        const department_name = params.department_name;


        const deptUp = await Department.updateOne({_id: id},{$set:{
            ...params
        }});

        const departmentUpSuccess = await Department.findById(id);

        if(!departmentUpSuccess){
            throw new Error("Department couldn't be updated");
        }

        return {
            id: deptWithName.id, 
            department_name: deptWithName.department_name
        }

    }



    // Create function
    async createDepartment(params: DepartmentRequest): Promise<IDepartment> {
        
        const deptExist = await Department.findOne({departmemnt_name:params.department_name})

        if (deptExist){
            throw new Error("Department already exists");
        }

        const deptBody:DepartmentInput = {
            department_name: params.department_name
        }
        const {_id} = await Department.create(deptBody);
        
        const new_department = await Department.findById(_id);

        if(!new_department){
            throw new Error("Department not created");
        }



        return {id: new_department._id, 
            department_name: new_department.department_name}
    }
    
}
import { IUser } from "../models/User"

export interface UserRequest {
    username: string,
    email: string,
    password: string,
    uRole: string,
    department: number
}

export interface UserLoginRequest extends Omit<UserRequest, "username" | "uRole" | "department">{

}

export interface UserUpdateRequest extends Omit<UserRequest, "uRole">{
    
}


export interface IUserRepository{
    createUser(params: UserRequest): Promise<IUser>;

    loginUser(params: UserLoginRequest): Promise<IUser>;

    deleteUser(id:string): Promise<String>;

    updateUser(id:string, params: UserRequest): Promise<IUser>;

    getUsersByDepartment(dept_id:string): Promise<IUser[]>;

    searchUser(char: string, dept_id:string): Promise<IUser[]>;

    getUser(user_id:number): Promise<IUser>;

}
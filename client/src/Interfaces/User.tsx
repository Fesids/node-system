export enum UserRole{
    EXTERNAL_USER = "EXTERNAL_USER",
    EMPLOYEE = "EMPLOYEE",
    ADMIN = "ADMIN",
}

export interface IUser{
    id: number,
    username: string,
    email: string,
    password: string,
    uRole: UserRole
}

export interface UserRegisterReq extends Omit<IUser, "id">{

}

export interface UserLoginReq extends Omit<IUser, "id" | "uRole" | "username">{

}

export interface LoginResponseData {
    body: IUser,
    token: string
}
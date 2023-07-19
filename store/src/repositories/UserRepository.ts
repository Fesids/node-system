
import { get } from "lodash";
import { IUserRepository, UserLoginRequest, UserRequest } from "../DTO/UserRequest";
import { MysqlDB, MysqlPool } from "../databases/MysqlDB";
import { IUser } from "../models/User";
import bcrypt from "bcryptjs";
//import jwt from 'jsonwebtoken';
import {RowDataPacket} from "mysql2"


export class UserRepository implements IUserRepository{
    async getUser(user_id: number): Promise<IUser> {
        let q = "select * from users where id=?";

        const user = await MysqlPool.query<IUser[]>(q, user_id);

        if(!user){
            throw new Error("User with id "+ user_id+ " not found");


        }

        return user[0][0];
    }

    async searchUser(char: string, dept_id: string): Promise<IUser[]> {
        let q = "select * from users where email like "+ MysqlDB.escape(`%${char}%`)+" or username like "+MysqlDB.escape(`%${char}%`)+ " and department_id=?"/*+MysqlDB.escape(`%${dept_id}%`)*/;

        const usersList = await MysqlPool.query<IUser[]>(q, dept_id);

        if(!usersList){
            throw new Error("No user match");
        }

        return usersList[0];
    }

    
    async getUsersByDepartment(dept_id: string): Promise<IUser[]> {
        let q = "select * from users where department_id=?";

        const usersList = await MysqlPool.query<IUser[]>(q, dept_id);

        if(!usersList.length){
            throw new Error("No user found");
        }

        return usersList[0];
    }

    async updateUser(id: string, params: UserRequest): Promise<IUser> {

        const upQuery = "update  set username = ?, email = ?, password = ? where id = ?";
        const findQuery = "select * from  where id=?";

        const values = [params.username, params.email, params.password];
        const userExist = await MysqlPool.query<IUser[]>(findQuery, id);

        if(!userExist){
            throw new Error(`User with id ${id} not found`);
        }

        const emailExistQuery = "select * from  where email = ?";
        const userWithEmailExist = await MysqlPool.query<IUser[]>(emailExistQuery, params.email);

        /*if(userWithEmailExist){
            throw new Error("This email is already in use");
        }*/

        const updatedUser = await MysqlPool.query<IUser[]>(upQuery, [...values, id]);
        const getUpUser = await MysqlPool.query<IUser[]>(findQuery,id)
        return getUpUser[0][0];

    }

    async deleteUser(id: string): Promise<String> {
        const q = "select * from Users where id=?";
        const user = await MysqlPool.query<IUser[]>(q, id);

        if(!user){
            throw new Error("User not found!");
        }

        const delQuery = "delete from  where id=?";
        const deletedUser = await MysqlPool.query(delQuery, id);

        return "User was deleted";


    }


    async loginUser(params: UserLoginRequest): Promise<IUser> {
        
        const q = "select * from Users where email=?";
        const user = await MysqlPool.query<IUser[]>(q, params.email);

        if(!user){
            throw new Error("User not found! check your credentials");
        }
        
        const isPasswordCorrect = bcrypt.compareSync(params.password, user[0][0].password);


        if(!isPasswordCorrect){
            throw new Error("Password is incorrect! please, check your password");
        }


        return user[0][0];

    }

    // Function to create user
    async createUser(params: UserRequest): Promise<IUser> {
        let q = "select * from Users where email=? or username= ?";


        let [rows] = await MysqlPool.query<IUser[]>(q, [params.email, params.username])
        if(rows.length) throw new Error("User with this credentials already exists");

        q = "insert into Users(username, email,password, uRole, department_id) values(?, ?, ?, ?, ?)";
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(params.password, salt);

        const values =
        [
            params.username,
            params.email,
            hashPass,
            params.uRole,
            params.department
        ];

        [rows] =  await MysqlPool.query<IUser[]>(q, /*[params.username, params.email, params.password]*/values);
        q = "select * from Users where email=?";
        const email = params.email
        const res = await MysqlPool.query<IUser[]>(q, email);
        
        return res[0][0];

    }

    /*async createUser(params: UserRequest): Promise<User>{

        let user:User;
        let q = "select * from  where email=? or username= ?";

        MysqlDB.query(q, [params.email, params.username], (err, data)=>{
            if(err) throw new Error("Somthing went wrong");

            if(data.length) throw new Error("user with this credentials already exists");

            /*const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(params.password, salt);

            q = "insert into (`username`, `email`, `password`) values(?)";

            const values = [
                params.username,
                params.email,
                params.password
            ];*/

            /*MysqlDB.query(q, values, (err, data:User)=>{
                if(err) throw Error("failed to register user");
                user = data;
            });*/
            //MysqlDB.query(q, values)

        /*})
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(params.password, salt);

        q = "insert into (`username`, `email`, `password`) values(?)";

        const values = [
            params.username,
            params.email,
            params.password
        ];
        user =  MysqlPool.query(q, values)

        return user;*/
       
    
}
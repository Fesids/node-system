import {Router} from 'express';
import { GetUsersByDeptId, Register, SearchUserFunction, deleteUser, getUserDetail, login, logout, teste, updateUser } from './AuthFunctions';
import { Auth, isAdmin, isExternalUser } from '../../Middleware/AuthenticationMiddleware';


const app = Router();

///pp.get("/teste", teste),
app.post("/register", Register);
app.post("/login", login);
app.post("/logout", Auth, logout);
app.delete("/delete/:id",Auth, isAdmin, deleteUser);
app.patch("/update/:id", Auth,isAdmin, updateUser);
app.get("/users/department/:id", GetUsersByDeptId);
app.post("/:dept_id/search", SearchUserFunction);
app.get("/detail/:userId", getUserDetail);
//app.get("/testezin", Auth, isExternalUser)

export const AuthRoutes = app;




import { Router } from "express";
import { changeRole, deleteClient, deleteUser, test, updateClient, updateUser } from "./user.controller.js";
import { validateJwt, isAdmin, isClient } from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/test', test)

//Admin
api.put('/updateUser/:id', [validateJwt,isAdmin], updateUser)
api.delete('/deleteUser/:id', [validateJwt,isAdmin], deleteUser)
api.put('/changeRole/:id',[validateJwt,isAdmin], changeRole)

//Client
api.put('/updateClient/:id', [validateJwt, isClient], updateClient)
api.delete('/deleteClient/:id', [validateJwt, isClient], deleteClient)
export default api
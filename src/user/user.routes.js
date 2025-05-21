import { Router } from "express";
import { changeRole, deleteClient, deleteUser, getUserById, test, updateClient, updatePassword, updateUser } from "./user.controller.js";
import { validateJwt, isAdmin, isClient } from "../../middlewares/validate.jwt.js";
import { passwordVerify } from "../../middlewares/validators.js";

const api = Router()

api.get('/test', test)
api.get('/:id', getUserById)

//Admin
api.put('/updateUser/:id', [validateJwt,isAdmin], updateUser)
api.delete('/deleteUser/:id', [validateJwt,isAdmin], deleteUser)
api.put('/changeRole/:id',[validateJwt,isAdmin], changeRole)

//Client
api.put('/updateClient/:id', [validateJwt, isClient], updateClient)
api.delete('/deleteClient/:id', [validateJwt, isClient], deleteClient)
api.put('/updatePassword/:id', [validateJwt, isClient, passwordVerify], updatePassword)
export default api
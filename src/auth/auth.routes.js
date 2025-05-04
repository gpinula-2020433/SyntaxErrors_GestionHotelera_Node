//Rutas de autenticación
import { Router } from "express"
import { 
    login,
    register, 
    test 
} from "./auth.controller.js"
import { validateJwt } from '../../middlewares/validate.jwt.js'
import { registerValidator } from "../../middlewares/validators.js"


const api = Router()

//Rutas públicas
                    //Middlewares
api.post(
    '/register',[registerValidator], register)

api.post('/login', login)

api.get('/test', validateJwt, test)

export default api
import { Router } from "express"
import {
    getAllServices,
    getServiceByID,
    createService,
    updateService,
    deleteService
} from './additionalServices.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js"

const api = Router()

api.get('/', [validateJwt], getAllServices)
api.get('/:id', [validateJwt], getServiceByID)
api.post('/', [validateJwt], createService)
api.put('/:id', [validateJwt], updateService)
api.delete('/:id', [validateJwt], deleteService)

export default api
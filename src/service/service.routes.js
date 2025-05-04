import { Router } from "express";
import {
    getAll,
    getByID,
    save,
    updateService,
    deleteService
} from './service.controller.js'
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/', [validateJwt], getAll)
api.get('/:id', [validateJwt], getByID)
api.post('/', save)
api.put('/:id', [validateJwt], updateService)
api.delete('/:id', [validateJwt], deleteService)

export default api
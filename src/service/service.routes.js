import { Router } from "express";
import {
    getAll,
    getByID,
    save,
    updateService,
    deleteService
} from './service.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

api.get('/', [validateJwt], getAll)
api.get('/:id', [validateJwt], getByID)
api.post('/', [validateJwt, isAdmin], save)
api.put('/:id', [validateJwt, isAdmin], updateService)
api.delete('/:id', [validateJwt, isAdmin], deleteService)

export default api
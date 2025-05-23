import { Router } from "express"
import { 
  getAll, 
  getByID, 
  save, 
  updateR, 
  deleteR 
} from './reservation.controller.js'

import { validateJwt, isClient } from "../../middlewares/validate.jwt.js"

const api = Router()


api.get('/', [validateJwt], getAll)
api.get('/:id', [validateJwt], getByID)
api.post('/', [validateJwt, isClient], save)
api.put('/:id', [validateJwt, isClient], updateR)
api.delete('/:id', [validateJwt], deleteR)

export default api;
import { Router } from "express"
import { 
  getAll, 
  getByID, 
  save, 
  updateR, 
  deleteR 
} from './reservation.controller.js'

import { validateJwt, isClient } from "../../middlewares/validate.jwt.js"
import { 
  validateCreateRoom, 
  validateUpdateRoom
} from "../../middlewares/validators.js"

const api = Router()

// Definición de las rutas con las validaciones
api.get('/', [validateJwt], getAll)
api.get('/:id', [validateJwt], getByID)
api.post('/', [validateJwt, isClient, validateCreateRoom], save)
api.put('/:id', [validateJwt, isClient, validateUpdateRoom], updateR)
api.delete('/:id', [validateJwt], deleteR)

export default api;

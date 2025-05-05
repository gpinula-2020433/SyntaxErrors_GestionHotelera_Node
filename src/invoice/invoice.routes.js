import { Router } from "express"
import { getAllInvoices,
         getInvoicesByCustomer,
         getInvoiceById,
         updateInvoice
} from './invoice.controller.js' 
import { validateJwt, isAdmin, isClient } from '../../middlewares/validate.jwt.js'
import { validateUpdateInvoice } from "../../middlewares/validators.js"

const api = Router()


api.get('/getAll', [validateJwt, isAdmin], getAllInvoices)
api.get('/getCustomer/:id', [validateJwt, isClient], getInvoicesByCustomer)
api.get('/getId/:id', [validateJwt, isAdmin], getInvoiceById)
api.put('/update/:id', [validateJwt, isAdmin, validateUpdateInvoice], updateInvoice)


export default api
import { Router } from 'express'
import {
    getAllHotels,
    getHotelById,
    saveHotel,
    updateHotel,
    deleteHotel
} from './hotel.controller.js'
//import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.get('/', [validateJwt], getAllHotels)
api.get('/:id', [validateJwt], getHotelById)
api.post('/', [validateJwt], saveHotel)
api.put('/:id', [validateJwt], updateHotel)
api.delete('/:id', [validateJwt], deleteHotel)

export default api

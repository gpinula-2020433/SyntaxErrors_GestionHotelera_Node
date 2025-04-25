import { Router } from "express";
import {
    getAllRooms,
    getRoomByID,
    saveRoom,
    updateRoom,
    deleteRoom
} from './room.controller.js'
//import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router()

/*api.get('/', [validateJwt], getAllRooms)
api.get('/:id', [validateJwt], getRoomByID)
api.post('/', [validateJwt], saveRoom)
api.put('/:id', [validateJwt], updateRoom)
api.delete('/:id', [validateJwt], deleteRoom)*/

export default api
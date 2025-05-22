import { Router } from "express";
import {
    addRoom,
    getAllRooms,
    getRoomsByType,
    updateRoom,
    deleteRoom
} from './room.controller.js'
import { validateCreateRoom, validateUpdateRoom } from "../../middlewares/validators.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";

const api = Router()

api.post(
    '/add',
    [
      validateJwt,
      isAdmin,
      uploadProfilePicture.single("imageRoom"),
      validateCreateRoom,
      deleteFileOnError
    ],
    addRoom
  )

api.get('/getAll', [validateJwt], getAllRooms)
api.get('/get/:type', [validateJwt], getRoomsByType)

api.put(
    '/update/:id',
    [
      validateJwt,
      isAdmin,
      uploadProfilePicture.single("imageRoom"),
      validateUpdateRoom,
      deleteFileOnError
    ],
    updateRoom
  )
api.delete('/delete/:id', [validateJwt, isAdmin], deleteRoom)


export default api
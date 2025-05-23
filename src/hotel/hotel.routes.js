import { Router } from "express";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js"
import { uploadHotelImage } from "../../middlewares/uploadHotelImage.js";
import {deleteFileOnError} from "../../middlewares/delete.file.on.errors.js"
import { addHotel, deleteHotel, getAllHotels, getHotelById, updateHotel, updateHotelImage, getHotelDetails} from "./hotel.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { hotelValidator, validateUpdateHotel } from "../../middlewares/validators.js";
import { validateErrors } from "../../middlewares/validate.errors.js";

const api = Router()
api.get('/',getAllHotels)
api.get('/:id',[validateJwt],getHotelById)
api.post('/',[validateJwt,isAdmin,uploadHotelImage.single("imageHotel"), hotelValidator,validateErrors,deleteFileOnError],addHotel, updateHotelImage)
api.delete('/:id',[validateJwt,isAdmin], deleteHotel)
/* api.put('/:id',[validateJwt,isAdmin,validateUpdateHotel], updateHotel) */
api.put('/:id', [
  validateJwt,
  isAdmin,
  uploadHotelImage.single('imageHotel') // Aquí para manejar la imagen al actualizar
  
], updateHotel);

api.put('/updateHotelImage/:id',[validateJwt, isAdmin,uploadProfilePicture.single("imageHotel"),deleteFileOnError],updateHotelImage)
api.get('/hoteldetails/:id', getHotelDetails)
export default api
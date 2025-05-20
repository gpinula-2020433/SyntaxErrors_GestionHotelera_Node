import { Router } from "express";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js"
import {deleteFileOnError} from "../../middlewares/delete.file.on.errors.js"
import { addHotel, deleteHotel, getAllHotels, getHotelById, updateHotel, updateHotelImage, getHotelDetails} from "./hotel.controller.js";
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { hotelValidator, validateUpdateHotel } from "../../middlewares/validators.js";

const api = Router()
api.get('/',[ validateJwt],getAllHotels)
api.get('/:id',[validateJwt],getHotelById)
api.post('/',[validateJwt,isAdmin,uploadProfilePicture.single("imageHotel"), hotelValidator,deleteFileOnError],addHotel)
api.delete('/:id',[validateJwt,isAdmin], deleteHotel)
api.put('/:id',[validateJwt,isAdmin,validateUpdateHotel], updateHotel)
api.put('/updateHotelImage/:id',[validateJwt, isAdmin,uploadProfilePicture.single("imageHotel"),deleteFileOnError],updateHotelImage)
api.get('/hoteldetails/:id', [validateJwt], getHotelDetails)
export default api
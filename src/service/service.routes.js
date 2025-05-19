import { Router } from "express";
import {
    getAll,
    getByID,
    save,
    updateService,
    deleteService,
    updateServiceImage
} from './service.controller.js'
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js";
import { uploadProfilePicture } from "../../middlewares/multer.uploads.js";
import { deleteFileOnError } from "../../middlewares/delete.file.on.errors.js";
import { validateRegisterService } from "../../middlewares/validators.js";

const api = Router()

api.get('/', [validateJwt], getAll)
api.get('/:id', [validateJwt], getByID)

api.post('/', 
    [
        validateJwt, 
        isAdmin,
        uploadProfilePicture.single("imageService"),
        validateRegisterService,
        deleteFileOnError
    ], 
        save
)

api.put('/:id',
    [
        validateJwt,
        isAdmin,
    ], 
    updateService
)

api.put('/updateServiceImage/:id', 
    [
        validateJwt, 
        isAdmin,
        uploadProfilePicture.single("imageService"),
        deleteFileOnError
    ], 
    updateServiceImage
)

api.delete('/:id', [validateJwt, isAdmin], deleteService)

export default api
//Validar campos en las rutas

import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { 
} from "../utils/db.validators.js";

/*
export const name = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(nombreDelCustom),
    validateErrors
]*/
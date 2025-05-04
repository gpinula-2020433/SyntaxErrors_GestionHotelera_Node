//Validar campos en las rutas
import { body } from "express-validator";
import { validateErrors, validateErrorsWithoutFiles } from "./validate.errors.js";
import { existHotelName,existUsername,existEmail, objectIdValid, validateServices } from "../utils/db.validators.js";

export const validateCreateEvent = [
    body('title', 'Title is required')
      .notEmpty()
      .isLength({ max: 50 }).withMessage('Title cannot exceed 50 characters'),
    body('description', 'Description is required')
      .notEmpty()
      .isLength({ max: 100 }).withMessage('Description cannot exceed 100 characters'),
    body('date', 'Date is required')
      .notEmpty()
      .isISO8601().withMessage('Date must be in valid ISO format'),
    body('location', 'Location is required')
      .notEmpty(),
    body('services', 'At least one service is required')
      .isArray().notEmpty(),
    body('services.*', 'Each service must be a valid ObjectId')
      .custom(async (value) => {
        await objectIdValid(value)
        await existService(value)
      }),
    body('hotel', 'Hotel is required')
      .notEmpty()
      .custom(async (value) => {
        await objectIdValid(value)
        await existHotel(value)
      }),
  ]

  export const validateUpdateEvent = [
    body('title', 'Title is required')
      .notEmpty()
      .isLength({ max: 50 }).withMessage('Title cannot exceed 50 characters'),
    body('description', 'Description is required')
      .notEmpty()
      .isLength({ max: 100 }).withMessage('Description cannot exceed 100 characters'),
    body('date', 'Date is required')
      .notEmpty()
      .isISO8601().withMessage('Date must be in valid ISO format'),
    body('location', 'Location is required')
      .notEmpty(),
    body('services', 'At least one service is required')
      .isArray().notEmpty(),
    body('services.*', 'Each service must be a valid ObjectId')
      .custom(async (value) => {
        await objectIdValid(value)
        await existService(value)
      }),
    body('hotel', 'Hotel is required')
      .notEmpty()
      .custom(async (value) => {
        await objectIdValid(value)
        await existHotel(value)
      }),
  ]

export const registerValidator = [
    body('name', 'Name cannot be empty')
        .notEmpty(),
    body('surname', 'Surname cannot be empty')
        .notEmpty(),
        body('username', 'Username cannot be empty')
        .notEmpty()
        .toLowerCase(),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail()
        .custom(existEmail),
    body('username')
        .notEmpty()
        .toLowerCase()
        .custom(existUsername),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword()
        .withMessage('Password must be strong')
        .isLength({min: 8})
        .withMessage('Password need min characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isMobilePhone(),
    validateErrors
]


export const hotelValidator = [
    body('name', 'Hotel name cannot be empty')
        .notEmpty()
        .custom(existHotelName),
    body('address', 'Address cannot be empty')
        .notEmpty(),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({ max: 200 })
        .withMessage('Description must be no more than 200 characters'),
    body('phone', 'Phone cannot be empty')
        .notEmpty()
        .isLength({ min: 8, max: 13 })
        .isMobilePhone()
        .withMessage('Phone must be between 8 and 13 digits'),
    body('category', 'Category must be a number between 1 and 5')
        .notEmpty()
        .isInt({ min: 1, max: 5 }),
    body('amenities', 'Amenities must be a non-empty array of strings')
        .isArray({ min: 1 })
        .withMessage('At least one amenity is required'),
    body('services', 'service cannot be empty')
        .notEmpty()
        .custom(validateServices),
    
        validateErrors
  ]

  export const validateUpdateHotel = [
    body("name")
      .notEmpty()
      .withMessage("Name is required"),
    body("address")
      .notEmpty()
      .withMessage("Address is required"),
    body("description")
      .isLength({ max: 200 })
      .withMessage("Description must be no more than 200 characters"),
    body("phone")
      .isLength({ min: 8, max: 13 })
      .isMobilePhone()
      .withMessage("Phone must be between 8 and 13 digits"),
    body("category")
      .isInt({ min: 1, max: 5 })
      .withMessage("Category must be an integer between 1 and 5"),
    body("amenities")
      .isArray()
      .withMessage("Amenities must be an array"),
    body('services', 'service cannot be empty')
        .notEmpty()
        .custom(validateServices),
    
    validateErrors,
  ];
  




/*
export const name = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .custom(nombreDelCustom),
    validateErrors
]*/
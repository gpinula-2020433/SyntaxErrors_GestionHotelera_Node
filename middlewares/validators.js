// Validar campos en las rutas
import { body } from "express-validator";
import { validateErrors } from "./validate.errors.js";
import { existHotel, existUsername, existEmail, objectIdValid, validateServices, isNITUnique, validatePaymentType, isRoomNumber, existsNameHotel } from "../utils/db.validators.js";

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
      body('rol', 'Role cannot be empty')
        .optional(),
    validateErrors
]

export const passwordVerify = [
  body ('newPassword')
  .isStrongPassword()
  .withMessage('Password must be strong')
  .isLength({min: 8})
  .withMessage('Password need min characters'),
  validateErrors
]

export const hotelValidator = [
    body('name', 'Hotel name cannot be empty')
        .notEmpty()
        .custom(existsNameHotel),
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

// Validar creación de habitación
export const validateCreateRoom = [
  body('name', 'Name is required')
    .notEmpty()
    .isLength({ min: 3, max: 50 }).withMessage('Name must be between 3 and 50 characters'),
  body('roomNumber', 'Room number is required')
    .notEmpty()
    .custom(async (value, { req }) => {
      await isRoomNumber(value, req.body.hotel)
    }),
  body('type', 'Type is required and must be valid')
    .notEmpty()
    .isIn(['INDIVIDUAL', 'DOUBLE', 'SUITE'])
    .withMessage('Type must be one of: INDIVIDUAL, DOUBLE, SUITE'),
  body('roomDescription', 'Room description is required')
    .notEmpty()
    .isLength({ min: 10, max: 500 }).withMessage('Room description must be between 10 and 500 characters'),
  body('capacity', 'Capacity is required and must be a positive number')
    .notEmpty()
    .isInt({ min: 1 }),
  body('pricePerNight', 'Price per night is required and must be a positive number')
    .notEmpty()
    .isFloat({ min: 0 }),
  body('status', 'Status is required and must be valid')
    .notEmpty()
    .isIn(['AVAILABLE', 'BUSY', 'MAINTENANCE'])
    .withMessage('Status must be one of: AVAILABLE, BUSY, MAINTENANCE'),
  body('availabilityDates', 'Availability dates must be an array of valid dates')
    .optional()
    .isArray()
    .custom((dates) => {
      for (const date of dates) {
        if (isNaN(Date.parse(date))) throw new Error('Invalid date in availabilityDates')
      }
      return true
    }),
  body('hotel', 'Hotel is required')
    .notEmpty()
    .custom(async (value) => {
      await objectIdValid(value)
      await existHotel(value)
    }),

  validateErrors
]

// Validar actualización de habitación
export const validateUpdateRoom = [
  body('name', 'Name is required')
    .optional()
    .isLength({ min: 3, max: 50 }),
  body('roomNumber', 'Room number is required')
    .optional()
    .custom(async (value, { req }) => {
      await isRoomNumber(value, req.body.hotel, req.params.id)
    }),
  body('type', 'Type must be valid')
    .optional()
    .isIn(['INDIVIDUAL', 'DOUBLE', 'SUITE'])
    .withMessage('Type must be one of: INDIVIDUAL, DOUBLE, SUITE'),
  body('roomDescription', 'Room description is required')
    .optional()
    .isLength({ min: 10, max: 500 }),
  body('capacity', 'Capacity must be a positive integer')
    .optional()
    .isInt({ min: 1 }),
  body('pricePerNight', 'Price per night must be a positive number')
    .optional()
    .isFloat({ min: 0 }),
  body('status', 'Status must be valid')
    .optional()
    .isIn(['AVAILABLE', 'BUSY', 'MAINTENANCE'])
    .withMessage('Status must be one of: AVAILABLE, BUSY, MAINTENANCE'),
  body('availabilityDates', 'Availability dates must be an array of valid dates')
    .optional()
    .isArray()
    .custom((dates) => {
      for (const date of dates) {
        if (isNaN(Date.parse(date))) throw new Error('Invalid date in availabilityDates')
      }
      return true
    }),
  body('hotel', 'Hotel is required')
    .optional()
    .custom(async (value) => {
      await objectIdValid(value)
      await existHotel(value)
    }),
  validateErrors
]

// Validar actualización de factura
export const validateUpdateInvoice = [
  body('room', 'Room is required and must be an array of valid IDs')
    .isArray({ min: 1 })
    .custom(async (rooms) => {
      for (const roomId of rooms) await objectIdValid(roomId)
      return true
    }),
  body('days', 'Days must be an array of positive integers')
    .isArray({ min: 1 })
    .custom((days) => {
      for (const d of days) {
        if (!Number.isInteger(d) || d <= 0) throw new Error('Each day must be a positive integer')
      }
      return true
    }),
  body('pricePerNight', 'Price per night must be a positive number')
    .optional()
    .isFloat({ min: 0 }),
  body('typeOfPayment', 'Invalid payment type')
    .optional()
    .custom(validatePaymentType),
  body('NIT', 'NIT is required')
    .notEmpty()
    .custom(async (value, { req }) => {
      const invoiceId = req.params.id
      const customerId = req.user.uid
      await isNITUnique(value, customerId, invoiceId)
    }),
]

export const validateRegisterService = [
  body('name', 'Name is required')
    .notEmpty()
    .isLength({ max: 40 }).withMessage('Name cannot exceed 40 characters'),
  body('type', 'Type is required')
    .notEmpty()
    .isIn(['COMIDA', 'LIMPIEZA', 'PISCINA', 'EXTRA']).withMessage('Type must be one of COMIDA, LIMPIEZA, PISCINA, EXTRA'),
  body('description', 'Description is required')
    .notEmpty()
    .isLength({ max: 100 }).withMessage('Description cannot exceed 100 characters'),
  body('price', 'Price is required')
    .notEmpty()
    .isFloat({ min: 0 }).withMessage('Price must be a positive number'),
  body('available', 'Available must be a boolean')
    .optional()
    .isBoolean(),
  validateErrors
]
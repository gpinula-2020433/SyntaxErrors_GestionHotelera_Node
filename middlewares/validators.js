import { body } from 'express-validator'
import { objectIdValid } from '../utils/db.validators.js'
import { existService, existHotel } from '../utils/db.validators.js'

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

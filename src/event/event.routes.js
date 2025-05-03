import { Router } from 'express'
import {
  getAllEvents,
  getEventByID,
  createEvent,
  updateEvent,
  deleteEvent,
} from './event.controller.js'

const api = Router()

api.get('/', getAllEvents)
api.get('/:id', getEventByID)
api.post('/', createEvent)
api.put('/:id', updateEvent)
api.delete('/:id', deleteEvent)

export default api;

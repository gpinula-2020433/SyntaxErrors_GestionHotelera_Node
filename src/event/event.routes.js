import { Router } from 'express';
import {
  getAllEvents,
  getEventById,
  addEvent,
  updateEvent,
  deleteEvent,
} from './event.controller.js'

const api = Router()

api.get('/', getAllEvents)
api.get('/:id', getEventById)
api.post('/', addEvent)
api.put('/:id', updateEvent)
api.delete('/:id', deleteEvent)

export default api;
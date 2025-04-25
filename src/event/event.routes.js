import { Router } from "express";
import {
    getAllEvents,
    getEventByID,
    createEvent,
    updateEvent,
    deleteEvent
} from './event.controller.js';
import { validateJwt } from "../../middlewares/validate.jwt.js";

const api = Router();

api.get('/', [validateJwt], getAllEvents);
api.get('/:id', [validateJwt], getEventByID);
api.post('/', [validateJwt], createEvent);
api.put('/:id', [validateJwt], updateEvent);
api.delete('/:id', [validateJwt], deleteEvent);

export default api;

import { Router } from "express";
import { addHotel, getAllHotels } from "./hotel.controller.js";

const api = Router()
api.get('/',getAllHotels)

api.post('/', addHotel)

export default api

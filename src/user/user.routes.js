import { Router } from "express";
import { getUser, saveUser } from "./user.controller.js";

const api = Router()

api.get('/get', getUser)
api.post('/save', saveUser)

export default api
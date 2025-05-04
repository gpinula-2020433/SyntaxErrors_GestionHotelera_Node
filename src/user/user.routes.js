import { Router } from "express";
import { getUser } from "./user.controller.js";

const api = Router()

api.get('/get', getUser)

export default api
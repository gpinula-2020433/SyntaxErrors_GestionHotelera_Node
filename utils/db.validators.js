import { isValidObjectId } from 'mongoose';
import Hotel from '../src/hotel/hotel.model.js';  // Modelo Hotel
import Service from '../src/service/service.model.js';  // Modelo Service
//import User from '../src/user/user.model.js';  // Puedes descomentar y usar este import si es necesario

export const existHotel = async (hotelId) => {
  if (!isValidObjectId(hotelId)) {
    throw new Error('Invalid hotel ObjectId')
  }
  const hotel = await Hotel.findById(hotelId)
  if (!hotel) {
    throw new Error('Hotel does not exist')
  }
}

export const existService = async (serviceId) => {
  if (!isValidObjectId(serviceId)) {
    throw new Error('Invalid service ObjectId')
  }
  const service = await Service.findById(serviceId)
  if (!service) {
    throw new Error('Service does not exist')
  }
}

export const existUsername = async (username, user) => {
  const alreadyUsername = await User.findOne({ username })
  if (alreadyUsername && alreadyUsername._id != user.uid) {
    console.error(`Username ${username} is already taken`)
    throw new Error(`Username ${username} is already taken`)
  }
}

export const existEmail = async (email, user) => {
  const alreadyEmail = await User.findOne({ email })
  if (alreadyEmail && alreadyEmail._id != user.uid) {
    console.error(`Email ${email} is already taken`)
    throw new Error(`Email ${email} is already taken`)
  }
}

export const notRequiredField = (field) => {
  if (field) {
    throw new Error(`${field} is not required`)
  }
}

export const findUser = async (id) => {
  try {
    const userExist = await User.findById(id)
    if (!userExist) return false
    return userExist
  } catch (err) {
    console.error(err)
    return false
  }
}

// Validar que un ObjectId sea válido
export const objectIdValid = (objectId) => {
  if (!isValidObjectId(objectId)) {
    throw new Error('The value of field is not a valid ObjectId')
  }
}
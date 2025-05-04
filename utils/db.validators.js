//Validar datos relacionados a la BD

import Hotel from '../src/hotel/hotel.model.js'
import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
import Service from '../src/service/service.model.js'  // Modelo Service
import Room from '../src/room/room.model.js'
import Invoice from '../src/invoice/invoice.model.js'
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

//Validar que sea un id  la llave foranea


export const objectIdValid = (objectId)=>{
    if(!isValidObjectId(objectId)) {
        throw new Error(`The value of field is not a valid ObjectId`)
    }
}

export const validateServices = (services) => {
    // Si `services` es un solo valor, convertirlo en un array
    if (!Array.isArray(services)) {
      services = [services];
    }
  
    // Verificar que el array no esté vacío
    if (services.length === 0) {
      throw new Error('At least one service must be provided');
    }
  
    // Verificar que cada elemento del array sea un ObjectId válido
    services.forEach(serviceId => {
      if (!isValidObjectId(serviceId)) {
        throw new Error(`Invalid service ID: ${serviceId}`);
      }
    });
    return true;
  };

  
//Validar número de habitación unico por hotel
export const isRoomNumber = async (roomNumber, hotelId, roomId = null) => {
  const existingRoom = await Room.findOne({ roomNumber, hotel: hotelId })

  if (existingRoom) {
    if (!roomId || existingRoom._id.toString() !== roomId.toString()) {
      throw new Error(`Room number "${roomNumber}" already exists in this hotel`)
    }
  }
}

// Validar que el NIT sea único por cliente (excepto en la factura actual)
export const isNITUnique = async (NIT, customerId, invoiceId = null) => {
  if (!NIT) {
    throw new Error('NIT is required')
  }
  const existing = await Invoice.findOne({ NIT, customer: customerId })
  if (existing) {
    if (!invoiceId || existing._id.toString() !== invoiceId.toString()) {
      throw new Error(`NIT "${NIT}" already exists for this customer`)
    }
  }
}

// Validar el tipo de pago sea válido
export const validatePaymentType = (type) => {
  const valid = ['CASH', 'CARD']
  if (!type) {
    throw new Error('Type of payment is required')
  }
  if (!valid.includes(type)) {
    throw new Error('Invalid payment type. Must be CASH or CARD')
  }
}

/* Ejemplo de como podrian hacerse validaciones NOTA: ELIMINAR Despues
export const existNameCompany = async(name)=>{
    const alreadyName = await Company.findOne({name})
    if(alreadyName){
        console.error(`The company | ${name} | already exists`)
        throw new Error(`The company | ${name} | already exists`)
    }
}
*/
// Validar datos relacionados a la BD

import Hotel from '../src/hotel/hotel.model.js'
import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
import Service from '../src/service/service.model.js'  // Modelo Service
import Room from '../src/room/room.model.js'
import Invoice from '../src/invoice/invoice.model.js'

// Validar existencia de un hotel
export const existHotel = async (hotelId) => {
  if (!isValidObjectId(hotelId)) {
    throw new Error('Invalid hotel ObjectId')
  }
  const hotel = await Hotel.findById(hotelId)
  if (!hotel) {
    throw new Error('Hotel does not exist')
  }
}

// Validar existencia de un servicio
export const existService = async (serviceId) => {
  if (!isValidObjectId(serviceId)) {
    throw new Error('Invalid service ObjectId')
  }
  const service = await Service.findById(serviceId)
  if (!service) {
    throw new Error('Service does not exist')
  }
}

// Validar existencia de un nombre de usuario (debe ser único para cada usuario)
export const existUsername = async (username, user) => {
  const alreadyUsername = await User.findOne({ username })
  if (alreadyUsername && alreadyUsername._id != user.uid) {
    console.error(`Username ${username} ya existe`)
    throw new Error(`Username ${username} ya existe`)
  }
}

// Validar existencia de un email (debe ser único para cada usuario)
export const existEmail = async (email, user) => {
  const alreadyEmail = await User.findOne({ email })
  if (alreadyEmail && alreadyEmail._id != user.uid) {
    console.error(`Email ${email} ya existe`)
    throw new Error(`Email ${email} ya existe`)
  }
}

// Verificar si el campo no es requerido
export const notRequiredField = (field) => {
  if (field) {
    throw new Error(`${field} is not required`)
  }
}

// Validar que el ID de un usuario exista
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
    throw new Error(`The value of field is not a valid ObjectId`)
  }
}

// Validar que el NIT de un cliente sea único (para cada cliente)
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

// Validar el tipo de pago (CASH o CARD)
export const validatePaymentType = (type) => {
  const valid = ['CASH', 'CARD']
  if (!type) {
    throw new Error('Type of payment is required')
  }
  if (!valid.includes(type)) {
    throw new Error('Invalid payment type. Must be CASH or CARD')
  }
}

// Validar número de habitación único por hotel
export const isRoomNumber = async (roomNumber, hotelId, roomId = null) => {
  const existingRoom = await Room.findOne({ roomNumber, hotel: hotelId })

  if (existingRoom) {
    if (!roomId || existingRoom._id.toString() !== roomId.toString()) {
      throw new Error(`Room number "${roomNumber}" already exists in this hotel`)
    }
  }
}

// Validar que los servicios sean ObjectIds válidos
export const validateServices = (services) => {
  // Si `services` es un solo valor, convertirlo en un array
  if (!Array.isArray(services)) {
    services = [services]
  }

  // Verificar que el array no esté vacío
  if (services.length === 0) {
    throw new Error('At least one service must be provided')
  }

  // Verificar que cada elemento del array sea un ObjectId válido
  services.forEach(serviceId => {
    if (!isValidObjectId(serviceId)) {
      throw new Error(`Invalid service ID: ${serviceId}`)
    }
  })
  return true
}

// Validar la disponibilidad de habitaciones durante las fechas seleccionadas
export const isRoomAvailable = async (hotelId, roomIds, startDate, endDate) => {
  const overlappingReservations = await Reservation.find({
    hotel: hotelId,
    room: { $in: roomIds },
    status: { $ne: 'CANCELADA' },
    $or: [
      { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
    ]
  })

  if (overlappingReservations.length > 0) {
    throw new Error('One or more rooms are already booked during the selected dates')
  }
}


export const existsNameHotel = async(nameHotel)=>{
  const existsHotel = await Hotel.findOne({nameHotel})
  if(existsHotel){
    console.error(`Hotel already Exists`)
    throw new Error(`Hotel already exists`)
  }
}
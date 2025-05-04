//Validar datos relacionados a la BD

import Hotel from '../src/hotel/hotel.model.js'
import { isValidObjectId } from 'mongoose'
import User from '../src/user/user.model.js'
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


                                 //Parámetro | token
export const existUsername = async(username, user)=>{
    const alreadyUsername = await User.findOne({username})
    if(alreadyUsername && alreadyUsername._id != user.uid)
        {
        console.error(`Username ${username} is already taken`)
        throw new Error(`Username ${username} is already taken`)
    }
}

export const existEmail = async(email, user)=>{
    const alreadyEmail = await User.findOne({email})
    if(alreadyEmail && alreadyEmail._id != user.uid){
        console.error(`Emal ${email} is already taken`)
        throw new Error(`Email ${email} is already taken`)
    }
}

export const existHotelName = async (name, hotel) => {
    const alreadyHotel = await Hotel.findOne({name});
    if (alreadyHotel && alreadyHotel._id != hotel.uid) {
      console.error(`Hotel with name "${name}" already exists`);
      throw new Error(`Hotel with name "${name}" already exists`);
    }
}

//Se usa para actualizar y decir que no es requerido
export const notRequiredField = (field)=>{
    if(field){
        throw new Error(`${field} is not required`)
    }
}

//Se usa en jwt para encontrar el usuario
export const findUser = async(id)=>{
    try {
        const userExist = await User.findById(id)
        if(!userExist) return false
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
  


/* Ejemplo de como podrian hacerse validaciones NOTA: ELIMINAR Despues
export const existNameCompany = async(name)=>{
    const alreadyName = await Company.findOne({name})
    if(alreadyName){
        console.error(`The company | ${name} | already exists`)
        throw new Error(`The company | ${name} | already exists`)
    }
}
*/
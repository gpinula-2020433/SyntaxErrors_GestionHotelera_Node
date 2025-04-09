//Validar datos relacionados a la BD

import { isValidObjectId } from 'mongoose'
//import User from '../src/user/user.model.js'

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
    if(!isValidObjectId(objectId)) throw new Error(`The value of field is not a valid ObjectId`)
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
//Gestionar lógica de autenticación
import User from '../user/user.model.js'
import {checkPassword, encrypt} from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const defaultAdmin = async (nameA, surnameA, usernameA, emailA, passwordA, phoneA, roleA) => {
    try {
        let adminFound = await User.findOne({ role: 'ADMIN' })
        if (!adminFound) {
            const data = {
                name: nameA,
                surname: surnameA,
                username: usernameA,
                email: emailA,
                password: await encrypt(passwordA),
                phone: phoneA,
                role: roleA
            }
            let user = new User(data)
            await user.save()
            return console.log('Default admin has been created.')
        } else {
            return console.log('Default admin cannot be created.')
        }

    } catch (err) {
        console.error(err)
    }
}


export const register = async(req, res)=>{
    try{    
        //Capturar los datos
        let data = req.body
        //Crear el el obejto del modelo agregandole los datos capturados
        let user = new User(data)
        //Encriptar la password
        user.password = await encrypt(user.password)
        //Asignar rol por defecto
        //user.role = 'CLIENT'
        //Guardar
        await user.save()
        //Responder al usuario
        return res.send({message: `Registered successfully, can be login with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}


//Login
export const login = async(req, res)=>{
    try{
        //Capturar los datos(body)
        let { userLoggin, password } = req.body
        //Validar que el usuario exista
        let user = await User.findOne(
            {
                $or: [ //Subfunción OR | espera un [] de busquedas
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) //{username} = {username: username}
        console.log(user)
        //Verificar que la contraseña coincida
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        //Responder al usuario
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}
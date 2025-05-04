import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encrypt.js'
import { generateJwt } from '../../utils/jwt.js'

export const test = (req, res)=>{
    console.log('Test is running')
    res.send({message: 'Test is running'})
}

export const register = async(req, res)=>{
    try {
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
        user.role = 'CLIENT'
        await user.save()
        return res.send({message: `Register succesfuly, can be logged with username: ${user.username}`})
    } catch (error) {
        return res.status(500).send({message: 'General error with user registration', error})
    }
}

export const login = async(req,res)=>{
    try {
        
        let {userLoggin ,password} = req.body
        
        let user = await User.findOne(
            {
                $or: [
                    {email: userLoggin} ,
                    {username: userLoggin}

                ]
            }
        )
        if(user && await checkPassword(user.password, password)){
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
        return res.status(400).send({message:'Invalid credentials'})
    } catch (err) {
        return res.status(500).send({message:'General error with login function', err})
    }
}
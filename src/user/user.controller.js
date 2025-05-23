'use strict'

import User from '../user/user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/encrypt.js'

export const test = async (req, res) => {
    return res.send('The user route is running')
}

export const defaultAdmin = async (nameA, surnameA, usernameA, emailA, passwordA, roleA) => {
    try {
        let adminFound = await User.findOne({ role: 'ADMIN' })
        let usernameExists = await User.findOne({ username: usernameA })
        let emailExists = await User.findOne({ email: emailA })

        if (adminFound) {
            return console.log('Default admin already exists.')
        }

        if (usernameExists || emailExists) {
            return console.log('Cannot create default admin: username or email already exists.')
        }

        const data = {
            name: nameA,
            surname: surnameA,
            username: usernameA,
            email: emailA,
            password: await encrypt(passwordA),
            role: roleA
        }

        let user = new User(data)
        await user.save()
        console.log('A default admin has been created.')
    } catch (err) {
        console.error('Error creating default admin:', err)
    }
}

defaultAdmin('Gabriel ', 'Pinula', '1pinula', 'pinula@gmail.com', '123123Aa!', 'ADMIN')

export const changeRole = async(req, res)=>{
    try {
        let {id} = req.params

        let data = req.body
        let update = checkUpdate(data.role, id)
        if (!update) return res.status(400).send({ message: 'Have submitted some data that cannot be update or missing' })

        let updatedUser = await User.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }
        )
        if (!updatedUser) return res.status(404).send({ message: 'User not found' })
        
        return res.status(200).send({message: 'The role has been changed successfully.'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error changing role'})
    }

}


//GET USER BY ID
export const getUserById = async(req, res)=>{
    try {
        const { id } = req.params
        const user = await User.findById(id)
        if(!user){
            return res.status(404).send({
                success: false,
                message: 'User not found'
            })
        }
        return res.send({
            success: true,
            message: 'User found',
            user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error updating the user'})
    }
}

//UPDATE ADMIN
export const updateUser = async (req, res) => {
    try {
        //Getting the id by the token
        let { _id } = req.user
        
        let { id } = req.params
        
        let data = req.body

        //Validating that the user can only update his own profile or another clients
        let user = await User.findOne({_id: id})

        if((user.role == 'ADMIN') && (_id != id)){ 
            return res.status(403).send({
                message: 'You cannot update another admin, you can only update yourself or clients.'
            })
        }
        
        let update = checkUpdate(data, id)
        if (!update) return res.status(400).send({ message: 'Data cannot be updated or  data missing' })

        let updatedUser = await User.updateOne(
            { _id: id },
            data,
            { new: true }
        )

        if (!updatedUser) return res.status(404).send({ message: 'User not found' })

        return res.status(200).send({message: 'User updated successfully.'})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating the user'})
    }
}



//DELETE
export const deleteUser = async(req, res)=>{
    try {
    
        let {id } = req.params
        let {_id} = req.user
        let user = await User.findOne({_id: id})
        
        if(user.username == 'djulian') return res.status(403).send({message: 'You cannot delete the default admin'})

        if((user.role == 'ADMIN') && (_id != id)) return res.status(403).send({message: 'You cannot update another admin, you can only update yourself or clients.'})

        let deletedUser = await User.findOneAndDelete(id)

        if (!deletedUser) return res.status(404).send({ message: 'User not found' })
        
        return res.send({message: `Account with username ${deletedUser.name} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}


//CLIENT
export const updateClient = async(req,res) =>{
    try {
        let {uid} = req.user
        
        let {id} = req.params

        let data = req.body

        console.log('From token (_id):', uid)
        console.log('From params (id):', id)

        
        if(String(uid) !== String(id)) return res.status(401).send({message: 'You only can update your account.'})        

        let update = checkUpdate(data, id)

        if(!update) return res.status(400).send({message: 'Data cannot be updated or  data missing'})

        let updatedU = await User.findOneAndUpdate(
            {_id: id},
            data,
            { new: true }
        )

        //Validation of the updated action
        if (!updatedU) return res.status(404).send({ message: 'User not found' })

        return res.status(200).send({message: 'User updated successfully.'})

    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error updating the user'})
    }
}

export const updatePassword = async(req, res)=>{
    try {
        let {uid} = req.user
        const { currentPassword, newPassword} = req.body

        if(!currentPassword || ! newPassword)
            return res.status(400).send({message: 'Missing curretn or new password'})

        const user = await User.findById(uid)
        if(!user) return res.status(400).send({message: 'User not found'})

        const validPassword = await checkPassword(user.password, currentPassword)
        if(!validPassword) return res.status(400).send({message: 'Incorrect password'})

        if(newPassword.length < 8 || newPassword.length > 100){
            return res.status(400).send({message: 'Password must be have min 8 characters and max 100 characters'})
        }

        user.password = await encrypt(newPassword)
        await user.save()

        return res.status(200).send({message: 'Password update successfully!'})
    } catch (error) {
        console.error(err)
        return res.status(500).send({message: 'Error updating the password'})
    }
}

export const deleteClient = async(req,res)=>{
    try {
        let {uid} = req.user
        
        let { id} = req.params
        
        let {password} = req.body
        //Validating that the client cannot delete an admin
        let user = await User.findOne({_id:id})
        if(user.role == 'ADMIN') return res.status(401).send({message: 'You cannot delete an admin.'})
        
        if(uid != id) return res.status(401).send({message: 'You only can delete your account.'}) 

        let check = await checkPassword(user.password, password)
        if(!check) return res.status(401).send({message: 'Invalid password'})
        
        let deletedU = await User.findByIdAndDelete(id)

        if (!deletedU) return res.status(404).send({ message: 'User not found' })
        
        return res.send({message: `Account with username ${deletedU.name} deleted successfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}
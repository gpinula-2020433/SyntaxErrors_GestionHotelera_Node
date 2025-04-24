import User from './user.model.js'

export const getUser = async(req, res)=>{
    try {
        let { id } = req.params
        let user = await User.findById(id)

        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ', 
                user
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

export const saveUser = async(req, res)=>{
    const data  = req.body
    try {
        const user = new User(data)
        
        await user.save()
        return res.send(
            {
                success: true,
                message: `User ${user.name} saves succesfully`,
            }
        )
    } catch (error) {
        console.error(error)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                error

            }
        )
    }
}

export const update = async(req, res)=>{
    try{
        const { id } = req.params

        const data = req.body

        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}
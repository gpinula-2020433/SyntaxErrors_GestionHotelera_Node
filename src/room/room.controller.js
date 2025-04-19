import Room from './room.model';

//Listar todo
export const getAllRooms = async (req, res) => {
    const { limit, skip } = req.query
    try {
        const rooms = await Room.find()
            .skip(skip)
            .limit(limit)
        if (rooms.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Rooms not found'
            })
        }
        return res.send({
            success: true,
            message: 'Rooms found',
            total: rooms.length + ' rooms',
            rooms
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}



//Listar por id
export const getRoomByID = async (req, res) => {
    try {
        const { id } = req.params
        const room = await Room.findById(id)
        if (!room) {
            return res.status(404).send({
                success: false,
                message: 'Room not found'
            })
        }
        return res.send({
            success: true,
            message: 'Room found',
            room
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}



//Guardar
export const saveRoom = async (req, res) => {
    const data = req.body
    try {
        const room = new Room(data)
        await room.save()
        return res.send({
            success: true,
            message: 'Saved successfully',
            room
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}


//Actualizar
export const updateRoom = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const update = await Room.findByIdAndUpdate(id, data, { new: true })
        if (!update) {
            return res.status(404).send({
                success: false,
                message: 'Room not found'
            })
        }
        return res.send({
            success: true,
            message: 'Room updated',
            update
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}


//Eliminar
export const deleteRoom = async (req, res) => {
    try {
        const { id } = req.params
        const room = await Room.findByIdAndDelete(id)
        if (!room) {
            return res.status(404).send({
                success: false,
                message: 'Room not found'
            })
        }
        return res.send({
            success: true,
            message: 'Deleted successfully'
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}
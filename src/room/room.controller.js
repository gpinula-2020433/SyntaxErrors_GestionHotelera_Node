import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import Room from './room.model.js'
import { isRoomNumber } from '../../utils/db.validators.js'


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Agregar Habitación
export const addRoom = async (req, res) => {
    const data = req.body
    try {
      await isRoomNumber(data.roomNumber, data.hotel)
      const room = new Room(data)
      await room.save()
      return res.send({
        success: true,
        message: 'Saved successfully',
        room
      })
    } catch (err) {
      console.error('Error creating room:', err.message)
      return res.status(400).send({
        success: false,
        message: err.message || 'General error'
      })
    }
}

//Listar todas la habitaciones
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

// Listar habitaciones por tipo
export const getRoomsByType = async (req, res) => {
    const { type } = req.params
    try {
        const rooms = await Room.find({ type })
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

//Actualizar
export const updateRoom = async (req, res) => {
    try {
      const { id } = req.params
      const data = req.body
  
      const existingRoom = await Room.findById(id)
      if (!existingRoom) {
        return res.status(404).send({
          success: false,
          message: 'Room not found'
        })
      }
  
      if (req.file) {
        const imageDir = path.join(__dirname, '../../uploads/img')
        if (existingRoom.profilePicture) {
          const oldImagePath = path.join(imageDir, existingRoom.profilePicture)
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath)
          }
        }
        data.profilePicture = req.file.filename
      }
  
      await isRoomNumber(data.roomNumber, data.hotel, id)
  
      const update = await Room.findByIdAndUpdate(id, data, { new: true })
  
      return res.send({
        success: true,
        message: 'Room updated',
        update
      })
  
    } catch (err) {
      console.error('Error updating room:', err.message)
      return res.status(400).send({
        success: false,
        message: err.message || 'General error'
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
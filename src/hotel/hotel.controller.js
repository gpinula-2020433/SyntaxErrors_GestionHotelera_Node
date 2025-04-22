import Hotel from './hotel.model.js'

export const getAllHotels = async (req, res) => {
    const { limit = 10, skip = 0 } = req.query
    try {
        const hotels = await Hotel.find()
            .skip(parseInt(skip))
            .limit(parseInt(limit))

        if (hotels.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'Hotels not found'
            })
        }

        return res.send({
            success: true,
            message: 'Hotels retrieved successfully',
            total: hotels.length,
            hotels
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

export const getHotelById = async (req, res) => {
    try {
        const { id } = req.params
        const hotel = await Hotel.findById(id)
            .populate('events')

        if (!hotel) {
            return res.status(404).send({
                success: false,
                message: 'Hotel not found'
            })
        }

        return res.send({
            success: true,
            message: 'Hotel found',
            hotel
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

export const saveHotel = async (req, res) => {
    const data = req.body
    try {
        const hotel = new Hotel(data)
        await hotel.save()

        return res.send({
            success: true,
            message: 'Hotel saved successfully',
            hotel
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'Error saving hotel',
            err
        })
    }
}

export const updateHotel = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updatedHotel = await Hotel.findByIdAndUpdate(id, data, { new: true })

        if (!updatedHotel) {
            return res.status(404).send({
                success: false,
                message: 'Hotel not found'
            })
        }

        return res.send({
            success: true,
            message: 'Hotel updated successfully',
            updatedHotel
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'Error updating hotel',
            err
        })
    }
}

export const deleteHotel = async (req, res) => {
    try {
        const { id } = req.params
        const deletedHotel = await Hotel.findByIdAndDelete(id)

        if (!deletedHotel) {
            return res.status(404).send({
                success: false,
                message: 'Hotel not found'
            })
        }

        return res.send({
            success: true,
            message: 'Hotel deleted successfully'
        })
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'Error deleting hotel',
            err
        })
    }
}

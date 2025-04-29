import Event from './event.model.js'

export const getAllEvents = async (req, res) => {
    const { limit = 10, skip = 0 } = req.query;
    try {
        const events = await Event.find()
            .skip(Number(skip))
            .limit(Number(limit))
            .populate('hotel', 'name -_id')

        if (events.length === 0) {
            return res.status(404).send({
                success: false,
                message: 'No events found'
            })
        }

        return res.send({
            success: true,
            message: 'Events found',
            total: events.length,
            events
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

export const getEventByID = async (req, res) => {
    try {
        const { id } = req.params;
        const event = await Event.findById(id)
            .populate('hotel', 'name -_id');

        if (!event) {
            return res.status(404).send({
                success: false,
                message: 'Event not found'
            })
        }

        return res.send({
            success: true,
            message: 'Event found',
            event
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

export const createEvent = async (req, res) => {
    try {
        const data = req.body
        const event = new Event(data)
        await event.save()

        return res.send({
            success: true,
            message: 'Event created successfully',
            event
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

export const updateEvent = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body

        const updated = await Event.findByIdAndUpdate(id, data, { new: true })

        if (!updated) {
            return res.status(404).send({
                success: false,
                message: 'Event not found'
            });
        }

        return res.send({
            success: true,
            message: 'Event updated successfully',
            updated
        });
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};

export const deleteEvent = async (req, res) => {
    try {
        const { id } = req.params

        const deleted = await Event.findByIdAndDelete(id)

        if (!deleted) {
            return res.status(404).send({
                success: false,
                message: 'Event not found'
            })
        }

        return res.send({
            success: true,
            message: 'Event deleted successfully'
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
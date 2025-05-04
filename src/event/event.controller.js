import Event from './event.model.js'
import { existHotel } from '../../utils/db.validators.js'
import { existService } from '../../utils/db.validators.js'

// Obtener todos los eventos
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
        });
    }
};

export const getEventByID = async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findById(id).populate('services').populate('hotel')
    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el evento', error: err })
  }
}

export const createEvent = async (req, res) => {
  const { title, description, date, location, services, hotel } = req.body
  
  try {
    await existHotel(hotel)

    for (let i = 0; i < services.length; i++) {
      await existService(services[i])
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      services,
      hotel,
    })

    const savedEvent = await newEvent.save()
    res.status(201).json(savedEvent)
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el evento', error: err })
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, services, hotel } = req.body
  try {
    await existHotel(hotel)
    for (let i = 0; i < services.length; i++) {
      await existService(services[i])
    }
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { title, description, date, location, services, hotel },
      { new: true }
    ).populate('services').populate('hotel')
    if (!updatedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }
    res.status(200).json(updatedEvent);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar el evento', error: err })
  }
}
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

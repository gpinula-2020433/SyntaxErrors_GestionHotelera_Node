import { existHotel } from '../../utils/db.validators.js'
import { existService } from '../../utils/db.validators.js'

// Obtener todos los eventos
export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().populate('services').populate('hotel')
    res.status(200).json(events);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los eventos', error: err })
  }
}

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
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id)
    if (!deletedEvent) {
      return res.status(404).json({ message: 'Evento no encontrado' })
    }
    res.status(200).json({ message: 'Evento eliminado con éxito' })
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el evento', error: err })
  }
};
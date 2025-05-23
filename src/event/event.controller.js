import Event from './event.model.js'
import { existHotel, existService } from '../../utils/db.validators.js'

export const addEvent = async (req, res) => {
  const { title, description, date, location, services, hotel } = req.body

  try {
    const servicesArray = !services ? [] : 
                         Array.isArray(services) ? services : 
                         [services]

    await existHotel(hotel)
    if (servicesArray.length > 0) {
      await Promise.all(servicesArray.map(serviceId => existService(serviceId)))
    }

    const newEvent = new Event({
      title,
      description,
      date,
      location,
      services: servicesArray,
      hotel
    });

    const savedEvent = await newEvent.save()
    res.status(201).json({
      success: true,
      message: 'Evento creado',
      event: savedEvent
    });

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Error al crear evento'
    })
  }
}

export const getAllEvents = async (req, res) => {
  const { limit = 10, skip = 0 } = req.query;

  try {
    const events = await Event.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .populate('services')
      .populate('hotel');

    if (events.length === 0) {
      return res.status(404).send({
        success: false,
        message: 'No se encontraron eventos'
      })
    }

    return res.send({
      success: true,
      message: 'Eventos encontrados',
      total: `${events.length} eventos`,
      events
    })

  } catch (err) {
    console.error('Error al listar eventos:', err)
    return res.status(500).send({
      success: false,
      message: 'Error general al listar eventos',
      error: err.message
    })
  }
}

export const getEventById = async (req, res) => {
  const { id } = req.params

  try {
    const event = await Event.findById(id)
      .populate('services')
      .populate('hotel')

    if (!event) {
      return res.status(404).send({
        success: false,
        message: 'Evento no encontrado'
      })
    }

    return res.send({
      success: true,
      message: 'Evento encontrado',
      event
    })

  } catch (err) {
    console.error('Error al buscar evento:', err);
    return res.status(500).send({
      success: false,
      message: 'Error general al buscar evento',
      error: err.message
    })
  }
}

export const updateEvent = async (req, res) => {
  const { id } = req.params;
  const { title, description, date, location, available, services, hotel } = req.body

  try {
    const servicesArray = services ? 
                        (Array.isArray(services) ? services : [services]) : 
                        undefined

    if (hotel) await existHotel(hotel)
    if (servicesArray) {
      await Promise.all(servicesArray.map(serviceId => existService(serviceId)))
    }

    const updateData = {
      ...(title && { title }),
      ...(description && { description }),
      ...(date && { date }),
      ...(location && { location }),
      ...(available !== undefined && { available }),
      ...(servicesArray && { services: servicesArray }),
      ...(hotel && { hotel })
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).populate('services').populate('hotel')

    if (!updatedEvent) {
      return res.status(404).json({ 
        success: false,
        message: 'Evento no encontrado' 
      })
    }

    res.status(200).json({
      success: true,
      message: 'Evento actualizado',
      event: updatedEvent
    })

  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message || 'Error al actualizar evento'
    })
  }
}

export const deleteEvent = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).send({
        success: false,
        message: 'Evento no encontrado'
      });
    }

    return res.send({
      success: true,
      message: 'Evento eliminado exitosamente'
    });

  } catch (err) {
    console.error('Error al eliminar evento:', err);
    return res.status(500).send({
      success: false,
      message: 'Error general al eliminar evento',
      error: err.message
    })
  }
}
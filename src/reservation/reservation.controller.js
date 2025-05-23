import Reservation from './reservation.model.js'
import Invoice from '../invoice/invoice.model.js'
import Room from '../room/room.model.js'

export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const reservations = await Reservation.find()
            .skip(skip)
            .limit(limit)
            .populate('customer', 'username -_id')
            .populate('hotel', 'name -_id')
            .populate('room', 'name -_id')
            .populate('service', 'name -_id')

        if(reservations.length == 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Reservations not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Reservations found: ',
                total: reservations.length + ' reservations',
                reservations
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

export const getByID = async(req, res)=>{
    try {
        let {id} = req.params
        const reservation = await Reservation.findById(id)
            .populate('customer', 'username -_id')
            .populate('hotel', 'name -_id')
            .populate('room', 'name -_id')
            .populate('service', 'name -_id')

        if(!reservation)
            return res.status(404).send(
                {
                    success: false,
                    message: "Reservation not found"
                }
            )
        return res.send(
            {
                success: true,
                message: 'Reservation found',
                reservation
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

export const save = async (req, res) => {
const data = req.body

    try {
        data.customer = req.user.uid

        if (!Array.isArray(data.room)) {
        if (typeof data.room === 'string' && data.room.trim() !== '') {
            data.room = [data.room]
        } else {
            return res.status(400).send({ success: false, message: 'At least one room is required' })
        }
        }

        if (data.room.length === 0) {
        return res.status(400).send({ success: false, message: 'At least one room is required' })
        }

        if (!data.starDate || !data.endDate || !data.typeOfPayment || !data.NIT) {
        return res.status(400).send({
            success: false,
            message: 'Start date, end date, NIT and typeOfPayment are required'
        })
        }

        const nitRegex = /^\d{7}-[\dK]$/
        if (!nitRegex.test(data.NIT)) {
        return res.status(400).send({
            success: false,
            message: 'NIT format is invalid. Expected format: 7 digits, hyphen, digit or K (Ej., 1234567-8 or 5489381-K)'
        })
        }

        const start = new Date(data.starDate)
        const end = new Date(data.endDate)
        const msInDay = 1000 * 60 * 60 * 24
        const daysCount = Math.ceil((end - start) / msInDay)

        if (daysCount <= 0) {
        return res.status(400).send({ success: false, message: 'End date must be after start date' })
        }

        const rooms = await Room.find({ _id: { $in: data.room } })
        if (rooms.length !== data.room.length) {
        return res.status(404).send({ success: false, message: 'One or more rooms not found' })
        }

        const pricePerNight = rooms.reduce((sum, r) => sum + r.pricePerNight, 0)
        const total = pricePerNight * daysCount

        const reservation = new Reservation(data)
        await reservation.save()

        // 🟡 ACTUALIZAR ESTADO DE HABITACIONES A 'BUSY'
        await Room.updateMany(
        { _id: { $in: data.room }, status: 'AVAILABLE' },
        { $set: { status: 'BUSY' } }
        )

        const invoice = new Invoice({
        customer: data.customer,
        NIT: data.NIT,
        room: data.room,
        days: rooms.map(() => daysCount),
        pricePerNight,
        total,
        typeOfPayment: data.typeOfPayment
        })
        await invoice.save()

        return res.send({
        success: true,
        message: 'Reservation and invoice saved successfully',
        reservation,
        invoice
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

export const updateR = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).send({
        success: false,
        message: 'Reservation not found',
      });
    }

    // Verificar cambio de estado
    let liberarHabitaciones = false
    if (data.status && data.status !== reservation.status) {
      if (data.status === 'CANCELADA' && reservation.status === 'ACTIVA') {
        reservation.status = 'CANCELADA';
        liberarHabitaciones = true
      } else {
        return res.status(400).send({
          success: false,
          message: 'Invalid status change',
        });
      }
    }

    // Actualizar otros campos (excluyendo status)
    const fieldsToUpdate = { ...data };
    delete fieldsToUpdate.status;

    Object.assign(reservation, fieldsToUpdate);
    await reservation.save();

    // Liberar habitaciones si se canceló la reserva
    if (liberarHabitaciones) {
      await Room.updateMany(
        { _id: { $in: reservation.room }, status: 'BUSY' },
        { $set: { status: 'AVAILABLE' } }
      );
    }

    return res.send({
      success: true,
      message: 'Reservation updated',
      reservation,
    });
  } catch (err) {
    console.error('General error', err);
    return res.status(500).send({
      success: false,
      message: 'General error',
      err,
    });
  }
};

  

export const deleteR = async(req, res)=>{
    try {
        let {id} = req.params
        let reservation = await Reservation.findByIdAndDelete(id)
        
        if(!reservation)
            return res.status(404).send(
                {
                    success: false,
                    message: 'Reservation not founded'
                }
            )
        return res.send(
            {
                success: true,
                message: 'Deleted successfully'
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
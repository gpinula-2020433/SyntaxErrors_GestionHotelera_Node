import Reservation from './reservation.model'

export const getAll = async(req, res)=>{
    const { limit, skip } = req.query
    try {
        const reservations = await Reservation.find()
            .skip(skip)
            .limit(limit)
            .populate('user', 'username -_id')
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
            .populate('user', 'username -_id')
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

export const save = async(req, res)=>{
    const data = req.body
    try {
        data.user = req.user.uid
        const reservation = new Reservation(data)
        await reservation.save()

        return res.send(
            {
                success: true,
                message: 'Saved successfully',
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

export const updateR = async(req, res)=>{
    try {
        const {id} = req.params
        const data = req.body

        const update = await Reservation.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update)
            return res.status(404).send(
                {
                    success: false,
                    message: 'Reservation not found'
                }
            )
        return res.send(
            {
                success: true,
                message: 'Reservation updated',
                update
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


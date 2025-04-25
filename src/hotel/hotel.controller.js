import Hotel from "./hotel.model.js"

export const getAllHotels = async (req, res)=> {
    try{
        const {limit = 10, skip =0}= req.query
        const hotel = await Hotel.find()
            .skip(skip)
            .limit(limit)
        if(hotel.length === 0)
            return res.status(404).send(
            {
                succes: false,
                message: 'Hotels not found'

            }
        )
        return res.send(
            {
                succes: true,
                message: 'Hotels found',
                hotel
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

export const getHotelById = async (req, res)=>{
    try{
        const{ id }= req.params
        const hotel = await Hotel.findById(id)
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

    }catch (err){
        console.error('General error', err)
        return res.status(500).send({
            succes: false,
            message: 'General error',
            err
        })
    }
}

export const addHotel = async(req, res)=>{
    try{
        let data = req.body
        let hotel = new Hotel(data)
        await hotel.save()
        return res.send(
            {
                success: true,
                message: `Hotel successfully, ${hotel.name}`,
                hotel
            }
        )
        
    }catch(err){
        console.log('General error', err)
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        })
    }
}

export const updateHotel = async (req, res)=>{
    try{
        const {id} = req.params
        const data = req.body
        const update = await Hotel.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update)return res.status(404).send(
            {
                success: false,
                message: 'Hotel not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Hotel updated',
                hotel: update
            }
        )

    }catch(err){
        console.log('General error', err)
        return res.status(500).send(
            {
                success: false,
                messagge:'General error',
                err
            }
        )
    }
}


export const deleteHotel = async(req, res)=> {
    try {
    const{id} = req.params
    const hotel = await Hotel.findByIdAndDelete(id)
    if (!hotel) {
        return res.status(404).send({
            success: false,
            message: 'Hotel not found'
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

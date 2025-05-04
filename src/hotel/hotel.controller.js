import fs from 'fs'
import path from 'path'

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
        if (req.file?.filename) {
            data.imageHotel = req.file.filename;
        }
        let hotel = new Hotel(data)
        await hotel.save()

        hotel = await Hotel.findById(hotel._id).populate('services', "name type description price")
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
        
        const update = await Hotel.findByIdAndUpdate(id, data, { new: true }).populate('services')
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


/* export const updateHotelImage = async(req, res)=>{
    try{
        const  {id}  = req.params
        const { filename } = req.file
        const hotel = await Hotel.findByIdAndUpdate(
            id,
            {
                imageHotel: filename
            },
            { new: true }
        )
        if(!hotel) return res.status(404).send(
            {
                success: false,
                message: 'Hotel not found - not updated'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Hotel updated successfully',
                hotel
            }
        )
    }catch(err){
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
 */


export const updateHotelImage = async (req, res) => {
    try {
        const { id } = req.params;
        const { filename } = req.file;

        const hotel = await Hotel.findById(id)
        if (!hotel) {
            return res.status(404).send({
                success: false,
                message: 'Hotel not found'
            });
        }

        const oldImage = hotel.imageHotel

        
        if (oldImage) {
            const imagePath = path.join(process.cwd(), 'uploads', 'img', oldImage);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        
        hotel.imageHotel = filename;
        await hotel.save();

        return res.send({
            success: true,
            message: 'Hotel image updated successfully',
            hotel
        });
    } catch (err) {
        console.error('Error updating hotel image:', err);
        return res.status(500).send({
            success: false,
            message: 'General error',
            err
        });
    }
};
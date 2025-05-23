import { Schema, model } from "mongoose";

const roomSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            minlength: [3, 'Name must be at least 3 characters'],
            maxlength: [50, 'Name must be at most 50 characters']

        },
        roomNumber: {
            type: String,
            required: [true, 'Room number or code is required']
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: ['INDIVIDUAL', 'DOUBLE', 'SUITE']
        },
        roomDescription: {
            type: String,
            required: [true, 'Room Description is required'],
            minlength: [10, 'Room description must be at least 10 characters'],
            maxlength: [500, 'Room description must be at most 500 characters']

        },
        capacity: {
            type: Number,
            required: [true, 'Capacity is required'],
            min: [1, 'Capacity must be a positive integer']
        },
        pricePerNight: {
            type: Number,
            required: [true, 'Price per night is required'],
            min: [0, 'Price per night must be a positive number']
        },
        status: {
            type: String,
            required: [true, 'State is required'],
            enum: ['AVAILABLE', 'BUSY', 'MAINTENANCE']
        },
        availabilityDates: {
            type: [Date]
        },
        imageRoom: {
            type: String
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel reference is required']
        }
    },
    {
        versionKey: false, 
        timestamps: true
    }
)

export default model('Room', roomSchema)
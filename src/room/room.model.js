import { Schema, model } from "mongoose";

const roomSchema = new Schema(
    {
        number: {
            type: String,
            required: [true, 'Number or code is required'],
            unique: true
        },
        type: {
            type: String,
            required: [true, 'Type is required'],
            enum: ['individual', 'double', 'suite']
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
            enum: ['available', 'busy', 'maintenance']
        },
        availabilityDates: {
            type: [Date]
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Room', roomSchema);

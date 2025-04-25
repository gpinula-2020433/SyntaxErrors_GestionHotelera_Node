import { Schema, model } from "mongoose"

const eventSchema = Schema(
    {
        title: {
            type: String,
            required: [true, 'Event title is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        date: {
            type: Date,
            required: [true, 'Event date is required']
        },
        time: {
            type: String,
            required: [true, 'Event time is required'],
            trim: true
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be a positive number']
        },
        capacity: {
            type: Number,
            required: [true, 'Capacity is required'],
            min: [1, 'Capacity must be at least 1']
        },
        available: {
            type: Boolean,
            default: true
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

export default model('Event', eventSchema);

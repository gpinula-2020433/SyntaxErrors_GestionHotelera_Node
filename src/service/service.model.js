import { Schema, model } from "mongoose";

const serviceSchema = Schema(
    {
        name: {
            type: String,
            maxLength: [40, `Can't be overcome 40 characters`],
            required: [true, 'Name of event is required']
        },
        type: {
            type: String,
            enum: ['COMIDA', 'LIMPIEZA', 'PISCINA', 'EXTRA'],
            default: 'EXTRA',
            required: [true, 'Type of service is required']
        },
        description: {
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, 'Description is required']
        },
        price: {
            type: Number,
            min: [0, 'Price cannot be negative'],
            required: [true, 'Price is required']
        },
        available: {
            type: Boolean,
            default: true
        },
        imageService : {
            type: String
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Service', serviceSchema)
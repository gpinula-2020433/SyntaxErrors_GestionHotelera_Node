import { Schema, model } from "mongoose"

const invoiceSchema = Schema(
    {
        date: {
            type: Date,
            default: Date.now
        },
        customer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        NIT:{
            type: String,
            required: [true, 'NIT is required'],
            maxLength: [9, `Can't be overcome 9 characters`]
        },
        room: [
            {
              type: Schema.Types.ObjectId,
              ref: 'Room',
              required: [true, 'At least one room is required']
            }
        ],
        days: [
            {
              type: Number,
              required: [true, 'Days is required']
            }
        ],
        pricePerNight: {
            type: Number,
            required: [true, 'Price per night is required'],
            min: [0, 'Price per night must be a positive number']
        },
        total: {
            type: Number,
            required: [true, 'Total is required'],
            min: [0, 'Total must be a positive number']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)


export default model('Invoice', invoiceSchema)
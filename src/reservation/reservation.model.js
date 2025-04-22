import { Schema, model } from "mongoose";

const reservationSchema = Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'User is required']
        },
        hotel: {
            type: Schema.Types.ObjectId,
            ref: 'Hotel',
            required: [true, 'Hotel is required']
        },
        room: {
            type: Schema.Types.ObjectId,
            ref: 'Room',
            required: [true, 'Room is required']
        },
        service: {
            type: Schema.Types.ObjectId,
            ref: 'Service',
        },
        starDate: {
            type: Date,
            required: [true, 'Start Date is required']
        },
        endDate: {
            type: Date,
            required: [true, 'End Date is required']
        },
        status: {
            type: String,
            enum: ['ACTIVA', 'CANCELADA', 'FINALIZADA'],
            uppercase: true,
            required: [true, 'Status is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
export default model('Reservation' , reservationSchema)
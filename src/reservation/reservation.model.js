import { Schema, model } from "mongoose";

const reservationSchema = Schema(
    {
        customer: {
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
            type: [
              {
                type: Schema.Types.ObjectId,
                ref: 'Room',
                required: [true, 'Room is required']
              }
            ],
            validate: [(val) => val.length > 0, 'At least one room must be selected']
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
        typeOfPayment: {
            type: String,
            required: [true, 'Type of payment is required'],
            enum: ['CARD', 'CASH'],
            uppercase: true
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
import { Schema, model } from "mongoose";

const hotelSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Hotel name is required']
        },
        address: {
            type: String,
            required: [true, 'Address is required']
        },
        category: {
            type: String,
            enum: ['1 STAR', '2 STARS', '3 STARS', '4 STARS', '5 STARS'],
            required: [true, 'Category is required']
        },
        amenities: [{
            type: String
        }],
        roomPricesByType: {
            type: {
                type: String,
                required: [true, 'Room type is required']
            },
            price: {
                type: Number,
                required: [true, 'Price is required']
            }
        },
        events: [{
            type: Schema.Types.ObjectId,
            ref: 'Event'
        }]
    },
    {
        versionKey: false,
        timestamps: true
    }
);

export default model('Hotel', hotelSchema);

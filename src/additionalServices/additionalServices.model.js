import { Schema, model } from "mongoose";

const additionalServiceSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Service name is required'],
            trim: true
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price must be a positive number']
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
);

export default model('AdditionalService', additionalServiceSchema);

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
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [200, 'Description must be no more than 200 characters']
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      minlength: [8, 'Phone must be at least 8 digits'],
      maxlength: [13, 'Phone must be no more than 13 digits']
    },
    category: {
      type: Number,
      enum: [1, 2, 3, 4, 5], // Estrellas
      required: [true, 'Category is required']
    },
    amenities: {
      type: [String],
      required: [true, 'Amenities are required']
    },
    services: [{
      type: Schema.Types.ObjectId, //Validación
      ref: 'Service',
      required: [true, 'Service is required']
    }],
    imageHotel : {
      type: String
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

export default model("Hotel", hotelSchema);

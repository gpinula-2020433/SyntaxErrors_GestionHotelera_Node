import { Schema, model } from "mongoose"

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      maxLength: [50, 'Title cannot exceed 50 characters']
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxLength: [100, 'Description cannot exceed 100 characters']
    },
    date: {
      type: Date,
      required: [true, 'Date is required']
    },
    location: {
      type: String,
      required: [true, 'Location is required']
    },
    available: {
      type: Boolean,
      default: true
    },
    services: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Service',
          required: [true, 'Service is required']
        }
      ],
      validate: [(val) => val.length > 0, 'At least one service must be selected']
    },
    hotel: {
      type: Schema.Types.ObjectId,
      ref: 'Hotel',
      required: [true, 'Hotel is required']
    }
  },
  {
    versionKey: false,
    timestamps: true 
  }
)

export default model('Event', eventSchema)
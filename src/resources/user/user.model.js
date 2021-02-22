import mongoose from 'mongoose'
const userSchema = new mongoose.Schema(
  {
    id: Number,
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    }
  },
  { timestamps: true }
)

export const User = mongoose.model('user', userSchema)

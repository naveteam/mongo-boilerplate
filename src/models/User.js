import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const { Schema, model } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    password_reset_token: {
      type: String
    },
    gender: {
      type: String,
      enum: ['Male', 'Female']
    },
    birthdate: {
      type: Date,
      required: true
    },
    role: { type: Schema.Types.ObjectId, ref: 'Roles' }
  },
  { timestamps: true },
  { collation: { locale: 'pt', strength: 2 } }
)

userSchema.plugin(mongoosePaginate)
userSchema.index({ email: -1 }, { unique: true })

const user = model('Users', userSchema)

export default user

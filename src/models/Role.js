import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'
const { Schema, model, ObjectId } = mongoose

const roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)
roleSchema.plugin(mongoosePaginate)

const role = model('Roles', roleSchema)

export default role

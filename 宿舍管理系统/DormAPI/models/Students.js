const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    age: {
      type: Number
    },
    stuId: {
      type: String,
      required: true,
      unique:true
    },
    major:{
      type: String,
      required:true
    },
    class:{
      type:Number,
      required: true
    },
    roomId: {
      type: String,
      required: true
    },
    drom: {
      type: String,
      required: true
    },
    building: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Students", studentSchema)

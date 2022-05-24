const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
  {
    realName: {
      type: String,
      required: true
    },
    jobId: {
      type: String,
      required: true,
      unique:true
    },
    passwd: {
      type: String,
      required: true,
      min: 6
    },
    invitationCode: {
      type: String,
      required: true,
      unique:true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("User", UserSchema)

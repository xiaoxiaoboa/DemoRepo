const express = require("express")
const app = express()
const morgan = require("morgan")
const dotenv = require("dotenv")
const helmat = require("helmet")
const mongoose = require("mongoose")
const userRouter = require("./router/user")
const studentRouter = require("./router/students")

dotenv.config()


mongoose.connect(process.env.MONGO_URL, () => {
  console.log("MongoDB 连接成功")
})

app.use(morgan("common"))
app.use(helmat())
app.use(express.json())

app.use("/api/user", userRouter)
app.use("/api/student", studentRouter)

app.listen(9000, () => {
  console.log("express运行在 http://localhost:9000 ")
})

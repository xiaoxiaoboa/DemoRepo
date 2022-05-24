const router = require("express").Router()
const Student = require("../models/Students")

/* 添加学生 */
router.post("/add", async (req, res) => {
  try {
    const students = await Student.insertMany(req.body)
    res.status(200).json({ code: 1, data: students, msg: "数据插入成功" })
  } catch (err) {
    res.status(500).json({ code: 0, err: err.message, msg: "数据插入失败" })
  }
})

/* 更新学生 */
router.put("/update", async (req, res) => {
  try {
    if(req.body.length === 0) throws
    req.body.forEach(async obj => {
      const student = await Student.findById(obj._id)
      await student.updateOne({
        $set: obj
      })
    })
    res.status(200).json({ code: 1, msg: "学生信息更新成功" })
  } catch (err) {
    res.status(500).json(err)
  }
})

/* 删除学生信息 */
router.put("/del", async (req, res) => {
  try {
    req.body.forEach(async obj => {
      await Student.deleteMany({_id: obj._id})
    })
    res.status(200).json({ code: 1, msg: "数据删除成功" })
  } catch (err) {
    res.status(500).json({ code: 0, err: err.message, msg: "数据删除失败" })
  }
})

/* 获取全部学生 */
router.get("/", async (req, res) => {
  try {
    const student = await Student.find({}, { __v: 0, createdAt: 0, updatedAt :0})
    res.status(200).json(student)
  } catch (err) {
    res.status(500).json(err)
  }
})


module.exports = router

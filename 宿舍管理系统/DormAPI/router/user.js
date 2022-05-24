const router = require("express").Router()

const User = require("../models/Users")

/* 注册 */
router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      realName: req.body.realName,
      jobId: req.body.jobId,
      passwd: req.body.passwd,
      invitationCode: req.body.invitationCode
    })
    const user = await newUser.save()
    res.status(200).json({ code: 1, data: req.body, msg: "注册成功" })
  } catch (err) {
    res
      .status(500)
      .json({ code: 0, data: req.body, msg: "注册失败" })
  }
})

/* 登录 */
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ jobId: req.body.jobId })

    user.passwd.localeCompare(req.body.passwd) === 0 || throws

    res.status(200).json({ code: 1, data: req.body, msg: "登录成功" })
  } catch (err) {
    res.status(401).json({ code: 0, data: req.body, msg: "用户不存在或密码错误" })
  }
})

/* 获取当前登录用户 */
router.get("/:id/a", async (req, res) => {
  try {
    const student = await User.findOne({ jobId: req.params.id })
    // console.log(userId)
    res.status(200).json(student)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router

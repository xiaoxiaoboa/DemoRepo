import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import AddIcon from "@mui/icons-material/Add"
import DataSaverOffIcon from "@mui/icons-material/DataSaverOff"
import DeleteIcon from "@mui/icons-material/Delete"
import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"
import { openState, studentState, pendingSubmit } from "../../recoil"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"
import axios from "axios"

export default function FunButton() {
  /* Dialog框 */
  const [open, setOpen] = useRecoilState(openState)

  /* 表格内的数据,这里用于添加 */
  const [students, setStudent] = useRecoilState(studentState)

  /* 添加和修改数据后,数据暂时存在'待存储状态'里 */
  const [pendingStudents, setPending] = useRecoilState(pendingSubmit)

  /* 和上面一句是同一状态,为了区分名字而多写一个 */
  const pendingObj = useRecoilValue(pendingSubmit)

  /* 选中准备删除的行,存在'待存储状态' */
  const pendingDeleteObj = useRecoilValue(pendingSubmit)

  /* 临时存储添加学生时的信息 */
  let newStudent = {}
  /* 处理添加动作,会先打开Dialog框 */
  const handleAdd = () => {
    setOpen(true)
  }
  /* 处理关闭Dialog框 */
  const handleClose = () => {
    setOpen(false)
  }
  /* 处理添加学生数据, 保存在状态里 */
  const handleSet = () => {
    /* 8个数据项都是必须的,少一个就不会往下执行 */
    if (Object.keys(newStudent).length < 8) return setOpen(false)
    /* 将新数据保存在表格的状态中,以便更新状态刷新表格 */
    setStudent([...students, { id: students.length + 1, ...newStudent }])
    /* 将新数据保存在'待存储状态'里 */
    setPending({
      ...pendingStudents,
      student: [newStudent, ...pendingStudents[`student`]]
    })
    setOpen(false)
  }
  /* 处理输入数据的动作 */
  const handleInput = e => {
    const target = e.target
    const targetName = target.id
    const targetValue = target.value

    newStudent[targetName] = targetValue
  }

  /* 保存数据,向服务器发送存储请求 */
  const handleSaveData = async () => {
    /* 如果'待存储状态'里没有数据,就不执行 */
    if (pendingObj.student.length < 1 && pendingObj.item.length < 1) return
    try {
      if (pendingObj.student.length > 0) {
        const res = await axios.post("/api/student/add", pendingObj[`student`])
        console.log(res.data.msg)
      }
      if (pendingObj.item.length > 0) {
        const res = await axios.put("/api/student/update", pendingObj[`item`])
        console.log(res.data.msg)
      }
    } catch (err) {
      console.log(err)
    }
    setPending({
      ...pendingStudents,
      ["student"]: [],
      ["item"]: pendingObj[`item`]
    })
  }

  /* 向服务器发送删除请求 */
  const handleDelete = async () => {
    if (pendingDeleteObj.delete.length < 1) return
    try {
      const res = await axios.put(
        "/api/student/del",
        pendingDeleteObj[`delete`]
      )
      console.log(res.data.msg)
      const newArr = students.filter(obj => {
        return !pendingDeleteObj.delete.includes(obj)
      })
      setStudent(newArr)
    } catch (err) {
      console.log("删除失败了")
    }
  }

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleAdd}>
          添加学生
        </Button>
        <Button
          variant="contained"
          startIcon={<DataSaverOffIcon />}
          onClick={handleSaveData}>
          保存数据
        </Button>
        <Button
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDelete}>
          删除选中
        </Button>
      </Stack>
      <Dialog open={open} maxWidth={"xs"} fullWidth={true}>
        <DialogContent>
          <DialogTitle>输入学生信息</DialogTitle>
          <Stack direction="column" spacing={2}>
            <TextField
              id="name"
              label="姓名"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="age"
              label="年龄"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="stuId"
              label="学号"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="major"
              label="专业"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="class"
              label="班级"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="roomId"
              label="房间号"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="drom"
              label="书院"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
            <TextField
              id="building"
              label="楼号"
              type="text"
              required
              size="small"
              onChange={handleInput}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSet}>确定</Button>
          <Button onClick={handleClose}>取消</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

import { Typography } from "@mui/material"
import { useEffect } from "react"
import { useRecoilState, useRecoilValue } from "recoil"
import {
  timerValueState,
  timerOnState,
  clickedItemState
} from "../../recoil/TimerAtoms"
import { db } from "../../utils/localForage"

export default function StopWatch() {
  const [time, setTime] = useRecoilState(timerValueState)
  const timerOn = useRecoilValue(timerOnState)
  const clickedItem = useRecoilValue(clickedItemState)

  useEffect(() => {
    getTime()
  }, [clickedItem])

  useEffect(() => {
    let timer = null

    /* 定时器状态变化时，要存储一下时间 */
    if (timerOn && clickedItem) {
      timer = setInterval(() => {
        /* 每隔10ms 向秒进一位 */
        setTime(prev => prev + 10)
      }, 10)
    } else {
      clearInterval(timer)
      saveTime()
    }

    return () => {
      clearInterval(timer)
    }
  }, [timerOn])

  /* 获取时间 */
  const getTime = async () => {
    /* 未点击item时，clickedItem为空，就无法获取到数据，所以要先判断 */
    if (clickedItem?.id === undefined) return
    try {
      const rel = await db.time.get(clickedItem.id)
      setTime(rel.time)
      return rel.time
    } catch (err) {
      console.log(err)
    }
  }

  /* 保存时间 */
  const saveTime = async () => {
    if (clickedItem?.id === undefined || time <= 0) return

    try {
      await db.time.put({ id: clickedItem.id, time })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      {("0" + (Math.floor(time / 3600000) % 60)).slice(-2)}:
      {("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:
      {("0" + (Math.floor(time / 1000) % 60)).slice(-2)}.
      <Typography
        component="span"
        sx={{ fontWeight: "bold", fontSize: "50px" }}>
        {/* 向100取模：time为100时渲染的结果归0 */}
        {("0" + ((time / 10) % 100)).slice(-2)}
      </Typography>
    </>
  )
}

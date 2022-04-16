import React from "react"
import { Switch, useDarkreader } from "react-darkreader"
import "./index.css"

export default function Dark() {
  /* 查询 localStorage 内有没有colorMode*/
  let colorMode = localStorage.getItem("colorMode") ?? false

  /* 如果colorMode的值不是dark就设置初始值为false，默认颜色 */
  const [isDark, { toggle }] = useDarkreader(
    colorMode === "dark" ? true : false
  )

  /* 根据state中isDark的值动态改变localStorage中colorMode的值 */
  localStorage.setItem("colorMode", isDark ? "dark" : "light")
  return <Switch checked={isDark} onChange={toggle} />
}

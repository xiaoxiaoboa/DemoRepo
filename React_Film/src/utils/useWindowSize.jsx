import { useEffect, useState } from "react"

export default function useWindowSize() {
  const [docHeight, setHeight] = useState(0)

  useEffect(() => {
    setHeight(() => window.document.body.clientHeight)
  }, [])

  window.onresize = () => {
    setHeight(() => window.document.body.clientHeight)
  }

  return docHeight
}

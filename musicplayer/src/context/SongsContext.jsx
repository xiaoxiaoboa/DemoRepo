import { createContext, useState } from "react"

export const SongsContext = createContext([])

export const SongsContextProvider = ({ children }) => {
  const [state, dispatch] = useState([])
  const [playing, setPlaying] = useState("")

  return (
    <SongsContext.Provider value={{ state, dispatch, playing, setPlaying }}>
      {children}
    </SongsContext.Provider>
  )
}

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { SongsContextProvider } from "./context/SongsContext"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SongsContextProvider>
      <App />
    </SongsContextProvider>
  </React.StrictMode>
)

import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { MyContextProvider } from "./context"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <MyContextProvider>
      <App />
    </MyContextProvider>
  </React.StrictMode>
)

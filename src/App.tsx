import React from "react"
import "./App.css"
import Map from "./Map"

function App() {
    console.log(process.env.REACT_APP_HOST, "ahaha")
    return (
        <div className="App">
            <Map />
        </div>
    )
}

export default App

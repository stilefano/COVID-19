import React from "react"
import "./App.css"
import Map from "./Map"

function App() {
    return (
        <div className="App">
            <h1 style={{ position: "fixed", left: 0, right: 0,zIndex:9999 }}>
                COVID-19 Map
            </h1>
            <Map />
        </div>
    )
}

export default App

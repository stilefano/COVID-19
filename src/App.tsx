import React from "react"
import "./App.css"
import Map from "./Map"

function App() {
    return (
        <div className="App">
            <h1
                style={{
                    position: "fixed",
                    left: "100px",
                    right: "100px",
                    zIndex: 9999,
                    pointerEvents: "none"
                }}
            >
                COVID-19 Map
            </h1>
            <Map />
        </div>
    )
}

export default App

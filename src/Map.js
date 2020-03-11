import React from "react"
import {
    Map as LeafletMap,
    Popup as LeafletPopup,
    Marker,
    TileLayer
} from "react-leaflet"
import L from "leaflet"
import useGetCoordinates from "./Hooks/useGetCoordinates"

const icon = c => {
    const cases = parseFloat(c.cases.replace(/,/g, ""))
    const color = cases > 1000 ? "#FF0000" : cases > 500 ? "#ff8100" : "#fdff6c"
    const size = cases > 1000 ? 15 : cases > 500 ? 10 : 8

    return L.divIcon({
        iconSize: [30, 30],
        html: `<svg width="30px" height="30px"> <circle cx="15" cy="15" r="${size}" fill="${color}" /></svg>`
    })
}

export default function Map() {
    const coordinates = useGetCoordinates()

    return (
        <>
            {coordinates.empty ? (
                <div>loading...</div>
            ) : coordinates.error ? (
                <div>Something went wrong</div>
            ) : (
                <LeafletMap center={[41.8719, 12.5674]} zoom={3}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    {coordinates.map(c => (
                        <Marker
                            key={c.country_name}
                            icon={icon(c)}
                            position={[
                                parseFloat(c.latlng[0]),
                                parseFloat(c.latlng[1])
                            ]}
                        >
                            <LeafletPopup>
                                <h4>{c.country_name}</h4>
                                <p>
                                    Cases: <strong>{c.cases}</strong> <br />
                                    Deaths: <strong>{c.deaths}</strong> <br />
                                    Region: <strong>{c.region}</strong> <br />
                                    Total recovered:{" "}
                                    <strong>{c.total_recovered}</strong> <br />
                                    New deaths: <strong>{c.new_deaths}</strong>
                                    <br />
                                    Serious/Critical:{" "}
                                    <strong>{c.serious_critical}</strong>
                                </p>
                            </LeafletPopup>
                        </Marker>
                    ))}
                </LeafletMap>
            )}
        </>
    )
}

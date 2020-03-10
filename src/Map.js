import React from "react"
import {
    Map as LeafletMap,
    Popup as LeafletPopup,
    Marker,
    TileLayer
} from "react-leaflet"

import useGetCoordinates from "./Hooks/useGetCoordinates"

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

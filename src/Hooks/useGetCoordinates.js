import { useEffect, useState } from "react"
import { cc } from "../assets/countryCodes"

const _mergeData = countries_stat => {
    const notUndefined = anyValue => typeof anyValue !== "undefined"
    return countries_stat
        .map(c => {
            const o = cc.filter(
                key =>
                    key.name.toLocaleLowerCase() ===
                    c.country_name.toLocaleLowerCase()
            )
            if (!!o[0]) return { ...c, latlng: o[0].latlng }
        })
        .filter(notUndefined)
}

export default function() {
    const [coordinates, setCoordinates] = useState({ empty: true })
    useEffect(() => {
        fetch(process.env.REACT_APP_URL, {
            method: "GET",
            headers: {
                "x-rapidapi-host": process.env.REACT_APP_HOST,
                "x-rapidapi-key": process.env.REACT_APP_KEY
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json()
            })
            .then(res => {
                setCoordinates(_mergeData(res.countries_stat))
            })
            .catch(err => {
                setCoordinates({ error: true })
            })
    }, [])

    return coordinates
}

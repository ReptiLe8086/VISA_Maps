import {LatLngExpression, LeafletMouseEvent} from 'leaflet';
import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon, Pane, useMapEvents} from 'react-leaflet';
import './App.css';
import {geoJSONParser} from './geoJSONParser/geoJSONParser';
import { Geometry } from './types/Geometry';
import getCoordinates from './utils/get-coordinates';
import { getMaxDepth } from './utils/get-max-depth';

const blueOptions = {color: 'blue'};

const testArray = [[[1, 2]]];

function CustomMap() {

    const [countryName, setCountryName] = useState('');

    const map = useMapEvents({
        click: async (e: LeafletMouseEvent) => {
            
            const lat: number = e.latlng.lat;
            const lng: number = e.latlng.lng;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`)
           .then(data => data.json())
           .then(dataJSON => dataJSON.error
                            ? console.log(dataJSON) 
                            : console.log(setCountryName(dataJSON.address.country)));
            
        }
    });
    const coords = getCoordinates(countryName);
    if(coords === null) {
        return null;
    }
    else {
        return <Polygon pathOptions={blueOptions} positions={coords} /> ;
    }
    
}

function App() {
    
    
    console.log(getMaxDepth(testArray));

    

    return (
        <div className="App">
            <MapContainer className="map" center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMap />
            </MapContainer>
        </div>
    );
}

export default App;

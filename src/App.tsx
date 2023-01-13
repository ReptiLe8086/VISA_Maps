import {LatLngExpression, LeafletMouseEvent} from 'leaflet';
import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon, Pane, useMapEvents} from 'react-leaflet';
import './App.css';
import {geoJSONParser} from './geoJSONParser/geoJSONParser';
import { Geometry } from './types/Geometry';

const blueOptions = {color: 'blue'};




function getCoordinates(countryName: string) {

    const targetGeometry = geoJSONParser(countryName);
    const coordinates = targetGeometry.coordinates;
    return coordinates?.map((coord1) =>
            coord1?.map((coord2) => coord2?.map((coord3) => coord3?.reverse()))
            ) as LatLngExpression[][][];

}


function CustomMap() {

    const [countryName, setCountryName] = useState('');

    const map = useMapEvents({
        click: async (e: LeafletMouseEvent) => {
            
            let lat: number = e.latlng.lat;
            let lng: number = e.latlng.lng;
            await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`)
           .then(data => data.json())
           .then(dataJSON => dataJSON.error
                            ? console.log(dataJSON) 
                            : setCountryName(dataJSON.address.country));
            
        }
    });
    return <Polygon pathOptions={blueOptions} positions={getCoordinates(countryName)} /> ;
}

function App() {
    
    


    

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

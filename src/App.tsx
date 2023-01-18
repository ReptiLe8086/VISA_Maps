import {LatLngExpression, LeafletMouseEvent} from 'leaflet';
import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon, Pane, useMapEvents} from 'react-leaflet';
import './App.css';
import CountriesSearchBar from './components/CountriesSearchBar/CountriesSearchBar';
import {geoJSONParser} from './geoJSONParser/geoJSONParser';
import { Geometry } from './types/Geometry';
import getCoordinates from './utils/get-coordinates';
import getCountriesNames from './utils/get-countries-names';
import { getMaxDepth } from './utils/get-max-depth';

const blueOptions = {color: 'blue'};


function CustomMap(props: { setSelected: (country: string) => void; selected: string; }) {

    

    const map = useMapEvents({
        click: async (e: LeafletMouseEvent) => {
            
            const lat: number = e.latlng.lat;
            const lng: number = e.latlng.lng;
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`)
           .then(data => data.json())
           .then(dataJSON => dataJSON.error
                            ? console.log(dataJSON) 
                            : props.setSelected(dataJSON.address.country));
            
        }
    });
    const coords = getCoordinates(props.selected);
    if(coords === null) {
        return null;
    }
    else {
        return <Polygon pathOptions={blueOptions} positions={coords} /> ;
    }
    
}

function App() {
    
    const [countryName, setCountryName] = useState('');

    //console.log(getCountriesNames());
    //const selectedCountry: string = countryName;

    return (
        <div className="App">
            <CountriesSearchBar selected={countryName} setSelected={setCountryName}/>
            <MapContainer className="map" center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
                
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMap selected={countryName} setSelected={setCountryName}/>
                
            </MapContainer>
            
        </div>
    );
}

export default App;

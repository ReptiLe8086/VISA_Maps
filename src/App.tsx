import {LatLngExpression, LeafletMouseEvent} from 'leaflet';
import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon, Pane, useMapEvents} from 'react-leaflet';
import './App.css';
import CountriesSearchBar from './components/CountriesSearchBar/CountriesSearchBar';
import getCoordinates from './utils/get-coordinates';
import data from './data/visas.json';
import { VisaStatus } from './types/VisaStatus';


const CURRENT_COUNTRY = {color: 'blue'};
const  VISA_FREE_COUNTRY = {color: 'green'};
const VISA_ON_ARRIVAL_COUNTRY = {color: 'lightgreen'};
const E_VISA_COUNTRY = {color: 'orange'};
const VISA_REQUIRED_COUNTRY = {color: 'red'};
const COVID_BAN_COUNTRY = {color: 'gray'};
const DAYS_WITHOUT_VISA = {color: 'yellow'};





function CustomMap(props: { setSelected: (country: string) => void; selected: string; }) {
    const map = useMapEvents({
        click: (e: LeafletMouseEvent) => {
            
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
        return <Polygon pathOptions={CURRENT_COUNTRY} positions={coords} /> ;
    }
}

function paintAllCountries(passport: string) {
    const polygons = [];

    const visasData = data as VisaStatus[];
    const currentVisaStatus = visasData.find((visa) => visa.Passport === passport);
    if (passport !== ''){
        for (let destinationCountry in currentVisaStatus) {
            if(destinationCountry !== passport) {
                const status = currentVisaStatus[destinationCountry];
                const coords = getCoordinates(destinationCountry);
                let pathOptions;
                switch(status) {
                    case 'covid ban':
                        pathOptions = COVID_BAN_COUNTRY;
                        break;
                    case 'e-visa':
                        pathOptions = E_VISA_COUNTRY;
                        break;
                    case 'visa free':
                        pathOptions = VISA_FREE_COUNTRY;
                        break;
                    case 'visa on arrival':
                        pathOptions = VISA_ON_ARRIVAL_COUNTRY;
                        break;
                    case 'visa required':
                        pathOptions = VISA_REQUIRED_COUNTRY;
                        break;
                    default:
                        pathOptions = DAYS_WITHOUT_VISA;
                        break;        
                }
                if(coords) {
                    polygons.push(
                        <Polygon pathOptions={pathOptions} positions={coords} />
                    )
                }
            }
        }
    }
    

    return polygons;
}




function App() {
    
    const [countryName, setCountryName] = useState('');


    return (
        <div className="App">
            <CountriesSearchBar selected={countryName} setSelected={setCountryName}/>
            <MapContainer className="map" center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
                
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMap selected={countryName} setSelected={setCountryName}/>
                {paintAllCountries(countryName)}
            </MapContainer>
            
        </div>
    );
}

export default App;

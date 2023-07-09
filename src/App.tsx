import {LatLng, LatLngBoundsExpression, LatLngExpression, LeafletMouseEvent} from 'leaflet';
import React, {useState} from 'react';
import {MapContainer, TileLayer, Polygon, useMapEvents, Marker, Popup} from 'react-leaflet';
import './App.css';
import CountriesSearchBar from './components/CountriesSearchBar/CountriesSearchBar';
import getCoordinates from './utils/get-coordinates';
import data from './data/visas.json';
import {VisaStatus} from './types/VisaStatus';
import {getCountryStatus} from './utils/get-country-status';
import CountriesStatus from './components/CountriesStatus/CountriesStatus';

enum CountryColors {
    CURRENT = 'blue',
    VISA_FREE = 'green',
    VISA_ON_ARRIVAL = 'lightgreen',
    E_VISA = 'orange',
    VISA_REQUIRED = 'red',
    COVID_BAN = 'gray',
    DAYS_WITHOUT_VISA = 'yellow'
}



function CustomMap(props: {setSelected: (country: string) => void; selected: string,
                           setMarkerPos: (marker: LatLngExpression) => void; markerPos: LatLngExpression,
                           setDestination: (destination: string) => void; destination: string}) {
    const map = useMapEvents({
        dblclick: (e: LeafletMouseEvent) => {
            const lat: number = e.latlng.lat;
            const lng: number = e.latlng.lng;
            fetch(
                https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en
            )
                .then((data) => data.json())
                .then((dataJSON) =>
                    dataJSON.error ? console.log(dataJSON) : props.setSelected(dataJSON.address.country)
                );
        },
        click: (e: LeafletMouseEvent) => {
            
            console.log(e);
            const lat: number = e.latlng.lat;
            const lng: number = e.latlng.lng;
            props.setMarkerPos(e.latlng);
            fetch(
                https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en
            )
                .then((data) => data.json())
                .then((dataJSON) =>
                    dataJSON.error ? console.log(dataJSON) : props.setDestination(dataJSON.address.country)
                );

        }
    });
    map.doubleClickZoom.disable();

    if(props.markerPos === null) {
        console.log('marker fault')
        return null;
    }
    if(props.destination === null) {
        console.log('destination fault')
        return null;
    }
    const status = getCountryStatus(props.selected, props.destination);
    if (status === '-1' || status === null) {
        return null;
    }
    return   <Popup position={props.markerPos}>
                    Destination: {props.destination} <br />
                    Status: {status}
             </Popup>;
    
}

function paintAllCountries(passport: string) {
    const polygons = [];

    const visasData = data as VisaStatus[];
    const currentVisaStatus = visasData.find((visa) => visa.Passport === passport);

    if (passport !== '') {
        for (let destinationCountry in currentVisaStatus) {
            // if (destinationCountry === passport) {
            //     continue;
            // }
const status = currentVisaStatus[destinationCountry];
            const coords = getCoordinates(destinationCountry);
            let pathOptions;
            switch (status) {
                case '-1':
                    pathOptions = CountryColors.CURRENT;
                    break;
                case 'covid ban':
                    pathOptions = CountryColors.COVID_BAN;
                    break;
                case 'e-visa':
                    pathOptions = CountryColors.E_VISA;
                    break;
                case 'visa free':
                    pathOptions = CountryColors.VISA_FREE;
                    break;
                case 'visa on arrival':
                    pathOptions = CountryColors.VISA_ON_ARRIVAL;
                    break;
                case 'visa required':
                    pathOptions = CountryColors.VISA_REQUIRED;
                    break;
                default:
                    pathOptions = CountryColors.DAYS_WITHOUT_VISA;
                    break;
            }
            if (coords) {
                polygons.push(
                    <Polygon pathOptions={{color: pathOptions}} positions={coords} key={destinationCountry} />
                );
            }
        }
    }

    return polygons;
}

function App() {
    const [countryName, setCountryName] = useState('');
    const [markerPosition, setMarkerPosition] = useState(null);
    const [destinationCountry, setDestinationCountry] = useState('');

    return (
        <div className="App">
            <CountriesSearchBar selected={countryName} setSelected={setCountryName} />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div className='legend'>
                    <div className='legend-rectangle current'/>
                    <p>&ensp;- current country&ensp; </p>
                    <div className='legend-rectangle visa-free'/>
                    <p>&ensp;- visa free countries&ensp; </p>
                    <div className='legend-rectangle visa-on-arrival'/>
                    <p>&ensp;- visa on arrival&ensp; </p>
                    <div className='legend-rectangle e-visa'/>
                    <p>&ensp;- e-visa&ensp; </p>
                    <div className='legend-rectangle visa-required'/>
                    <p>&ensp;- visa-required&ensp; </p>
                    <div className='legend-rectangle covid-ban'/>
                    <p>&ensp;- covid ban&ensp; </p>
                    <div className='legend-rectangle days'/>
                    <p>&ensp;- days without visa </p>
                </div>
            </div>
            <CountriesStatus selected={countryName} destination={destinationCountry} setDestination={setDestinationCountry} />
            <MapContainer className="map" center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true} minZoom={2}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMap 
                    selected={countryName} 
                    setSelected={setCountryName} 
                    markerPos={markerPosition} 
                    setMarkerPos={setMarkerPosition}
                    destination={destinationCountry}
                    setDestination={setDestinationCountry}
                    />
                {paintAllCountries(countryName)}
            </MapContainer>
        </div>
    );
}

export default App;
import {LeafletMouseEvent} from 'leaflet';
import React, {useState} from 'react';
import {MapContainer, TileLayer, Polygon, useMapEvents} from 'react-leaflet';
import './App.css';
import CountriesSearchBar from './components/CountriesSearchBar/CountriesSearchBar';
import getCoordinates from './utils/get-coordinates';
import data from './data/visas.json';
import {VisaStatus} from './types/VisaStatus';

enum CountryColors {
    CURRENT = 'blue',
    VISA_FREE = 'green',
    VISA_ON_ARRIVAL = 'lightgreen',
    E_VISA = 'orange',
    VISA_REQUIRED = 'red',
    COVID_BAN = 'gray',
    DAYS_WITHOUT_VISA = 'yellow'
}

function CustomMap(props: {setSelected: (country: string) => void; selected: string}) {
    useMapEvents({
        click: (e: LeafletMouseEvent) => {
            const lat: number = e.latlng.lat;
            const lng: number = e.latlng.lng;
            fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1&accept-language=en`
            )
                .then((data) => data.json())
                .then((dataJSON) =>
                    dataJSON.error ? console.log(dataJSON) : props.setSelected(dataJSON.address.country)
                );
        }
    });
    const coords = getCoordinates(props.selected);
    if (coords === null) {
        return null;
    }
    return <Polygon pathOptions={{color: CountryColors.CURRENT}} positions={coords} />;
}

function paintAllCountries(passport: string) {
    const polygons = [];

    const visasData = data as VisaStatus[];
    const currentVisaStatus = visasData.find((visa) => visa.Passport === passport);

    if (passport !== '') {
        for (let destinationCountry in currentVisaStatus) {
            if (destinationCountry === passport) {
                continue;
            }

            const status = currentVisaStatus[destinationCountry];
            const coords = getCoordinates(destinationCountry);
            let pathOptions;
            switch (status) {
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

    return (
        <div className="App">
            <CountriesSearchBar selected={countryName} setSelected={setCountryName} />
            <MapContainer className="map" center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true} minZoom={2}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CustomMap selected={countryName} setSelected={setCountryName} />
                {paintAllCountries(countryName)}
            </MapContainer>
        </div>
    );
}

export default App;

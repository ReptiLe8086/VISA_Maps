import React from 'react';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import './App.css';

function App(): any {
    return (
        <div className="App">
            <MapContainer className="map" center={[51.505, -0.09]} zoom={5} scrollWheelZoom={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={[51.505, -0.09]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}

export default App;

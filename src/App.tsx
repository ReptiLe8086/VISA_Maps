import {LatLngExpression} from 'leaflet';
import React, {useState, useEffect} from 'react';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon, Pane} from 'react-leaflet';
import './App.css';
import {geoJSONParser} from './geoJSONParser/geoJSONParser';

const blueOptions = {color: 'blue'};

function App(): any {
    const targetGeometry = geoJSONParser();
    const coordinates = targetGeometry.coordinates;
    const coords: LatLngExpression[][][] = coordinates?.map((coord1) =>
        coord1?.map((coord2) => coord2?.map((coord3) => coord3?.reverse()))
    ) as LatLngExpression[][][];

    return (
        <div className="App">
            <MapContainer className="map" center={[51.505, -0.09]} zoom={2} scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LayerGroup>
                    <Polygon pathOptions={blueOptions} positions={coords} />
                </LayerGroup>
            </MapContainer>
        </div>
    );
}

export default App;

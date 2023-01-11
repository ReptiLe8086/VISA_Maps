import { LatLngExpression } from 'leaflet';
import React, { useState, useEffect } from 'react';
import {MapContainer, TileLayer, Marker, Popup, LayerGroup, Polygon} from 'react-leaflet';
import './App.css';
import GeoJSONParser from './GeoJSONParser/GeoJSONParser';

const blueOptions = { color: 'blue'};

function App(): any {

    const targetGeometry = GeoJSONParser();
    const coordinates = targetGeometry.coordinates;
    const newCoordinates: any = [];

    useEffect(() => {
        
        coordinates.forEach((coord1: LatLngExpression[][][]) => {
            let newCoord1: LatLngExpression[][][] = [];

            coord1.forEach((coord2: LatLngExpression[][]) => {
                let newCoord2: LatLngExpression[][] = [];

                coord2.forEach((coord3: LatLngExpression[]) => {
                    let newCoord3: LatLngExpression[] = coord3.reverse();   
                    newCoord2.push(newCoord3);
                });
                newCoord1.push(newCoord2);
            });
            newCoordinates.push(newCoord1);
        });
    })
    
    return (
        <div className="App">
            <MapContainer className="map" center={[51.505, -0.09]} zoom={5} scrollWheelZoom={true}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <LayerGroup>
                    <Polygon pathOptions={blueOptions} positions={newCoordinates}/>
                </LayerGroup>
            </MapContainer>
        </div>
    );
}

export default App;

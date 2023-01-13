import {Coordinates, Features, Geometry} from '../types/Geometry';
import data from './countries.json';

function geoJSONParser(countryName: string): Coordinates {
    const countries = (data as Geometry).features as Features[];
    if(countryName === ''){
        countryName = 'United States of America';
    }
        return countries.find((country) => country.properties.ADMIN === countryName)
        ?.geometry as Coordinates;

    
}

export {geoJSONParser};

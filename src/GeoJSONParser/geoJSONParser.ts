import {Coordinates, Features, Geometry} from '../types/Geometry';
import data from './countries.json';

function geoJSONParser(countryName: string): Coordinates | null {
    const countries = (data as Geometry).features as Features[];
    if(countryName === ''){
        return null;
    }
    else {
        return countries.find((country) => country.properties.ADMIN === countryName)
        ?.geometry as Coordinates;
    }
        

    
}

export {geoJSONParser};

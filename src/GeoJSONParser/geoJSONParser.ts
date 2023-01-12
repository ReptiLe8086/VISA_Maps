import {Coordinates, Features, Geometry} from '../types/Geometry';
import data from './countries.json';

function geoJSONParser(): Coordinates {
    const countries = (data as Geometry).features as Features[];
    return countries.find((country) => country.properties.ADMIN === 'United States of America')
        ?.geometry as Coordinates;
}

export {geoJSONParser};

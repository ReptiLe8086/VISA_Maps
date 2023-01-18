import data from '../geoJSONParser/countries.json';
import { Geometry, Features } from '../types/Geometry';


export default function getCountriesNames(): string[] {
    const countries = (data as Geometry).features as Features[];
    const countriesNames: string[] = [];
    countries.forEach((country) => {
        countriesNames.push(country.properties.ADMIN);
    })
    return countriesNames;
}
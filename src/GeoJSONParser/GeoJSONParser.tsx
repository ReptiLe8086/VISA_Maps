
export default function GeoJSONParser() {

const data = require('./countries.json');
const countries = data.features;
let target: any;
countries.forEach((country: any) => {
    if(country.properties.ADMIN === "Russia") {
        //console.log(country);
        target = country;
        //break;
    }
});

return target.geometry;



//let countries = JSON.parse(d);

}
import { LatLngExpression } from "leaflet";
import { geoJSONParser } from "../geoJSONParser/geoJSONParser";

export default function getCoordinates(countryName: string): LatLngExpression[][][] | null {

    const targetGeometry = geoJSONParser(countryName);
    if(targetGeometry !== null) {
        const coordinates = targetGeometry.coordinates;
        return coordinates?.map((coord1) =>
                coord1?.map((coord2) => coord2?.map((coord3) => coord3?.reverse()))
                ) as LatLngExpression[][][];
    }
    else {
        return null;
    }
    

}
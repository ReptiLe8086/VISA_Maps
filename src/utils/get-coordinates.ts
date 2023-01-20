import { LatLngExpression } from "leaflet";
import { geoJSONParser } from "../geoJSONParser/geoJSONParser";
import { NestedArray } from "../types/NestedArray";
import { getMaxDepth } from "./get-max-depth";


export default function getCoordinates(countryName: string): LatLngExpression[][][] | null {

    const targetGeometry = geoJSONParser(countryName);
    if(targetGeometry !== null && targetGeometry !== undefined) {
        const coordinates = targetGeometry.coordinates;
        // TODO: change stuff 
        const coordArray = coordinates as NestedArray<number>;
        const arrayDepth: number = getMaxDepth(coordArray);
        if(arrayDepth === 3){
            return coordinates?.map((coord1) =>
                coord1?.map((coord2) => coord2?.reverse())
                ) as LatLngExpression[][][];
        }
        else if(arrayDepth === 4) {
            return coordinates?.map((coord1) =>
                coord1?.map((coord2) => coord2?.map((coord3) => coord3?.reverse()))
                ) as LatLngExpression[][][];
        }
        else {
            return null;
        }
        
    }
    else {
        return null;
    }
    

}
export interface Geometry {
    type: string;
    features?: Features[] | null;
}
export interface Features {
    type: string;
    properties: {ADMIN: string; ISO_A3: string};
    geometry: Coordinates;
}

export interface Coordinates {
    type: string;
    coordinates?: ((([number, number] | null)[] | null)[] | null)[] | null;
}

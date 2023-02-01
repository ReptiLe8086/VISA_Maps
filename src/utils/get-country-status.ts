import data from '../data/visas.json'
import { VisaStatus } from '../types/VisaStatus';

export function getCountryStatus(passport: string, destination: string) {
    const visasData = data as VisaStatus[];
    const currentVisaStatus = visasData.find((visa) => visa.Passport === passport);

    if (passport !== '' && destination !== '') {
        return currentVisaStatus[destination];
    }
    return null;
}
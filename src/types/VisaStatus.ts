export interface VisaData {
    [key: string] : number | Status;
} 

export type Status = 'visa required' | 'e-visa' | 'visa on arrival' | 'covid ban' | 'visa free';

export type VisaStatus = VisaData & { Passport: string };
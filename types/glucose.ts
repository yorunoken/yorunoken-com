export interface GlucoseEntry {
    type: string;
    dateString: string;
    date: number;
    sgv: number;
    direction: string;
    noise: number;
    filtered: number;
    unfiltered: number;
    rssi: number;
}

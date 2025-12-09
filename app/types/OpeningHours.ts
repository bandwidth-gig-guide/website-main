export type OpeningHours = {
    monOpen: string
    monClose: string
    tueOpen: string
    tueClose: string
    wedOpen: string
    wedClose: string
    thurOpen: string
    thurClose: string
    friOpen: string
    friClose: string
    satOpen: string
    satClose: string
    sunOpen: string
    sunClose: string
}

export function areAllOpeningHoursEqual(hours: OpeningHours, value: string): boolean {
    return Object.values(hours).every(hour => hour === value);
}

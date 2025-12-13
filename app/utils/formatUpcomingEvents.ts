export function formatUpcomingEvents( numEvents: number): string {
    switch (numEvents) {
        case 0:
            return ""
        case 1:
            return "1 Upcoming Event"
        default:
            return `${numEvents} Upcoming Events`
    }
}
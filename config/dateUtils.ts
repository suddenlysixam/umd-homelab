export const DEFAULT_TIME_ZONE = "America/New_York";

export function isUpcoming(date: Date | string): boolean {
    const givenDate = new Date(date);
    const now = new Date();
    return now <= givenDate;
}

export function ordinal(day: number): string {
    if ([11, 12, 13].includes(day % 100)) {
        return `${day}th`;
    }

    switch (day % 10) {
        case 1:
            return `${day}st`;
        case 2:
            return `${day}nd`;
        case 3:
            return `${day}rd`;
        default:
            return `${day}th`;
    }
}

export function formatDate(date: Date | string, timeZone = DEFAULT_TIME_ZONE): string {
    const givenDate = new Date(date);

    const weekday = givenDate.toLocaleDateString("en-US", {weekday: "long", timeZone});
    const month = givenDate.toLocaleDateString("en-US", {month: "long", timeZone});
    const day = ordinal(Number(givenDate.toLocaleDateString("en-US", {day: "numeric", timeZone})));
    const year = givenDate.toLocaleDateString("en-US", {year: "numeric", timeZone});

    return `${weekday}, ${month} ${day}, ${year}`;
}

export function formatTime(date: Date | string, timeZone = DEFAULT_TIME_ZONE): string {
    return new Date(date).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        timeZone,
    });
}

export function formatISODate(
    date: Date | string,
    timeZone = DEFAULT_TIME_ZONE
): string {
    return new Intl.DateTimeFormat("en-CA", { // en-CA YYYY-MM-DD
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    }).format(new Date(date));
}

export function format24HourTime(
    date: Date | string,
    timeZone = DEFAULT_TIME_ZONE
): string {
    return new Intl.DateTimeFormat("en-GB", { // en-GB 24-hour format
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23",
    }).format(new Date(date));
}
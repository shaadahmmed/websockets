import { MATCH_STATUS } from "./matches.validate";

export function getMatchStatus(
    startTime: string,
    endTime: string,
    now = new Date(),
): (typeof MATCH_STATUS)[number] {
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (now < start) {
        return "scheduled";
    }
    if (now > end) {
        return "finished";
    }
    return "live";
}

export function syncMatchStatus() {}

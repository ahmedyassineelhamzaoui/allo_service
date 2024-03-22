import { Days } from "../enums/days.enum";

export interface AvailabilityRequestInterface {
    startTime: string;
    endTime: string;
    day: Days[];
}

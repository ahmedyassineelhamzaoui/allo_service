export interface AvailabilityRequestInterface {
    startTime: string;
    endTime: string;
    days: Days[];
}
enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
  }
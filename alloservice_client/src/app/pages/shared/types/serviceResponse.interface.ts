import { AvailabilityRequestInterface } from "./availabilityRequest.interface";
import { TagInterface } from "./tag.interface";

export interface ServiceResponseInterface {
    id: string;
    user:  string[];
    title: string;
    price: number;
    description: string;
    tags : TagInterface[];
    availabilities : AvailabilityRequestInterface[];
    serviceStatus: string;

}
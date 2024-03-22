import { AvailabilityRequestInterface } from "./availabilityRequest.interface";
import { TagInterface } from "./tag.interface";

export interface AddServiceReqeustInterface{
    title: string;
    description: string;
    tags: TagInterface[];
    price: number;
    availabilities: AvailabilityRequestInterface[];
}
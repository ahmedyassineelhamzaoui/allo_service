import { AvailabilityRequestInterface } from "./availabilityRequest.interface";
import { TagInterface } from "./tag.interface";
import { UserResponseInterface } from "./userResponse.interface";

export interface ServiceResponseInterface {
    id: string;
    user:  UserResponseInterface;
    title: string;
    price: number;
    description: string;
    tags : TagInterface[];
    availabilities : AvailabilityRequestInterface[];
    serviceStatus: string;
}
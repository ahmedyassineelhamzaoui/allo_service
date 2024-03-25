import { AvailabilityRequestInterface } from "./availabilityRequest.interface";
import { PictureInterface } from "./picture.interface";
import { TagInterface } from "./tag.interface";
import { UserResponseInterface } from "./userResponse.interface";

export interface ServiceResponseInterface {
    id: string;
    user:  UserResponseInterface;
    title: string;
    price: number;
    servicePicture: PictureInterface;
    description: string;
    tags : TagInterface[];
    availability : AvailabilityRequestInterface[];
    serviceStatus: string;
}
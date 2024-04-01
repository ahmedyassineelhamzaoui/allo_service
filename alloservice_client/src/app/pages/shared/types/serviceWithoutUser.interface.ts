import { AvailabilityRequestInterface } from "./availabilityRequest.interface";
import { PictureInterface } from "./picture.interface";
import { TagInterface } from "./tag.interface";

export interface ServiceWithoutUserInterface {
    id: string;
    title: string;
    price: number;
    servicePicture: PictureInterface;
    description: string;
    tags : TagInterface[];
    availability : AvailabilityRequestInterface[];
    serviceStatus: string;
}
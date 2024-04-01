import { PictureInterface } from "./picture.interface";
import { RoleInterface } from "./role.interface";

export interface UserResponseInterface{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: RoleInterface[];
}
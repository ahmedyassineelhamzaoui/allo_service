import { Card } from "./card.interface";
import { RoleInterface } from "./role.interface";
import { ServiceWithoutUserInterface } from "./serviceWithoutUser.interface";

export interface UserInterface {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    services : ServiceWithoutUserInterface[];
    authorities: RoleInterface[];
    picture: {
        id: string;
        link: string;
    };
    gender: string;
    location:string;
    card:Card;
}
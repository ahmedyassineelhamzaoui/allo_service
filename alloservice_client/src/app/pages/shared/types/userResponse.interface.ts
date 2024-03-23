import { RoleInterface } from "./role.interface";

export interface UserResponseInterface{
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: RoleInterface[];
}
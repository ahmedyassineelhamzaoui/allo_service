import { PermissionInterface } from "./permission.interface";

export interface RoleInterface{
    name: string;
    permissions: PermissionInterface[];
}
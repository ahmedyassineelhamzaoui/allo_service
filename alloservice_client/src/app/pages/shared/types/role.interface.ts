import { PermissionInterface } from "./permission.interface";

export interface RoleInterface{
    authority: string;
    permissions: PermissionInterface[];
}
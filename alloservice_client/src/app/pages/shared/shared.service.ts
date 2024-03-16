import { Injectable } from '@angular/core';
import { PersistanceService } from '../../auth/shared/services/persistance.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  private roles: { role: string, permissions: string[] }[] = [];

  constructor( private persistanceService: PersistanceService) {
    this.initializeRoles();
  }
  initializeRoles(): void {
      const myToken = this.persistanceService.get('accessToken');
      if (myToken) {
        const decodedToken = JSON.parse(atob(myToken!.split('.')[1]));
        this.setRoles(decodedToken.roles);
      }
    }
  
  setRoles(roles: { role: string, permissions: string[] }[]): void {
    this.roles = roles;
  }

  getRoles(): { role: string, permissions: string[] }[] {
    return this.roles;
  }

  hasRole(role: string): boolean {
    return this.roles.some(r => r.role === role);
  }

  hasPermission(permission: string): boolean {
    return this.roles.some(r => r.permissions.includes(permission));
  }
}

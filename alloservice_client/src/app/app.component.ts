import { Component } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routeAnimations', [
      transition('SignupUserPage <=> SignupWorkerPage', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class AppComponent {
  title = 'allo service';

  isLoading: boolean = true;
  showContent = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showContent = ['/manage_services', '/settings','/users','/tags'].includes(event.urlAfterRedirects);
      }
    });
  }
  ngOnInit() {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000); 
  }
  prepareRoute(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }

}
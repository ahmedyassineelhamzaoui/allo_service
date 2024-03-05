import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isActive = false;

  activate() {
      this.isActive = true;
  }

  deactivate() {
      this.isActive = false;
  }
}

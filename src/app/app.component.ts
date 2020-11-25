import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SessionService } from './services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'projeto-frontend';

  constructor(private auth: AuthService, public session: SessionService) {}

  handleLogout() {
    this.auth.logout();
  }
}

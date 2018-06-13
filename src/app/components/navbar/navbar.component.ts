import { Component, HostListener } from '@angular/core';
import { UserStateService } from '../../shared/services/user-state.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public isSmallDevice: boolean;
  public openDrawer: boolean = false;
  constructor(public state: UserStateService) {
    this.isSmallDevice = window.innerWidth <= 425;
  }

  @HostListener('window:resize', ['$event'])
  checkScreen(event) {
    this.isSmallDevice = event.target.innerWidth <= 425;
  }

  /**
   * Opens the drawer when the screen is small
   */
  toggleDrawer(): void {
    this.openDrawer = !this.openDrawer;
  }
}
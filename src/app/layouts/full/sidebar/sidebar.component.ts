import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';
import { NavService } from '../../../services/nav.service';
import { CoookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService, private CookieService: CoookieService) {}

  ngOnInit(): void {
    this.menuFilter();
  }

  private menuFilter(): void {
    const userRoles = this.CookieService.getRole();

    const result = navItems.filter(x => userRoles.includes(x.requiresRole));
  
    this.navItems = result;
    console.log(this.navItems);
  }
}

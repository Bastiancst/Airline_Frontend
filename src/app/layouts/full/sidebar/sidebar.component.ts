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
    const userRoles: any = this.CookieService.getRole();
    var result: any;
    result = navItems.filter(x => {
      if(x.requiresRole?.indexOf(userRoles) != -1) return true;
      else return false;
    //userRoles.includes(x.requiresRole?.find(userRoles)));
    });
    this.navItems = result;
    console.log(this.navItems);
  }
}

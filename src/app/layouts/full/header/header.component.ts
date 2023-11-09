import { _fixedSizeVirtualScrollStrategyFactory } from '@angular/cdk/scrolling';
import {
  Component,
  Output,
  EventEmitter,
  Input,
  ViewEncapsulation,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CoookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit{
  @Input() showToggle = true;
  @Input() toggleChecked = false;
  @Output() toggleMobileNav = new EventEmitter<void>();
  @Output() toggleMobileFilterNav = new EventEmitter<void>();
  @Output() toggleCollapsed = new EventEmitter<void>();

  showFiller = false;
  isLogged = false;

  constructor(public dialog: MatDialog, private CookieService: CoookieService, private _router: Router) {}
  ngOnInit(): void {
    this.isLoggedComp();
  }

  logOut(): void{
    this.CookieService.removeCookies();
    this._router.navigate(['/authentication/login']);
  }

  isLoggedComp(){
    if(this.CookieService.getToken()) this.isLogged = true;
    else this.isLogged = false;
  }

}

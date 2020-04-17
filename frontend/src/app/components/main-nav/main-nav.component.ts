import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/user.service';
import { APIService } from '../../api.service';

@Component({
  selector: 'main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  otherTheme: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver, 
              private router: Router, 
              private route: ActivatedRoute,
              private apiService: APIService, 
              public userService: UserService) { }

  changeTheme() {
    this.otherTheme = !this.otherTheme;
  }

  editProfile(id) {
    this.router.navigate([`/edit-profile/${id}`]);
  }

  deleteAccount(id) {
    this.apiService.deleteAccount(id).subscribe(() => {
      this.userService.setAccountId(null);
      this.userService.setAccountEmail(null);
      this.userService.setAccountPassword(null);
      this.userService.setAccountLoggedIn(false);
      this.router.navigate(['']);
    });
  }

  logOut() {
    this.userService.setAccountId(null);
    this.userService.setAccountEmail(null);
    this.userService.setAccountPassword(null);
    this.userService.setAccountLoggedIn(false);
    this.router.navigate(['']);
  }
}

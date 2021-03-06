import { Component, OnInit } from '@angular/core';
import { APIService } from '../../api.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Account } from '../../account.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  users: Account[];
  displayedColumns = ['user', 'actions'];
  searchForm: FormGroup;

  constructor(private userService: UserService, 
              private apiService: APIService, 
              private router: Router, 
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    if (this.userService.isAccountLoggedIn()) {
      this.searchForm = this.fb.group({
        search: new FormControl()
      });

      this.route.params.subscribe(params => {
        let searchInput = params.search;

        this.search(searchInput);
      });
    } else {
      this.router.navigate([`/home`]);
    }
  }

  search(searchInput): void {
    searchInput.trim();
    if (searchInput.length > 0) {
      this.users = undefined;

      if (searchInput.includes(' ')) {
        var first: string = searchInput.substring(0, searchInput.indexOf(' '));
        var last: string = searchInput.substring(searchInput.indexOf(' ') + 1, searchInput.length);
      } else {
        var first: string = searchInput;
        var last: string = '';
      }
  
      this.searchForm.get('search').setValue(last == '' ? first : first + ' ' + last);
  
      this.apiService.getAccountBySearch(first, last).subscribe((data: Account[]) => {
        this.users = data;
      });
    } else {
      this.snackBar.open('Please enter a name to use the search', 'Dismiss', { duration: 5000, verticalPosition: 'top', panelClass: ['snackBarError'] });
    }
  } 

  viewUserRecipes(userName, userId): void {
    this.router.navigate([`/user-view/${userName}/${userId}`]);
  }

  followUser(followId): void {
    this.apiService.addFollow(this.userService.getAccountId(), followId).subscribe(response => {
      this.snackBar.open('User favorited successfully', 'OK', { duration: 4000, verticalPosition: 'top', panelClass: ['snackBarSuccess'] });
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { APIService } from '../../api.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  id: String;
  profile: any = {};
  updateProfileForm: FormGroup;

  constructor(private apiService: APIService, 
              private fb: FormBuilder, 
              private router: Router, 
              private route: ActivatedRoute,
              public userService: UserService) { 

    this.createForm();
  }

  ngOnInit()  {
    if (this.userService.isAccountLoggedIn()) { 
      this.route.params.subscribe(params => {
        this.id = params.id;
        this.apiService.getAccountById(this.id).subscribe(res => {
          this.profile = res;
  
          this.updateProfileForm.get('first').setValue(this.profile.first);
          this.updateProfileForm.get('last').setValue(this.profile.last);
          this.updateProfileForm.get('gender').setValue(this.profile.gender);
          this.updateProfileForm.get('bio').setValue(this.profile.bio);
        });
      });
    } else {
      this.router.navigate([`/home`]);
    }
  }

  createForm() {
    this.updateProfileForm = this.fb.group({
      first: ['', Validators.required],
      last: ['', Validators.required],
      gender: ['', Validators.required],
      bio: ['']
    });
  }

  updateProfile() {
    this.apiService.updateAccount(this.updateProfileForm.get('first').value, 
                                  this.updateProfileForm.get('last').value,
                                  this.updateProfileForm.get('gender').value,  
                                  this.updateProfileForm.get('bio').value).subscribe(response => {

      this.userService.setAccountFirst(this.updateProfileForm.get('first').value);
      this.router.navigate(['/list']);
    });
  }

}

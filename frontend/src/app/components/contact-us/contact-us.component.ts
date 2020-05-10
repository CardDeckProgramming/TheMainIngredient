import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() 
  {
    this.contactUsForm= this.formBuilder.group({
      email: ['', Validators.required],
      message: ['', Validators.required]
    });
  }
/*
  submit() {
    this.apiService.addContact(this.contactUsForm.get('email').value, this.contactUsForm.get('message').value).subscribe(response => {
      this.router.navigate([``]);
      this.snackBar.open('Message Sent Seccesfully','Dismiss',{duration:5000,verticalPosition:'top'});
    });
  }
*/
}


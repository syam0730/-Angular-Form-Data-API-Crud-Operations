import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AppService } from '../app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {

  
  form1: any
  constructor(private router: Router, private service: AppService) {
    
    this.form1 = new FormGroup({
      COUNTRY: new FormControl('',[Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-z], [A-Za-z], [A-Za-z]")])
     
    })
  }

  data: any = {};
  preview: string = '';
  suni: string = '';
  Clickme() {
    console.log(this.form1.value);
    alert(`Thank You Country Data is Saved`)
    this.data.COUNTRY = this.form1.value.COUNTRY;
    this.postDatafromApi();
}

  ngOnInit(): void {
    // this.getData();
    // this.postDatafromApi()
    
  }



  postDatafromApi() {
    this.service.postData(this.data).subscribe((response: any) => {
      console.log('Response from API Post is', response)
      this.preview = JSON.stringify(response);
    }, (error: any) => {
      console.log('Error is ', error)
    })
  }
}

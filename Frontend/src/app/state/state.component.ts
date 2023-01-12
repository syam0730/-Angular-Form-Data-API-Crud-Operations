import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.sass']
})
export class StateComponent implements OnInit {

  fetch: any = '';
  form2: any;
  data: any = { };
  preview: string = '';
  COUNTRY: any

  constructor(private router: Router, private service: AppService) {
    
    this.form2 = new FormGroup({
      COUNTRY: new FormControl('', [Validators.required, Validators.minLength(3)]),
      STATENAME: new FormControl('', [Validators.required, Validators.minLength(3)])
     
    })
  }

  Clickme() {
    console.log(this.form2.value);
    alert(`Thank You State Data is Saved`)
    this.data.COUNTRY = this.form2.value.COUNTRY;
    this.data.STATENAME= this.form2.value.STATENAME;
    this.postDatafromApi();
}
  ngOnInit(): void {
    this.getData();

  }

  getData() {
    this.service.getData().subscribe((response: any) => {
    console.log('response from API is ', response)
    this.fetch = response;
    }, (error) => {
      console.log('error is', error);
    })
  }

  postDatafromApi() {
    this.service.postState(this.data).subscribe((response: any) => {
      console.log('Response from API Post is', response)
      this.preview = JSON.stringify(response);
    }, (error: any) => {
      console.log('Error is ', error)
    })
  }

}

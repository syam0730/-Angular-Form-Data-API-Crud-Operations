import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-district',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.sass']
})
export class DistrictComponent implements OnInit {
  fetch: any;
  form3: any;
  data: any = { };
  preview: string = '';
  COUNTRY: any
  STATENAME: any
  dropdownstate: any[] = [null]
  countryId: any
  stateId:any
  state: any = {}
  getState:any  = {}
  // DISTRICTNAME: any

  constructor(private router: Router, private service: AppService) { 
    this.form3 = new FormGroup({
      COUNTRY: new FormControl('', [Validators.required, Validators.minLength(3)]),
      STATENAME: new FormControl('', [Validators.required, Validators.minLength(3)]),
      DISTRICTNAME: new FormControl('', [Validators.required, Validators.minLength(3)])
     
    })
  }

  Clickme() {
    console.log(this.form3.value);
    alert(`Thank You District Data is Saved`)
    this.data.COUNTRY = this.form3.value.COUNTRY;
    this.data.STATENAME = this.form3.value.STATENAME;
    this.data.DISTRICTNAME= this.form3.value.DISTRICTNAME;
    this.postDatafromApi();
}

  ngOnInit(): void {
    this.getData();
    
  }
  onSelect(country: any){
    this.data.COUNTRY = this.form3.value.COUNTRY
    this.countryId = this.data.COUNTRY
      // console.log("Country",this.c);
      // console.log(this.address);
      
      this.getStateNameAPI(this.data.COUNTRY)
      this.dropdownstate= []
  }
  getStateNameAPI(statename: string){
    this.service.getStateName(statename).subscribe((res)=>{
      this.state = res;
      
      for(let value of this.state){
                
                    for(let lo of value.STATE){
                    this.dropdownstate.push(lo.STATENAME) 
                    }
        
      }
      console.log(this.dropdownstate);      
      
    })
  }
  getStateName(){
    this.getState.STATENAME = this.form3.value.STATENAME
    console.log("State",this.getState);
    this.stateId = this.getState.STATENAME

    
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
  this.service.postDISTRICT(this.data).subscribe((response: any) => {
    console.log('Response from API Post is', response)
    this.preview = JSON.stringify(response);
  }, (error: any) => {
    console.log('Error is ', error)
  })
}
} 



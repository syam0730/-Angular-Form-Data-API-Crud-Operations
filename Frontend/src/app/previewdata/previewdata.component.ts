import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

@Component({
  selector: 'app-previewdata',
  templateUrl: './previewdata.component.html',
  styleUrls: ['./previewdata.component.sass']
})
export class PreviewdataComponent implements OnInit {
  fetch: any;

  
  constructor(private router: Router, private service: AppService) {}

  ngOnInit(): void {
    this.getData();
  }

  
getData() {
  this.service.getData().subscribe((response: any) => {
  console.log('response from API is ', response)
  this.fetch = response;
  }, (error: any) => {
    console.log('error is', error);
  })

}
  
}

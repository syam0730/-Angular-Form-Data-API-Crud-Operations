import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {


  constructor(private http: HttpClient) {}

  postData(data:string){
    return this.http.post('http://localhost:3000/country',data)
  }
  getData() {
    return this.http.get('http://localhost:3000/fetch')
  }

  postState(data:any){
    return this.http.post('http://localhost:3000/COUNTRY/'+data.COUNTRY,data)
  }

  getStateName(COUNTRY: String){
    return this.http.get('http://localhost:3000/COUNTRY/'+COUNTRY)
  }

  postDISTRICT(data:any){
    return this.http.post('http://localhost:3000/COUNTRY/'+data.COUNTRY+'/'+data.STATENAME,data)
  }
}

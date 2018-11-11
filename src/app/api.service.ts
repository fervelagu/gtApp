import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  url = 'https://api.github.com/search/users?q=';

  getUser(usrname){
    return this.http.get(this.url + usrname).pipe(map((res: Response)=>res.json()));
  }

}

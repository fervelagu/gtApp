import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: Http) { }

  users_url = 'https://api.github.com/search/users?q=';
  repos_url = 'https://api.github.com/users/';

  getUser(usrname){
    return this.http.get(this.users_url + usrname).pipe(map((res: Response) => res.json()));
  }

  getRepos(usrname){
    return this.http.get(this.repos_url + usrname + '/repos').pipe(map((res: Response) => res.json()));
  }
}

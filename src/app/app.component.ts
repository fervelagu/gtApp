import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ApiService]
})
export class AppComponent {
  title = 'gitApp';
  usr: any = { items: [] };
  usr2: any = { items: [] };
  userOneRepos = {};
  userTwoRepos = {};
  users = false;
  winner: String;

  constructor(private apiService: ApiService){}

  submit(form){
    let usrnm = form.value.one;
    let usrnm2 = form.value.two;
    this.apiService.getUser(usrnm).subscribe((data: {items:['']}) => {
      this.usr = data.items[0];
      return this.usr;
    });
    this.apiService.getUser(usrnm2).subscribe((data: {items:['']}) => {
      this.usr2 = data.items[0];
      return this.usr2;
    });
    this.users = true;
  }

  compareUsers(u_one, u_two){
    let usrOneStars = 0;
    let usrTwoStars = 0;
    this.apiService.getRepos(u_one.login).subscribe((data: [{stargazers_count: number}]) => {
      this.userOneRepos = data;
      data.forEach((e) => {
        usrOneStars += e["stargazers_count"];
        console.log(usrOneStars);
      });
    });

    this.apiService.getRepos(u_two.login).subscribe((data: [{stargazers_count: number}]) => {
      this.userTwoRepos = data;
      data.forEach((e) => {
        usrTwoStars += e["stargazers_count"];
        console.log(usrTwoStars);
      });
    })

    console.log(usrOneStars, usrTwoStars);
    if(usrOneStars > usrTwoStars){
      this.winner = this.usr.login;
      console.log ("USER " +this.usr.login+ " WINS!!!");
    } else {
      this.winner = this.usr2.login;
      console.log ("USER " +this.usr2.login+ " WINS!!!");
    }
  }

  reload(){
    window.location.reload();
  }
}

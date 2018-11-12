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
  //usrRepos = {};

  constructor(private apiService: ApiService){}

  //REFACTORIZING
  // getUsername(usr){
  //   this.apiService.getUser(usr).subscribe((data: {items:['']}) => {
  //     this.usr = data.items[0];
  //     console.log(usr);
  //     return this.usr;
  //   });
  // }

  // getRepositories(u){
  //   let usrStars = 0;
  //   this.apiService.getRepos(u.login).subscribe((data: [{stargazers_count: number}]) => {
  //     this.usrRepos = data;
  //     data.forEach((e) => {
  //       usrStars += e.stargazers_count;
  //       console.log(usrStars);
  //     })
  //   })
  // }

  submit(form){
    let usrnm = form.value.one;
    let usrnm2 = form.value.two;
    // this.getUsername(usrnm);
    // this.getUsername(usrnm2);
    this.apiService.getUser(usrnm).subscribe((data: {items:['']}) => {
      this.usr = data.items[0];
      return this.usr;
    });

    //user 2
    this.apiService.getUser(usrnm2).subscribe((data: {items:['']}) => {
      this.usr2 = data.items[0];
      return this.usr2;
    });
    this.users = true;
  }

  compareUsers(u_one, u_two){
    let usrOneStars = 0;
    let usrTwoStars = 0;
    let usr1ReposByStars = [];
    let usr2ReposByStars = [];
     // this.getRepositories(u_one);
    // this.getRepositories(u_two);
    
    this.apiService.getRepos(u_one.login).subscribe((data: [{stargazers_count: number, name: string}]) => {
      this.userOneRepos = data;
      //getting stars
      data.forEach((e) => {
        let repoName = e.name;
        usrOneStars += e.stargazers_count;
        //order repos by star number
        usr1ReposByStars.push(e["stargazers_count"]);
        usr1ReposByStars.sort();
      })
      
      //user 2
      this.apiService.getRepos(u_two.login).subscribe((data: [{stargazers_count: number, name: string}]) => {
        this.userTwoRepos = data;
        data.forEach((e) => {
          let repoName = e.name;
          usrTwoStars += e["stargazers_count"];
          //order repos by star number
          usr1ReposByStars.push(e["stargazers_count"]);
          usr1ReposByStars.sort();
        })
      })
    })
    
    this.getWinner(usrOneStars, usrTwoStars);
  }

  getWinner(usrOneStars, usrTwoStars){
    if(usrOneStars > usrTwoStars){
      this.winner = this.usr.login;
      console.log ("USER " +this.usr.login+ " WINS!!!");
    } else {
      this.winner = this.usr2.login;
      console.log ("USER " +this.usr2.login+ " WINS!!!");
    }
  }

  reload(){
    this.usr = '';
    this.usr2 = '';
    this.users = false;
  }
}

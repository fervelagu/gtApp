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
  usr: any = [];
  usr2: any = [];

  constructor(private apiService: ApiService){}

  getUsr(form){
    this.usr = [];
    this.usr2 = [];
    let usrnm = form.value.one;
    let usrnm2 = form.value.two;
    this.apiService.getUser(usrnm).subscribe((data: {}) => {
      console.log(data);
      this.usr = data;
    });
    this.apiService.getUser(usrnm2).subscribe((data: {}) => {
      console.log(data);
      this.usr2 = data;
    });
  }

  // submitForm(form){
  //   let one = form.value.one;
  //   console.log(form.value.one);
  //   //if(one = two) return alert('Oops, usernames cant be the same :/');
  //   this.apiService.getUser(one).subscribe(one => one);
  //   //this.apiService.getUser(two).subscribe(two => two);
  // }
}

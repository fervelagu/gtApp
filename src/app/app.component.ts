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

  constructor(private apiService: ApiService){}

  submitForm(form){
    let one = form.value.one;
    console.log(form.value.one);
    //if(one = two) return alert('Oops, usernames cant be the same :/');
    this.apiService.getUser(one).subscribe(one => one);
    //this.apiService.getUser(two).subscribe(two => two);
  }
}

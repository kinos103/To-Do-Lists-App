import {Component, OnInit} from '@angular/core';
import {MiddlewareService} from './middleware.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // DON'T FORGET TO PROVIDE YOUR SERVICES
  providers: [MiddlewareService]
})
export class AppComponent implements OnInit {

  // INJECT YOUR DEPENDENCIES WHEN YOU CALL YOUR COMPONENT TO THE DOM
  constructor(private middleware: MiddlewareService)  {
  }

  // LOCAL VARIABLE USED WITHIN THE COMPONENT AND ITS TEMPLATE
  title = 'app';

  // THIS FUNCTION FIRES ONCE THE COMPONENT INITIALIZES IN THE DOM
  ngOnInit()  {
  }

  // THIS FUNCTION CALLS THE MIDDLEWARE SERVICE AND FIRES AN OBSERVABLE FUNCTION
  // WE SUBSCRIBE TO THE DATA AND ANY ERRORS
  test()  {
    this.middleware.changeTitle().subscribe(data =>   {
      // IN ORDER TO SEE WHAT DATA IS LOADED INTO DATA TRY CONSOLE.LOG(DATA)
      // WE REPLACE OUR LOCAL INSTANCE OF TITLE WITH THE STRING STORED IN DATA
      this.title = data.title;
    },
    error =>  {
      // LET'S HOPE THIS ONE DOESN'T FIRE
      console.error(error);
    });
  }

}


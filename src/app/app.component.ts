import {Component, OnInit} from '@angular/core';
import {MiddlewareService} from './middleware.service';
import {Blog} from '../models/Blog';
import {error} from 'util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // DON'T FORGET TO PROVIDE YOUR SERVICES
  providers: [MiddlewareService]
})
export class AppComponent implements OnInit {

  //  VARIABLE TO HOLD CURRENT BLOGS
  Blogs: Blog[] = [];

  // VARIABLES TO HOLD TEMP BLOG
  author: string;
  title: string;
  body: string;

  // INJECT YOUR DEPENDENCIES WHEN YOU CALL YOUR COMPONENT TO THE DOM
  constructor(private middleware: MiddlewareService)  {}

  // LOCAL VARIABLE USED WITHIN THE COMPONENT AND ITS TEMPLATE

  // THIS FUNCTION FIRES ONCE THE COMPONENT INITIALIZES IN THE DOM
  ngOnInit()  {
    // RETRIEVE ALL BLOGS FROM SERVER ON START UP
    this.retrieveBlogs();
  }

  saveBlog()  {
    const blog = new Blog(
      this.author,
      this.title,
      this.body
    );
    this.middleware.saveBog(blog).subscribe(
      data => {
        console.log(data);
      },
      err =>  {
        console.error(err.error);
      }
    );
    this.retrieveBlogs();

  }
  // THIS FUNCTION CALLS THE MIDDLEWARE SERVICE AND FIRES AN OBSERVABLE FUNCTION
  // WE SUBSCRIBE TO THE DATA AND ANY ERRORS
  test()  {
    this.middleware.changeTitle().subscribe(data =>   {
      // IN ORDER TO SEE WHAT DATA IS LOADED INTO DATA TRY CONSOLE.LOG(DATA)
      // WE REPLACE OUR LOCAL INSTANCE OF TITLE WITH THE STRING STORED IN DATA
      this.title = data.title;
    },
    err =>  {
      // LET'S HOPE THIS ONE DOESN'T FIRE
      console.error(err);
    });
  }

  retrieveBlogs() {
    // RETRIEVE ALL BLOGS FROM SERVER ON START UP
    this.middleware.retrieveBlogs().subscribe(
      data => {
        this.Blogs = [];
        for (const blog of data.result)  {
          this.Blogs.push(blog);
        }
        console.log('Blogs Received from DB');
      },
      err =>  {
        console.error(err);
      }
    );
  }
}


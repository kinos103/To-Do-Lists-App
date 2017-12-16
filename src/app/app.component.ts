import {Component, OnInit} from '@angular/core';
import {MiddlewareService} from './middleware.service';
import {Note} from '../models/Note';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // DON'T FORGET TO PROVIDE YOUR SERVICES
  providers: [MiddlewareService]
})
export class AppComponent implements OnInit {

  //  VARIABLE TO HOLD CURRENT NOTES
  Notes: Note[] = [];
  ShowInput = false;
  CurrentNote = new Note();
  newNote = new Note();

  // INJECT YOUR DEPENDENCIES WHEN YOU CALL YOUR COMPONENT TO THE DOM
  constructor(private middleware: MiddlewareService)  {

  }

  // LOCAL VARIABLE USED WITHIN THE COMPONENT AND ITS TEMPLATE

  // THIS FUNCTION FIRES ONCE THE COMPONENT INITIALIZES IN THE DOM
  ngOnInit()  {
    // RETRIEVE ALL BLOGS FROM SERVER ON START UP
    this.Refresh();
  }

  SubmitNote()  {
    this.newNote.date = Date.now();
    this.middleware.saveNote(this.newNote)
      .subscribe(
        data => {
          console.log(data.message);
          this.Refresh();
          this.newNote = new Note();
          this.ShowInput = false;
        },
        error => {
          console.log(error);
        }
      );
  }

  deleteCurrentNote() {
    this.middleware.deleteNote(this.CurrentNote)
      .subscribe(
        data => {
            this.CurrentNote = this.Notes[0];
            this.Refresh();
        },
        error => {
          console.error(error);
        }
      );
  }

  Refresh() {
    this.middleware.getNotes()
    .subscribe(
        data => {
          this.Notes = [];
          for (const note of data) {
            this.Notes.push(note);
          }
        },
        error => {
          console.error(error);
        }
      );

  }
  // THIS FUNCTION CALLS THE MIDDLEWARE SERVICE AND FIRES AN OBSERVABLE FUNCTION
  // WE SUBSCRIBE TO THE DATA AND ANY ERROR

}


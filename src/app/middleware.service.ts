import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {Note} from "../models/Note";
import {Response, Headers} from "@angular/http";


@Injectable()
export class MiddlewareService {

  // INJECT HTTPCLIENT FOR USE WITHIN THIS SERVICE
  constructor(private http: HttpClient) { }

  saveNote(note: Note)  {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    const body = JSON.stringify(note);
    return this.http.post('http://localhost:3000/saveNote', body, {headers: headers})
      .map((response: Response) => JSON.parse(JSON.stringify(response)))
      .catch((error: Response) => Observable.throw(error.json()));
  }

  deleteNote(note: Note)  {
    return this.http.get('http://localhost:3000/deleteNote/?id=' + note._id)
      .map((response: Response) => JSON.parse(JSON.stringify(response)))
      .catch((error: Response) => Observable.throw(error.json()));
  }

  getNotes() {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json'});
    return this.http.get('http://localhost:3000/getNotes', {headers: headers})
      .map((response: Response) =>  {
        const Notes = JSON.parse(JSON.stringify(response)).result;
        const transNotes: Note[] = [];
        for (const note of Notes)  {
          const _note = new Note(note.title, note.body, note._id, note.date);
          transNotes.push(_note);
        }
        return transNotes;
      })
      .catch((error: Response) => Observable.throw(error.json()));
  }

}



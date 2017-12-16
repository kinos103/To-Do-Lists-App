export class Note {

  _id: string;
  title: string;
  body: string;
  date: number;

  constructor(title?: string, body?: string, _id?: string, date?: number) {
    this.title = title;
    this.body = body;
    this._id = _id;
    this.date = date;
  }

}

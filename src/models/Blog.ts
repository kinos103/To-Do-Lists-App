export class Blog {

  id: string;
  author: string;
  title: string;
  body: string;
  date: number;

  constructor(author: string, title: string, body: string) {
    this.author = author;
    this.title = title;
    this.body = body;
    this.date = Date.now();
  }

}

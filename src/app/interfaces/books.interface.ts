export interface IBooks {
  //     {
  //   "title": "The Theory of Everything",
  //   "author": "Stephen Hawking",
  //   "genre": "SCIENCE",
  //   "isbn": "9780553380163",
  //   "description": "An overview of cosmology and black holes.",
  //   "copies": 5,
  //   "available": true
  // }
  title: string;
  author: string;
  genre:
    | "FANTASY"
    | "BIOGRAPHY"
    | "HISTORY"
    | "SCIENCE"
    | "NON_FICTION"
    | "FICTION";
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
}

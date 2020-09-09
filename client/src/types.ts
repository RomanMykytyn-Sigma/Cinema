export type Film = {
  _id: string;
  name: string;
  coverImage: string;
  description: string;
  director: Array<string>;
  duration: number;
  genre: {
    _id: string,
    name: string
  }[],
  reliseDate: String;
  rating: Array<number>;
  comments: Array<Comment>;
};

export type User = {
  _id: string;
  login: string;
  favorites: Array<string>;
  ratedFilms: Array<string>;
};

export type Comment = {
  _id?: string;
  toFilm:string;
  ownerName: string;
  date: Date;
  text: string;
};
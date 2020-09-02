export type Film  = {
  _id: string;
  name: string,
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
};
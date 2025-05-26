export type Post = {
  id: number;
  title: string;
  body: string;
};

export type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

interface IPostState {}

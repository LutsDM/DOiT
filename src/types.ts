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

export interface IPostState {
  posts: Post[],
  isLoading: boolean,
  error: null | string
  currentPost: Post | null;
}

export interface INewPost {
  title: string,
  body: string;
}
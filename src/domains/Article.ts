export interface ArticlesResponse {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author | null;
  likesCount: number;
  commentsCount: number;
}

export interface ArticleResponse {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author | null;
  comments: Comment[] | [];
  likesCount: number;
  isLikedByUser: boolean;
}

export interface ArticleCreateResponse {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ArticleUpdateResponse {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author | null;
  comments: Comment[] | [];
  likesCount: number;
}

export interface Author {
  id: string;
  email: string;
  name: string;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

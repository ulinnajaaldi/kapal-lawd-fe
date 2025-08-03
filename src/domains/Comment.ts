export interface CommentsResponse {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  author: Author;
}

export interface CommentResponse {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
  article: Article;
  author: Author;
}

export interface CommentCreateResponse {
  id: string;
  content: string;
  articleId: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
}

export interface Author {
  id: string;
  email: string;
  name: string;
}

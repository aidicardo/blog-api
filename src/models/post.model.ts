export interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export class PostModel implements Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;

  constructor({ id, title, content, createdAt = new Date(), updatedAt = new Date() }: Omit<Post, 'createdAt' | 'updatedAt'> & Partial<Pick<Post, 'createdAt' | 'updatedAt'>>) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

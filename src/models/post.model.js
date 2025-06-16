export class Post {
  constructor({ id, title, content, createdAt = new Date(), updatedAt = new Date() }) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

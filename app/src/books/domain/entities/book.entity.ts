export class Book {
  constructor(
    public readonly id: string,
    public readonly isbn: string,
    public readonly title: string,
    public readonly author: string,
    public readonly price: number,
    public readonly category: string,
    public readonly cover: string,
    public readonly url: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {}
}

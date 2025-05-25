import { authors, books } from "./data.js";
import { v4 as uuid } from "uuid";

export const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find((book) => book.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find((author) => author.id === id),
  },

  Mutation: {
    createBook: (_, { authorId, title, releaseYear }) => {
      const newBook = {
        id: uuid(),
        authorId,
        title,
        releaseYear,
      };
      books.push(newBook);
      return newBook;
    },

    updateBook: (_, { id, authorId, title, releaseYear }) => {
      const book = books.find((book) => book.id === id);
      if (!book) return null;
      if (authorId !== undefined) book.authorId = authorId;
      if (title !== undefined) book.title = title;
      if (releaseYear !== undefined) book.releaseYear = releaseYear;
      return book;
    },

    deleteBook: (_, { id }) => {
      const index = books.findIndex((book) => book.id === id);
      if (index === -1) return { message: "Book not found" };
      books.splice(index, 1);
      return { message: "Book deleted successfully" };
    },
  },

  Book: {
    author: (book) => authors.find((author) => author.id === book.authorId),
  },

  Author: {
    books: (author) => books.filter((book) => book.authorId === author.id),
  },
};

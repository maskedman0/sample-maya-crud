import { BookController } from "./controllers/book/book.controller";

export const routes = [
  {
    controllers: [BookController],
    middlewares: [],
    path: "/api/v1",
  },
];
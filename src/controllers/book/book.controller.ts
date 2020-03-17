import { Get, Patch, Post, Delete, Put } from "@mayajs/common";
import { Request, Response, NextFunction } from "express";
import { Controller } from "@mayajs/core";
import { BookService } from "./book.service";
import { IBook } from "./dto/book.interface";
import { CREATED, OK, NOT_FOUND, UNPROCESSABLE_ENTITY } from "http-status";

@Controller({
  model: "./book.model",
  route: "/books"
})
export class BookController {
  constructor(private bookService: BookService) { }

  @Post({
    path: "/"
  })
  async add(req: Request, res: Response) {

    const createdBook = await this.bookService.create(req.body as IBook);
    if (!createdBook) {
      res.status(UNPROCESSABLE_ENTITY).send('Invalid book object.').end();
      return;
    }

    res.status(CREATED).send(createdBook).end();
  }

  @Get({
    path: "/"
  })
  async list(req: Request, res: Response) {

    const books = await this.bookService.list();

    res.status(OK).send(books).end();
  }

  @Get({
    path: "/query"
  })
  async find(req: Request, res: Response) {

    const books = await this.bookService.find(req.query);

    res.status(OK).send(books).end();
  }

  @Get({
    path: "/:id"
  })
  async findById(req: Request, res: Response) {

    const book = await this.bookService.findOne({ _id: req.params.id });
    if (!book) {
      res.status(NOT_FOUND).send('Book not found.').end();
      return;
    }

    res.status(OK).send(book).end();
  }

  @Put({
    path: '/:id'
  })
  async update(req: Request, res: Response) {
    const updatedBook = await this.bookService.update(req.params.id, req.body);
    if (!updatedBook) {
      res.status(NOT_FOUND).send('Book not found.').end();
      return;
    }

    res.status(OK).send(updatedBook).end();
  }

  @Delete({
    path: '/:id'
  })
  async delete(req: Request, res: Response) {
    try {

      const deletedBook = await this.bookService.delete(req.params.id);

      if (!deletedBook) {
        res.status(NOT_FOUND).send('Book not found.').end();
        return;
      }

      res.status(OK).send(deletedBook).end();

    } catch (error) {
      throw new Error(error.message);
    }
  }
}

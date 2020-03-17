import { Injectable } from "@mayajs/core";
import { Models } from "@mayajs/mongo";
import { IBookModel, IBook } from "./dto/book.interface";
import { Model } from "mongoose";

@Injectable()
export class BookService {

   @Models("books") bookModel: Model<IBookModel>;

   async create(book: IBook): Promise<IBook> {
      try {

         return await (
            await this.bookModel.create(book)
         ).save();

      } catch (error) {
         return error;
      }
   }

   async list(): Promise<IBook[]> {
      try {

         return await this.bookModel.find().exec();

      } catch (error) {
         throw new Error(error.message)
      }
   }

   async find(query: any): Promise<IBook[]> {
      try {

         return await this.bookModel.find(query).exec();

      } catch (error) {
         throw new Error(error.message)
      }
   }

   async findOne(query: any): Promise<IBook> {
      try {

         return await this.bookModel.findOne(query).exec();

      } catch (error) {
         throw new Error(error.message)
      }
   }

   async update(id: string, book: IBook): Promise<IBook> {
      try {

         return await this.bookModel.findByIdAndUpdate(id, { $set: book }, { new: true, runValidators: true }).exec();

      } catch (error) {
         throw new Error(error.message);
      }
   }

   async delete(id: string): Promise<IBook> {
      try {

         return await this.bookModel.findByIdAndDelete(id).exec();

      } catch (error) {
         throw new Error(BookService.name + error.message);
      }
   }

}
import { Document } from "mongoose";

export interface IBook {
    readonly title: string;
    readonly author: string;
}

export interface IBookModel extends IBook, Document { }
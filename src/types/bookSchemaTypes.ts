export interface bookSchema {
  title: string;
  author: string;
  category: string;
  publish_year: number;
  rating: number;
  lib_book_id: string;
  language: string;
  pages: number;
  cover?: string;
}

export interface addbookSchema {
  title: string;
  author: string;
  category: string;
  publish_year: number;
  rating: number;
  language: string;
  pages: number;
  cover?: string;
}

export interface updatebookSchema {
  title: string;
  author: string;
  category: string;
  publish_year: number;
  rating: number;
  lib_book_id: string;
  language: string;
  pages: number;
  cover?: string;
}

export interface dbBookResponse {
  book_id: string;
  title: string;
  author: string;
  category: string;
  availablity: boolean;
  publish_year: number;
  rating: number;
  lib_book_id: string;
  language: string;
  pages: number;
  cover: string;
  created_at: Date;
  updated_at: Date;
}

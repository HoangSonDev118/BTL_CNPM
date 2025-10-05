export type BookImage = {
  id: string;
  url: string;
  alt: string | null;
  order: number;
};

export type BookAuthor = {
  id: string;
  name: string;
  slug: string;
  avatar?: string | null;
};

export type BookCategory = {
  id: string;
  name: string;
  slug: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  originalPrice?: string | null;
  discount?: number;
  stock: number;
  publishYear?: number | null;
  publisher?: string | null;
  pages?: number | null;
  language: string;
  isbn?: string | null;
  coverImage: string | null;
  isFeatured: boolean;
  viewCount: number;
  soldCount: number;
  author: BookAuthor;
  category: BookCategory;
  images: BookImage[];
  createdAt?: string;
  updatedAt?: string;
};

export type ShowcaseData = {
  featured: Book[];
  bestseller: Book[];
  promotion: Book[];
};

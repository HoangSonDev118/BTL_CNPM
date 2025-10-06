export type Book = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  discount?: number;
  stock: number;
  publishYear: number | null;
  publisher: string | null;
  pages: number | null;
  language: string;
  isbn: string | null;
  coverImage: string | null;
  isActive: boolean;
  isFeatured: boolean;
  viewCount: number;
  soldCount: number;
  author: {
    id: string;
    name: string;
    slug: string;
    avatar?: string | null;
    biography?: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
  };
  images: Array<{
    id: string;
    url: string;
    alt: string | null;
    order: number;
  }>;
  createdAt: string;
  updatedAt: string;
};

export type ShowcaseData = {
  featured: Book[];
  bestseller: Book[];
  promotion: Book[];
};

export type BooksResponse = {
  success: boolean;
  books: Book[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories?: Array<{
    id: string;
    name: string;
    slug: string;
  }>;
};

export type BookDetailResponse = {
  success: boolean;
  book: Book;
};
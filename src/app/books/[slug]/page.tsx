"use client";

import { use, useEffect, useState } from "react";
import ButtonComponent from "@/components/ButtonComponent";
import { Breadcrumb, Carousel, Image, InputNumber, Rate, Spin, message } from "antd";
import type { InputNumberProps } from "antd";

type Book = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  stock: number;
  publishYear: number | null;
  publisher: string | null;
  pages: number | null;
  language: string;
  isbn: string | null;
  coverImage: string | null;
  isFeatured: boolean;
  viewCount: number;
  soldCount: number;
  author: {
    id: string;
    name: string;
    slug: string;
    avatar: string | null;
  };
  category: {
    id: string;
    name: string;
    slug: string;
  };
  images: Array<{
    id: string;
    url: string;
    alt: string | null;
    order: number;
  }>;
};

type BookDetailResponse = {
  success: boolean;
  book: Book;
};

const formatPrice = (price: string) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(parseFloat(price));
};

const calculateRating = (soldCount: number, viewCount: number) => {
  const baseRating = 4.0;
  const soldFactor = Math.min(soldCount / 100, 0.8);
  const viewFactor = Math.min(viewCount / 1000, 0.2);
  return Math.min(baseRating + soldFactor + viewFactor, 5.0);
};

const calculateDiscount = (price: string, originalPrice: string) => {
  return Math.round(
    ((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100
  );
};

export default function BookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Unwrap params promise
  const { slug } = use(params);

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/books/${slug}`);

        if (!response.ok) {
          throw new Error("Failed to fetch book");
        }

        const data: BookDetailResponse = await response.json();

        if (data.success) {
          setBook(data.book);
          setSelectedImage(data.book.coverImage);
        }
      } catch (error) {
        console.error("Error fetching book:", error);
        message.error("Không thể tải thông tin sách");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchBook();
    }
  }, [slug]);

  const handleQuantityChange: InputNumberProps["onChange"] = (value) => {
    setQuantity(value as number);
  };

  const handleAddToCart = () => {
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    message.info("Chuyển đến trang thanh toán");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải thông tin sách..." />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Không tìm thấy sách</h2>
          <a href="/books" className="text-blue-500 hover:underline">
            Quay lại danh sách sách
          </a>
        </div>
      </div>
    );
  }

  const rating = calculateRating(book.soldCount, book.viewCount);
  const discount = book.originalPrice
    ? calculateDiscount(book.price, book.originalPrice)
    : 0;

  const allImages = [
    book.coverImage,
    ...book.images.sort((a, b) => a.order - b.order).map((img) => img.url),
  ].filter(Boolean) as string[];

  return (
    <div>
      <section className="text-[white] flex flex-col gap-5 justify-center items-center w-full h-35 m-auto bg-[url('/assets/bg5.png')] bg-[#9ac9db] bg-bottom bg-repeat-x">
        <div className="text-2xl text-center px-4">{book.title}</div>
        <Breadcrumb
          items={[
            { title: <a href="/">Home</a> },
            { title: <a href="/books">Danh mục sách</a> },
            { title: <a href={`/books?category=${book.category.slug}`}>{book.category.name}</a> },
            { title: book.title },
          ]}
        />
      </section>

      <section className="shadow-2xl rounded-[5px] max-w-[1200px] m-auto p-8 mt-10 bg-white">
        <div className="flex flex-col lg:flex-row m-auto gap-10">
          <div className="flex-3">
            <div className="mb-6">
              <Image
                width="100%"
                src={selectedImage || book.coverImage || "https://via.placeholder.com/600"}
                alt={book.title}
                className="rounded-lg"
              />
            </div>

            {allImages.length > 1 && (
              <div className="max-w-[650px] m-auto mt-9">
                <Carousel
                  infinite
                  slidesToShow={Math.min(5, allImages.length)}
                  dots={false}
                  draggable
                  swipeToSlide
                >
                  {allImages.map((img, index) => (
                    <div key={index} className="px-3">
                      <div
                        onClick={() => setSelectedImage(img)}
                        className={`cursor-pointer border-2 rounded-lg overflow-hidden transition-all ${
                          selectedImage === img ? "border-blue-500" : "border-gray-200"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${book.title} - Ảnh ${index + 1}`}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
              </div>
            )}
          </div>

          <div className="flex-2">
            <h1 className="text-3xl font-bold mb-4">{book.title}</h1>

            <div className="flex items-end gap-3 mb-4">
              {book.originalPrice && (
                <h2 className="text-[20px] text-[#a4a4a4] line-through">
                  {formatPrice(book.originalPrice)}
                </h2>
              )}
              <h2 className="text-[28px] text-[#FF6A00] font-bold">
                {formatPrice(book.price)}
              </h2>
              {discount > 0 && (
                <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  -{discount}%
                </span>
              )}
            </div>

            <div className="mb-4">
              <Rate disabled defaultValue={rating} allowHalf />
              <span className="ml-2 text-gray-600">
                ({book.soldCount} đã bán | {book.viewCount} lượt xem)
              </span>
            </div>

            <div className="mb-6">
              <span className="font-semibold">Tình trạng: </span>
              <span className={book.stock > 0 ? "text-green-600" : "text-red-600"}>
                {book.stock > 0 ? `Còn ${book.stock} sản phẩm` : "Hết hàng"}
              </span>
            </div>

            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold text-lg mb-3">Thông tin sách</h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="font-semibold">Tác giả:</span> {book.author.name}
                </p>
                <p>
                  <span className="font-semibold">Danh mục:</span> {book.category.name}
                </p>
                {book.publisher && (
                  <p>
                    <span className="font-semibold">Nhà xuất bản:</span> {book.publisher}
                  </p>
                )}
                {book.publishYear && (
                  <p>
                    <span className="font-semibold">Năm xuất bản:</span> {book.publishYear}
                  </p>
                )}
                {book.pages && (
                  <p>
                    <span className="font-semibold">Số trang:</span> {book.pages}
                  </p>
                )}
                {book.isbn && (
                  <p>
                    <span className="font-semibold">ISBN:</span> {book.isbn}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Ngôn ngữ:</span>{" "}
                  {book.language === "vi" ? "Tiếng Việt" : "Tiếng Anh"}
                </p>
              </div>
            </div>

            {book.description && (
              <div className="mb-6">
                <h3 className="font-bold text-lg mb-3">Mô tả sản phẩm</h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {book.description}
                </p>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Số lượng</h3>
              <InputNumber
                size="large"
                min={1}
                max={book.stock}
                defaultValue={1}
                value={quantity}
                onChange={handleQuantityChange}
                disabled={book.stock === 0}
              />
            </div>

            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <ButtonComponent
                  content="Thêm vào giỏ hàng"
                  type="secondary"
                  onClick={handleAddToCart}
                  disabled={book.stock === 0}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <ButtonComponent
                  content="Mua ngay"
                  type="primary"
                  onClick={handleBuyNow}
                  disabled={book.stock === 0}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
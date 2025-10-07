"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ButtonComponent from "@/components/ButtonComponent";
import { Breadcrumb, Carousel, Image, InputNumber, Rate, Spin, Tabs, message } from "antd";
import type { InputNumberProps } from "antd";
import { useAuth } from "@/contexts/AuthContext";

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

type Review = {
  id: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
};

type ReviewsResponse = {
  success: boolean;
  reviews: Review[];
  stats: {
    total: number;
    averageRating: number;
  };
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
  const { slug } = use(params);
  const router = useRouter();
  const { user } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("description");
  
  // Review states
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  // Related books
  const [relatedBooks, setRelatedBooks] = useState<Book[]>([]);
  const [loadingRelated, setLoadingRelated] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewStats, setReviewStats] = useState({ total: 0, averageRating: 0 });
  const [userReview, setUserReview] = useState<Review | null>(null);

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
          
          fetchRelatedBooks(data.book.category.slug, data.book.id);
          fetchReviews();
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

  useEffect(() => {
    if (user) {
      fetchReviews();
    } else {
      setUserReview(null);
    }
  }, [user]);


  const fetchRelatedBooks = async (categorySlug: string, currentBookId: string) => {
    try {
      setLoadingRelated(true);
      const response = await fetch(`/api/books?category=${categorySlug}&limit=8`);

      if (!response.ok) {
        throw new Error("Failed to fetch related books");
      }

      const data = await response.json();

      if (data.success) {
        // Filter out current book
        const filtered = data.books.filter((b: Book) => b.id !== currentBookId);
        setRelatedBooks(filtered.slice(0, 8));
      }
    } catch (error) {
      console.error("Error fetching related books:", error);
    } finally {
      setLoadingRelated(false);
    }
  };
  const fetchReviews = async () => {
    try {
      const response = await fetch(`/api/books/${slug}/reviews`);
      const data: ReviewsResponse = await response.json();
      
      if (data.success) {
        setReviews(data.reviews);
        setReviewStats(data.stats);
        
        // Tìm review của user hiện tại
        if (user) {
          const currentUserReview = data.reviews.find(r => r.user.id === user.id);
          setUserReview(currentUserReview || null);
        }
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const handleQuantityChange: InputNumberProps["onChange"] = (value) => {
    setQuantity(value as number);
  };

  const handleAddToCart = () => {
    message.success(`Đã thêm ${quantity} sản phẩm vào giỏ hàng`);
  };

  const handleBuyNow = () => {
    message.info("Chuyển đến trang thanh toán");
  };

  const handleSubmitReview = async () => {
    if (!user) {
      router.push("/auth/login");
      return;
    }

    // Kiểm tra nếu user đã review rồi
    if (userReview) {
      message.warning({
        content: "Mỗi khách hàng chỉ có thể đánh giá 1 lần, vui lòng xoá hoặc chỉnh sửa đánh giá trước của bạn",
        duration: 5,
      });
      return;
    }

    if (reviewRating === 0) {
      message.warning("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!reviewText.trim()) {
      message.warning("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      setSubmittingReview(true);
      
      const response = await fetch(`/api/books/${slug}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          rating: reviewRating, 
          comment: reviewText
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể gửi đánh giá");
      }

      if (data.success) {
        message.success("Cảm ơn bạn đã đánh giá!");
        setReviewRating(0);
        setReviewText("");
        await fetchReviews();
      } else {
        throw new Error(data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      message.error(error instanceof Error ? error.message : "Không thể gửi đánh giá. Vui lòng thử lại.");
    } finally {
      setSubmittingReview(false);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải thông tin sách..." />
      </div>
    );
  }

  const handleEditReview = async () => {
    if (!user || !userReview) return;

    if (reviewRating === 0) {
      message.warning("Vui lòng chọn số sao đánh giá");
      return;
    }

    if (!reviewText.trim()) {
      message.warning("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      setSubmittingReview(true);
      
      const response = await fetch(`/api/books/${slug}/reviews?reviewId=${userReview.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          rating: reviewRating, 
          comment: reviewText
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể cập nhật đánh giá");
      }

      if (data.success) {
        message.success("Đã cập nhật đánh giá của bạn!");
        setReviewRating(0);
        setReviewText("");
        await fetchReviews();
      }
    } catch (error) {
      console.error("Error editing review:", error);
      message.error(error instanceof Error ? error.message : "Không thể cập nhật đánh giá.");
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleDeleteReview = async () => {
    if (!user || !userReview) return;

    try {
      const response = await fetch(`/api/books/${slug}/reviews?reviewId=${userReview.id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Không thể xoá đánh giá");
      }

      if (data.success) {
        message.success("Đã xoá đánh giá của bạn!");
        setReviewRating(0);
        setReviewText("");
        await fetchReviews();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      message.error(error instanceof Error ? error.message : "Không thể xoá đánh giá.");
    }
  };

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

  const formatRelatedPrice = (price: string) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(parseFloat(price));
  };

  const calculateRelatedDiscount = (price: string, originalPrice: string) => {
    return Math.round(
      ((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100
    );
  };

  const tabItems = [
    {
      key: "description",
      label: "Mô tả sản phẩm",
      children: (
        <div className="py-6">
          {book.description ? (
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {book.description}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic">Chưa có mô tả cho sản phẩm này.</p>
          )}
        </div>
      ),
    },
    {
      key: "reviews",
      label: "Đánh giá",
      children: (
        <div className="py-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">
              {userReview ? "Chỉnh sửa đánh giá của bạn" : "Đánh giá của bạn"}
            </h3>
            
            {userReview && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  ℹ️ Bạn đã đánh giá sản phẩm này rồi. Bạn có thể chỉnh sửa hoặc xoá đánh giá của mình.
                </p>
                <button
                  onClick={() => {
                    setReviewRating(userReview.rating);
                    setReviewText(userReview.comment);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  📝 Tải đánh giá hiện tại để chỉnh sửa
                </button>
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Đánh giá của bạn về sản phẩm này:
              </label>
              <Rate
                value={reviewRating}
                onChange={setReviewRating}
                style={{ fontSize: 32 }}
                disabled={!user}
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2 font-medium">
                Nhận xét của bạn:
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder={user ? "Chia sẻ trải nghiệm của bạn về cuốn sách này..." : "Vui lòng đăng nhập để đánh giá"}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                rows={5}
                disabled={!user}
              />
            </div>

            <div className="flex gap-3">
              {user ? (
                <>
                  {userReview ? (
                    <>
                      <ButtonComponent
                        content="Cập nhật đánh giá"
                        type="primary"
                        onClick={handleEditReview}
                        disabled={submittingReview || reviewRating === 0 || !reviewText.trim()}
                      />
                      <ButtonComponent
                        content="Xoá đánh giá"
                        type="secondary"
                        onClick={() => {
                          if (window.confirm("Bạn có chắc chắn muốn xoá đánh giá này?")) {
                            handleDeleteReview();
                          }
                        }}
                      />
                    </>
                  ) : (
                    <ButtonComponent
                      content="Gửi đánh giá"
                      type="primary"
                      onClick={handleSubmitReview}
                      disabled={submittingReview || reviewRating === 0 || !reviewText.trim()}
                    />
                  )}
                </>
              ) : (
                <ButtonComponent
                  content="Đăng nhập để đánh giá"
                  type="primary"
                  onClick={() => router.push("/auth/login")}
                />
              )}
            </div>
          </div>

          <div className="border-t pt-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Đánh giá từ khách hàng</h3>
              {reviewStats.total > 0 && (
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Rate disabled value={reviewStats.averageRating} allowHalf className="text-lg" />
                    <span className="font-semibold text-lg text-gray-800">
                      {reviewStats.averageRating}
                    </span>
                  </div>
                  <span>•</span>
                  <span>{reviewStats.total} đánh giá</span>
                </div>
              )}
            </div>
            
            {reviews.length > 0 ? (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div 
                    key={review.id} 
                    className="bg-gray-50 rounded-lg p-5 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {/* Avatar placeholder */}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-lg">
                          {review.user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-800">
                            {review.user.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </div>
                        </div>
                      </div>
                      <Rate disabled value={review.rating} className="text-base" />
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-lg">
                <div className="text-gray-400 mb-2">
                  <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <p className="text-gray-500 font-medium">Chưa có đánh giá nào</p>
                <p className="text-gray-400 text-sm mt-1">Hãy là người đầu tiên đánh giá sản phẩm này!</p>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

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

      {/* Tabs Section for Description and Reviews */}
      <section className="shadow-2xl rounded-[5px] max-w-[1200px] m-auto p-8 mt-6 bg-white mb-10">
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={tabItems}
          size="large"
        />
      </section>

      {/* Related Books Section */}
      <section className="max-w-[1200px] m-auto px-8 mb-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Sản phẩm cùng loại</h2>
          <p className="text-gray-600">
            Các sản phẩm khác trong danh mục{" "}
            <span className="font-semibold text-blue-600">{book.category.name}</span>
          </p>
        </div>

        {loadingRelated ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" tip="Đang tải sản phẩm liên quan..." />
          </div>
        ) : relatedBooks.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedBooks.map((relatedBook) => {
              const relatedDiscount = relatedBook.originalPrice
                ? calculateRelatedDiscount(relatedBook.price, relatedBook.originalPrice)
                : 0;

              return (
                <a
                  key={relatedBook.id}
                  href={`/books/${relatedBook.slug}`}
                  className="group bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedBook.coverImage || "https://via.placeholder.com/300x400"}
                      alt={relatedBook.title}
                      className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {relatedDiscount > 0 && (
                      <span className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        -{relatedDiscount}%
                      </span>
                    )}
                    {relatedBook.stock === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white text-lg font-bold">Hết hàng</span>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[3rem]">
                      {relatedBook.title}
                    </h3>

                    <p className="text-sm text-gray-500 mb-2">
                      {relatedBook.author.name}
                    </p>

                    <div className="flex items-end gap-2 mb-2">
                      {relatedBook.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          {formatRelatedPrice(relatedBook.originalPrice)}
                        </span>
                      )}
                      <span className="text-lg font-bold text-red-600">
                        {formatRelatedPrice(relatedBook.price)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Rate disabled defaultValue={calculateRating(relatedBook.soldCount, relatedBook.viewCount)} allowHalf className="text-sm" />
                      <span className="text-xs text-gray-500">
                        ({relatedBook.soldCount} đã bán)
                      </span>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            Không có sản phẩm cùng loại
          </div>
        )}

        {relatedBooks.length > 0 && (
          <div className="flex justify-center mt-8">
            <a href={`/books?category=${book.category.slug}`}>
              <ButtonComponent
                content="Xem tất cả sản phẩm trong danh mục"
                type="primary"
              />
            </a>
          </div>
        )}
      </section>
    </div>
  );
}
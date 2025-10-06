"use client";

import { useEffect, useState, useRef } from "react";
import { Carousel, Spin, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faStar, faFire, faTrophy, faHeart } from "@fortawesome/free-solid-svg-icons";
import { CarouselRef } from "antd/es/carousel";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import type { Book, ShowcaseData } from "@/types/book";

export default function HomePage() {
  const [showcaseData, setShowcaseData] = useState<ShowcaseData | null>(null);
  const [loading, setLoading] = useState(true);

  // Banner carousel
  const bannerCarouselRef = useRef<CarouselRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Product carousels
  const featuredCarouselRef = useRef<CarouselRef | null>(null);
  const bestsellerCarouselRef = useRef<CarouselRef | null>(null);
  const promotionCarouselRef = useRef<CarouselRef | null>(null);

  // Auto-change banner every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4); // 4 banners
      bannerCarouselRef.current?.next();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchShowcaseData();
  }, []);

  const fetchShowcaseData = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/books/showcase");
      
      if (!response.ok) {
        throw new Error("Failed to fetch showcase data");
      }

      const result = await response.json();
      
      if (result.success) {
        setShowcaseData(result.data);
      }
    } catch (error) {
      console.error("Error fetching showcase:", error);
      message.error("Không thể tải dữ liệu trang chủ");
    } finally {
      setLoading(false);
    }
  };

  const bookToProductCard = (book: Book) => {
    const formatPrice = (price: string) => {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(parseFloat(price));
    };

    const accentMap: Record<string, any> = {
      "sach-thieu-nhi": "sky",
      "van-hoc": "rose",
      "kinh-te": "amber",
      "ky-nang-song": "emerald",
      "khoa-hoc-cong-nghe": "sky",
    };

    const calculateRating = () => {
      const baseRating = 4.0;
      const soldFactor = Math.min(book.soldCount / 100, 0.8);
      const viewFactor = Math.min(book.viewCount / 1000, 0.2);
      return Math.min(baseRating + soldFactor + viewFactor, 5.0);
    };

    let tag = undefined;
    if (book.isFeatured) tag = "Nổi bật";
    else if (book.soldCount > 50) tag = "Bán chạy";
    else if (book.discount && book.discount > 20) tag = "Giảm giá";

    return {
      id: book.id,
      title: book.title,
      slug: book.slug,
      image: book.coverImage || "https://via.placeholder.com/400x600?text=No+Image",
      price: formatPrice(book.price),
      originalPrice: book.originalPrice ? formatPrice(book.originalPrice) : undefined,
      tag,
      accent: accentMap[book.category.slug] || "sky",
      rating: parseFloat(calculateRating().toFixed(1)),
    };
  };

  const handleBannerPrev = () => {
    bannerCarouselRef.current?.prev();
  };

  const handleBannerNext = () => {
    bannerCarouselRef.current?.next();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-sky-50 via-purple-50 to-pink-50">
        <div className="text-center">
          <Spin size="large" />
          <p className="mt-4 text-lg font-bold text-slate-700">Đang tải nội dung...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center overflow-hidden">
      {/* Advanced Floating Decorations - THÊM VÀO SAU PHẦN Floating Decorations CŨ */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {/* Bóng bay bay lơ lửng */}
        <div className="absolute top-20 left-10 w-16 h-20 animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }}>
          🎈
        </div>
        <div className="absolute top-40 right-20 w-16 h-20 animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }}>
          🎈
        </div>
        <div className="absolute bottom-40 left-1/4 w-16 h-20 animate-float" style={{ animationDelay: '4s', animationDuration: '8s' }}>
          🎈
        </div>
        <div className="absolute top-1/3 right-1/4 w-16 h-20 animate-float" style={{ animationDelay: '1s', animationDuration: '9s' }}>
          🎈
        </div>
        <div className="absolute bottom-1/4 right-1/3 w-16 h-20 animate-float" style={{ animationDelay: '3s', animationDuration: '7.5s' }}>
          🎈
        </div>

        {/* Hoa rơi từ trên xuống + xoay tròn */}
        <div className="absolute -top-10 left-1/4 text-4xl animate-fall-rotate" style={{ animationDelay: '0s', animationDuration: '10s' }}>
          🌸
        </div>
        <div className="absolute -top-10 left-1/2 text-3xl animate-fall-rotate" style={{ animationDelay: '2s', animationDuration: '12s' }}>
          🌺
        </div>
        <div className="absolute -top-10 left-3/4 text-4xl animate-fall-rotate" style={{ animationDelay: '4s', animationDuration: '11s' }}>
          🌼
        </div>
        <div className="absolute -top-10 left-1/3 text-3xl animate-fall-rotate" style={{ animationDelay: '6s', animationDuration: '13s' }}>
          🌻
        </div>
        <div className="absolute -top-10 left-2/3 text-4xl animate-fall-rotate" style={{ animationDelay: '8s', animationDuration: '10s' }}>
          🌷
        </div>

        {/* Sao lấp lánh */}
        <div className="absolute top-1/4 left-20 text-3xl animate-twinkle" style={{ animationDelay: '0s' }}>
          ⭐
        </div>
        <div className="absolute top-1/3 right-32 text-2xl animate-twinkle" style={{ animationDelay: '1s' }}>
          ✨
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-3xl animate-twinkle" style={{ animationDelay: '2s' }}>
          🌟
        </div>
        <div className="absolute bottom-1/4 right-1/4 text-2xl animate-twinkle" style={{ animationDelay: '1.5s' }}>
          💫
        </div>

        {/* Bướm bay lượn */}
        <div className="absolute top-1/2 left-10 text-4xl animate-butterfly" style={{ animationDelay: '0s', animationDuration: '15s' }}>
          🦋
        </div>
        <div className="absolute top-1/3 right-10 text-3xl animate-butterfly" style={{ animationDelay: '5s', animationDuration: '18s' }}>
          🦋
        </div>

        {/* Mây trôi */}
        <div className="absolute top-20 right-0 text-6xl animate-cloud" style={{ animationDelay: '0s', animationDuration: '30s' }}>
          ☁️
        </div>
        <div className="absolute top-40 right-0 text-5xl animate-cloud" style={{ animationDelay: '10s', animationDuration: '35s' }}>
          ☁️
        </div>
        <div className="absolute top-60 right-0 text-4xl animate-cloud" style={{ animationDelay: '20s', animationDuration: '40s' }}>
          ☁️
        </div>
      </div>

      {/* CSS Animations - THÊM VÀO CUỐI FILE, TRONG <style> TAG */}
      <style jsx>{`
        /* Bóng bay bay lơ lửng lên xuống */
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(10px); }
          50% { transform: translateY(-60px) translateX(-10px); }
          75% { transform: translateY(-30px) translateX(10px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        /* Hoa rơi + xoay tròn */
        @keyframes fall-rotate {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0.3;
          }
        }
        .animate-fall-rotate {
          animation: fall-rotate 10s linear infinite;
        }

        /* Sao lấp lánh */
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        .animate-twinkle {
          animation: twinkle 2s ease-in-out infinite;
        }

        /* Bướm bay lượn theo đường cong */
        @keyframes butterfly {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(100px, -50px) rotate(10deg);
          }
          50% {
            transform: translate(200px, 0) rotate(-10deg);
          }
          75% {
            transform: translate(300px, -30px) rotate(5deg);
          }
          100% {
            transform: translate(400px, 0) rotate(0deg);
          }
        }
        .animate-butterfly {
          animation: butterfly 15s ease-in-out infinite;
        }

        /* Mây trôi từ phải sang trái */
        @keyframes cloud {
          0% {
            transform: translateX(100vw);
            opacity: 0.7;
          }
          100% {
            transform: translateX(-200px);
            opacity: 0.3;
          }
        }
        .animate-cloud {
          animation: cloud 30s linear infinite;
        }
      `}</style>

      {/* Hero Banner Carousel */}
      <section className="max-w-[1200px] w-full relative mb-10 z-10">
        <Carousel 
          ref={bannerCarouselRef}
          draggable 
          swipeToSlide 
          autoplay 
          autoplaySpeed={6000}
          beforeChange={(current, next) => setActiveIndex(next)}
        >
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250523_CpU3AO5i.gif?v=1747974773" 
              alt="Banner 1"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250520_u0tk6AVL.gif?v=1747711112" 
              alt="Banner 2"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250107_HRZhQmSo.gif?v=1736241946" 
              alt="Banner 3"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20240717_vdHNhklV.gif?v=1721205944" 
              alt="Banner 4"
              className="w-full h-auto rounded-3xl shadow-2xl"
            />
          </div>
        </Carousel>

        {/* Navigation Arrows */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-white hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-500 hover:text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
          onClick={handleBannerPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white hover:bg-gradient-to-r hover:from-sky-400 hover:to-blue-500 hover:text-white rounded-full w-14 h-14 flex items-center justify-center shadow-2xl transition-all transform hover:scale-110"
          onClick={handleBannerNext}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                bannerCarouselRef.current?.goTo(index);
              }}
              className={`h-3 rounded-full transition-all shadow-lg ${
                activeIndex === index 
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 w-10' 
                  : 'bg-white/70 hover:bg-white w-3'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Welcome Section */}
      <section className="max-w-[1200px] w-full py-12 px-6 z-10">
        <div className="text-center bg-gradient-to-r from-sky-100 via-purple-100 to-pink-100 rounded-3xl p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-300 rounded-full opacity-20 -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-300 rounded-full opacity-20 translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              ✨ Chào mừng đến với Enfants Books ✨
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 font-medium">
              Nơi nâng tầm tri thức cho trẻ từ <span className="text-sky-600 font-bold">0 - 12 tuổi</span>
            </p>
          </div>
        </div>
      </section>

      {/* Featured Books Section - THIẾT KẾ NỔI BẬT */}
      {showcaseData?.featured && showcaseData.featured.length > 0 && (
        <section className="w-full py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
                    {/* Decorative Elements */}
          <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-30 blur-3xl"></div>

                    {/* Hiệu ứng động cho Featured */}
          <div className="absolute top-20 left-1/4 text-5xl animate-bounce-slow">🏆</div>
          <div className="absolute top-1/3 right-1/4 text-4xl animate-float" style={{ animationDelay: '1s', animationDuration: '5s' }}>👑</div>
          <div className="absolute bottom-1/3 left-1/3 text-4xl animate-spin-slow">✨</div>
          <div className="absolute bottom-1/4 right-1/3 text-5xl animate-pulse-custom">🌟</div>

                    {/* Vương miện rơi */}
          <div className="absolute -top-10 left-1/5 text-4xl animate-fall-rotate" style={{ animationDelay: '0s', animationDuration: '8s' }}>👑</div>
          <div className="absolute -top-10 left-2/5 text-3xl animate-fall-rotate" style={{ animationDelay: '3s', animationDuration: '10s' }}>👑</div>
          <div className="absolute -top-10 left-3/5 text-4xl animate-fall-rotate" style={{ animationDelay: '6s', animationDuration: '9s' }}>👑</div>

                    {/* Sao bay ngang */}
          <div className="absolute top-1/4 -left-10 text-4xl animate-star-fly">⭐</div>
          <div className="absolute top-1/2 -left-10 text-3xl animate-star-fly" style={{ animationDelay: '3s' }}>🌟</div>
                    {/* Floating Stars */}
          <div className="absolute top-20 right-1/4 text-yellow-400 text-3xl animate-pulse">⭐</div>
          <div className="absolute bottom-40 left-1/4 text-orange-400 text-2xl animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>
          <div className="absolute top-1/2 right-20 text-amber-400 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-all">
                <FontAwesomeIcon icon={faStar} className="mr-2 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="font-bold text-lg">BEST OF THE BEST</span>
                <FontAwesomeIcon icon={faStar} className="ml-2 animate-spin" style={{ animationDuration: '3s' }} />
              </div>
              
              <h2 className="text-5xl font-bold mb-4 relative inline-block">
                <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-yellow-600 bg-clip-text text-transparent">
                  🏆 Sản phẩm nổi bật 🏆
                </span>
              </h2>
              
              <p className="text-xl text-slate-700 font-medium">
                Những cuốn sách được yêu thích nhất bởi các bậc phụ huynh
              </p>
              
              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-amber-400 rounded"></div>
                <FontAwesomeIcon icon={faHeart} className="text-orange-500 text-2xl animate-pulse" />
                <div className="w-20 h-1 bg-gradient-to-l from-transparent to-amber-400 rounded"></div>
              </div>
            </div>

            {/* Cards with special border */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {showcaseData.featured.map((book, index) => (
                <div 
                  key={book.id} 
                  className="relative"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Crown for top 3 */}
                  {index < 3 && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 text-4xl animate-bounce" style={{ animationDuration: '2s' }}>
                      👑
                    </div>
                  )}
                  <CardComponent product={bookToProductCard(book)} />
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <ButtonComponent
                content="🌈 Khám phá thêm sách hay 🌈"
                type="primary"
                onClick={() => window.location.href = "/books?featured=true"}
              />
            </div>
          </div>
        </section>
      )}

      {/* Bestseller Books Section - THIẾT KẾ HOT */}
      {showcaseData?.bestseller && showcaseData.bestseller.length > 0 && (
        <section className="w-full py-20 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-red-200 rounded-full opacity-30 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-36 h-36 bg-pink-200 rounded-full opacity-30 blur-3xl"></div>

          {/* Hiệu ứng động cho Bestseller */}
          <div className="absolute top-1/4 left-20 text-5xl animate-fire-flicker">🔥</div>
          <div className="absolute bottom-1/4 right-20 text-4xl animate-fire-flicker" style={{ animationDelay: '0.5s' }}>🔥</div>
          <div className="absolute top-1/2 left-1/3 text-5xl animate-fire-flicker" style={{ animationDelay: '1s' }}>🔥</div>

          {/* Sét rơi */}
          <div className="absolute -top-10 left-1/4 text-5xl animate-lightning" style={{ animationDelay: '0s' }}>⚡</div>
          <div className="absolute -top-10 left-1/2 text-4xl animate-lightning" style={{ animationDelay: '2s' }}>⚡</div>
          <div className="absolute -top-10 left-3/4 text-5xl animate-lightning" style={{ animationDelay: '4s' }}>⚡</div>

          {/* Bùng nổ */}
          <div className="absolute top-1/3 right-1/4 text-5xl animate-explode">💥</div>
          <div className="absolute bottom-1/3 left-1/4 text-4xl animate-explode" style={{ animationDelay: '1.5s' }}>💥</div>

          {/* Trophy bay */}
          <div className="absolute top-20 left-10 text-4xl animate-trophy-bounce">🏆</div>
          <div className="absolute bottom-20 right-10 text-4xl animate-trophy-bounce" style={{ animationDelay: '1s' }}>🏆</div>

          
          {/* Fire Effects */}
          <div className="absolute top-1/4 left-20 text-5xl animate-bounce" style={{ animationDuration: '2s' }}>🔥</div>
          <div className="absolute bottom-1/4 right-20 text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💥</div>

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-all">
                <FontAwesomeIcon icon={faFire} className="mr-2 animate-pulse" />
                <span className="font-bold text-lg">HOT HOT HOT</span>
                <FontAwesomeIcon icon={faFire} className="ml-2 animate-pulse" />
              </div>
              
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                  🔥 Sách bán chạy nhất 🔥
                </span>
              </h2>
              
              <p className="text-xl text-slate-700 font-medium">
                Top những cuốn sách được mua nhiều nhất trong tháng
              </p>
              
              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-red-400 rounded"></div>
                <FontAwesomeIcon icon={faTrophy} className="text-pink-500 text-2xl animate-pulse" />
                <div className="w-20 h-1 bg-gradient-to-l from-transparent to-red-400 rounded"></div>
              </div>
            </div>

            <div className="relative px-12">
              <Carousel
                draggable
                swipeToSlide
                dots={false}
                slidesToShow={5}
                ref={bestsellerCarouselRef}
                responsive={[
                  { breakpoint: 1280, settings: { slidesToShow: 4 } },
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 640, settings: { slidesToShow: 1 } },
                ]}
              >
                {showcaseData.bestseller.map((book) => (
                  <div key={book.id} className="px-3">
                    <CardComponent product={bookToProductCard(book)} />
                  </div>
                ))}
              </Carousel>
              
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-2 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-xl hover:scale-110 transition-all z-10"
                onClick={() => bestsellerCarouselRef.current?.next()}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-2 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full shadow-xl hover:scale-110 transition-all z-10"
                onClick={() => bestsellerCarouselRef.current?.prev()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <ButtonComponent
                content="🚀 Xem tất cả sách hot 🚀"
                type="primary"
                onClick={() => window.location.href = "/books?sortBy=bestseller"}
              />
            </div>
          </div>
        </section>
      )}

     {/* Promotion Books Section - REDESIGNED */}
      {showcaseData?.promotion && showcaseData.promotion.length > 0 && (
        <section className="w-full py-20 bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-10 right-10 w-40 h-40 bg-orange-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-36 h-36 bg-red-200 rounded-full opacity-20 blur-3xl"></div>

          {/* Hiệu ứng động cho Promotion */}
          <div className="absolute top-1/4 left-20 text-5xl animate-fire-flicker">🔥</div>
          <div className="absolute bottom-1/4 right-20 text-4xl animate-fire-flicker" style={{ animationDelay: '0.7s' }}>🔥</div>
          <div className="absolute top-1/2 left-1/3 text-3xl animate-fire-flicker" style={{ animationDelay: '1.4s' }}>🔥</div>

          {/* Sale tags bay */}
          <div className="absolute top-20 left-1/4 text-5xl animate-sale-spin" style={{ animationDelay: '0s' }}>🏷️</div>
          <div className="absolute top-1/3 right-1/4 text-4xl animate-sale-spin" style={{ animationDelay: '2s' }}>💰</div>
          <div className="absolute bottom-1/3 left-1/3 text-5xl animate-sale-spin" style={{ animationDelay: '4s' }}>🎁</div>

          {/* Tiền rơi */}
          <div className="absolute -top-10 left-1/5 text-4xl animate-money-fall" style={{ animationDelay: '0s' }}>💵</div>
          <div className="absolute -top-10 left-2/5 text-3xl animate-money-fall" style={{ animationDelay: '1.5s' }}>💵</div>
          <div className="absolute -top-10 left-3/5 text-4xl animate-money-fall" style={{ animationDelay: '3s' }}>💵</div>
          <div className="absolute -top-10 left-4/5 text-3xl animate-money-fall" style={{ animationDelay: '4.5s' }}>💵</div>

          {/* Pháo hoa */}
          <div className="absolute top-1/4 right-1/4 text-5xl animate-firework">🎆</div>
          <div className="absolute bottom-1/4 left-1/4 text-4xl animate-firework" style={{ animationDelay: '1s' }}>🎇</div>
          {/* Floating Elements */}
          <div className="absolute top-1/4 left-20 text-5xl animate-bounce" style={{ animationDuration: '2s' }}>🔥</div>
          <div className="absolute bottom-1/4 right-20 text-4xl animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>💥</div>
          <div className="absolute top-1/2 left-1/3 text-3xl animate-pulse" style={{ animationDelay: '1s' }}>⚡</div>

          <div className="max-w-[1200px] mx-auto px-6 relative z-10">
            <div className="text-center mb-12">
              {/* Badge */}
              <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full mb-4 shadow-lg transform hover:scale-105 transition-all">
                <FontAwesomeIcon icon={faFire} className="mr-2 animate-pulse" />
                <span className="font-bold text-lg">FLASH SALE</span>
                <FontAwesomeIcon icon={faFire} className="ml-2 animate-pulse" />
              </div>
              
              {/* Title */}
              <h2 className="text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  🎉 Sản phẩm đang khuyến mãi 🎉
                </span>
              </h2>
              
              <p className="text-xl text-slate-700 font-medium">
                ⚡ Giảm giá cực sốc - Mua ngay kẻo hết ⚡
              </p>
              
              {/* Decorative Line */}
              <div className="flex items-center justify-center gap-2 mt-4">
                <div className="w-20 h-1 bg-gradient-to-r from-transparent to-orange-400 rounded"></div>
                <img className="w-8 h-8 animate-pulse" src="/assets/fire.png" alt="fire" />
                <div className="w-20 h-1 bg-gradient-to-l from-transparent to-orange-400 rounded"></div>
              </div>
            </div>

            <div className="relative px-12">
              <Carousel
                draggable
                swipeToSlide
                dots={false}
                slidesToShow={5}
                ref={promotionCarouselRef}
                responsive={[
                  { breakpoint: 1280, settings: { slidesToShow: 4 } },
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 640, settings: { slidesToShow: 1 } },
                ]}
              >
                {showcaseData.promotion.map((book) => (
                  <div key={book.id} className="px-3">
                    <CardComponent product={bookToProductCard(book)} />
                  </div>
                ))}
              </Carousel>
              
              <button
                className="absolute top-1/2 -translate-y-1/2 -right-2 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-xl hover:scale-110 transition-all z-10"
                onClick={() => promotionCarouselRef.current?.next()}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-2 w-12 h-12 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-xl hover:scale-110 transition-all z-10"
                onClick={() => promotionCarouselRef.current?.prev()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <ButtonComponent
                content={
                  <span className="flex items-center gap-2">
                    <span className="text-2xl animate-bounce">🔥</span>
                    <span>Săn deal ngay!</span>
                    <span className="text-2xl animate-bounce" style={{ animationDelay: '0.2s' }}>🔥</span>
                  </span>
                }
                type="primary"
                onClick={() => window.location.href = "/books"}
                className="!bg-gradient-to-r !from-orange-500 !to-red-500 !text-white hover:!from-orange-600 hover:!to-red-600 !shadow-2xl hover:!scale-105 !font-bold !text-lg !py-4"
              />
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="w-full py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-purple-300 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-[1200px] mx-auto px-6 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                📚 Danh mục sách 📚
              </span>
            </h2>
            <p className="text-xl text-slate-700 font-medium">Khám phá theo chủ đề yêu thích của bé</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Sách Thiếu Nhi", slug: "sach-thieu-nhi", color: "sky", emoji: "🧸" },
              { name: "Văn Học", slug: "van-hoc", color: "rose", emoji: "📖" },
              { name: "Kinh Tế", slug: "kinh-te", color: "amber", emoji: "💼" },
              { name: "Kỹ Năng Sống", slug: "ky-nang-song", color: "emerald", emoji: "🌱" },
              { name: "Khoa Học", slug: "khoa-hoc-cong-nghe", color: "blue", emoji: "🔬" },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/books?category=${category.slug}`}
                className="group relative overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-br from-white to-gray-50 p-8 text-center transition-all hover:shadow-2xl hover:-translate-y-3 hover:scale-105"
              >
                <div className="text-5xl mb-3 transform group-hover:scale-125 transition-transform">
                  {category.emoji}
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-600 group-hover:text-gray-900 font-medium">
                  Khám phá ngay →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
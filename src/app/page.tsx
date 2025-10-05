"use client";

<<<<<<< HEAD
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBookOpen,
  faChevronLeft,
  faChevronRight,
  faCommentDots,
  faEnvelope,
  faFeatherPointed,
  faGift,
  faLightbulb,
  faPhone,
  faSeedling,
  faStar,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';
import { Carousel, Spin, message } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { useEffect, useMemo, useRef, useState } from 'react';

import ButtonComponent from '@/components/ButtonComponent';
import CardComponent, { type ProductCard } from '@/components/CardComponent';
import type { Book, ShowcaseData } from '@/types/book';
=======
import { useEffect, useState, useRef } from "react";
import { Carousel, Spin, message } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { CarouselRef } from "antd/es/carousel";
import CardComponent from "@/components/CardComponent";
import ButtonComponent from "@/components/ButtonComponent";
import type { Book, ShowcaseData } from "@/types/book";

export default function HomePage() {
  const [showcaseData, setShowcaseData] = useState<ShowcaseData | null>(null);
  const [loading, setLoading] = useState(true);
>>>>>>> 208fe48 (Cơ bản trang staff + books + home + category)

  // Banner carousel
  const bannerCarouselRef = useRef<CarouselRef | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

<<<<<<< HEAD
type Showcase = {
  id: string;
  title: string;
  subtitle: string;
  accent: Accent;
  background: string;
  ctaLabel: string;
  products: ProductCard[];
};

type ContactOption = {
  label: string;
  value: string;
  href: string;
  icon: IconDefinition;
};

type Highlight = {
  id: string;
  title: string;
  description: string;
  icon: IconDefinition;
  accent: Accent;
};

const heroHighlights: Highlight[] = [
  {
    id: 'curation',
    title: 'Tủ sách theo chủ đề',
    description: 'Sắp xếp dựa trên kĩ năng và cảm xúc mà bé cần nuôi dưỡng.',
    icon: faBookOpen,
    accent: 'sky',
  },
  {
    id: 'gift',
    title: 'Gói quà nghệ thuật',
    description: 'Miễn phí gói quà và thiệp viết tay cho mỗi đơn đặt hàng.',
    icon: faGift,
    accent: 'rose',
  },
  {
    id: 'growth',
    title: 'Lộ trình phát triển',
    description: 'Tư vấn bởi chuyên gia giáo dục mầm non và tâm lý học.',
    icon: faSeedling,
    accent: 'emerald',
  },
];

const ageRanges = [
  { label: '0 - 2 tuổi', description: 'Khơi gợi giác quan đầu đời', accent: 'sky' as Accent },
  { label: '3 - 4 tuổi', description: 'Khuyến khích trí tò mò', accent: 'rose' as Accent },
  { label: '5 - 6 tuổi', description: 'Bồi dưỡng ngôn ngữ và cảm xúc', accent: 'amber' as Accent },
  { label: '7 - 8 tuổi', description: 'Luyện thói quen đọc sách', accent: 'emerald' as Accent },
  { label: '9 - 10 tuổi', description: 'Bước vào thế giới khám phá', accent: 'sky' as Accent },
  { label: '11+ tuổi', description: 'Định hình tư duy độc lập', accent: 'rose' as Accent },
];

const accentBadgeStyles: Record<Accent, string> = {
  sky: 'bg-sky-50 text-sky-600 border border-sky-200/60',
  rose: 'bg-rose-50 text-rose-600 border border-rose-200/60',
  amber: 'bg-amber-50 text-amber-600 border border-amber-200/60',
  emerald: 'bg-emerald-50 text-emerald-600 border border-emerald-200/60',
};

const contactOptions: ContactOption[] = [
  {
    label: 'Hotline',
    value: '+84 971 833 093',
    href: 'tel:+84971833093',
    icon: faPhone,
  },
  {
    label: 'Messenger',
    value: '@enfantsbooks',
    href: 'https://m.me/104988175154682',
    icon: faCommentDots,
  },
  {
    label: 'Email',
    value: 'hello@enfantsbooks.vn',
    href: 'mailto:hello@enfantsbooks.vn',
    icon: faEnvelope,
  },
];

const heroBanners = [
  'https://pos.nvncdn.com/5679e9-27451/bn/20250523_CpU3AO5i.gif?v=1747974773',
  'https://pos.nvncdn.com/5679e9-27451/bn/20250520_u0tk6AVL.gif?v=1747711112',
  'https://pos.nvncdn.com/5679e9-27451/bn/20250107_HRZhQmSo.gif?v=1736241946',
  'https://pos.nvncdn.com/5679e9-27451/bn/20240717_vdHNhklV.gif?v=1721205944',
];

const partnerLogos = [
  '/assets/cp1.png',
  '/assets/cp2.png',
  '/assets/cp3.jpeg',
  '/assets/cp4.png',
  '/assets/cp5.jpeg',
  '/assets/cp6.png',
];

// Convert Book to ProductCard
const bookToProductCard = (book: Book): ProductCard => {
  const accentMap: Record<string, Accent> = {
    'sach-thieu-nhi': 'sky',
    'van-hoc': 'rose',
    'kinh-te': 'amber',
    'ky-nang-song': 'emerald',
    'khoa-hoc-cong-nghe': 'sky',
  };

  const accent = accentMap[book.category.slug] || 'sky';
  
  // Format giá
  const formatPrice = (price: string) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(parseFloat(price));
  };

  // Tính rating dựa trên số lượng bán và lượt xem
  const calculateRating = () => {
    const baseRating = 4.0;
    const soldFactor = Math.min(book.soldCount / 100, 0.8);
    const viewFactor = Math.min(book.viewCount / 1000, 0.2);
    return Math.min(baseRating + soldFactor + viewFactor, 5.0);
  };

  // Xác định tag
  let tag = undefined;
  if (book.isFeatured) tag = 'Nổi bật';
  else if (book.soldCount > 50) tag = 'Bán chạy';
  else if (book.originalPrice && book.discount && book.discount > 20) tag = 'Giảm giá';

  return {
    id: book.id,
    title: book.title,
    slug: book.slug,
    image: book.coverImage || 'https://via.placeholder.com/400x600?text=No+Image',
    price: formatPrice(book.price),
    originalPrice: book.originalPrice ? formatPrice(book.originalPrice) : undefined,
    tag,
    accent,
    rating: parseFloat(calculateRating().toFixed(1)),
  };
};

const chunkProducts = <T,>(items: T[], chunkSize: number) => {
  const chunked: T[][] = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    chunked.push(items.slice(i, i + chunkSize));
  }
  return chunked;
};

const ProductCarousel: React.FC<{ showcase: Showcase }> = ({ showcase }) => {
  const carouselRef = useRef<CarouselRef | null>(null);
  const slides = useMemo(() => chunkProducts(showcase.products, 3), [showcase.products]);

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  return (
    <section
      className={`relative w-full overflow-hidden rounded-[32px] border border-white/60 bg-gradient-to-br ${showcase.background} px-6 py-12 shadow-[0_45px_120px_-60px_rgba(15,23,42,0.45)] backdrop-blur-xl`}
    >
      <div className="absolute -left-10 top-16 h-32 w-32 rounded-full bg-white/40 blur-[90px]" />
      <div className="absolute -right-10 bottom-10 h-40 w-40 rounded-full bg-white/30 blur-[90px]" />

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <span className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide text-slate-600 shadow-sm backdrop-blur ${accentBadgeStyles[showcase.accent]}`}>
              <FontAwesomeIcon icon={faStar} className="text-[14px]" />
              Lựa chọn Enfants Books
            </span>
            <h2 className="mt-5 text-3xl font-bold text-slate-800 md:text-4xl">{showcase.title}</h2>
            <p className="mt-3 text-base text-slate-600 md:text-lg">{showcase.subtitle}</p>
          </div>
          <div className="flex gap-3 self-start md:self-center">
            <button
              type="button"
              className="nav-pill"
              aria-label="Xem sản phẩm trước"
              onClick={handlePrev}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <button
              type="button"
              className="nav-pill"
              aria-label="Xem sản phẩm kế tiếp"
              onClick={handleNext}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>

        <div className="relative">
          {showcase.products.length > 0 ? (
            <Carousel
              dots={false}
              draggable
              slidesToShow={3}
              swipeToSlide
              ref={carouselRef}
              responsive={[
                { breakpoint: 1280, settings: { slidesToShow: 2 } },
                { breakpoint: 768, settings: { slidesToShow: 1 } },
              ] as any}
            >
              {slides.map((group, groupIndex) => (
                <div key={`slide-${showcase.id}-${groupIndex}`} className="px-3">
                  <div className="grid gap-6 md:grid-cols-1">
                    {group.map((product) => (
                      <CardComponent key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              ))}
            </Carousel>
          ) : (
            <div className="flex h-64 items-center justify-center text-slate-500">
              Chưa có sản phẩm nào
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <ButtonComponent
            type="primary"
            content={(
              <>
                <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                <span>{showcase.ctaLabel}</span>
              </>
            )}
          />
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const [activeContact, setActiveContact] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showcases, setShowcases] = useState<Showcase[]>([]);
=======
  // Product carousels
  const featuredCarouselRef = useRef<CarouselRef | null>(null);
  const bestsellerCarouselRef = useRef<CarouselRef | null>(null);
  const promotionCarouselRef = useRef<CarouselRef | null>(null);
>>>>>>> 208fe48 (Cơ bản trang staff + books + home + category)

  // Auto-change banner every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % 4); // 4 banners
      bannerCarouselRef.current?.next();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

<<<<<<< HEAD
  // Fetch showcase data
  useEffect(() => {
    const fetchShowcaseData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/books/showcase');
        
        if (!response.ok) {
          throw new Error('Failed to fetch showcase data');
        }

        const result = await response.json();
        
        if (result.success && result.data) {
          const data: ShowcaseData = result.data;

          const newShowcases: Showcase[] = [
            {
              id: 'featured',
              title: 'Sản phẩm nổi bật',
              subtitle: 'Danh sách lựa chọn bởi đội ngũ biên tập Enfants Books dành cho mùa lễ hội.',
              accent: 'sky',
              background: 'from-sky-50 via-white to-rose-50',
              ctaLabel: 'Khám phá bộ sưu tập',
              products: data.featured.map(bookToProductCard),
            },
            {
              id: 'bestseller',
              title: 'Sản phẩm bán chạy',
              subtitle: 'Top sách và dụng cụ học tập được yêu thích nhất tháng này.',
              accent: 'emerald',
              background: 'from-emerald-50 via-white to-sky-50',
              ctaLabel: 'Xem tất cả sản phẩm',
              products: data.bestseller.map(bookToProductCard),
            },
            {
              id: 'promotion',
              title: 'Ưu đãi đang diễn ra',
              subtitle: 'Giảm giá đến 35% cho bộ quà tặng & combo học liệu phát triển cảm xúc.',
              accent: 'rose',
              background: 'from-rose-50 via-white to-amber-50',
              ctaLabel: 'Nhận ưu đãi ngay',
              products: data.promotion.map(bookToProductCard),
            },
          ];

          setShowcases(newShowcases);
        }
      } catch (error) {
        console.error('Error fetching showcase:', error);
        message.error('Không thể tải dữ liệu sản phẩm');
      } finally {
        setLoading(false);
      }
    };

    fetchShowcaseData();
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center gap-20 overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(244,114,182,0.2),transparent_60%)]" />
=======
  useEffect(() => {
    fetchShowcaseData();
  }, []);
>>>>>>> 208fe48 (Cơ bản trang staff + books + home + category)

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
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" tip="Đang tải..." />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center">
      {/* Hero Banner Carousel */}
      <section className="max-w-[1200px] w-full relative mb-10">
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
              className="w-full h-auto"
            />
          </div>
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250520_u0tk6AVL.gif?v=1747711112" 
              alt="Banner 2"
              className="w-full h-auto"
            />
          </div>
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20250107_HRZhQmSo.gif?v=1736241946" 
              alt="Banner 3"
              className="w-full h-auto"
            />
          </div>
          <div>
            <img 
              src="https://pos.nvncdn.com/5679e9-27451/bn/20240717_vdHNhklV.gif?v=1721205944" 
              alt="Banner 4"
              className="w-full h-auto"
            />
          </div>
        </Carousel>

        <section className="max-w-[1200px] w-full py-16 px-6">
          <div className="text-center bg-gradient-to-r from-sky-50 via-white to-rose-50 rounded-3xl p-12 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-sky-600 to-rose-600 bg-clip-text text-transparent mb-4">
              Chào mừng đến với Enfants Books
            </h1>
            <p className="text-xl md:text-2xl text-slate-700 font-medium">
              Nơi nâng tầm tri thức cho trẻ từ <span className="text-sky-600 font-bold">0 - 12 tuổi</span>
            </p>
          </div>
        </section>

        {/* Navigation Arrows */}
        <button
          className="absolute top-1/2 -translate-y-1/2 left-4 z-10 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all"
          onClick={handleBannerPrev}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="text-slate-700" />
        </button>
        <button
          className="absolute top-1/2 -translate-y-1/2 right-4 z-10 bg-white/80 hover:bg-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all"
          onClick={handleBannerNext}
        >
          <FontAwesomeIcon icon={faChevronRight} className="text-slate-700" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => {
                setActiveIndex(index);
                bannerCarouselRef.current?.goTo(index);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                activeIndex === index 
                  ? 'bg-white w-8' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Featured Books Section */}
      {showcaseData?.featured && showcaseData.featured.length > 0 && (
        <section className="w-full py-20 bg-white">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Sản phẩm nổi bật</h2>
              <p className="text-lg text-slate-600">Những cuốn sách được yêu thích nhất</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-8">
              {showcaseData.featured.map((book) => (
                <CardComponent key={book.id} product={bookToProductCard(book)} />
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <ButtonComponent
                content="Xem tất cả"
                type="primary"
                onClick={() => window.location.href = "/books?featured=true"}
              />
            </div>
          </div>
        </section>
      )}

      {/* Bestseller Books Section */}
      {showcaseData?.bestseller && showcaseData.bestseller.length > 0 && (
        <section className="w-full py-20 bg-gradient-to-br from-slate-50 to-sky-50">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-slate-900 mb-4">Sách bán chạy</h2>
              <p className="text-lg text-slate-600">Top những cuốn sách được mua nhiều nhất</p>
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
                className="absolute top-1/2 -translate-y-1/2 -right-2 text-sky-500 text-4xl hover:text-sky-600 transition-colors z-10"
                onClick={() => bestsellerCarouselRef.current?.next()}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-2 text-sky-500 text-4xl hover:text-sky-600 transition-colors z-10"
                onClick={() => bestsellerCarouselRef.current?.prev()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <ButtonComponent
                content="Xem tất cả"
                type="primary"
                onClick={() => window.location.href = "/books?sortBy=bestseller"}
              />
            </div>
          </div>
        </section>
      )}

      {/* Promotion Books Section */}
      {showcaseData?.promotion && showcaseData.promotion.length > 0 && (
        <section className="w-full py-20 bg-[#ab8585] [background-image:url('/assets/bg1.png'),url('/assets/bg2.png')] [background-position:top_left,bottom_right] [background-repeat:no-repeat,no-repeat]">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-12 flex justify-center items-center gap-4">
              <h2 className="text-4xl font-bold text-white">Sản phẩm đang khuyến mãi</h2>
              <img className="w-16 h-16 animate-pulse" src="/assets/fire.png" alt="fire" />
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
                className="absolute top-1/2 -translate-y-1/2 -right-2 text-white text-4xl hover:text-sky-200 transition-colors z-10"
                onClick={() => promotionCarouselRef.current?.next()}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
              <button
                className="absolute top-1/2 -translate-y-1/2 -left-2 text-white text-4xl hover:text-sky-200 transition-colors z-10"
                onClick={() => promotionCarouselRef.current?.prev()}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
            </div>

            <div className="flex justify-center mt-8">
              <ButtonComponent
                content="Xem tất cả khuyến mãi"
                type="primary"
                onClick={() => window.location.href = "/books"}
              />
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="w-full py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Danh mục sách</h2>
            <p className="text-lg text-slate-600">Khám phá theo chủ đề yêu thích</p>
          </div>

<<<<<<< HEAD
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {ageRanges.map((range) => (
              <div key={range.label} className={`age-card ${range.accent}`}>
                <div className="age-card__inner">
                  <span>{range.label}</span>
                  <p>{range.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-12">
          {loading ? (
            <div className="flex h-96 items-center justify-center">
              <Spin size="large" tip="Đang tải sản phẩm..." />
            </div>
          ) : (
            showcases.map((showcase) => (
              <ProductCarousel key={showcase.id} showcase={showcase} />
            ))
          )}
        </div>
      </section>

      <section className="w-full px-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[28px] border border-white/40 bg-white/80 p-10 text-center shadow-[0_60px_140px_-90px_rgba(15,23,42,0.45)] backdrop-blur-xl">
          <div className="flex flex-col items-center gap-4">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-500">
              <FontAwesomeIcon icon={faBookOpen} className="text-sky-500" />
              Đối tác chiến lược
            </span>
            <h2 className="text-3xl text-slate-900 md:text-4xl">Đồng hành cùng những thương hiệu giáo dục uy tín</h2>
            <p className="max-w-3xl text-sm text-slate-500 md:text-base">
              Chúng tôi hợp tác cùng các nhà xuất bản, trung tâm giáo dục và nghệ sĩ minh hoạ để mang đến những trải nghiệm đọc và học trọn vẹn nhất cho trẻ nhỏ.
            </p>
          </div>

          <div className="grid grid-cols-2 items-center justify-items-center gap-6 md:grid-cols-3 lg:grid-cols-6">
            {partnerLogos.map((logo, index) => (
              <div key={logo} className="partner-card">
                <img src={logo} alt={`Đối tác ${index + 1}`} className="h-16 w-auto object-contain" />
              </div>
=======
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { name: "Sách Thiếu Nhi", slug: "sach-thieu-nhi", color: "sky" },
              { name: "Văn Học", slug: "van-hoc", color: "rose" },
              { name: "Kinh Tế", slug: "kinh-te", color: "amber" },
              { name: "Kỹ Năng Sống", slug: "ky-nang-song", color: "emerald" },
              { name: "Khoa Học - Công Nghệ", slug: "khoa-hoc-cong-nghe", color: "sky" },
            ].map((category) => (
              <a
                key={category.slug}
                href={`/books?category=${category.slug}`}
                className={`group relative overflow-hidden rounded-2xl border-2 border-${category.color}-200 bg-gradient-to-br from-${category.color}-50 to-white p-8 text-center transition-all hover:shadow-xl hover:-translate-y-2`}
              >
                <h3 className={`text-xl font-bold text-${category.color}-900 mb-2`}>
                  {category.name}
                </h3>
                <p className="text-sm text-slate-600 group-hover:text-slate-900">
                  Khám phá ngay →
                </p>
              </a>
>>>>>>> 208fe48 (Cơ bản trang staff + books + home + category)
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
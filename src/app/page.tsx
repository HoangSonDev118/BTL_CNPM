'use client'

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
import { Carousel } from 'antd';
import type { CarouselRef } from 'antd/es/carousel';
import { useEffect, useMemo, useRef, useState } from 'react';

import ButtonComponent from '@/components/ButtonComponent';
import CardComponent, { ProductCard } from '@/components/CardComponent';

type Accent = 'sky' | 'rose' | 'amber' | 'emerald';

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

const curatedProducts: ProductCard[] = [
  {
    title: 'Wonderella - Bộ 4 cuốn tác giả Alicia Vu',
    image: 'https://pos.nvncdn.com/5679e9-27451/ps/20240802_pU1MWRnInV.jpeg?v=1722566740',
    price: '640.000 đ',
    originalPrice: '820.000 đ',
    tag: 'Bán chạy',
    accent: 'sky' as Accent,
    rating: 4.9,
  },
  {
    title: 'Nhật ký cảm xúc đầu đời',
    image: 'https://images.unsplash.com/photo-1529079010405-a95b4e0f45d9?auto=format&fit=crop&w=640&q=80',
    price: '185.000 đ',
    originalPrice: '210.000 đ',
    tag: 'Mới ra mắt',
    accent: 'rose' as Accent,
    rating: 4.7,
  },
  {
    title: 'Hộp truyện tương tác mùa lễ hội',
    image: 'https://images.unsplash.com/photo-1529653762956-b0a27278529d?auto=format&fit=crop&w=640&q=80',
    price: '420.000 đ',
    originalPrice: '510.000 đ',
    tag: 'Quà tặng',
    accent: 'amber' as Accent,
    rating: 4.8,
  },
  {
    title: 'Chuyến phiêu lưu của Mimi & Tom',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=640&q=80',
    price: '265.000 đ',
    accent: 'emerald' as Accent,
    rating: 4.6,
  },
  {
    title: 'Workbook song ngữ: Start to Read',
    image: 'https://images.unsplash.com/photo-1455885666463-1bbac6cc6d0d?auto=format&fit=crop&w=640&q=80',
    price: '199.000 đ',
    originalPrice: '249.000 đ',
    accent: 'sky' as Accent,
    rating: 4.5,
  },
  {
    title: 'Combo Montessori khám phá khoa học',
    image: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=640&q=80',
    price: '560.000 đ',
    tag: 'Giới hạn',
    accent: 'emerald' as Accent,
    rating: 4.9,
  },
  {
    title: 'Cổ tích kể bé nghe trước giờ ngủ',
    image: 'https://images.unsplash.com/photo-1535905496755-26ae35c09d1b?auto=format&fit=crop&w=640&q=80',
    price: '145.000 đ',
    accent: 'rose' as Accent,
    rating: 4.4,
  },
  {
    title: 'Puzzle kể chuyện: Hành tinh xanh',
    image: 'https://images.unsplash.com/photo-1603251579431-8041402bdeda?auto=format&fit=crop&w=640&q=80',
    price: '320.000 đ',
    originalPrice: '370.000 đ',
    accent: 'amber' as Accent,
    rating: 4.7,
  },
  {
    title: 'Art Lab – 52 hoạt động nghệ thuật',
    image: 'https://images.unsplash.com/photo-1503095396549-807759245b35?auto=format&fit=crop&w=640&q=80',
    price: '380.000 đ',
    accent: 'sky' as Accent,
    rating: 4.8,
  },
  {
    title: 'Hộp thẻ kỹ năng cảm xúc EQ',
    image: 'https://images.unsplash.com/photo-1455885666463-1bbac6cc6d0d?auto=format&fit=crop&w=640&q=80',
    price: '280.000 đ',
    accent: 'emerald' as Accent,
    rating: 4.6,
  },
];

const showcases: Showcase[] = [
  {
    id: 'spotlight',
    title: 'Sản phẩm nổi bật',
    subtitle: 'Danh sách lựa chọn bởi đội ngũ biên tập Enfants Books dành cho mùa lễ hội.',
    accent: 'sky',
    background: 'from-sky-50 via-white to-rose-50',
    ctaLabel: 'Khám phá bộ sưu tập',
    products: curatedProducts.slice(0, 6),
  },
  {
    id: 'best-sellers',
    title: 'Sản phẩm bán chạy',
    subtitle: 'Top sách và dụng cụ học tập được yêu thích nhất tháng này.',
    accent: 'emerald',
    background: 'from-emerald-50 via-white to-sky-50',
    ctaLabel: 'Xem tất cả ưu đãi',
    products: curatedProducts.slice(2, 8),
  },
  {
    id: 'promotion',
    title: 'Ưu đãi đang diễn ra',
    subtitle: 'Giảm giá đến 35% cho bộ quà tặng & combo học liệu phát triển cảm xúc.',
    accent: 'rose',
    background: 'from-rose-50 via-white to-amber-50',
    ctaLabel: 'Nhận ưu đãi ngay',
    products: curatedProducts.slice(4),
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
                  {group.map((product, index) => (
                    <CardComponent key={`${showcase.id}-${groupIndex}-${index}`} product={product} />
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
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

  useEffect(() => {
    const rotation = setInterval(() => {
      setActiveContact((prev) => (prev + 1) % contactOptions.length);
    }, 6000);

    return () => clearInterval(rotation);
  }, []);

  return (
    <div className="relative flex w-full flex-col items-center gap-20 overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(96,165,250,0.25),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(244,114,182,0.2),transparent_60%)]" />

      <section className="relative w-full px-4 pt-16">
        <div className="absolute left-1/2 top-4 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-200/40 blur-[120px]" />
        <div className="absolute right-20 top-20 hidden h-64 w-64 rounded-full bg-rose-200/40 blur-[120px] lg:block" />
        <div className="mx-auto flex max-w-6xl flex-col gap-12 rounded-[36px] border border-white/50 bg-white/80 p-10 shadow-[0_65px_160px_-80px_rgba(15,23,42,0.5)] backdrop-blur-2xl lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm uppercase tracking-[0.2em] text-slate-500 shadow-sm backdrop-blur">
              <FontAwesomeIcon icon={faFeatherPointed} className="text-sky-500" />
              enfants books
            </span>
            <h1 className="mt-6 text-4xl leading-tight text-slate-900 md:text-5xl lg:text-[52px]">
              Nuôi dưỡng trí tưởng tượng của bé bằng những câu chuyện đầy cảm hứng
            </h1>
            <p className="mt-5 max-w-2xl text-base text-slate-600 md:text-lg">
              Bộ sưu tập sách thiếu nhi, học liệu và hoạt động nghệ thuật được tuyển chọn kỹ càng để đồng hành cùng từng giai đoạn phát triển.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="min-w-[220px]">
                <ButtonComponent
                  type="primary"
                  content={(
                    <>
                      <FontAwesomeIcon icon={faArrowRight} className="text-sm" />
                      <span>Khám phá ngay</span>
                    </>
                  )}
                />
              </div>
              <div className="min-w-[220px]">
                <ButtonComponent
                  type="secondary"
                  content={(
                    <>
                      <FontAwesomeIcon icon={faLightbulb} className="text-sm text-amber-500" />
                      <span>Tư vấn chọn sách cho bé</span>
                    </>
                  )}
                />
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight.id}
                  className={`glass-panel group flex h-full flex-col gap-3 rounded-2xl border border-white/40 p-5 text-left shadow-[0_30px_80px_-60px_rgba(15,23,42,0.55)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_40px_90px_-50px_rgba(59,130,246,0.35)] ${accentBadgeStyles[highlight.accent]}`}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/70 text-xl text-slate-600 shadow-inner">
                    <FontAwesomeIcon icon={highlight.icon} />
                  </span>
                  <h3 className="text-lg text-slate-800">{highlight.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-600">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex w-full flex-1 items-center justify-center">
            <div className="floating-blob absolute -left-10 top-6 h-40 w-40 rounded-full bg-sky-300/40" />
            <div className="floating-blob absolute -right-8 bottom-10 h-32 w-32 rounded-full bg-rose-300/40" />
            <div className="relative w-full max-w-xl overflow-hidden rounded-[32px] border border-white/40 bg-white/70 shadow-[0_45px_120px_-60px_rgba(79,70,229,0.35)] backdrop-blur-xl">
              <Carousel autoplay autoplaySpeed={5000} draggable swipeToSlide className="hero-carousel">
                {heroBanners.map((banner, index) => (
                  <div key={`banner-${index}`} className="relative">
                    <img src={banner} alt={`Hero banner ${index + 1}`} className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-ribbon-container">
        <div className="contact-ribbon">
          {contactOptions.map((option, index) => (
            <a
              key={option.label}
              className={`contact-pill ${index === activeContact ? 'is-active' : ''}`}
              href={option.href}
              target={option.href.startsWith('http') ? '_blank' : '_self'}
              rel={option.href.startsWith('http') ? 'noreferrer' : undefined}
            >
              <div className="icon">
                <FontAwesomeIcon icon={option.icon} />
              </div>
              <div className="content">
                <span>{option.label}</span>
                <strong>{option.value}</strong>
              </div>
              <FontAwesomeIcon icon={faArrowRight} className="chevron" />
            </a>
          ))}
        </div>
      </section>

      <section className="w-full px-4">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 rounded-[28px] border border-white/40 bg-white/80 p-10 shadow-[0_60px_140px_-90px_rgba(15,23,42,0.45)] backdrop-blur-2xl">
          <div className="flex flex-col items-center gap-3 text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-1 text-xs uppercase tracking-[0.35em] text-slate-500">
              <FontAwesomeIcon icon={faLightbulb} className="text-amber-400" />
              Độ tuổi khuyến nghị
            </span>
            <h2 className="text-3xl text-slate-900 md:text-4xl">Con bạn đang thuộc độ tuổi nào?</h2>
            <p className="max-w-2xl text-sm text-slate-500 md:text-base">
              Chọn nhóm tuổi để Enfants Books gợi ý những tựa sách, hoạt động và học liệu phù hợp nhất.
            </p>
          </div>

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
          {showcases.map((showcase) => (
            <ProductCarousel key={showcase.id} showcase={showcase} />
          ))}
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

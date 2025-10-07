import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export type ProductCard = {
  id?: string;
  slug?: string;
  title: string;
  image: string;
  price: string;
  originalPrice?: string;
  tag?: string;
  accent?: 'sky' | 'rose' | 'amber' | 'emerald';
  rating?: number;
  discount?: number; 
};

type CardComponentProps = {
  className?: string;
  product?: ProductCard;
};

const accentStyles: Record<NonNullable<ProductCard['accent']>, { glow: string; badge: string; heart: string }> = {
  sky: {
    glow: 'from-sky-300/60 via-transparent to-transparent',
    badge: 'bg-sky-500/90 text-white shadow-[0_10px_30px_-15px_rgba(14,165,233,0.95)]',
    heart: 'text-sky-500',
  },
  rose: {
    glow: 'from-rose-300/60 via-transparent to-transparent',
    badge: 'bg-rose-500/90 text-white shadow-[0_10px_30px_-15px_rgba(244,63,94,0.95)]',
    heart: 'text-rose-500',
  },
  amber: {
    glow: 'from-amber-300/60 via-transparent to-transparent',
    badge: 'bg-amber-500/90 text-white shadow-[0_10px_30px_-15px_rgba(245,158,11,0.95)]',
    heart: 'text-amber-500',
  },
  emerald: {
    glow: 'from-emerald-300/60 via-transparent to-transparent',
    badge: 'bg-emerald-500/90 text-white shadow-[0_10px_30px_-15px_rgba(16,185,129,0.95)]',
    heart: 'text-emerald-500',
  },
};

const fallbackProduct: ProductCard = {
  id: 'fallback-product',
  slug: 'fallback-product',
  title: 'Wonderella - Bộ 4 cuốn tác giả Alicia Vu',
  image: 'https://pos.nvncdn.com/5679e9-27451/ps/20240802_pU1MWRnInV.jpeg?v=1722566740',
  price: '640.000 đ',
  originalPrice: '820.000 đ',
  tag: 'Bán chạy',
  accent: 'sky',
  rating: 4.8,
  discount: 22,
};

const CardComponent: React.FC<CardComponentProps> = ({ className = '', product = fallbackProduct }) => {
  const accent = product.accent ?? 'sky';
  const accentStyle = accentStyles[accent];
  const rating = product.rating ?? 5;
  
  const calculateDiscount = () => {
    if (!product.discount && product.originalPrice && product.price) {
      const original = parseFloat(product.originalPrice.replace(/[^\d]/g, ''));
      const current = parseFloat(product.price.replace(/[^\d]/g, ''));
      if (original > current) {
        return Math.round(((original - current) / original) * 100);
      }
    }
    return product.discount || 0;
  };
  
  const discount = calculateDiscount();

  return (
    <a
      href={`/books/${product.slug}`}
      className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-4 text-[#2f2f2f] shadow-[0_25px_50px_-25px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_55px_-25px_rgba(14,116,144,0.45)] ${className}`}
    >
      <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${accentStyle.glow}`} />
      
      <div className="relative overflow-hidden rounded-xl border border-white/50 bg-gradient-to-br from-white/60 via-white/30 to-white/20">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
        
        {/* Discount Badge - Góc trên bên trái - Theo thiết kế ảnh */}
        {discount > 0 && (
          <div className="absolute top-2 left-2 z-10">
            <div className="bg-white border-2 border-red-500 text-red-500 font-bold px-2.5 py-1 rounded shadow-sm">
              <span className="text-xs tracking-wide">SAVE {discount}%</span>
            </div>
          </div>
        )}
        
        {/* Tag Badge */}
        {product.tag && (
          <span className={`absolute ${discount > 0 ? 'right-2 top-2' : 'left-4 top-4'} inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs tracking-wide z-10 ${accentStyle.badge}`}>
            <FontAwesomeIcon icon={faStar} className="text-[12px]" />
            {product.tag}
          </span>
        )}
        
        <img
          className="h-56 w-full object-cover transition-transform duration-[600ms] group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[16px] leading-snug text-slate-800 transition-colors duration-300 group-hover:text-slate-900 line-clamp-2 min-h-[3rem]">
            {product.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-amber-500">
            {Array.from({ length: Math.floor(rating) }).map((_, idx) => (
              <FontAwesomeIcon key={idx} icon={faStar} className="text-[12px]" />
            ))}
            {rating % 1 !== 0 && <FontAwesomeIcon icon={faStar} className="text-[12px] opacity-50" />}
            <span className="text-xs text-slate-500">{rating.toFixed(1)}</span>
          </div>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-[#ff6a00]">{product.price}</span>
            {product.originalPrice && <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>}
          </div>
          <button
            type="button"
            className={`flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/70 text-base transition-all duration-300 hover:scale-110 hover:shadow-lg ${accentStyle.heart}`}
            aria-label="Thêm vào danh sách yêu thích"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        </div>
      </div>
    </a>
  );
};

export default CardComponent;
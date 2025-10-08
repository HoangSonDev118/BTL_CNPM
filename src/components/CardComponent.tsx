"use client";

import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

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
  onFavoriteChange?: (isFavorite: boolean) => void;
};

type HeartOutlineIconProps = {
  className?: string;
  style?: React.CSSProperties;
};

const HeartOutlineIcon: React.FC<HeartOutlineIconProps> = ({ className = '', style }) => (
  <svg
    aria-hidden="true"
    focusable="false"
    viewBox="0 0 512 512"
    className={className}
    style={{ width: '1em', height: '1em', ...style }}
    fill="none"
    stroke="currentColor"
    strokeWidth={40}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M241 87.1l15 20.7 15-20.7C296 52.5 336.2 32 378.9 32 452.4 32 512 91.6 512 165.1v2.6c0 112.2-139.9 242.5-212.9 298.2-12.4 9.4-27.6 14.1-43.1 14.1s-30.8-4.6-43.1-14.1C139.9 410.2 0 279.9 0 167.7v-2.6C0 91.6 59.6 32 133.1 32 175.8 32 216 52.5 241 87.1z" />
  </svg>
);

const accentStyles: Record<NonNullable<ProductCard['accent']>, { glow: string; badge: string; heart: string; heartActive: string }> = {
  sky: {
    glow: 'from-sky-300/60 via-transparent to-transparent',
    badge: 'bg-sky-500/90 text-white shadow-[0_10px_30px_-15px_rgba(14,165,233,0.95)]',
    heart: 'text-sky-500 hover:bg-sky-50',
    heartActive: 'bg-sky-500 text-white hover:bg-sky-600',
  },
  rose: {
    glow: 'from-rose-300/60 via-transparent to-transparent',
    badge: 'bg-rose-500/90 text-white shadow-[0_10px_30px_-15px_rgba(244,63,94,0.95)]',
    heart: 'text-rose-500 hover:bg-rose-50',
    heartActive: 'bg-rose-500 text-white hover:bg-rose-600',
  },
  amber: {
    glow: 'from-amber-300/60 via-transparent to-transparent',
    badge: 'bg-amber-500/90 text-white shadow-[0_10px_30px_-15px_rgba(245,158,11,0.95)]',
    heart: 'text-amber-500 hover:bg-amber-50',
    heartActive: 'bg-amber-500 text-white hover:bg-amber-600',
  },
  emerald: {
    glow: 'from-emerald-300/60 via-transparent to-transparent',
    badge: 'bg-emerald-500/90 text-white shadow-[0_10px_30px_-15px_rgba(16,185,129,0.95)]',
    heart: 'text-emerald-500 hover:bg-emerald-50',
    heartActive: 'bg-emerald-500 text-white hover:bg-emerald-600',
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
  accent: 'rose',
  rating: 4.8,
  discount: 22,
};

const CardComponent: React.FC<CardComponentProps> = ({ 
  className = '', 
  product = fallbackProduct,
  onFavoriteChange 
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  const accent = product.accent ?? 'rose';
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

  useEffect(() => {
    if (user && product.id) {
      checkFavoriteStatus();
    } else {
      setIsFavorite(false);
    }
  }, [user, product.id]);

  const checkFavoriteStatus = async () => {
    if (!product.id) return;
    
    try {
      const response = await fetch(`/api/user/favorites/check/${product.id}`);
      const data = await response.json();
      setIsFavorite(data.isFavorite);
    } catch (error) {
      console.error('Error checking favorite status:', error);
    }
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      setToastMessage('Vui lòng đăng nhập để thêm vào yêu thích');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      setTimeout(() => router.push('/auth/login'), 1000);
      return;
    }

    if (!product.id) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/user/favorites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId: product.id }),
      });

      const data = await response.json();

      if (response.ok) {
        const newFavoriteState = data.action === 'added';
        setIsFavorite(newFavoriteState);
        setToastMessage(data.message);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
        
        if (onFavoriteChange) {
          onFavoriteChange(newFavoriteState);
        }
      } else {
        setToastMessage(data.message || 'Có lỗi xảy ra');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setToastMessage('Không thể kết nối đến server');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 animate-slide-in-right">
          <div className="bg-white border-l-4 border-rose-500 rounded-lg shadow-lg p-4 flex items-center gap-3 max-w-sm">
            <div className="flex-shrink-0">
              <FontAwesomeIcon 
                icon={faHeart} 
                className={`text-xl ${isFavorite ? 'text-rose-500' : 'text-gray-400'}`}
              />
            </div>
            <p className="text-sm text-gray-700 font-medium">{toastMessage}</p>
          </div>
        </div>
      )}

      <a
        href={`/books/${product.slug}`}
        className={`group relative flex h-full flex-col gap-4 overflow-hidden rounded-2xl border border-white/40 bg-white/80 p-4 text-[#2f2f2f] shadow-[0_25px_50px_-25px_rgba(15,23,42,0.35)] backdrop-blur-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_35px_55px_-25px_rgba(14,116,144,0.45)] ${className}`}
      >
        <div className={`pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100 ${accentStyle.glow}`} />
        
        <div className="relative overflow-hidden rounded-xl border border-white/50 bg-gradient-to-br from-white/60 via-white/30 to-white/20">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-30" />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-3 left-3 z-10">
              <div className="relative overflow-hidden bg-gradient-to-r from-red-500 to-rose-500 text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 animate-shimmer"></div>
                <span className="relative text-xs tracking-wider drop-shadow-sm">-{discount}%</span>
              </div>
            </div>
          )}
          
          {/* Tag Badge */}
          {product.tag && (
            <span className={`absolute ${discount > 0 ? 'right-3 top-3' : 'left-3 top-3'} inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide z-10 ${accentStyle.badge} backdrop-blur-sm`}>
              <FontAwesomeIcon icon={faStar} className="text-[11px]" />
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
            <h3 className="text-[16px] leading-snug text-slate-800 transition-colors duration-300 group-hover:text-slate-900 line-clamp-2 min-h-[3rem] font-medium">
              {product.title}
            </h3>
            <div className="flex items-center gap-2 text-sm text-amber-500">
              {Array.from({ length: Math.floor(rating) }).map((_, idx) => (
                <FontAwesomeIcon key={idx} icon={faStar} className="text-[12px]" />
              ))}
              {rating % 1 !== 0 && <FontAwesomeIcon icon={faStar} className="text-[12px] opacity-50" />}
              <span className="text-xs text-slate-500 ml-1">{rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="flex items-end justify-between gap-3">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-[#ff6a00]">{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">{product.originalPrice}</span>
              )}
            </div>
            
            {/* Favorite Button with Save Label */}
            <button
              type="button"
              onClick={handleFavoriteClick}
              disabled={isLoading}
              className={`
                group/btn relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                transition-all duration-300 hover:scale-105 active:scale-95
                ${isLoading ? 'cursor-wait opacity-60' : 'cursor-pointer'}
                ${isFavorite 
                  ? `${accentStyle.heartActive} shadow-lg` 
                  : `bg-white/90 border-2 ${accentStyle.heart} border-current hover:shadow-md`
                }
              `}
              aria-label={isFavorite ? "Thích" : "Thích"}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                  <span className="text-xs">...</span>
                </>
              ) : (
                <>
                  {isFavorite ? (
                    <FontAwesomeIcon icon={faHeart} className="text-sm animate-pulse" />
                  ) : (
                    <HeartOutlineIcon className="text-sm" />
                  )}
                  <span className="text-xs font-semibold tracking-wide">
                    {isFavorite ? 'Thích' : 'Thích'}
                  </span>
                </>
              )}
            </button>
          </div>
        </div>
      </a>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default CardComponent;
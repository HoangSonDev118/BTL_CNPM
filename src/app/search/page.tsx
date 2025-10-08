"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Breadcrumb, Carousel, Checkbox, Pagination, Select, Spin, message, Empty } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faFilter, faSearch } from "@fortawesome/free-solid-svg-icons";
import { CarouselRef } from "antd/es/carousel";
import ButtonComponent from "@/components/ButtonComponent";
import CardComponent, { type ProductCard } from "@/components/CardComponent";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Book = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  price: string;
  originalPrice: string | null;
  stock: number;
  coverImage: string | null;
  isFeatured: boolean;
  viewCount: number;
  soldCount: number;
  author: {
    id: string;
    name: string;
    slug: string;
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
  }>;
};

type SearchResponse = {
  success: boolean;
  books: Book[];
  authors?: any[];
  categories?: any[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  query: string;
};

const accentMap: Record<string, 'sky' | 'rose' | 'amber' | 'emerald'> = {
  'sach-thieu-nhi': 'sky',
  'van-hoc': 'rose',
  'kinh-te': 'amber',
  'ky-nang-song': 'emerald',
  'khoa-hoc-cong-nghe': 'sky',
};

const formatPrice = (price: string) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(parseFloat(price));
};

const calculateRating = (soldCount: number, viewCount: number) => {
  const baseRating = 4.0;
  const soldFactor = Math.min(soldCount / 100, 0.8);
  const viewFactor = Math.min(viewCount / 1000, 0.2);
  return Math.min(baseRating + soldFactor + viewFactor, 5.0);
};

const bookToProductCard = (book: Book): ProductCard => {
  const accent = accentMap[book.category.slug] || 'sky';
  
  let tag = undefined;
  if (book.isFeatured) tag = 'Nổi bật';
  else if (book.soldCount > 50) tag = 'Bán chạy';
  else if (book.originalPrice) {
    const discount = Math.round(
      ((parseFloat(book.originalPrice) - parseFloat(book.price)) / parseFloat(book.originalPrice)) * 100
    );
    if (discount > 20) tag = 'Giảm giá';
  }

  return {
    id: book.id,
    title: book.title,
    slug: book.slug,
    image: book.coverImage || 'https://via.placeholder.com/400x600?text=No+Image',
    price: formatPrice(book.price),
    originalPrice: book.originalPrice ? formatPrice(book.originalPrice) : undefined,
    tag,
    accent,
    rating: parseFloat(calculateRating(book.soldCount, book.viewCount).toFixed(1)),
  };
};

const priceRanges = [
  { label: 'Dưới 50.000đ', min: 0, max: 50000 },
  { label: 'Từ 50.000đ đến 150.000đ', min: 50000, max: 150000 },
  { label: 'Từ 150.000đ đến 300.000đ', min: 150000, max: 300000 },
  { label: 'Từ 300.000đ đến 500.000đ', min: 300000, max: 500000 },
  { label: 'Trên 500.000đ', min: 500000, max: 999999999 },
];

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const carouselRef = useRef<CarouselRef | null>(null);

  const [books, setBooks] = useState<Book[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('relevance');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<number[]>([]);

  const limit = 16;

  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    const fetchData = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.set('q', query);
        params.set('page', currentPage.toString());
        params.set('limit', limit.toString());
        
        if (sortBy !== 'relevance') {
          params.set('sortBy', sortBy);
        }
        
        if (selectedCategory) {
          params.set('category', selectedCategory);
        }
        
        if (selectedPriceRanges.length > 0) {
          const ranges = selectedPriceRanges.map(idx => priceRanges[idx]);
          const minPrice = Math.min(...ranges.map(r => r.min));
          const maxPrice = Math.max(...ranges.map(r => r.max));
          params.set('minPrice', minPrice.toString());
          params.set('maxPrice', maxPrice.toString());
        }

        const response = await fetch(`/api/search?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }

        const data: SearchResponse = await response.json();
        
        if (data.success) {
          setBooks(data.books || []);
          setTotal(data.total || 0);
          setTotalPages(data.totalPages || 0);
          
          // Get categories for filter
          if (!categories.length) {
            const categoriesResponse = await fetch('/api/books?limit=1');
            const categoriesData = await categoriesResponse.json();
            if (categoriesData.categories) {
              setCategories(categoriesData.categories);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        message.error('Không thể tải kết quả tìm kiếm');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    } else {
      setLoading(false);
      setBooks([]);
      setTotal(0);
    }
  }, [searchParams, currentPage, sortBy, selectedCategory, selectedPriceRanges]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleCategoryClick = (slug: string | null) => {
    setSelectedCategory(slug);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (checkedValues: any) => {
    setSelectedPriceRanges(checkedValues);
    setCurrentPage(1);
  };

  const handlePrev = () => carouselRef.current?.prev();
  const handleNext = () => carouselRef.current?.next();

  const productCards = books.map(bookToProductCard);

  // Promotional books (randomly select some books)
  const promotionalBooks = productCards.slice(0, 10);

  return (
    <div>
      {/* Header Section */}
      <section className="text-[white] flex flex-col gap-5 justify-center items-center w-full h-35 m-auto bg-[url('/assets/bg5.png')] bg-[#9ac9db] bg-bottom bg-repeat-x py-10">
        <div className="text-2xl flex items-center gap-3">
          <FontAwesomeIcon icon={faSearch} />
          <span>Kết quả tìm kiếm</span>
        </div>
        <Breadcrumb
          items={[
            { title: <a href="/">Trang chủ</a> },
            { title: <span>Tìm kiếm</span> },
            { title: <span className="font-semibold">"{searchQuery}"</span> },
          ]}
        />
      </section>

      {/* Main Content */}
      <section className="max-w-[1200px] m-auto flex mt-10 gap-8 px-4">
        {/* Sidebar Filters */}
        <div className="w-[250px] pt-5 sticky top-[20px] h-fit hidden lg:block">
          <div className="flex flex-col text-[20px]">
            {/* Category Filter */}
            <div className="pb-7 relative inline-block after:content-[''] after:block after:w-20 after:h-[2px] after:bg-red-400 after:mt-5">
              Danh mục sách
            </div>
            <div className="flex flex-col gap-4 text-[15px]">
              <button
                onClick={() => handleCategoryClick(null)}
                className={`text-left hover:text-red-400 transition-colors ${
                  !selectedCategory ? 'text-red-400 font-semibold' : ''
                }`}
              >
                Tất cả sách
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.slug)}
                  className={`text-left hover:text-red-400 transition-colors ${
                    selectedCategory === category.slug ? 'text-red-400 font-semibold' : ''
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Price Filter */}
            <div className="pb-7 mt-14 relative inline-block after:content-[''] after:block after:w-20 after:h-[2px] after:bg-red-400 after:mt-5">
              Giá thành
            </div>
            <div className="flex flex-col gap-4 text-[15px]">
              <Checkbox.Group
                value={selectedPriceRanges}
                onChange={handlePriceRangeChange}
              >
                <div className="flex flex-col gap-3">
                  {priceRanges.map((range, index) => (
                    <Checkbox key={index} value={index}>
                      {range.label}
                    </Checkbox>
                  ))}
                </div>
              </Checkbox.Group>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="flex-1">
          {/* Search Info Bar */}
          <div className="p-5 flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="text-lg">
                {searchQuery ? (
                  <>
                    Tìm thấy <span className="font-bold text-red-500">{total}</span> kết quả cho{' '}
                    <span className="font-bold">"{searchQuery}"</span>
                  </>
                ) : (
                  <span className="text-gray-500">Vui lòng nhập từ khóa tìm kiếm</span>
                )}
              </h1>
              {total > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  Hiển thị {(currentPage - 1) * limit + 1} -{' '}
                  {Math.min(currentPage * limit, total)} sản phẩm
                </p>
              )}
            </div>
            
            {total > 0 && (
              <div className="flex gap-3 items-center">
                <div>
                  <span className="mr-2">Sắp xếp theo</span>
                  <FontAwesomeIcon icon={faFilter} />
                </div>
                <Select
                  style={{ width: 180 }}
                  value={sortBy}
                  onChange={handleSortChange}
                  options={[
                    { value: 'relevance', label: 'Liên quan nhất' },
                    { value: 'createdAt', label: 'Mới nhất' },
                    { value: 'bestseller', label: 'Bán chạy' },
                    { value: 'popular', label: 'Phổ biến' },
                    { value: 'price-asc', label: 'Giá thấp nhất' },
                    { value: 'price-desc', label: 'Giá cao nhất' },
                  ]}
                />
              </div>
            )}
          </div>

          {/* Pagination Top */}
          {total > 0 && (
            <div className="p-5 flex justify-center">
              <Pagination
                current={currentPage}
                total={total}
                pageSize={limit}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}

          {/* Results Grid */}
          {loading ? (
            <div className="flex flex-col justify-center items-center h-96 gap-4">
              <Spin size="large" />
              <p className="text-gray-500">Đang tìm kiếm...</p>
            </div>
          ) : !searchQuery ? (
            <div className="flex flex-col justify-center items-center h-96">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">Chưa có từ khóa tìm kiếm</p>
                    <p className="text-gray-500">Vui lòng nhập từ khóa vào thanh tìm kiếm</p>
                  </div>
                }
              />
            </div>
          ) : productCards.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
              {productCards.map((product) => (
                <CardComponent key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-96">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div className="text-center">
                    <p className="text-lg font-medium mb-2">
                      Không tìm thấy kết quả cho "{searchQuery}"
                    </p>
                    <p className="text-gray-500 mb-4">
                      Thử tìm kiếm với từ khóa khác hoặc xem các sản phẩm khuyến mãi bên dưới
                    </p>
                    <a 
                      href="/books" 
                      className="text-blue-500 hover:underline"
                    >
                      Xem tất cả sách →
                    </a>
                  </div>
                }
              />
            </div>
          )}

          {/* Pagination Bottom */}
          {total > 0 && (
            <div className="pt-15 flex justify-center mb-8">
              <Pagination
                current={currentPage}
                total={total}
                pageSize={limit}
                onChange={handlePageChange}
                showSizeChanger={false}
              />
            </div>
          )}
        </div>
      </section>

      {/* Promotional Section */}
      <section className="w-full p-20 mt-30 bg-[#ab8585] [background-image:url('/assets/bg1.png'),url('/assets/bg2.png')] [background-position:top_left,bottom_right] [background-repeat:no-repeat,no-repeat] border-b-4">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center text-5xl mb-20 flex justify-center items-center gap-10">
            <h1 className="text-[white]">Sản phẩm đang khuyến mãi</h1>
            <img className="zoom-anim w-[70px]" src="/assets/fire.png" alt="fire" />
          </div>

          {promotionalBooks.length > 0 && (
            <div className="relative px-15 my-10">
              <Carousel
                draggable
                swipeToSlide
                dots={false}
                slidesToShow={5}
                ref={carouselRef}
                responsive={[
                  { breakpoint: 1280, settings: { slidesToShow: 4 } },
                  { breakpoint: 1024, settings: { slidesToShow: 3 } },
                  { breakpoint: 768, settings: { slidesToShow: 2 } },
                  { breakpoint: 640, settings: { slidesToShow: 1 } },
                ]}
              >
                {promotionalBooks.map((product) => (
                  <div key={product.id} className="px-3">
                    <CardComponent product={product} />
                  </div>
                ))}
              </Carousel>
              <span
                className="text-[#CDC1FF] text-[40px] absolute top-1/2 transform -translate-y-1/2 right-0 hover:bg-[#e2e2e2] cursor-pointer py-1 rounded-[5px] transition-all"
                onClick={handleNext}
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
              <span
                className="text-[#CDC1FF] text-[40px] absolute top-1/2 transform -translate-y-1/2 left-0 hover:bg-[#e2e2e2] cursor-pointer py-1 rounded-[5px] transition-all"
                onClick={handlePrev}
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </span>
            </div>
          )}

          <div className="flex justify-center">
            <a href="/books">
              <ButtonComponent content="Xem thêm sách" type="primary" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    }>
      <SearchResultsContent />
    </Suspense>
  );
}
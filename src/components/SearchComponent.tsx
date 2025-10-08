import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faUser, faTag, faSpinner, faTimes } from '@fortawesome/free-solid-svg-icons';

interface Book {
  id: string;
  title: string;
  slug: string;
  coverImage: string | null;
  price: string;
  author: {
    id: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
}

interface Author {
  id: string;
  name: string;
  slug: string;
  _count?: {
    books: number;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count?: {
    books: number;
  };
}

interface SearchResults {
  books: Book[];
  authors: Author[];
  categories: Category[];
}

interface SearchComponentProps {
  size?: 'large' | 'medium';
  showIcon?: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ 
  size = 'large', 
  showIcon = true 
}) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SearchResults>({ 
    books: [], 
    authors: [], 
    categories: [] 
  });
  const [error, setError] = useState<string | null>(null);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Search with debounce
  useEffect(() => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    if (searchTerm.length < 2) {
      setResults({ books: [], authors: [], categories: [] });
      setIsOpen(false);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    const timer = setTimeout(async () => {
      try {
        // Create new abort controller for this request
        abortControllerRef.current = new AbortController();

        const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`, {
          signal: abortControllerRef.current.signal
        });

        if (!response.ok) {
          throw new Error('Không thể tìm kiếm');
        }

        const data: SearchResults = await response.json();
        
        setResults(data);
        setIsOpen(true);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          // Request was cancelled, ignore
          return;
        }
        console.error('Search error:', err);
        setError('Có lỗi xảy ra khi tìm kiếm');
        setResults({ books: [], authors: [], categories: [] });
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
      setSearchTerm('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleItemClick = (type: 'book' | 'author' | 'category', slug: string) => {
    const routes = {
      book: `/books/${slug}`,
      author: `/authors/${slug}`,
      category: `/categories/${slug}`
    };
    
    router.push(routes[type]);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    setError(null);
    inputRef.current?.focus();
  };

  const formatPrice = (price: string | number): string => {
    const numPrice = typeof price === 'string' ? parseFloat(price) : price;
    return new Intl.NumberFormat('vi-VN').format(numPrice) + 'đ';
  };

  const hasResults = results.books.length > 0 || results.authors.length > 0 || results.categories.length > 0;

  return (
    <div ref={searchRef} className="relative w-full">
      <div className={`flex items-stretch bg-white rounded-lg overflow-hidden border-2 border-gray-300 focus-within:border-[#96C8DD] transition-all shadow-sm ${
        size === 'large' ? 'h-12' : 'h-10'
      }`}>
        {showIcon && (
          <div className={`flex items-center justify-center bg-gray-50 border-r border-gray-300 ${
            size === 'large' ? 'px-4' : 'px-3'
          }`}>
            <FontAwesomeIcon icon={faSearch} className="text-gray-400" />
          </div>
        )}
        
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => searchTerm.length >= 2 && setIsOpen(true)}
          placeholder="Tìm kiếm sách, tác giả, thể loại..."
          className={`flex-1 outline-none text-gray-700 bg-white ${
            size === 'large' ? 'px-4 text-base' : 'px-3 text-sm'
          }`}
        />

        {searchTerm && (
          <button
            type="button"
            onClick={handleClear}
            className="px-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Clear search"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        )}

        {isLoading && (
          <div className="flex items-center px-3">
            <FontAwesomeIcon icon={faSpinner} className="text-[#96C8DD] animate-spin" />
          </div>
        )}

        <button
          type="button"
          onClick={handleSearch}
          className={`bg-gradient-to-r from-[#96C8DD] to-[#7ab8cc] text-white font-semibold hover:from-[#7ab8cc] hover:to-[#68a6b8] transition-all ${
            size === 'large' ? 'px-6 text-base' : 'px-4 text-sm'
          }`}
        >
          Tìm kiếm
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-lg shadow-2xl border border-gray-200 max-h-[500px] overflow-y-auto z-50">
          {error && (
            <div className="p-8 text-center text-red-500">
              <p className="font-medium">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="mt-2 text-sm text-blue-500 hover:underline"
              >
                Thử lại
              </button>
            </div>
          )}

          {!hasResults && !isLoading && !error && (
            <div className="p-8 text-center text-gray-500">
              <FontAwesomeIcon icon={faSearch} className="text-4xl mb-3 text-gray-300" />
              <p className="font-medium">Không tìm thấy kết quả phù hợp</p>
              <p className="text-sm mt-1">Thử tìm kiếm với từ khóa khác</p>
            </div>
          )}

          {results.books.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FontAwesomeIcon icon={faBook} className="text-[#96C8DD]" />
                  <span>SÁCH ({results.books.length})</span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {results.books.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => handleItemClick('book', book.slug)}
                    className="p-4 hover:bg-blue-50 cursor-pointer transition-colors flex items-center gap-4"
                  >
                    <img
                      src={book.coverImage || '/placeholder-book.png'}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded shadow-sm flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder-book.png';
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-800 mb-1 line-clamp-2 text-sm">
                        {book.title}
                      </h4>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faUser} className="text-[10px]" />
                          {book.author.name}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <FontAwesomeIcon icon={faTag} className="text-[10px]" />
                          {book.category.name}
                        </span>
                      </div>
                      <p className="text-orange-500 font-semibold mt-2 text-sm">
                        {formatPrice(book.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.authors.length > 0 && (
            <div className="border-b border-gray-100">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FontAwesomeIcon icon={faUser} className="text-[#96C8DD]" />
                  <span>TÁC GIẢ ({results.authors.length})</span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {results.authors.map((author) => (
                  <div
                    key={author.id}
                    onClick={() => handleItemClick('author', author.slug)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#96C8DD] to-[#7ab8cc] flex items-center justify-center text-white font-semibold">
                        {author.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{author.name}</p>
                        <p className="text-xs text-gray-500">
                          {author._count?.books || 0} cuốn sách
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {results.categories.length > 0 && (
            <div>
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FontAwesomeIcon icon={faTag} className="text-[#96C8DD]" />
                  <span>THỂ LOẠI ({results.categories.length})</span>
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {results.categories.map((category) => (
                  <div
                    key={category.id}
                    onClick={() => handleItemClick('category', category.slug)}
                    className="px-4 py-3 hover:bg-blue-50 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                        <FontAwesomeIcon icon={faTag} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-sm">{category.name}</p>
                        <p className="text-xs text-gray-500">
                          {category._count?.books || 0} cuốn sách
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasResults && (
            <div className="px-4 py-3 bg-gray-50 border-t border-gray-200">
              <button
                type="button"
                onClick={handleSearch}
                className="w-full text-center text-[#96C8DD] hover:text-[#7ab8cc] font-semibold text-sm transition-colors"
              >
                Xem tất cả kết quả cho "{searchTerm}" →
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchComponent;
// "use client";

// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { useAuth } from './AuthContext';

// interface FavoritesContextType {
//   favoriteIds: string[];
//   isFavorite: (bookId: string) => boolean;
//   toggleFavorite: (bookId: string) => Promise<{ success: boolean; message: string; action?: string }>;
//   refreshFavorites: () => Promise<void>;
//   loading: boolean;
// }

// const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// export function FavoritesProvider({ children }: { children: React.ReactNode }) {
//   const { user } = useAuth();
//   const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
//   const [loading, setLoading] = useState(false);

//   // Load favorites when user logs in
//   useEffect(() => {
//     if (user) {
//       refreshFavorites();
//     } else {
//       setFavoriteIds([]);
//     }
//   }, [user]);

//   const refreshFavorites = async () => {
//     if (!user) return;

//     setLoading(true);
//     try {
//       const response = await fetch('/api/user/favorites');
//       if (response.ok) {
//         const data = await response.json();
//         const ids = data.favorites.map((fav: any) => fav.id);
//         setFavoriteIds(ids);
//       }
//     } catch (error) {
//       console.error('Error refreshing favorites:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isFavorite = (bookId: string): boolean => {
//     return favoriteIds.includes(bookId);
//   };

//   const toggleFavorite = async (bookId: string): Promise<{ success: boolean; message: string; action?: string }> => {
//     if (!user) {
//       return { success: false, message: 'Vui lòng đăng nhập' };
//     }

//     try {
//       const response = await fetch('/api/user/favorites', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ bookId }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         // Update local state
//         if (data.action === 'added') {
//           setFavoriteIds(prev => [...prev, bookId]);
//         } else {
//           setFavoriteIds(prev => prev.filter(id => id !== bookId));
//         }
//         return { success: true, message: data.message, action: data.action };
//       }

//       return { success: false, message: data.message };
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//       return { success: false, message: 'Không thể kết nối đến server' };
//     }
//   };

//   return (
//     <FavoritesContext.Provider
//       value={{
//         favoriteIds,
//         isFavorite,
//         toggleFavorite,
//         refreshFavorites,
//         loading,
//       }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   );
// }

// export function useFavorites() {
//   const context = useContext(FavoritesContext);
//   if (context === undefined) {
//     throw new Error('useFavorites must be used within a FavoritesProvider');
//   }
//   return context;
// }
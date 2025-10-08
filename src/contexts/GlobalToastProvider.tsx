// "use client";

// import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
// import { useSearchParams } from 'next/navigation';
// import { ToastContainer, useToast as useLocalToast } from '@/components/Toast';
// import type { ToastType } from '@/components/Toast';

// interface ToastContextType {
//   success: (message: string, duration?: number) => void;
//   error: (message: string, duration?: number) => void;
//   warning: (message: string, duration?: number) => void;
//   info: (message: string, duration?: number) => void;
// }

// const ToastContext = createContext<ToastContextType | undefined>(undefined);

// export function GlobalToastProvider({ children }: { children: React.ReactNode }) {
//   const { toast, toasts, closeToast } = useLocalToast();
//   const searchParams = useSearchParams();
//   const processedParams = useRef<string | null>(null);

//   // Check for toast in URL params - only process ONCE per unique URL
//   useEffect(() => {
//     const toastMessage = searchParams.get('toast');
//     const toastType = searchParams.get('toastType') as ToastType | null;
//     const currentParams = `${toastMessage}-${toastType}`;
    
//     // Skip if we already processed these exact params
//     if (processedParams.current === currentParams) {
//       return;
//     }
    
//     if (toastMessage && toastType) {
//       processedParams.current = currentParams;
      
//       // Small delay to ensure page has loaded
//       setTimeout(() => {
//         toast[toastType](decodeURIComponent(toastMessage));
        
//         // Clean up URL after showing toast
//         if (typeof window !== 'undefined') {
//           const newUrl = window.location.pathname;
//           window.history.replaceState({}, '', newUrl);
//         }
//       }, 100);
//     } else {
//       // Reset when no toast params
//       processedParams.current = null;
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [searchParams]); // Only depend on searchParams, NOT on toast

//   const contextValue: ToastContextType = {
//     success: useCallback((message: string, duration?: number) => {
//       toast.success(message, duration);
//     }, [toast]),
//     error: useCallback((message: string, duration?: number) => {
//       toast.error(message, duration);
//     }, [toast]),
//     warning: useCallback((message: string, duration?: number) => {
//       toast.warning(message, duration);
//     }, [toast]),
//     info: useCallback((message: string, duration?: number) => {
//       toast.info(message, duration);
//     }, [toast]),
//   };

//   return (
//     <ToastContext.Provider value={contextValue}>
//       {children}
//       <ToastContainer toasts={toasts} onClose={closeToast} />
//     </ToastContext.Provider>
//   );
// }

// export function useGlobalToast() {
//   const context = useContext(ToastContext);
//   if (context === undefined) {
//     throw new Error('useGlobalToast must be used within a GlobalToastProvider');
//   }
//   return context;
// }
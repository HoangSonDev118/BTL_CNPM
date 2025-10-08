// Lưu file này tại: src/components/Toast.tsx

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faTimesCircle,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

interface ToastProps extends ToastMessage {
  onClose: (id: string) => void;
}

const Toast: React.FC<ToastProps> = ({ id, type, message, duration = 5000, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = useCallback(() => {
    console.log('Toast handleClose called for:', id);
    setIsExiting(true);
    setTimeout(() => {
      console.log('Toast closing:', id);
      onClose(id);
    }, 300);
  }, [id, onClose]);

  useEffect(() => {
    console.log('Toast mounted:', { id, type, message });
    
    // Trigger slide-in animation
    const showTimer = setTimeout(() => {
      console.log('Toast showing:', id);
      setIsVisible(true);
    }, 10);

    // Auto close after duration
    const closeTimer = setTimeout(() => {
      console.log('Toast auto-closing:', id);
      handleClose();
    }, duration);

    return () => {
      console.log('Toast cleanup:', id);
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [duration, id, handleClose]);

  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          bgClass: 'bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500',
          icon: faCheckCircle,
          iconColor: 'text-green-500',
          progressColor: 'bg-green-500',
        };
      case 'error':
        return {
          bgClass: 'bg-gradient-to-r from-red-50 to-rose-50 border-l-4 border-red-500',
          icon: faTimesCircle,
          iconColor: 'text-red-500',
          progressColor: 'bg-red-500',
        };
      case 'warning':
        return {
          bgClass: 'bg-gradient-to-r from-amber-50 to-yellow-50 border-l-4 border-amber-500',
          icon: faExclamationCircle,
          iconColor: 'text-amber-500',
          progressColor: 'bg-amber-500',
        };
      case 'info':
        return {
          bgClass: 'bg-gradient-to-r from-blue-50 to-sky-50 border-l-4 border-blue-500',
          icon: faInfoCircle,
          iconColor: 'text-blue-500',
          progressColor: 'bg-blue-500',
        };
    }
  };

  const config = getToastConfig();

  return (
    <div
      className={`transform transition-all duration-300 ease-out ${
        isVisible && !isExiting
          ? 'translate-x-0 opacity-100'
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-start gap-3 p-4 rounded-lg shadow-xl min-w-[320px] max-w-[480px] backdrop-blur-sm ${config.bgClass}`}>
        <div className="flex-shrink-0 mt-0.5">
          <FontAwesomeIcon icon={config.icon} className={`text-xl ${config.iconColor}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 break-words leading-relaxed">
            {message}
          </p>
        </div>

        <button
          onClick={handleClose}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors p-1"
          aria-label="Đóng"
        >
          <FontAwesomeIcon icon={faTimes} className="text-sm" />
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-gray-200 rounded-b-lg overflow-hidden">
        <div
          className={`h-full ${config.progressColor}`}
          style={{
            width: isExiting ? '0%' : '100%',
            transition: isExiting ? 'width 0.3s ease-out' : `width ${duration}ms linear`,
          }}
        />
      </div>
    </div>
  );
};

// Toast Container
interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
  console.log('ToastContainer render, toasts count:', toasts.length, toasts);
  
  if (toasts.length === 0) {
    console.log('ToastContainer: No toasts to display');
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 pointer-events-none">
      <div className="pointer-events-auto flex flex-col gap-3">
        {toasts.map((toast) => {
          console.log('Rendering toast:', toast.id);
          return (
            <Toast
              key={toast.id}
              {...toast}
              onClose={onClose}
            />
          );
        })}
      </div>
    </div>
  );
};

// Custom Hook
export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    console.log('useToast: toasts state changed:', toasts);
  }, [toasts]);

  const showToast = useCallback((type: ToastType, message: string, duration?: number) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: ToastMessage = { id, type, message, duration };
    
    console.log('useToast: showToast called', { type, message, id });
    
    setToasts((prev) => {
      console.log('useToast: Adding toast, prev count:', prev.length);
      const updated = [...prev, newToast];
      console.log('useToast: New toasts array:', updated);
      return updated;
    });
  }, []);

  const closeToast = useCallback((id: string) => {
    console.log('useToast: closeToast called for:', id);
    setToasts((prev) => {
      const updated = prev.filter((toast) => toast.id !== id);
      console.log('useToast: Removed toast, remaining:', updated.length);
      return updated;
    });
  }, []);

  const toast = {
    success: useCallback((message: string, duration?: number) => {
      console.log('🎉 SUCCESS TOAST CALLED:', message);
      showToast('success', message, duration);
    }, [showToast]),
    error: useCallback((message: string, duration?: number) => {
      console.log('❌ ERROR TOAST CALLED:', message);
      showToast('error', message, duration);
    }, [showToast]),
    warning: useCallback((message: string, duration?: number) => {
      console.log('⚠️ WARNING TOAST CALLED:', message);
      showToast('warning', message, duration);
    }, [showToast]),
    info: useCallback((message: string, duration?: number) => {
      console.log('ℹ️ INFO TOAST CALLED:', message);
      showToast('info', message, duration);
    }, [showToast]),
  };

  return { toast, toasts, closeToast };
};

export default Toast;
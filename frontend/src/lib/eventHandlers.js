// Optimized event handler utilities for better performance

// Check if requestIdleCallback is available, fallback to setTimeout
const requestIdleCallback = window.requestIdleCallback || 
  ((callback) => setTimeout(callback, 1));

// Check if requestAnimationFrame is available, fallback to setTimeout
const requestAnimationFrame = window.requestAnimationFrame || 
  ((callback) => setTimeout(callback, 16));

// Debounce function for input handlers
export const debounceInput = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle function for scroll and resize handlers
export const throttleEvent = (func, limit = 16) => {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Optimized click handler using requestIdleCallback
export const optimizedClick = (callback) => {
  return (event) => {
    // Prevent default only if needed
    if (event.preventDefault) {
      event.preventDefault();
    }
    
    // Use requestIdleCallback for non-critical operations
    requestIdleCallback(() => {
      callback(event);
    }, { timeout: 100 });
  };
};

// Optimized navigation handler
export const optimizedNavigate = (navigate, path) => {
  return optimizedClick(() => {
    // Use requestAnimationFrame for smooth navigation
    requestAnimationFrame(() => {
      navigate(path);
    });
  });
};

// Optimized form submission handler
export const optimizedSubmit = (callback) => {
  return (event) => {
    event.preventDefault();
    
    // Use requestIdleCallback for form processing
    requestIdleCallback(() => {
      callback(event);
    }, { timeout: 200 });
  };
};

// Optimized input change handler with debouncing
export const optimizedInputChange = (callback, delay = 300) => {
  const debouncedCallback = debounceInput(callback, delay);
  
  return (event) => {
    const value = event.target.value;
    
    // Immediate update for UI feedback
    if (event.target.dataset.immediate) {
      callback(event);
    } else {
      // Debounced update for performance
      debouncedCallback(event);
    }
  };
};

// Optimized hover handlers
export const optimizedHover = {
  enter: (callback) => {
    return (event) => {
      // Use requestAnimationFrame for smooth hover effects
      requestAnimationFrame(() => {
        callback(event);
      });
    };
  },
  
  leave: (callback) => {
    return (event) => {
      // Use requestIdleCallback for cleanup operations
      requestIdleCallback(() => {
        callback(event);
      }, { timeout: 50 });
    };
  }
};

// Optimized scroll handler with throttling
export const optimizedScroll = (callback) => {
  const throttledCallback = throttleEvent(callback, 16);
  
  return (event) => {
    // Use requestAnimationFrame for smooth scrolling
    requestAnimationFrame(() => {
      throttledCallback(event);
    });
  };
};

// Optimized resize handler with throttling
export const optimizedResize = (callback) => {
  const throttledCallback = throttleEvent(callback, 100);
  
  return (event) => {
    // Use requestIdleCallback for resize operations
    requestIdleCallback(() => {
      throttledCallback(event);
    }, { timeout: 150 });
  };
};

// Batch multiple state updates
export const batchStateUpdates = (updates) => {
  return () => {
    // Use requestAnimationFrame to batch updates
    requestAnimationFrame(() => {
      updates.forEach(update => update());
    });
  };
};

// Optimized image loading
export const optimizedImageLoad = (callback) => {
  return (event) => {
    // Use requestIdleCallback for image processing
    requestIdleCallback(() => {
      callback(event);
    }, { timeout: 100 });
  };
};

// Optimized modal open/close
export const optimizedModalToggle = (setter, value) => {
  return optimizedClick(() => {
    // Use requestAnimationFrame for smooth modal transitions
    requestAnimationFrame(() => {
      setter(value);
    });
  });
};

// Memory-efficient event listener cleanup
export const createEventCleanup = () => {
  const listeners = new Map();
  
  const addListener = (element, event, handler, options = {}) => {
    const wrappedHandler = (e) => {
      // Prevent memory leaks
      if (element && element.parentNode) {
        handler(e);
      }
    };
    
    element.addEventListener(event, wrappedHandler, options);
    listeners.set(`${event}-${element.id || Math.random()}`, {
      element,
      event,
      handler: wrappedHandler,
      options
    });
    
    return wrappedHandler;
  };
  
  const removeAllListeners = () => {
    listeners.forEach(({ element, event, handler, options }) => {
      if (element && element.parentNode) {
        element.removeEventListener(event, handler, options);
      }
    });
    listeners.clear();
  };
  
  return { addListener, removeAllListeners };
};

// Performance monitoring for event handlers
export const monitorEventPerformance = (handlerName, handler) => {
  return (...args) => {
    const start = performance.now();
    
    try {
      const result = handler(...args);
      const duration = performance.now() - start;
      
      // Log slow event handlers in development
      if (process.env.NODE_ENV === 'development' && duration > 16) {
        console.warn(`Slow event handler: ${handlerName} took ${duration.toFixed(2)}ms`);
      }
      
      return result;
    } catch (error) {
      const duration = performance.now() - start;
      console.error(`Event handler error in ${handlerName} after ${duration.toFixed(2)}ms:`, error);
      throw error;
    }
  };
};

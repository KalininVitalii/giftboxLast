import { useCallback, useRef, useEffect } from 'react';

// Custom hook for monitoring and optimizing event handlers
export const useEventPerformance = (handlerName, handler, options = {}) => {
  const {
    debounceMs = 0,
    throttleMs = 0,
    useRequestIdleCallback = true,
    useRequestAnimationFrame = false,
    maxExecutionTime = 16, // 16ms = 60fps
    enableLogging = process.env.NODE_ENV === 'development'
  } = options;

  const executionTimes = useRef([]);
  const lastExecution = useRef(0);
  const timeoutRef = useRef(null);
  const throttleRef = useRef(false);

  // Performance monitoring wrapper
  const monitoredHandler = useCallback((...args) => {
    const startTime = performance.now();
    
    try {
      const result = handler(...args);
      const executionTime = performance.now() - startTime;
      
      // Track execution times for performance analysis
      executionTimes.current.push(executionTime);
      if (executionTimes.current.length > 100) {
        executionTimes.current.shift();
      }
      
      // Log slow handlers in development
      if (enableLogging && executionTime > maxExecutionTime) {
        console.warn(
          `Slow event handler: ${handlerName} took ${executionTime.toFixed(2)}ms (target: ${maxExecutionTime}ms)`
        );
      }
      
      return result;
    } catch (error) {
      const executionTime = performance.now() - startTime;
      console.error(
        `Event handler error in ${handlerName} after ${executionTime.toFixed(2)}ms:`,
        error
      );
      throw error;
    }
  }, [handler, handlerName, maxExecutionTime, enableLogging]);

  // Debounced version
  const debouncedHandler = useCallback((...args) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      monitoredHandler(...args);
    }, debounceMs);
  }, [monitoredHandler, debounceMs]);

  // Throttled version
  const throttledHandler = useCallback((...args) => {
    if (throttleRef.current) return;
    
    throttleRef.current = true;
    monitoredHandler(...args);
    
    setTimeout(() => {
      throttleRef.current = false;
    }, throttleMs);
  }, [monitoredHandler, throttleMs]);

  // RequestIdleCallback version
  const idleCallbackHandler = useCallback((...args) => {
    if (useRequestIdleCallback && window.requestIdleCallback) {
      window.requestIdleCallback(
        () => monitoredHandler(...args),
        { timeout: 100 }
      );
    } else {
      // Fallback to setTimeout for older browsers
      setTimeout(() => monitoredHandler(...args), 0);
    }
  }, [monitoredHandler, useRequestIdleCallback]);

  // RequestAnimationFrame version
  const animationFrameHandler = useCallback((...args) => {
    if (useRequestAnimationFrame && window.requestAnimationFrame) {
      window.requestAnimationFrame(() => monitoredHandler(...args));
    } else {
      monitoredHandler(...args);
    }
  }, [monitoredHandler, useRequestAnimationFrame]);

  // Get performance statistics
  const getPerformanceStats = useCallback(() => {
    const times = executionTimes.current;
    if (times.length === 0) return null;
    
    const avg = times.reduce((sum, time) => sum + time, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);
    const slowCount = times.filter(time => time > maxExecutionTime).length;
    
    return {
      totalExecutions: times.length,
      averageTime: avg,
      minTime: min,
      maxTime: max,
      slowExecutions: slowCount,
      slowPercentage: (slowCount / times.length) * 100
    };
  }, [maxExecutionTime]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Return the appropriate handler based on options
  if (debounceMs > 0) {
    return debouncedHandler;
  }
  
  if (throttleMs > 0) {
    return throttledHandler;
  }
  
  if (useRequestIdleCallback) {
    return idleCallbackHandler;
  }
  
  if (useRequestAnimationFrame) {
    return animationFrameHandler;
  }
  
  return monitoredHandler;
};

// Hook for optimizing form input handlers
export const useOptimizedInput = (handler, options = {}) => {
  const {
    debounceMs = 300,
    immediate = false,
    validate = null
  } = options;

  const inputHandler = useEventPerformance('input', handler, {
    debounceMs: immediate ? 0 : debounceMs,
    useRequestIdleCallback: false
  });

  return useCallback((event) => {
    const value = event.target.value;
    
    // Immediate validation if provided
    if (validate && !validate(value)) {
      return;
    }
    
    inputHandler(event);
  }, [inputHandler, validate]);
};

// Hook for optimizing scroll handlers
export const useOptimizedScroll = (handler, options = {}) => {
  const {
    throttleMs = 16, // 60fps
    useRequestAnimationFrame = true
  } = options;

  return useEventPerformance('scroll', handler, {
    throttleMs,
    useRequestAnimationFrame,
    useRequestIdleCallback: false
  });
};

// Hook for optimizing resize handlers
export const useOptimizedResize = (handler, options = {}) => {
  const {
    throttleMs = 100,
    useRequestIdleCallback = true
  } = options;

  return useEventPerformance('resize', handler, {
    throttleMs,
    useRequestIdleCallback,
    useRequestAnimationFrame: false
  });
};

// Hook for optimizing click handlers
export const useOptimizedClick = (handler, options = {}) => {
  const {
    preventDefault = true,
    useRequestIdleCallback = true
  } = options;

  return useEventPerformance('click', (event) => {
    if (preventDefault && event.preventDefault) {
      event.preventDefault();
    }
    handler(event);
  }, {
    useRequestIdleCallback,
    useRequestAnimationFrame: false
  });
};

// Hook for optimizing hover handlers
export const useOptimizedHover = (enterHandler, leaveHandler, options = {}) => {
  const {
    enterDelay = 0,
    leaveDelay = 0,
    useRequestAnimationFrame = true
  } = options;

  const optimizedEnter = useEventPerformance('hover-enter', enterHandler, {
    useRequestAnimationFrame,
    useRequestIdleCallback: false
  });

  const optimizedLeave = useEventPerformance('hover-leave', leaveHandler, {
    useRequestIdleCallback: true,
    useRequestAnimationFrame: false
  });

  return {
    onMouseEnter: useCallback((event) => {
      if (enterDelay > 0) {
        setTimeout(() => optimizedEnter(event), enterDelay);
      } else {
        optimizedEnter(event);
      }
    }, [optimizedEnter, enterDelay]),
    
    onMouseLeave: useCallback((event) => {
      if (leaveDelay > 0) {
        setTimeout(() => optimizedLeave(event), leaveDelay);
      } else {
        optimizedLeave(event);
      }
    }, [optimizedLeave, leaveDelay])
  };
};

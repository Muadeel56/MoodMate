import React, { Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { PageLoading } from './';

// Animation variants for different transition types
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 0.98
  }
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4
};

// Slide transition variants
const slideVariants = {
  initial: {
    x: "100%"
  },
  in: {
    x: 0
  },
  out: {
    x: "-100%"
  }
};

const slideTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5
};

// Fade transition variants
const fadeVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const fadeTransition = {
  type: "tween",
  ease: "easeInOut",
  duration: 0.3
};

// Scale transition variants
const scaleVariants = {
  initial: {
    opacity: 0,
    scale: 0.8
  },
  in: {
    opacity: 1,
    scale: 1
  },
  out: {
    opacity: 0,
    scale: 1.1
  }
};

const scaleTransition = {
  type: "spring",
  stiffness: 300,
  damping: 30
};

// Route-specific transition configurations
const routeTransitions = {
  "/": { type: "page", duration: 0.4 },
  "/about": { type: "fade", duration: 0.3 },
  "/login": { type: "slide", duration: 0.5 },
  "/register": { type: "slide", duration: 0.5 },
  "/dashboard": { type: "scale", duration: 0.4 },
  "/404": { type: "fade", duration: 0.2 }
};

function PageTransition({ 
  children, 
  transitionType = "auto", // "auto", "page", "slide", "fade", "scale"
  className = "",
  showLoading = false,
  loadingMessage = "Loading...",
  ...props 
}) {
  const location = useLocation();

  // Get transition configuration based on route or specified type
  const getTransitionConfig = () => {
    if (transitionType === "auto") {
      const routeConfig = routeTransitions[location.pathname];
      return routeConfig || { type: "page", duration: 0.4 };
    }
    
    return { type: transitionType, duration: 0.4 };
  };

  const config = getTransitionConfig();

  // Select animation variants based on transition type
  const getVariants = () => {
    switch (config.type) {
      case "slide":
        return slideVariants;
      case "fade":
        return fadeVariants;
      case "scale":
        return scaleVariants;
      default:
        return pageVariants;
    }
  };

  // Select transition config based on transition type
  const getTransition = () => {
    const baseTransition = (() => {
      switch (config.type) {
        case "slide":
          return slideTransition;
        case "fade":
          return fadeTransition;
        case "scale":
          return scaleTransition;
        default:
          return pageTransition;
      }
    })();

    // Override duration if specified
    if (config.duration) {
      return { ...baseTransition, duration: config.duration };
    }

    return baseTransition;
  };

  const content = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={getVariants()}
        transition={getTransition()}
        className={className}
        {...props}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );

  // Wrap with Suspense if loading is enabled
  if (showLoading) {
    return (
      <Suspense fallback={<PageLoading message={loadingMessage} />}>
        {content}
      </Suspense>
    );
  }

  return content;
}

export default PageTransition; 
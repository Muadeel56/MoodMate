import React from 'react';
import { motion } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';

const PageLoading = ({ 
  message = 'Loading...',
  showSpinner = true,
  className = '',
  ...props 
}) => {
  const containerVariants = {
    initial: {
      opacity: 0
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  const contentVariants = {
    initial: {
      y: 20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.1,
        duration: 0.4
      }
    }
  };

  return (
    <motion.div
      className={`
        fixed inset-0 
        flex items-center justify-center 
        bg-white dark:bg-gray-900 
        z-50 
        ${className}
      `}
      variants={containerVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      {...props}
    >
      <motion.div
        className="flex flex-col items-center space-y-4"
        variants={contentVariants}
      >
        {showSpinner && (
          <LoadingSpinner 
            size="large" 
            color="primary"
            className="mb-4"
          />
        )}
        
        {message && (
          <motion.p
            className="text-gray-600 dark:text-gray-300 text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          >
            {message}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PageLoading; 
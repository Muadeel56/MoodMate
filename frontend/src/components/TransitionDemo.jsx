import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LoadingSpinner, PageLoading } from './';

const TransitionDemo = () => {
  const [currentTransition, setCurrentTransition] = useState('page');
  const [showLoading, setShowLoading] = useState(false);

  const transitionTypes = [
    { key: 'page', name: 'Page Transition', description: 'Smooth fade with scale and movement' },
    { key: 'slide', name: 'Slide Transition', description: 'Horizontal slide animation' },
    { key: 'fade', name: 'Fade Transition', description: 'Simple opacity fade' },
    { key: 'scale', name: 'Scale Transition', description: 'Scale with spring animation' }
  ];

  const demoContent = {
    page: (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ type: "tween", ease: "anticipate", duration: 0.4 }}
        className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">Page Transition</h3>
        <p className="text-gray-600 dark:text-gray-300">
          This demonstrates the default page transition with smooth fade, scale, and movement effects.
        </p>
      </motion.div>
    ),
    slide: (
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "-100%" }}
        transition={{ type: "tween", ease: "anticipate", duration: 0.5 }}
        className="p-8 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-blue-800 dark:text-blue-200">Slide Transition</h3>
        <p className="text-blue-600 dark:text-blue-300">
          This demonstrates the slide transition with horizontal movement.
        </p>
      </motion.div>
    ),
    fade: (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
        className="p-8 bg-green-50 dark:bg-green-900 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-green-800 dark:text-green-200">Fade Transition</h3>
        <p className="text-green-600 dark:text-green-300">
          This demonstrates the fade transition with simple opacity changes.
        </p>
      </motion.div>
    ),
    scale: (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="p-8 bg-purple-50 dark:bg-purple-900 rounded-lg shadow-lg"
      >
        <h3 className="text-2xl font-bold mb-4 text-purple-800 dark:text-purple-200">Scale Transition</h3>
        <p className="text-purple-600 dark:text-purple-300">
          This demonstrates the scale transition with spring physics.
        </p>
      </motion.div>
    )
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Framer Motion Transitions Demo
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Transition Type Selector */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Transition Types
            </h2>
            <div className="space-y-2">
              {transitionTypes.map((type) => (
                <button
                  key={type.key}
                  onClick={() => setCurrentTransition(type.key)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                    currentTransition === type.key
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                >
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {type.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {type.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Area */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
              Live Demo
            </h2>
            <div className="h-64 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
              {demoContent[currentTransition]}
            </div>
          </div>
        </div>

        {/* Loading States Demo */}
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
            Loading States
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Small Spinner</h3>
              <div className="flex justify-center">
                <LoadingSpinner size="small" />
              </div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Large Spinner</h3>
              <div className="flex justify-center">
                <LoadingSpinner size="large" color="success" />
              </div>
            </div>
            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h3 className="font-semibold mb-2 text-gray-800 dark:text-white">Page Loading</h3>
              <button
                onClick={() => setShowLoading(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Show Loading
              </button>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">
            Usage Example
          </h3>
          <pre className="text-sm text-gray-700 dark:text-gray-300 overflow-x-auto">
{`// Basic usage with auto transitions
<PageTransition>
  <YourComponent />
</PageTransition>

// Custom transition type
<PageTransition transitionType="slide">
  <YourComponent />
</PageTransition>

// With loading state
<PageTransition showLoading={true} loadingMessage="Loading...">
  <YourComponent />
</PageTransition>`}
          </pre>
        </div>
      </div>

      {/* Full-screen loading overlay */}
      {showLoading && (
        <PageLoading 
          message="Loading demo content..." 
          onAnimationComplete={() => {
            setTimeout(() => setShowLoading(false), 2000);
          }}
        />
      )}
    </div>
  );
};

export default TransitionDemo; 
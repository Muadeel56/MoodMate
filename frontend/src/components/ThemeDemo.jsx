import React from 'react';
import { useTheme } from '../contexts';
import { themeClasses } from '../styles/theme';

const ThemeDemo = () => {
  const { isDark } = useTheme();

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h2 className={`text-2xl font-bold ${themeClasses.text.primary} mb-2`}>
          Theme System Demo
        </h2>
        <p className={themeClasses.text.secondary}>
          Current theme: <span className="font-semibold">{isDark ? 'Dark' : 'Light'}</span>
        </p>
      </div>

      {/* Color Palette */}
      <div className={`${themeClasses.components.card} p-6 rounded-lg`}>
        <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}>Color Palette</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`w-16 h-16 ${themeClasses.backgrounds.primary} rounded-lg mx-auto mb-2`}></div>
            <p className={`text-sm ${themeClasses.text.secondary}`}>Primary</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 ${themeClasses.backgrounds.secondary} rounded-lg mx-auto mb-2`}></div>
            <p className={`text-sm ${themeClasses.text.secondary}`}>Secondary</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 ${themeClasses.backgrounds.tertiary} rounded-lg mx-auto mb-2`}></div>
            <p className={`text-sm ${themeClasses.text.secondary}`}>Tertiary</p>
          </div>
          <div className="text-center">
            <div className={`w-16 h-16 ${themeClasses.backgrounds.card} rounded-lg mx-auto mb-2 border ${themeClasses.borders.primary}`}></div>
            <p className={`text-sm ${themeClasses.text.secondary}`}>Card</p>
          </div>
        </div>
      </div>

      {/* Text Examples */}
      <div className={`${themeClasses.components.card} p-6 rounded-lg`}>
        <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}>Text Examples</h3>
        <div className="space-y-2">
          <p className={`${themeClasses.text.primary} text-lg`}>Primary Text - Main content</p>
          <p className={themeClasses.text.secondary}>Secondary Text - Supporting content</p>
          <p className={`${themeClasses.text.tertiary} text-sm`}>Tertiary Text - Muted content</p>
          <p className={`${themeClasses.text.inverse} ${themeClasses.backgrounds.primary} p-2 rounded`}>Inverse Text - On colored backgrounds</p>
        </div>
      </div>

      {/* Status Colors */}
      <div className={`${themeClasses.components.card} p-6 rounded-lg`}>
        <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}>Status Colors</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`w-12 h-12 ${themeClasses.status.successBg} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
              <span className="text-white font-bold">✓</span>
            </div>
            <p className={`text-sm ${themeClasses.status.success} font-medium`}>Success</p>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 ${themeClasses.status.warningBg} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
              <span className="text-white font-bold">⚠</span>
            </div>
            <p className={`text-sm ${themeClasses.status.warning} font-medium`}>Warning</p>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 ${themeClasses.status.errorBg} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
              <span className="text-white font-bold">✗</span>
            </div>
            <p className={`text-sm ${themeClasses.status.error} font-medium`}>Error</p>
          </div>
          <div className="text-center">
            <div className={`w-12 h-12 ${themeClasses.status.infoBg} rounded-lg mx-auto mb-2 flex items-center justify-center`}>
              <span className="text-white font-bold">ℹ</span>
            </div>
            <p className={`text-sm ${themeClasses.status.info} font-medium`}>Info</p>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className={`${themeClasses.components.card} p-6 rounded-lg`}>
        <h3 className={`text-lg font-semibold ${themeClasses.text.primary} mb-4`}>Interactive Elements</h3>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <button className={`${themeClasses.components.buttonPrimary} px-6 py-2 rounded-md font-medium`}>
              Primary Button
            </button>
            <button className={`${themeClasses.components.buttonSecondary} px-6 py-2 rounded-md font-medium`}>
              Secondary Button
            </button>
          </div>
          <div className="space-y-2">
            <input 
              type="text" 
              placeholder="Enter text here..." 
              className={`${themeClasses.components.input} w-full px-4 py-2 rounded-md`}
            />
            <textarea 
              placeholder="Enter longer text here..." 
              className={`${themeClasses.components.input} w-full px-4 py-2 rounded-md h-20 resize-none`}
            />
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className={`${themeClasses.components.card} p-4 rounded-lg`}>
          <h4 className={`font-semibold ${themeClasses.text.primary} mb-2`}>Card 1</h4>
          <p className={`${themeClasses.text.secondary} text-sm`}>
            This is a sample card with theme styling applied.
          </p>
        </div>
        <div className={`${themeClasses.components.card} p-4 rounded-lg`}>
          <h4 className={`font-semibold ${themeClasses.text.primary} mb-2`}>Card 2</h4>
          <p className={`${themeClasses.text.secondary} text-sm`}>
            Another card demonstrating the theme system.
          </p>
        </div>
        <div className={`${themeClasses.components.card} p-4 rounded-lg`}>
          <h4 className={`font-semibold ${themeClasses.text.primary} mb-2`}>Card 3</h4>
          <p className={`${themeClasses.text.secondary} text-sm`}>
            Third card showing consistent theming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThemeDemo; 
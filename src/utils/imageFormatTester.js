/**
 * Image Format Testing Utility
 * 
 * This module provides utilities to test different image formats
 * with the R3F Image Reveal Effect.
 */

/**
 * Check if an image format is supported by the browser
 */
export const checkImageFormatSupport = (format) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    
    const dataURL = canvas.toDataURL(`image/${format}`);
    const isSupported = dataURL.startsWith(`data:image/${format}`);
    
    resolve({
      format,
      supported: isSupported,
      dataURL: isSupported ? dataURL : null
    });
  });
};

/**
 * Test image loading with Three.js texture loader
 */
export const testImageLoad = (imagePath) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    img.onload = () => {
      resolve({
        path: imagePath,
        width: img.width,
        height: img.height,
        aspectRatio: img.width / img.height,
        loaded: true
      });
    };
    
    img.onerror = (error) => {
      reject({
        path: imagePath,
        loaded: false,
        error: error.message || 'Failed to load image'
      });
    };
    
    img.src = imagePath;
  });
};

/**
 * Validate image dimensions for optimal performance
 */
export const validateImageDimensions = (width, height) => {
  const isPowerOfTwo = (n) => (n & (n - 1)) === 0;
  
  return {
    width,
    height,
    aspectRatio: width / height,
    isPowerOfTwoWidth: isPowerOfTwo(width),
    isPowerOfTwoHeight: isPowerOfTwo(height),
    isPowerOfTwoBoth: isPowerOfTwo(width) && isPowerOfTwo(height),
    memoryEstimate: `${((width * height * 4) / 1024 / 1024).toFixed(2)} MB`,
    recommendation: getPerfRecommendation(width, height)
  };
};

const getPerfRecommendation = (width, height) => {
  const size = width * height;
  const isPowerOfTwo = (n) => (n & (n - 1)) === 0;
  
  if (size > 4096 * 4096) {
    return 'WARNING: Very large image, may cause performance issues';
  } else if (size > 2048 * 2048) {
    return 'CAUTION: Large image, monitor performance';
  } else if (!isPowerOfTwo(width) || !isPowerOfTwo(height)) {
    return 'INFO: Non-power-of-2 dimensions may have slight performance impact';
  } else {
    return 'OPTIMAL: Good dimensions for GPU performance';
  }
};

/**
 * Test multiple image formats
 */
export const testMultipleFormats = async (basePath, formats = ['jpg', 'png', 'webp']) => {
  const results = [];
  
  for (const format of formats) {
    const imagePath = `${basePath}.${format}`;
    try {
      const result = await testImageLoad(imagePath);
      results.push({
        format,
        success: true,
        ...result
      });
    } catch (error) {
      results.push({
        format,
        success: false,
        ...error
      });
    }
  }
  
  return results;
};

/**
 * Format-specific recommendations
 */
export const getFormatRecommendations = () => ({
  webp: {
    pros: ['Best compression', 'Supports transparency', 'Modern format'],
    cons: ['Older browser compatibility'],
    bestFor: 'Modern web applications with good browser support',
    recommendation: 'RECOMMENDED for new projects'
  },
  jpg: {
    pros: ['Universal support', 'Good compression for photos', 'Small file sizes'],
    cons: ['No transparency', 'Lossy compression'],
    bestFor: 'Photographic content without transparency',
    recommendation: 'SAFE CHOICE for maximum compatibility'
  },
  png: {
    pros: ['Transparency support', 'Lossless compression', 'Universal support'],
    cons: ['Larger file sizes', 'Not ideal for photos'],
    bestFor: 'Graphics with transparency or when lossless quality is needed',
    recommendation: 'GOOD for graphics and logos'
  },
  gif: {
    pros: ['Universal support', 'Small for simple graphics'],
    cons: ['Limited colors (256)', 'No true transparency'],
    bestFor: 'Simple graphics with limited colors',
    recommendation: 'AVOID unless specific requirements'
  }
});

export default {
  checkImageFormatSupport,
  testImageLoad,
  validateImageDimensions,
  testMultipleFormats,
  getFormatRecommendations
};
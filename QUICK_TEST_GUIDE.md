# Quick Image Format Test

This directory contains examples for testing different image formats with the R3F Image Reveal Effect.

## Files Overview

- `App-with-image-switching.jsx` - Enhanced App component with image switching functionality
- `ImageFormatTester.jsx` - Component for testing image format compatibility
- `imageFormatTester.js` - Utility functions for image validation

## Quick Test Setup

### 1. Test Image Switching

Replace your `src/App.jsx` with `src/App-with-image-switching.jsx` to enable image switching:

```bash
# Backup current App.jsx
cp src/App.jsx src/App-original.jsx

# Use the enhanced version
cp src/App-with-image-switching.jsx src/App.jsx
```

### 2. Add Test Images

Add your test images to `public/img/` and update the image list in the new App.jsx:

```jsx
const exampleImages = [
  { name: "WebP Example", path: "./img/textureupscaled.webp" },
  { name: "JPEG Example", path: "./img/your-image.jpg" },
  { name: "PNG Example", path: "./img/your-image.png" },
];
```

### 3. Test Image Format Compatibility

Temporarily add the ImageFormatTester to your app:

```jsx
// In App.jsx, add this import
import ImageFormatTester from './components/ImageFormatTester';

// Add this component above or below the Canvas
<ImageFormatTester />
```

## Supported Formats Examples

Here are examples of what each format looks like in the `imageTexture` prop:

```jsx
// WebP - Modern format with best compression
<RevealImage imageTexture="./img/photo.webp" />

// JPEG - Universal compatibility, good for photos  
<RevealImage imageTexture="./img/photo.jpg" />

// PNG - Supports transparency, good for graphics
<RevealImage imageTexture="./img/graphic.png" />

// GIF - Limited colors but universal support
<RevealImage imageTexture="./img/simple.gif" />

// External URL - Works with any accessible image
<RevealImage imageTexture="https://picsum.photos/1024/1024" />
```

## Performance Testing

The ImageFormatTester component will show you:
- ✅ Which formats load successfully
- 📊 Image dimensions and memory usage
- ⚡ Performance recommendations
- 🎯 GPU optimization suggestions

## Common Issues & Solutions

### "Image not found" errors
```jsx
// ❌ Wrong - missing ./ for public folder
imageTexture="img/photo.jpg"

// ✅ Correct - relative to public folder
imageTexture="./img/photo.jpg"
```

### Large file sizes
```jsx
// Use WebP for better compression
// Before: photo.jpg (2MB)
// After: photo.webp (500KB) - same quality
```

### Performance with large images
```jsx
// Recommended dimensions for GPU optimization:
// 512x512, 1024x1024, 2048x2048 (power of 2)

// Avoid very large images:
// 8192x8192 = 256MB GPU memory!
```

## Reverting Changes

To go back to the original setup:

```bash
# Restore original App.jsx
cp src/App-original.jsx src/App.jsx

# Remove test component (optional)
# Comment out or remove <ImageFormatTester /> from App.jsx
```
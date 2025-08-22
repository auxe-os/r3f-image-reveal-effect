# Image Replacement Guide

This guide explains how to replace the image in the R3F Image Reveal Effect and what formats are supported.

## Quick Start

To replace the current image:

1. **Add your image** to the `public/img/` folder
2. **Update the image path** in `src/App.jsx` on line 40:
   ```jsx
   <RevealImage
     imageTexture="./img/your-image-name.jpg"  // Replace with your image
     revealProgress={revealProgress}
     isFullScreen={isFullScreen}
   />
   ```

## Supported Image Formats

The image reveal effect supports all standard web image formats that Three.js can load:

### ✅ Recommended Formats
- **WebP** (`.webp`) - Best compression, modern browser support
- **JPEG** (`.jpg`, `.jpeg`) - Good compression for photos
- **PNG** (`.png`) - Supports transparency, good for graphics

### ✅ Also Supported
- **GIF** (`.gif`) - Static images only (no animation)
- **BMP** (`.bmp`) - Uncompressed format
- **SVG** (`.svg`) - Vector graphics (limited support)

## Image Guidelines

### Resolution
- **Minimum**: 512x512 pixels
- **Recommended**: 1024x1024 to 2048x2048 pixels
- **Maximum**: 4096x4096 pixels (for performance)

### Aspect Ratio
- Any aspect ratio is supported
- The shader automatically handles aspect ratio preservation
- Square images (1:1) work well for the effect
- Landscape and portrait orientations both work

### File Size
- Keep under 5MB for good loading performance
- WebP format provides the best compression
- Consider using image optimization tools

## Examples

### Using a JPEG image
```jsx
// In src/App.jsx
<RevealImage
  imageTexture="./img/my-photo.jpg"
  revealProgress={revealProgress}
  isFullScreen={isFullScreen}
/>
```

### Using a PNG with transparency
```jsx
// In src/App.jsx  
<RevealImage
  imageTexture="./img/my-graphic.png"
  revealProgress={revealProgress}
  isFullScreen={isFullScreen}
/>
```

### Using multiple images (switching programmatically)
```jsx
// In src/App.jsx - add state for image switching
const [currentImage, setCurrentImage] = useState("./img/image1.jpg");

const handleImageSwitch = () => {
  setCurrentImage(currentImage === "./img/image1.jpg" 
    ? "./img/image2.png" 
    : "./img/image1.jpg"
  );
};

// In the render
<RevealImage
  imageTexture={currentImage}
  revealProgress={revealProgress}
  isFullScreen={isFullScreen}
/>
```

## Troubleshooting

### Image not loading?
1. Check the file path is correct relative to the `public` folder
2. Ensure the image file exists in `public/img/`
3. Verify the file extension matches the actual format
4. Check browser console for loading errors

### Image looks distorted?
- The effect automatically preserves aspect ratio
- Distortion usually indicates a shader issue, not the image format

### Performance issues?
1. Reduce image file size
2. Use WebP format for better compression
3. Ensure image dimensions are power-of-2 (512, 1024, 2048) for GPU optimization

## Advanced Usage

### Loading images from external URLs
```jsx
// Works with external URLs too
<RevealImage
  imageTexture="https://example.com/image.jpg"
  revealProgress={revealProgress}
  isFullScreen={isFullScreen}
/>
```

### Preloading multiple images
```jsx
// Use drei's preload function
import { preload } from '@react-three/drei';

// Preload images
preload('./img/image1.jpg');
preload('./img/image2.png');
```

### Testing Image Formats

The project includes a testing utility to validate image formats and performance. To use it:

1. Import the ImageFormatTester component:
```jsx
import ImageFormatTester from './components/ImageFormatTester';
```

2. Add it to your app temporarily:
```jsx
// Add this to App.jsx for testing
<ImageFormatTester />
```

3. The tester will help you:
   - Validate image loading
   - Check format compatibility  
   - Analyze performance characteristics
   - Get format-specific recommendations

For more technical details, see the [Technical Image Guide](./TECHNICAL_IMAGE_GUIDE.md).
# Technical Guide: Image Loading in R3F Reveal Effect

## How Images Are Loaded

The R3F Image Reveal Effect uses Three.js texture loading through the `@react-three/drei` library. Here's the technical breakdown:

### 1. Texture Loading Pipeline

```jsx
// In RevealImage.jsx
import { useTexture } from "@react-three/drei";

const texture = useTexture(imageTexture, (loadedTexture) => {
  if (materialRef.current) {
    materialRef.current.uTexture = loadedTexture;
  }
});
```

### 2. Supported Formats

The `useTexture` hook supports all formats that the browser's `Image` API can load:

#### Web-Safe Formats ✅
- **JPEG** (`.jpg`, `.jpeg`) - Lossy compression, good for photographs
- **PNG** (`.png`) - Lossless compression, supports transparency
- **WebP** (`.webp`) - Modern format with better compression than JPEG/PNG
- **GIF** (`.gif`) - Limited colors, good for simple graphics
- **BMP** (`.bmp`) - Uncompressed, large file sizes
- **SVG** (`.svg`) - Vector format, scalable (limited Three.js support)

#### Format Compatibility Matrix

| Format | Transparency | Animation | Compression | Browser Support |
|--------|-------------|-----------|-------------|-----------------|
| JPEG   | ❌          | ❌        | Lossy       | 100%            |
| PNG    | ✅          | ❌        | Lossless    | 100%            |
| WebP   | ✅          | ✅*       | Lossy/Lossless | 95%+         |
| GIF    | ✅          | ❌**      | Lossless    | 100%            |
| BMP    | ❌          | ❌        | None        | 95%+            |
| SVG    | ✅          | ❌***     | Vector      | 95%+            |

*WebP animation not supported in Three.js texture loading
**GIF animation not supported in Three.js static textures
***SVG animations not supported in Three.js textures

### 3. Performance Considerations

#### GPU Texture Requirements
- **Power-of-2 dimensions** (512, 1024, 2048) are most efficient
- **Non-power-of-2** textures work but may have performance impact
- **Maximum size** depends on GPU: typically 4096x4096 to 16384x16384

#### Memory Usage
```
Texture Memory = Width × Height × 4 bytes (RGBA)

Examples:
- 1024×1024 = 4 MB GPU memory
- 2048×2048 = 16 MB GPU memory  
- 4096×4096 = 64 MB GPU memory
```

#### Loading Performance
- **File size**: Affects download time
- **Compression**: WebP > JPEG > PNG for file size
- **Decoding**: JPEG fastest, PNG slower, WebP varies

### 4. Implementation Examples

#### Basic Image Replacement
```jsx
// Replace this line in App.jsx:
<RevealImage
  imageTexture="./img/your-image.jpg"  // Your image path
  revealProgress={revealProgress}
  isFullScreen={isFullScreen}
/>
```

#### Dynamic Image Loading
```jsx
import { useState } from 'react';

function App() {
  const [imagePath, setImagePath] = useState("./img/default.jpg");
  
  const handleImageChange = (newPath) => {
    setImagePath(newPath);
  };

  return (
    <RevealImage
      imageTexture={imagePath}
      revealProgress={revealProgress}
      isFullScreen={isFullScreen}
    />
  );
}
```

#### Error Handling
```jsx
import { useTexture } from "@react-three/drei";
import { useState } from "react";

const RevealImageWithErrorHandling = ({ imageTexture, ...props }) => {
  const [error, setError] = useState(null);
  
  try {
    const texture = useTexture(imageTexture, (loadedTexture) => {
      setError(null); // Clear any previous errors
      // ... rest of loading logic
    });
    
    return (
      <mesh>
        <planeGeometry args={[1, 1, 32, 32]} />
        <imageRevealMaterial attach="material" ref={materialRef} />
      </mesh>
    );
  } catch (err) {
    setError(err.message);
    console.error("Failed to load texture:", imageTexture, err);
    return null; // or fallback component
  }
};
```

#### Preloading Images
```jsx
import { preload } from '@react-three/drei';

// Preload images before they're needed
preload('./img/image1.jpg');
preload('./img/image2.png');
preload('./img/image3.webp');

// In component
const images = [
  './img/image1.jpg',
  './img/image2.png', 
  './img/image3.webp'
];

// All images will load faster when used
```

### 5. File Organization

#### Recommended Structure
```
public/
  img/
    textures/           # Main effect images
      hero.webp
      alternate.jpg
    examples/           # Example/demo images
      sample-jpeg.jpg
      sample-png.png
      sample-webp.webp
    fallbacks/          # Fallback images
      default.jpg
      error.png
```

#### Naming Conventions
- Use descriptive names: `hero-image.webp` not `img1.webp`
- Include dimensions: `background-1920x1080.jpg`
- Use format in name if multiple versions: `logo.jpg`, `logo.png`, `logo.webp`

### 6. Testing Different Formats

To test format compatibility:

1. **Add test images** to `public/img/`
2. **Modify App.jsx** to cycle through formats:

```jsx
const testImages = [
  { name: "JPEG", path: "./img/test.jpg" },
  { name: "PNG", path: "./img/test.png" },
  { name: "WebP", path: "./img/test.webp" },
];
```

3. **Monitor performance** in browser DevTools
4. **Check console** for loading errors

### 7. Troubleshooting

#### Common Issues
1. **404 errors**: Check file path and public folder structure
2. **CORS errors**: Ensure images are served from same domain or CORS-enabled
3. **Memory issues**: Reduce image dimensions or use compression
4. **Slow loading**: Optimize file size or use progressive JPEG

#### Debug Tools
```jsx
// Add to RevealImage component for debugging
console.log('Loading texture:', imageTexture);
console.log('Texture loaded:', texture);
console.log('Image dimensions:', texture.image.width, 'x', texture.image.height);
console.log('Texture memory (approx):', 
  (texture.image.width * texture.image.height * 4 / 1024 / 1024).toFixed(2) + ' MB'
);
```

This technical information should help developers understand exactly how image loading works and make informed decisions about format selection and optimization.
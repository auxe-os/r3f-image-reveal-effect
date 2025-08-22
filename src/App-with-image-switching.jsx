import { Canvas } from "@react-three/fiber";
import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { useState } from "react";
import CodropsOverlay from "./components/CodropsOverlay";
import RevealImage from "./components/RevealImage";

function App() {
  // FULLSCREEN MODE
  const [isFullScreen, setIsFullScreen] = useState(false);
  const handleFullScreen = () => setIsFullScreen(!isFullScreen);

  // DARK/LIGHT MODE
  const [isDarkMode, setIsDarkMode] = useState(false);
  const handleDarkMode = () => setIsDarkMode(!isDarkMode);

  // IMAGE SELECTION - EXAMPLE OF SWITCHING BETWEEN DIFFERENT FORMATS
  const [currentImage, setCurrentImage] = useState("./img/textureupscaled.webp");
  
  // Example images - you can add your own images here
  const exampleImages = [
    { name: "WebP Example", path: "./img/textureupscaled.webp" },
    // Add more images in different formats:
    // { name: "JPEG Example", path: "./img/example.jpg" },
    // { name: "PNG Example", path: "./img/example.png" },
  ];

  const handleImageSwitch = () => {
    const currentIndex = exampleImages.findIndex(img => img.path === currentImage);
    const nextIndex = (currentIndex + 1) % exampleImages.length;
    setCurrentImage(exampleImages[nextIndex].path);
  };

  // REVEAL PROGRESS ANIMATION
  const [isRevealed, setIsRevealed] = useState(true);
  const revealProgress = useMotionValue(1);

  const handleReveal = () => {
    animate(revealProgress, isRevealed ? 0 : 1, {
      duration: 1.5,
      ease: "easeInOut",
    });
    setIsRevealed(!isRevealed);
  };

  return (
    <>
      <Canvas
        className="z-10"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: isDarkMode ? "#000" : "#F9FAF7",
        }}
      >
        <RevealImage
          imageTexture={currentImage}
          revealProgress={revealProgress}
          isFullScreen={isFullScreen}
        />
      </Canvas>
      <div className="flex items-center gap-4 absolute z-50 bottom-7 max-sm:bottom-44 left-1/2 -translate-x-1/2 text-nowrap">
        <button
          onClick={handleReveal}
          className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-md"
        >
          Show/hide
        </button>
        <button
          onClick={handleFullScreen}
          className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-md"
        >
          Toggle Fullscreen
        </button>
        {exampleImages.length > 1 && (
          <button
            onClick={handleImageSwitch}
            className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-md"
          >
            Switch Image
          </button>
        )}
        <button
          onClick={handleDarkMode}
          className="px-4 py-2 bg-neutral-800 text-white text-sm rounded-md"
        >
          Dark/light
        </button>
      </div>

      {/* Display current image info */}
      <div className="absolute top-7 right-7 z-50 text-xs opacity-70"
           style={{ color: isDarkMode ? "#fff" : "#000" }}>
        Current: {exampleImages.find(img => img.path === currentImage)?.name || "Custom Image"}
      </div>

      <CodropsOverlay isDarkMode={isDarkMode} />
    </>
  );
}

export default App;
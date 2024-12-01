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

  // REVEAL PROGRESS ANIMATION
  const [isRevealed, setIsRevealed] = useState(false);
  const revealProgress = useMotionValue(0);

  const handleReveal = () => {
    animate(revealProgress, isRevealed ? 0 : 1, {
      duration: 1.5,
      ease: "easeInOut",
    });
    setIsRevealed(!isRevealed);
  };

  return (
    <>
      <Canvas className="z-10"
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#000"
        }}
      >
        <RevealImage
          imageTexture="./img/textureupscaled.webp"
          revealProgress={revealProgress}
          isFullScreen={isFullScreen}
        />
      </Canvas>
      <div className="z-30 flex items-center gap-4 absolute z-50 bottom-7 max-sm:bottom-44 left-1/2 -translate-x-1/2 text-nowrap">
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
      </div>

      <CodropsOverlay />
    </>
  );
}

export default App;

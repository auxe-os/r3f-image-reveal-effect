import { Canvas } from "@react-three/fiber";
import { animate } from "motion";
import { useMotionValue } from "motion/react";
import { useState } from "react";
import RevealImage from "./components/RevealImage";

function App() {
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
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#F9FAF7",
        }}
      >
        <RevealImage
          imageTexture="./img/texture.webp"
          revealProgress={revealProgress}
        />
      </Canvas>

      <button
        onClick={handleReveal}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 bg-gray-800 text-white rounded-md"
      >
        SHOW/HIDE
      </button>
    </>
  );
}

export default App;

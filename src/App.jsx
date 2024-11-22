import { Canvas } from "@react-three/fiber";
import RevealImage from "./components/RevealImage";

function App() {
  return (
    <>
      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          backgroundColor: "#F9FAF7",
        }}
      >
        <RevealImage imageTexture="./img/texture.webp" />
      </Canvas>
    </>
  );
}

export default App;

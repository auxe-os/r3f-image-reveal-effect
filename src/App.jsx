import { Canvas } from "@react-three/fiber";

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
        <mesh>
          <boxGeometry />
          <meshBasicMaterial color="red" />
        </mesh>
      </Canvas>
    </>
  );
}

export default App;

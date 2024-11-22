import { shaderMaterial, useAspect, useTexture } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import PropTypes from "prop-types";
import { useRef } from "react";
import * as THREE from "three";
import imageRevealFragmentShader from "../shaders/imageReveal/fragment.glsl";
import imageRevealVertexShader from "../shaders/imageReveal/vertex.glsl";

const ImageRevealMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
  },
  imageRevealVertexShader,
  imageRevealFragmentShader,
  (self) => {
    self.transparent = true;
  }
);

extend({ ImageRevealMaterial });

const RevealImage = ({ imageTexture }) => {
  const materialRef = useRef();

  // LOADING TEXTURE & HANDLING ASPECT RATIO
  const texture = useTexture(imageTexture, (loadedTexture) => {
    if (materialRef.current) {
      materialRef.current.uTexture = loadedTexture;
    }
  });
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.3);

  return (
    <mesh scale={scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <imageRevealMaterial attach="material" ref={materialRef} />
    </mesh>
  );
};

export default RevealImage;

RevealImage.propTypes = {
  imageTexture: PropTypes.string.isRequired,
};

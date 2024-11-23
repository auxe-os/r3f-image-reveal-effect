import { shaderMaterial, useAspect, useTexture } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import PropTypes from "prop-types";
import { useRef } from "react";
import * as THREE from "three";
import imageRevealFragmentShader from "../shaders/imageReveal/fragment.glsl";
import imageRevealVertexShader from "../shaders/imageReveal/vertex.glsl";

const ImageRevealMaterial = shaderMaterial(
  {
    uTexture: new THREE.Texture(),
    uTime: 0,
    uProgress: 0,
  },
  imageRevealVertexShader,
  imageRevealFragmentShader,
  (self) => {
    self.transparent = true;
  }
);

extend({ ImageRevealMaterial });

const RevealImage = ({
  imageTexture,
  revealProgress,
  isFullScreen = false,
}) => {
  const materialRef = useRef();

  // LOADING TEXTURE & HANDLING ASPECT RATIO
  const texture = useTexture(imageTexture, (loadedTexture) => {
    if (materialRef.current) {
      materialRef.current.uTexture = loadedTexture;
    }
  });
  const { width, height } = texture.image;
  const scale = useAspect(width, height, 0.25);

  // GETTING VIEWPORT SIZE
  const { viewport } = useThree();
  const fullScreenScale = [viewport.width, viewport.height, 1];

  // UPDATING UNIFORMS
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
      materialRef.current.uProgress = revealProgress.get();
    }
  });

  return (
    <mesh scale={isFullScreen ? fullScreenScale : scale}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <imageRevealMaterial attach="material" ref={materialRef} />
    </mesh>
  );
};

export default RevealImage;

RevealImage.propTypes = {
  imageTexture: PropTypes.string.isRequired,
  revealProgress: PropTypes.number.isRequired,
  isFullScreen: PropTypes.bool,
};

uniform sampler2D uTexture;
uniform float uTime;

varying vec2 vUv;

#include ../includes/perlin3dNoise.glsl

void main()
{
    // Displace the UV
    vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

    // Perlin noise
    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2 ));

    // Radial gradient
    float radialGradient = distance(vUv, vec2(0.5)) * 12.5 - 7.0;
    strength += radialGradient;

    // Clamp the value from 0 to 1 & invert it
    strength = clamp(strength, 0.0, 1.0);
    strength = 1.0 - strength;

    // Apply texture
    vec3 textureColor = texture2D(uTexture, vUv).rgb;

    // FINAL COLOR
    gl_FragColor = vec4(textureColor, strength);
}
/**
 * Returns stories paths for layers
 * @param layers
 */
export default function getStoriesPathsForLayers(layers: string[]): string[] {
  return layers.map((layer) => `../node_modules/${layer}/src/**/*.mdx`).concat(
    layers.map((layer) => `../node_modules/${layer}/src/**/*.stories.@(js|ts)`)
  );
} 


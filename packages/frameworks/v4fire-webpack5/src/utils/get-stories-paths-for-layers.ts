/**
 * Returns stories paths for layers
 * 
 * @param {string[]} layers
 */
export default function getStoriesPathsForLayers(layers: string[]): string[] {
  return layers.map((layer) => `../node_modules/${layer}/src/**/*.stories.@(js|jsx|ts|tsx)`);
} 


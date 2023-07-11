/**
 * Returns regex to match given layers.
 * This regex can be used for webpack include/exclude rules.
 * 
 * @param layers
 * 
 * @example
 * ```js
 * layersToRegex(['@v4fire/client', '@v4fire/core']);
 * ->
 * /@v4fire[\\/]client|@v4fire[\\/]core/
 * ```
 */
export default function layersToRegex(layers: string[]): RegExp {
  return new RegExp(layers.map((layer) => layer.split('/').join('[\\\\/]')).join('|'));
}

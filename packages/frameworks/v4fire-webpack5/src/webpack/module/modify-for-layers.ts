import type { Configuration } from 'webpack';
import path from 'path';

import { layersToRegex } from '../../utils';

/**
 * Modifies webpack rules using layers
 * 
 * @param config
 * @param layers 
 */
export function modifyForLayers(config: Configuration, layers: string[]): void {
  const layersRegex = layersToRegex(layers);
  const resolveLayerSrc = (layer: string) => path.resolve(process.cwd(), 'node_modules', ...layer.split('/'), 'src');

  layers.forEach((layer) => {
    config.resolve.alias[layer] = resolveLayerSrc(layer); 
  });

  config.resolve.modules = [
    path.resolve(process.cwd(), 'src'),
    ...layers.map(resolveLayerSrc),
    ...config.resolve.modules,
  ];

  config.module?.rules?.forEach((rule) => {
    if (typeof rule !== 'object') {
      return;
    }

    // Modify babel rule
    if (rule.test?.toString() === '/\\.(mjs|tsx?|jsx?)$/') {
      const {exclude = []} = rule;

      rule.exclude = (excludePath: string): boolean => {
        if (layersRegex.test(excludePath)) {
          return false;
        }

        const result = checkRuleApplies(exclude, excludePath);

        if (result != null) {
          return result;
        }

        if (Array.isArray(exclude)) {
          const result = exclude.reduce<null | boolean>(
            (acc, rule) => (acc != null ? acc : checkRuleApplies(rule, excludePath)),
            null
          );

          if (result != null) {
            return result;
          }
        }

        return /node_modules/.test(excludePath);
      }
    }
  });

}

/**
 * Checks if rule applies to the given value.
 * Returns null if rule type is not supported.
 * 
 * @param rule
 * @param value
 */
function checkRuleApplies(rule: string | RegExp | unknown, value: string): null | boolean {
	if (typeof rule === 'string') {
		return value === rule;
	}

	if (rule instanceof RegExp) {
		return rule.test(value);
	}

	return null;
}

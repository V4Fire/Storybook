import { Configuration } from 'webpack';
import { modifyForLayers } from './modify-for-layers';
import { FrameworkOptions } from '../../types';

export default function applyModule(config: Configuration, options: FrameworkOptions): void {
  if ((options.layers?.length ?? 0) > 0) {
    modifyForLayers(config, options.layers);
  }
}
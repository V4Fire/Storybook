import { DocsPage } from './components/docs-page';

export const parameters: {} = {
  renderer: 'v4fire' as const,
  docs: {
    page: DocsPage 
  }
};

export { render, renderToCanvas } from './render';

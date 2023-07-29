import { DocsPage } from './components/DocsPage';

export const parameters: {} = {
  renderer: 'v4fire' as const,
  docs: {
    page: DocsPage 
  }
};

export { render, renderToCanvas } from './render';

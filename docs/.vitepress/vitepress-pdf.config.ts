import { DefaultTheme } from 'vitepress';
import { defineUserConfig } from 'vitepress-export-pdf';
import vitepressConfig from './config';

function extractLinksFromConfig(config: DefaultTheme.Config) {
  const links: string[] = [];

  function extractLinks(sidebar: DefaultTheme.SidebarItem[]) {
    for (const item of sidebar) {
      if (item.items) extractLinks(item.items);
      else if (item.link) links.push(`${item.link}.html`);
    }
  }

  if (config.sidebar && Array.isArray(config.sidebar)) {
    extractLinks(config.sidebar);
  }

  return links;
}

const links = extractLinksFromConfig(vitepressConfig.themeConfig!);
const routeOrder = ['/index.html', ...links];

export default defineUserConfig({
  outFile: 'lean-js.pdf',
  sorter: (pageA, pageB) => {
    const aIndex = routeOrder.findIndex((route) => route === pageA.path);
    const bIndex = routeOrder.findIndex((route) => route === pageB.path);
    return aIndex - bIndex;
  },
  routePatterns: ['!/', '!/history', '!/standard-api'],
});

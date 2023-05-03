import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'JavaScript Docs',
  description: 'Schulungsmaterial',
  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  themeConfig: {
    logo: '/img/logo.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Basics',
        items: [
          { text: 'Einführung', link: '/basics/' },
          { text: 'Typ System', link: '/basics/types' },
          { text: 'Syntax', link: '/basics/syntax' },
          { text: 'Funktionen', link: '/basics/functions' },
          { text: 'Objekte', link: '/basics/objects' },
        ],
      },
      {
        text: 'OOP',
        items: [
          { text: 'Einführung', link: '/oop/' },
          { text: 'Literale Objekte', link: '/oop/literal-objects' },
          { text: 'Der Prototyp', link: '/oop/the-prototype' },
          { text: 'Der Konstruktor', link: '/oop/the-constructor' },
          { text: 'Vererbung', link: '/oop/inheritance' },
          { text: 'Properties', link: '/oop/properties' },
          { text: 'ES 2015+', link: '/oop/es-next' },
          { text: 'Statische Member', link: '/oop/static-members' },
        ],
      },
    ],

    sidebar: [
      {
        text: 'Basics',
        collapsed: true,
        items: [
          { text: 'Einführung', link: '/basics/' },
          { text: 'Typ System', link: '/basics/types' },
          { text: 'Syntax', link: '/basics/syntax' },
          { text: 'Funktionen', link: '/basics/functions' },
          { text: 'Objekte', link: '/basics/objects' },
        ],
      },
      {
        text: 'OOP',
        collapsed: true,
        items: [
          { text: 'Einführung', link: '/oop/' },
          { text: 'Literale Objekte', link: '/oop/literal-objects' },
          { text: 'Der Prototyp', link: '/oop/the-prototype' },
          { text: 'Der Konstruktor', link: '/oop/the-constructor' },
          { text: 'Vererbung', link: '/oop/inheritance' },
          { text: 'Properties', link: '/oop/properties' },
          { text: 'ES 2015+', link: '/oop/es-next' },
          { text: 'Statische Member', link: '/oop/static-members' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/lean-js/docs' }],
  },
});

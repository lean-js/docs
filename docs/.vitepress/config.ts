import { defineConfig } from 'vitepress';

const topics = [
  {
    text: 'Basics',
    collapsed: true,
    items: [
      { text: 'Einführung', link: '/basics/' },
      { text: 'Typ System', link: '/basics/types' },
      { text: 'Syntax', link: '/basics/syntax' },
      { text: 'Funktionen', link: '/basics/functions' },
      { text: 'Scope', link: '/basics/scope' },
      { text: 'Objekte', link: '/basics/objects' },
    ],
  },
  {
    text: 'OOP',
    collapsed: true,
    items: [
      { text: 'Einführung', link: '/oop/' },
      {
        text: 'Four Layers',
        items: [
          { text: 'Literale Objekte', link: '/oop/literal-objects' },
          { text: 'Der Prototyp', link: '/oop/the-prototype' },
          { text: 'Der Konstruktor', link: '/oop/the-constructor' },
          { text: 'Vererbung', link: '/oop/inheritance' },
        ],
      },
      { text: 'Properties', link: '/oop/properties' },
      { text: 'ES 2015+', link: '/oop/es-next' },
      { text: 'Statische Member', link: '/oop/static-members' },
    ],
  },
  {
    text: 'Advanced',
    collapsed: true,
    items: [
      { text: 'Übersicht', link: '/advanced/' },
      { text: 'Hoisting', link: '/advanced/hoisting' },
      { text: 'Closures', link: '/advanced/closures' },
      { text: 'Keyword this', link: '/advanced/keyword-this' },
      { text: 'Modulares JavaScript', link: '/advanced/modules' },
      { text: 'Asynchronität', link: '/advanced/asynchronous' },
      { text: 'Destructuring/Spread', link: '/advanced/destructuring-spread' },
    ],
  },
  {
    text: 'API',
    collapsed: true,
    items: [{ text: 'Arrays', link: '/standard-api/arrays' }],
  },
  {
    text: 'Geschichte',
    collapsed: true,
    items: [
      { text: 'Übersicht', link: '/history/' },
      {
        text: 'Versionen',
        items: [
          { text: 'ECMAScript 5', link: '/history/es-5' },
          { text: 'ECMAScript 6 / 2015', link: '/history/es-6' },
          { text: 'ECMAScript 7 / 2016', link: '/history/es-7' },
        ],
      },
      { text: 'Evolution', items: [{ text: 'Beispiel 1: Summe', link: '/history/sample-i-sum' }] },
    ],
  },
];

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
    nav: [{ text: 'Home', link: '/' }, ...topics],
    sidebar: topics,
    socialLinks: [{ icon: 'github', link: 'https://github.com/lean-js/docs' }],
  },
});

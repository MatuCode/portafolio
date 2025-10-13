/** @type {import('next-i18next').UserConfig} */
const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localePath: path.resolve('./public/locales'), // Importante: apunta al directorio real
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};

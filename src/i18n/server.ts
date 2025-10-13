import i18n from 'i18next';
import Backend from 'i18next-fs-backend';
import { initReactI18next } from 'react-i18next';
import path from 'path';

const initServerI18n = async () => {
  if (!i18n.isInitialized) {
    await i18n
      .use(Backend)
      .use(initReactI18next)
      .init({
        lng: 'es',
        fallbackLng: 'es',
        backend: {
          loadPath: path.resolve('./public/locales/{{lng}}/common.json'),
        },
        interpolation: {
          escapeValue: false,
        },
        react: {
          useSuspense: false,
        },
      });
  }

  return i18n;
};

export default initServerI18n;

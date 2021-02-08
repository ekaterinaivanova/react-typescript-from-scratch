import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
i18n
  .use(initReactI18next)
  .use(Backend)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init(
    {
      fallbackLng: ['en', 'ru', 'sl'],
      debug: false,
      supportedLngs: ['en', 'ru', 'sl'],
      interpolation: {
        escapeValue: false, // not needed for react as it escapes by default
      },
      backend: {
        loadPath: 'translations/{{lng}}/common.json',
      },
    },
    (error, t) => {
      if (error) console.log(error);
    },
  );

export default i18n;

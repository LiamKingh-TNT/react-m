import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_us from './assets/language/en_us.json'
import zh_tw from './assets/language/zh_tw.json'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en_us: { translation: en_us },
      zh_tw: { translation: zh_tw }
    },
    lng: 'en_us',
    fallbackLng: 'en_us',
    interpolation: { escapeValue: false }
  })

export default i18n
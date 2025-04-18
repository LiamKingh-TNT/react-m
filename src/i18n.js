import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en_us from './assets/language/en_us.json'
import zh_tw from './assets/language/zh_tw.json'

const savedLang = localStorage.getItem('lang') || 'zh_tw'  // 👈 先從 localStorage 讀取語言

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en_us: { translation: en_us },
      zh_tw: { translation: zh_tw }
    },
    lng: savedLang,           // ✅ 使用儲存語言
    fallbackLng: 'zh_tw',
    interpolation: { escapeValue: false }
  })

export default i18n
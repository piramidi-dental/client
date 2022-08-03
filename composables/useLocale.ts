
import { useI18n } from 'vue-i18n'

export const useLocale = () => {
  const { locale } = useI18n()

  const currentLocale = useCookie('locale', { maxAge: 20 * 365 * 24 * 60 * 60 })

  const setLocale = (l: string) => {
    currentLocale.value = l
    locale.value = l
  }

  const setPreferredLanguage = async () => {
    const { data: _locales } = await useCustomFetch('/api/i18n/locales', { key: 'locales' })
    const _localesList = _locales.value as IStringNumberItem[]

    if (!currentLocale.value || !_localesList.map(locale => locale.code).includes(currentLocale.value)) {
      const _defaultLocale = <string>_localesList.find(locale => locale.isDefault)?.code || 'it'

      setLocale(_defaultLocale)
    } else {
      setLocale(currentLocale.value)
    }
  }

  return {
    setPreferredLanguage,
    setLocale,
    locale
  }
}

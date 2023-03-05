import { useI18n } from 'vue-i18n'

export interface ILocales {
  [key: string]: {
    name: string
    iso: string
  }
}

export const availableLocales: ILocales = {
  it: {
    name: 'Italiano',
    iso: 'it'
  },
  en: {
    name: 'English',
    iso: 'en'
  }
}

export function LanguageManager () {
  // composable
  const { locale } = useI18n()
  const localeUserSetting = useCookie('locale')
  const availableIso = Object.keys(availableLocales)

  // methods
  const getSystemLocale = (): string => {
    try {
      let systemLocale = 'it'
      if (window) {
        const windowLanguage = window.navigator.language.substring(0, 2)
        if (availableIso.includes(windowLanguage)) {
          systemLocale = windowLanguage
        }
      }
      return systemLocale
    } catch (error) {
      return 'it'
    }
  }

  const getUserLocale = (): string =>
    localeUserSetting.value && availableIso.includes(localeUserSetting.value)
      ? localeUserSetting.value
      : getSystemLocale()

  // state
  const localeSetting = useState<string>('locale.setting', () =>
    getUserLocale()
  )

  // watchers
  watch(localeSetting, (localeSetting) => {
    localeUserSetting.value = localeSetting
    locale.value = localeSetting
  })

  // init locale
  const init = () => {
    localeSetting.value = getUserLocale()
  }
  locale.value = localeSetting.value

  // lifecycle
  onBeforeMount(() => init())

  return {
    localeSetting,
    init
  }
}

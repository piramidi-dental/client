import { LanguageManager } from './lang'

const AppSetup = () => {
  // declare app information
  const app: IApp = {
    name: 'piramidi.dental',
    author: {
      name: 'liukluke',
      link: 'https://github.com/piramidi-dental'
    }
  }
  useState('app', () => app)

  // use language manager
  const languageManager = LanguageManager()

  return {
    app,
    languageManager
  }
}

export {
  AppSetup
}

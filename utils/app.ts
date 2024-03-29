import { LanguageManager } from './lang'

interface IApp {
  name: string
  author: {
    name: string
    link: string
  }
}

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
  IApp,
  AppSetup
}

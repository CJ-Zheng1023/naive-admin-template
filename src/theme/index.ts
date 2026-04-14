import { ThemeEnum } from '@/enum'
import darkTheme from './dark'
import lightTheme from './light'
export const getThemeConfig = (theme: ThemeEnum) => {
  if (theme === ThemeEnum.DARK) {
    return darkTheme
  } else {
    return lightTheme
  }
}

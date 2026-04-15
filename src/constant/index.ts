import type { GlobalThemeOverrides } from 'naive-ui'
import { darkToLightColor, generateColor } from '@/utils/lib'
export const DARK_PRIMARY_COLOR = '#22d3ee'
export const DARK_SUCCESS_COLOR = '#00ff88'
export const DARK_WARNING_COLOR = '#ff8800'
export const DARK_ERROR_COLOR = '#ff4444'
const LIGHT_PRIMARY_COLOR = darkToLightColor(DARK_PRIMARY_COLOR)
const LIGHT_SUCCESS_COLOR = darkToLightColor(DARK_SUCCESS_COLOR)
const LIGHT_WARNING_COLOR = darkToLightColor(DARK_WARNING_COLOR)
const LIGHT_ERROR_COLOR = darkToLightColor(DARK_ERROR_COLOR)

const lightMainColor = generateColor(LIGHT_PRIMARY_COLOR)
const darkMainColor = generateColor(DARK_PRIMARY_COLOR)
const lightWarningColor = generateColor(LIGHT_WARNING_COLOR)
const darkWarningColor = generateColor(DARK_WARNING_COLOR)
const lightSuccessColor = generateColor(LIGHT_SUCCESS_COLOR)
const darkSuccessColor = generateColor(DARK_SUCCESS_COLOR)
const lightErrorColor = generateColor(LIGHT_ERROR_COLOR)
const darkErrorColor = generateColor(DARK_ERROR_COLOR)

// light主题样式重置
export const lightThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: lightMainColor[0],
    primaryColorHover: lightMainColor[1],
    primaryColorSuppl: lightMainColor[1],
    primaryColorPressed: lightMainColor[2],
    successColor: lightSuccessColor[0],
    successColorHover: lightSuccessColor[1],
    successColorSuppl: lightSuccessColor[1],
    successColorPressed: lightSuccessColor[2],
    warningColor: lightWarningColor[0],
    warningColorHover: lightWarningColor[1],
    warningColorSuppl: lightWarningColor[1],
    warningColorPressed: lightWarningColor[2],
    errorColor: lightErrorColor[0],
    errorColorHover: lightErrorColor[1],
    errorColorSuppl: lightErrorColor[1],
    errorColorPressed: lightErrorColor[2]
  },
  DataTable: {
    tdColor: '#fff',
    borderColor: 'rgb(228, 230, 239)',
    thColor: '#f9fafb',
    tdColorHover: '#fff',
    thColorHover: '#f9fafb',
    paginationMargin: '12px',
    thTextColor: '#6b7280'
  },
  Menu: {
    itemColorHover: 'rgba(255, 255, 255, 0.09)',
    itemTextColor: '#9D9DA6',
    itemIconColor: '#9D9DA6',
    itemTextColorHover: '#fff',
    itemIconColorHover: '#fff',
    fontSize: '16px',
    itemHeight: '36px'
  }
}
// dark主题样式重置
export const darkThemeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: darkMainColor[0],
    primaryColorHover: darkMainColor[1],
    primaryColorSuppl: darkMainColor[1],
    primaryColorPressed: darkMainColor[2],
    successColor: darkSuccessColor[0],
    successColorHover: darkSuccessColor[1],
    successColorSuppl: darkSuccessColor[1],
    successColorPressed: darkSuccessColor[2],
    warningColor: darkWarningColor[0],
    warningColorHover: darkWarningColor[1],
    warningColorSuppl: darkWarningColor[1],
    warningColorPressed: darkWarningColor[2],
    errorColor: darkErrorColor[0],
    errorColorHover: darkErrorColor[1],
    errorColorSuppl: darkErrorColor[1],
    errorColorPressed: darkErrorColor[2]
  },
  Drawer: {
    color: 'rgb(30, 30, 45)'
  },
  DataTable: {
    tdColor: 'rgb(30, 30, 45)',
    borderColor: 'rgb(50, 50, 72)',
    thColor: '#ffffff05',
    tdColorHover: 'rgb(30, 30, 45)',
    thColorHover: '#ffffff05',
    paginationMargin: '12px',
    thTextColor: '#6b7280'
  },
  Menu: {
    fontSize: '16px',
    itemHeight: '36px'
  },
  DatePicker: {
    panelColor: '#1e1e2d'
  },
  Switch: {
    iconColor: '#fff',
    buttonColor: '#1e1e2d'
  }
}

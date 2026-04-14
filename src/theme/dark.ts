import type { ThemeConfigType } from './types'

const config: ThemeConfigType = {
  common: {
    // 线条颜色
    borderColor: 'rgba(255, 255, 255, 0.09)',
    // 文字颜色
    textColor: '#fff',
    // 底色
    bgColor1: '#151521',
    // 主背景色
    bgColor2: '#1e1e2d',
    // 线条阴影
    boxShadow: '0px 0px 20px 0px rgba(180, 190, 220, 0.03)'
  },
  sider: {
    bgColor: '#1e1e2d',
    borderColor: '#393945',
    buttonBgColor: 'rgb(42, 42, 60)',
    buttonTextColorHovered: 'rgb(0, 158, 247)',
    buttonTextColor: 'rgb(86, 86, 116)',
    buttonBoxShadow: 'none'
  },
  header: {
    bgColor: '#1e1e2d',
    boxShadow: '0px 10px 30px 0px rgba(82, 63, 105, 0.05)',
    switchRailColor: '#2a2a3c',
    switchBorderColor: '#3c3f44',
    switchIconColor: '#f2c97d'
  }
}
export default config

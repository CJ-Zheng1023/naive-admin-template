import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Compression from 'vite-plugin-compression'
import svgLoader from 'vite-svg-loader'
import path from 'path'
const resolve = (dir: string): string => path.resolve(__dirname, dir)
const version = process.env.npm_package_version
const assetsDir = 'assets'
export default defineConfig(config => {
  const isProd = config.mode === 'production'
  return {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      vue(),
      svgLoader(),
      vueJsx(),
      Compression({
        threshold: 1024 * 10 //单位为byte，大于这个阈值进行压缩
      }),
      AutoImport({
        imports: ['vue', 'vue-router', 'pinia'],
        vueTemplate: true
      }),
      Components({
        resolvers: [NaiveUiResolver(), IconsResolver()]
      }),
      Icons({
        autoInstall: true
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: '@import "./src/styles/global.less";'
        }
      }
    },
    build: {
      assetsDir,
      rolldownOptions: {
        output: {
          entryFileNames: `${assetsDir}/[name].[hash]-${version}.js`,
          chunkFileNames: `${assetsDir}/[name].[hash]-${version}.js`,
          assetFileNames: `${assetsDir}/[name].[hash]-${version}.[ext]`,
          minify: {
            compress: {
              dropConsole: isProd,
              dropDebugger: isProd
            }
          }
        }
      }
    },
    server: {
      port: 8877,
      open: true,
      host: '0.0.0.0',
      proxy: {
        '/api': {
          target: 'http://10.13.37.154:8083',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  }
})

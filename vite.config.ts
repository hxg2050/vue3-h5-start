import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import { resolve } from 'path'
import autoprefixer from 'autoprefixer'
import postcssPxToViewport8Plugin from 'postcss-px-to-viewport-8-plugin'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      // '/dev-api': {
      //   target: 'http://baidu.com',
      //   changeOrigin: true,
      //   rewrite: (p) => p.replace(/^\/dev-api/, '')
      // }
    }
  },
  plugins: [
    vue(),
    svgLoader(),
    Pages({
      dirs: [
        { dir: 'src/pages', baseRoute: '' }
      ],
      importMode: 'async',
      exclude: ['**/**/components/*.vue'],
    })
  ],
  resolve: {
    alias: {
      // @:src  读取当前src在本地的目录
      '@': resolve(__dirname, './src')
    }
  },
  css: {
    postcss: {
      plugins: [
        autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "last 10 versions"
          ],
          grid: true
        }),
        postcssPxToViewport8Plugin({
          unitToConvert: "px", // 要转化的单位
          viewportWidth: 375, // UI设计稿的宽度
          unitPrecision: 6, // 转换后的精度，即小数点位数
          propList: ["*"], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
          viewportUnit: "vw", // 指定需要转换成的视窗单位，默认vw
          fontViewportUnit: "vw", // 指定字体需要转换成的视窗单位，默认vw
          selectorBlackList: [], // 指定不转换为视窗单位的类名，
          minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
          mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
          replace: true, // 是否转换后直接更换属性值
          exclude: [], // 设置忽略文件，用正则做目录名匹配
          landscape: false // 是否处理横屏情况
        })
      ]
    }
  }
})

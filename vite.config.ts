import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import postCssPxToRem from 'postcss-pxtorem'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
 
  plugins: [vue(),
    Components({
      resolvers: [VantResolver()],
    }),],
  server: {
    host: '0.0.0.0',
    https: false,
    cors: true,
    open: true,
    proxy: {
      '/api': {
        target: 'https://eolink.o.apispace.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      // '/api2': {
      //   target: 'https://eolink.o.apispace.com/456456/function/v001',
      //   changeOrigin: true,
      //   rewrite:(path)=> path.replace(/^\/api2/,'')
      // }
    }
  },
  resolve: {
    alias: [{
      find: '@',
      replacement: resolve(__dirname, 'src')
    }
    ]
  }, css: {
    postcss: { // ⚠️关键代码
      plugins: [
        postCssPxToRem({ // 自适应，px>rem转换
          rootValue: 37.5, // 1rem的大小
          propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
        }),
      ]
    },
  },
  transpileDependencies: true,
  lintOnSave:false,
  chainWebpack: config => {
    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
	}
})

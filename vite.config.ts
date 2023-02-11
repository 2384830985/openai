import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import {Plugin as importToCDN} from "vite-plugin-cdn-import"
import Components from 'unplugin-vue-components/vite'
// @ts-ignore
import viteCompression from 'vite-plugin-compression';
// @ts-ignore
import { viteCommonjs, esbuildCommonjs } from '@originjs/vite-plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer'
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        esbuildCommonjs(['ant-design-vue'])
      ],
    },
  },
  plugins: [
    viteCompression({
      verbose: true, //是否在控制台输出压缩结果
      disable: false, //是否禁用,相当于开关在这里
      threshold: 10240, //体积大于 threshold 才会被压缩,单位 b，1b=8B, 1B=1024KB  那我们这里相当于 9kb多吧，就会压缩
      algorithm: 'gzip', //压缩算法,可选 [ 'gzip' , 'brotliCompress' ,'deflate' , 'deflateRaw']
      ext: '.gz', //文件后缀
    }),
    visualizer({open: true}),
    vue(),
    viteCommonjs(),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3.2.45/dist/vue.global.js',
        },
        // {
        //   name: 'ant-design-vue',
        //   var: 'antd',
        //   path: 'https://unpkg.com/ant-design-vue@3.2.15/dist/antd.js',
        //   css: 'https://unpkg.com/ant-design-vue@3.2.15/dist/antd.css'
        // },
      ]
    })
  ],
  base: './',
  // build: {
  //   rollupOptions: {
  //     external: ["vue", "ant-design-vue"],
  //     plugins: [
  //       externalGlobals({
  //         vue: "Vue",
  //         "ant-design-vue": "antd",
  //       }),
  //     ],
  //   },
  // },
})


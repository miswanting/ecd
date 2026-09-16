import DefaultTheme from 'vitepress/theme'
import type { Theme } from 'vitepress'
import './custom.css'

/**
 * VitePress 默认主题不会自动注册 `theme/components`，
 * 这里用 Vite 的 glob import 把 VuePress 侧 `registerComponentsPlugin`
 * 扫描的同一个目录（`src/components`）全局注册，保持行为一致。
 */
const modules = import.meta.glob('../../../src/components/*.vue', { eager: true })

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    for (const [file, mod] of Object.entries(modules)) {
      const name = file.split('/').pop()!.replace(/\.vue$/, '')
      app.component(name, (mod as { default: any }).default)
    }
  },
} satisfies Theme

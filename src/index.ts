import type { UnpluginFactory } from 'unplugin'
import type { Convert, Options } from './core/types'
import { createUnplugin } from 'unplugin'
import { Generated } from './core/convert'

export const unpluginFactory: UnpluginFactory<Options> = options => ({
  name: 'unplugin-iconify',
  buildStart: async () => {
    /**
     * 解析配置
     */
    let converts: Convert[] = []
    if (Array.isArray(options.convert)) {
      converts = options.convert
    }
    else {
      if (!options.convert) {
        throw new Error('unplugin-iconify 未正确配置')
      }
      converts.push(options.convert)
    }
    /**
     * 开始转换
     */
    for (const option of converts) {
      // 转换
      await Generated(option)
    }
  },
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin

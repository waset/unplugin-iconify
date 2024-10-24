import type { Convert, Loaders, Optional, Options } from './types'
import { getOutputFiles, UnocssLoader } from '../loader'
import { Generateds } from './convert'
import { IconifyIntelliSenseSettings } from './vscode'

export class Iconify {
  /**
   * 配置
   */
  options: Required<Options>

  /**
   * 默认配置
   *
   * @description 统一管理默认值，避免使用 `if` 判断
   */
  defaultOptions: Optional<Options> = {
    output: 'node_modules/.unplugin-iconify',
    iconifyIntelliSense: false,
    convert: {},
  }

  /**
   * 默认转换配置
   *
   * @description 统一管理默认值，避免使用 `if` 判断
   */
  defaultConvert: Optional<Convert> = {
    suffix: '',
    noColor: false,
  }

  /**
   * 构造器
   * @param options Options
   */
  constructor(options: Options) {
    this.options = { ...this.defaultOptions, ...options }
    this.setOptions(this.options)
  }

  /**
   * 设置配置
   * @param options Options
   */
  private setOptions(options: Required<Options>): void {
    if (!Object.keys(options.convert).length) {
      return
    }

    /**
     * 处理 convert 配置并设置默认值
     */
    for (const key in options.convert) {
      const value = options.convert[key]
      if (typeof value === 'string') {
        options.convert[key] = {
          path: value,
          ...this.defaultConvert,
        }
      }
      else if (typeof value === 'object') {
        options.convert[key] = {
          ...this.defaultConvert,
          ...value,
        }
      }
    }

    // 更新配置
    this.options = options
  }

  /**
   * 转换
   */
  async toConvert(): Promise<void> {
    await Generateds(this.options)
  }

  /**
   * 生成的 JSON 文件
   */
  outputs: string[] = []

  /**
   * 获取输出文件
   */
  async toLoad(): Promise<void> {
    this.outputs = getOutputFiles(this.options.output)
  }

  /**
   * 获取加载器
   *
   * @param dir 目录
   */
  getLoaders(dir: string = this.options.output): Record<Loaders, any> {
    return {
      unocss: UnocssLoader(dir),
    }
  }

  /**
   * 生成 Iconify IntelliSense 配置
   */
  async toIntelliSense(): Promise<void> {
    await IconifyIntelliSenseSettings(this.outputs)
  }
}

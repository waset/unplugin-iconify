import type { CustomIconLoader } from './core/types'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { basename, join } from 'node:path'
import { OUTPUT } from './env'

/**
 * unocss 图标加载器
 * @param dir 图标目录
 * @returns unocss 图标配置
 */
export function UnocssLoader(dir: string = OUTPUT): Record<string, CustomIconLoader> {
  const jsons = getOutputFiles(dir)
  const icons: Record<string, CustomIconLoader> = {}
  jsons.forEach((file) => {
    const name = basename(file).replace('.json', '')
    icons[name] = () => JSON.parse(readFileSync(file, 'utf-8'))
  })

  return icons
}

/**
 * 获取所有输出文件
 */
export function getOutputFiles(dir: string = OUTPUT): string[] {
  if (!existsSync(dir)) {
    return []
  }

  const files = readdirSync(dir).filter(file => file.endsWith('.json'))

  return files.map(file => join(dir, file))
}

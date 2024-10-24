import type { CustomIconLoader } from './core/types'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'

/**
 * unocss 图标加载器
 * @param dir 图标目录
 * @returns unocss 图标配置
 */
export function UnocssLoader(dir: string): Record<string, CustomIconLoader> {
  const jsons = getOutputFiles(dir)
  const icons: Record<string, CustomIconLoader> = {}
  jsons.forEach((file) => {
    const name = file.replace('.json', '')
    icons[name] = () => JSON.parse(readFileSync(file, 'utf-8'))
  })

  return icons
}

/**
 * 获取所有输出文件
 */
export function getOutputFiles(dir: string): string[] {
  // 构建 manifest 文件路径
  const srcDir = join(cwd(), dir)

  if (!existsSync(srcDir)) {
    console.error(`\x1B[31m UnocssLoader: ${srcDir} not exists! \x1B[0m`)
    return []
  }

  const files = readdirSync(srcDir).filter(file => file.endsWith('.json'))

  return files.map(file => join(srcDir, file))
}

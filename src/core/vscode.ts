import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { injectJsonc } from './utils'

/**
 * vscode `iconify.customCollectionJsonPaths` 配置
 * @param jsons json 文件路径
 */
export async function IconifyIntelliSenseSettings(jsons: string[]): Promise<void> {
  const dir = join(cwd(), '.vscode')
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true })
  }
  const settingPath = join(dir, 'settings.json')

  if (!existsSync(settingPath)) {
    writeFileSync(settingPath, '{}')
  }

  const settingText = readFileSync(settingPath, 'utf-8')

  writeFileSync(settingPath, injectJsonc(settingText, 'iconify.customCollectionJsonPaths', jsons), {
    encoding: 'utf-8',
  })
}

import type { Convert, Options } from './types'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { removeFigmaClipPathFromSVG, scaleSVG } from '@iconify/tools'
import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse'
import { importDirectory } from '@iconify/tools/lib/import/directory'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'
import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup'

const SUCCESS_COLOR = '\x1B[32m'
const RESET_COLOR = '\x1B[0m'
const NUMBER_COLOR = '\x1B[31m'

/**
 * 转换多个图表集
 * @param options 转换配置
 */
export async function Generateds(options: Required<Options>): Promise<void> {
  if (!options.convert) {
    throw new Error('No convert option')
  }

  for (const key in options.convert) {
    await Generated(key, options.convert[key], join(options.workspace, options.output))
  }

  // eslint-disable-next-line no-console
  console.log(`\n${SUCCESS_COLOR} Converted${RESET_COLOR} ${NUMBER_COLOR}${Object.keys(options.convert).length}${RESET_COLOR} ${SUCCESS_COLOR}collections${RESET_COLOR}`)
}

/**
 * 转换单个图表集
 * @param name 图表集名称
 * @param setting 图表集路径或转换配置
 * @param output 输出路径
 */
export async function Generated(name: string, setting: string | Convert, output: string): Promise<void> {
  const convert = typeof setting === 'string' ? { path: setting } : { ...setting }
  const { path, noColor, suffix } = convert
  if (!existsSync(path)) {
    throw new Error(`Path ${path} does not exist`)
  }

  // Import icons
  const iconSet = await importDirectory(path, {
    prefix: name,
    includeSubDirs: true,
    keyword: (_, name) => {
      return `${name}${(suffix) ? `-${suffix}` : ''}`
    },
  })

  // Validate, clean up, fix palette and optimise
  iconSet.forEachSync((name, type) => {
    if (type !== 'icon')
      return

    const svg = iconSet.toSVG(name)
    if (!svg) {
      // Invalid icon
      iconSet.remove(name)
      return
    }

    // Clean up and optimise icons
    try {
      cleanupSVG(svg)
      removeFigmaClipPathFromSVG(svg)
      scaleSVG(svg, 1 / 48)
      noColor && parseColors(svg, {
        defaultColor: 'currentColor',
        callback: (attr, colorStr, color) => {
          return !color || isEmptyColor(color)
            ? colorStr
            : 'currentColor'
        },
      })
      runSVGO(svg)
    }
    catch (err) {
      // Invalid icon
      console.error(`Error parsing ${name}:`, err)
      iconSet.remove(name)
      return
    }
    // Update icon
    iconSet.fromSVG(name, svg)
    iconSet.resolve(name)
  })

  // Export as IconifyJSON
  const exported = `${JSON.stringify(iconSet.export(), null, '\t')}\n`

  // 构建 manifest 文件路径
  if (!existsSync(output)) {
    mkdirSync(output, { recursive: true })
  }

  // Save to file
  writeFileSync(join(output, `${iconSet.prefix}.json`), exported, 'utf8')

  // eslint-disable-next-line no-console
  console.log(`${SUCCESS_COLOR} Imported ${name}: ${RESET_COLOR}${NUMBER_COLOR}${Object.keys(iconSet.entries).length}${RESET_COLOR}`)
}

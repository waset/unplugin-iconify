import type { Convert } from './types'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { cwd } from 'node:process'
import { isEmptyColor, parseColors } from '@iconify/tools/lib/colors/parse'
import { importDirectory } from '@iconify/tools/lib/import/directory'
import { runSVGO } from '@iconify/tools/lib/optimise/svgo'

import { cleanupSVG } from '@iconify/tools/lib/svg/cleanup'

export async function Generated(option: Convert): Promise<void> {
  const { path, out, prefix, noColor } = option
  if (!existsSync(path)) {
    throw new Error(`Path ${path} does not exist`)
  }
  // Import icons
  const iconSet = await importDirectory(path, {
    prefix,
  })

  // Validate, clean up, fix palette and optimise
  await iconSet.forEach(async (name, type) => {
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
  })

  // Export as IconifyJSON
  const exported = `${JSON.stringify(iconSet.export(), null, '\t')}\n`

  // 构建 manifest 文件路径
  const srcDir = join(cwd(), out || 'temp/icons')
  if (!existsSync(srcDir)) {
    mkdirSync(srcDir, { recursive: true })
  }

  // Save to file
  writeFileSync(`${srcDir}/${iconSet.prefix}.json`, exported, 'utf8')

  // eslint-disable-next-line no-console
  console.log(`\x1B[32m Imported icons: \x1B[0m \x1B[31m ${Object.keys(iconSet.entries).length} \x1B[0m`)
}

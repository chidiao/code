const rawFiles = import.meta.glob('../../cases/**/*', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

export interface SourceFile {
  name: string
  content: string
}

export function getSource(relPath: string): SourceFile | undefined {
  const content = rawFiles[`../../cases/${relPath}`]
  if (content === undefined) return undefined
  return { name: relPath.split('/').pop() ?? relPath, content }
}

export function sliceLines(content: string, from?: number, to?: number): string {
  const lines = content.replace(/\r\n/g, '\n').split('\n')
  const start = from && from > 0 ? from : 1
  const end = to && to >= start ? to : lines.length
  return lines.slice(start - 1, end).join('\n')
}
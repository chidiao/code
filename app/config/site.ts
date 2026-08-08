export const siteConfig = {
  githubRepo: 'https://github.com/chidiao/code',
  githubBranch: 'main'
}

export function githubUrl(rel: string): string {
  return `${siteConfig.githubRepo}/blob/${siteConfig.githubBranch}/${rel}`
}

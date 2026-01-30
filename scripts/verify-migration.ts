import { PrismaClient } from '@prisma/client'

const sourceDb = new PrismaClient({
  datasources: {
    db: {
      url: process.env.SOURCE_DATABASE_URL
    }
  }
})

const targetDb = new PrismaClient()

interface TableCount {
  table: string
  source: number
  target: number
  match: boolean
}

async function verify(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('           DATA INTEGRITY VERIFICATION')
  console.log('═══════════════════════════════════════════════════════════\n')

  if (!process.env.SOURCE_DATABASE_URL) {
    console.error('ERROR: SOURCE_DATABASE_URL required')
    process.exit(1)
  }

  try {
    await sourceDb.$connect()
    await targetDb.$connect()

    const counts: TableCount[] = []

    const tables = [
      { name: 'User', srcFn: () => sourceDb.user.count(), tgtFn: () => targetDb.user.count() },
      { name: 'Account', srcFn: () => sourceDb.account.count(), tgtFn: () => targetDb.account.count() },
      { name: 'Article', srcFn: () => sourceDb.article.count(), tgtFn: () => targetDb.article.count() },
      { name: 'Comment', srcFn: () => sourceDb.comment.count(), tgtFn: () => targetDb.comment.count() },
      { name: 'Bookmark', srcFn: () => sourceDb.bookmark.count(), tgtFn: () => targetDb.bookmark.count() },
      { name: 'ArticleView', srcFn: () => sourceDb.articleView.count(), tgtFn: () => targetDb.articleView.count() },
      { name: 'Newsletter', srcFn: () => sourceDb.newsletter.count(), tgtFn: () => targetDb.newsletter.count() },
      { name: 'SiteSettings', srcFn: () => sourceDb.siteSettings.count(), tgtFn: () => targetDb.siteSettings.count() },
    ]

    console.log('| Table        | Source | Target | Match |')
    console.log('|--------------|--------|--------|-------|')

    let allMatch = true
    for (const t of tables) {
      const [src, tgt] = await Promise.all([t.srcFn(), t.tgtFn()])
      const match = src === tgt
      if (!match) allMatch = false
      
      counts.push({ table: t.name, source: src, target: tgt, match })
      console.log(`| ${t.name.padEnd(12)} | ${String(src).padEnd(6)} | ${String(tgt).padEnd(6)} | ${match ? '✅' : '❌'}    |`)
    }

    console.log('\n═══════════════════════════════════════════════════════════')
    console.log(allMatch ? '✅ ALL TABLES MATCH - MIGRATION VERIFIED' : '❌ MISMATCH DETECTED - CHECK DATA')
    console.log('═══════════════════════════════════════════════════════════\n')

  } finally {
    await sourceDb.$disconnect()
    await targetDb.$disconnect()
  }
}

verify().catch(console.error)

import { PrismaClient } from '@prisma/client'

const SOURCE_URL = process.argv[2] || process.env.SOURCE_DATABASE_URL

interface MigrationStats {
  table: string
  exported: number
  imported: number
  errors: string[]
}

const stats: MigrationStats[] = []

async function migrateTable<T>(
  tableName: string,
  exportFn: () => Promise<T[]>,
  importFn: (data: T[]) => Promise<void>
): Promise<void> {
  const tableStat: MigrationStats = {
    table: tableName,
    exported: 0,
    imported: 0,
    errors: []
  }

  try {
    console.log(`\n📦 Exporting ${tableName}...`)
    const data = await exportFn()
    tableStat.exported = data.length
    console.log(`   Found ${data.length} records`)

    if (data.length > 0) {
      console.log(`📥 Importing ${tableName} to Supabase...`)
      await importFn(data)
      tableStat.imported = data.length
      console.log(`   ✅ Imported ${data.length} records`)
    } else {
      console.log(`   ⏭️  No data to import`)
    }
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error)
    tableStat.errors.push(errorMsg)
    console.error(`   ❌ Error: ${errorMsg}`)
  }

  stats.push(tableStat)
}

async function migrate(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('     VERCEL POSTGRES → SUPABASE MIGRATION')
  console.log('═══════════════════════════════════════════════════════════')

  if (!SOURCE_URL) {
    console.error('\n❌ ERROR: Source database URL is required!')
    console.log('\nUsage:')
    console.log('  npx ts-node scripts/migrate-from-vercel.ts "postgres://..."')
    console.log('  OR')
    console.log('  SOURCE_DATABASE_URL="postgres://..." npx ts-node scripts/migrate-from-vercel.ts')
    process.exit(1)
  }

  const sourceDb = new PrismaClient({
    datasources: { db: { url: SOURCE_URL } }
  })
  const targetDb = new PrismaClient()

  try {
    console.log('\n🔌 Testing database connections...')
    
    console.log('   Source: ', SOURCE_URL.substring(0, 50) + '...')
    await sourceDb.$connect()
    console.log('   ✅ Source connected')

    console.log('   Target: ', process.env.DATABASE_URL?.substring(0, 50) + '...')
    await targetDb.$connect()
    console.log('   ✅ Target connected')

    console.log('\n🗑️  Clearing target tables...')
    await targetDb.account.deleteMany({})
    await targetDb.bookmark.deleteMany({})
    await targetDb.comment.deleteMany({})
    await targetDb.article.deleteMany({})
    await targetDb.user.deleteMany({})
    await targetDb.articleView.deleteMany({})
    await targetDb.newsletter.deleteMany({})
    await targetDb.siteSettings.deleteMany({})
    console.log('   ✅ All tables cleared')

    await migrateTable(
      'SiteSettings',
      () => sourceDb.siteSettings.findMany(),
      async (data) => {
        for (const item of data) {
          await targetDb.siteSettings.create({ data: item })
        }
      }
    )

    await migrateTable(
      'Newsletter',
      () => sourceDb.newsletter.findMany(),
      async (data) => {
        for (const item of data) {
          await targetDb.newsletter.create({ data: item })
        }
      }
    )

    await migrateTable(
      'ArticleView',
      () => sourceDb.articleView.findMany(),
      async (data) => {
        for (const item of data) {
          await targetDb.articleView.create({ data: item })
        }
      }
    )

    await migrateTable(
      'User',
      () => sourceDb.user.findMany(),
      async (data) => {
        for (const user of data) {
          await targetDb.user.create({ data: user })
        }
      }
    )

    await migrateTable(
      'Account',
      () => sourceDb.account.findMany(),
      async (data) => {
        for (const account of data) {
          await targetDb.account.create({ data: account })
        }
      }
    )

    await migrateTable(
      'Article',
      () => sourceDb.article.findMany(),
      async (data) => {
        for (const article of data) {
          await targetDb.article.create({ data: article })
        }
      }
    )

    await migrateTable(
      'Comment',
      () => sourceDb.comment.findMany(),
      async (data) => {
        for (const comment of data) {
          await targetDb.comment.create({ data: comment })
        }
      }
    )

    await migrateTable(
      'Bookmark',
      () => sourceDb.bookmark.findMany(),
      async (data) => {
        for (const bookmark of data) {
          await targetDb.bookmark.create({ data: bookmark })
        }
      }
    )

    console.log('\n═══════════════════════════════════════════════════════════')
    console.log('                    MIGRATION SUMMARY')
    console.log('═══════════════════════════════════════════════════════════')
    console.log('\n| Table        | Exported | Imported | Status |')
    console.log('|--------------|----------|----------|--------|')
    
    let hasErrors = false
    for (const s of stats) {
      const status = s.errors.length > 0 ? '❌ ERROR' : '✅ OK'
      if (s.errors.length > 0) hasErrors = true
      console.log(`| ${s.table.padEnd(12)} | ${String(s.exported).padEnd(8)} | ${String(s.imported).padEnd(8)} | ${status} |`)
    }

    if (hasErrors) {
      console.log('\n⚠️  Some tables had errors:')
      for (const s of stats) {
        if (s.errors.length > 0) {
          console.log(`   ${s.table}: ${s.errors.join(', ')}`)
        }
      }
    }

    console.log('\n═══════════════════════════════════════════════════════════')
    console.log(hasErrors ? '⚠️  MIGRATION COMPLETED WITH ERRORS' : '✅ MIGRATION COMPLETED SUCCESSFULLY')
    console.log('═══════════════════════════════════════════════════════════\n')

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error)
    process.exit(1)
  } finally {
    await sourceDb.$disconnect()
    await targetDb.$disconnect()
  }
}

migrate().catch(console.error)

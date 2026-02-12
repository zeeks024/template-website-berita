import { PrismaClient, Role } from '@prisma/client'

const SOURCE_URL = process.argv[2] || process.env.SOURCE_DATABASE_URL

type SourceColumn = { column_name: string }

type SourceUser = {
  id: string
  email: string
  password: string | null
  name: string | null
  role: string | null
  isVerified: boolean | null
  verificationToken: string | null
  resetToken: string | null
  resetTokenExpiry: Date | null
  createdAt: Date
  updatedAt: Date
  verificationTokenExpiry: Date | null
  avatar: string | null
  bio: string | null
  socialLinks: unknown
}

const VALID_ROLES: Role[] = ['ADMIN', 'WRITER', 'READER']

function toRole(value: string | null): Role {
  if (value && VALID_ROLES.includes(value as Role)) {
    return value as Role
  }
  return 'READER'
}

function toSocialLinks(value: unknown): string | null {
  if (typeof value === 'string') {
    return value
  }

  if (value == null) {
    return null
  }

  try {
    return JSON.stringify(value)
  } catch {
    return null
  }
}

async function migrateUsers(): Promise<void> {
  console.log('═══════════════════════════════════════════════════════════')
  console.log('     USER TABLE MIGRATION (Schema Compatible)')
  console.log('═══════════════════════════════════════════════════════════')

  if (!SOURCE_URL) {
    console.error('\n❌ ERROR: Source database URL is required!')
    process.exit(1)
  }

  const sourceDb = new PrismaClient({
    datasources: { db: { url: SOURCE_URL } }
  })
  const targetDb = new PrismaClient()

  try {
    await sourceDb.$connect()
    await targetDb.$connect()
    console.log('✅ Both databases connected')

    console.log('\n📋 Checking source User table columns...')
    const columns: SourceColumn[] = await sourceDb.$queryRaw`
      SELECT column_name FROM information_schema.columns 
      WHERE table_name = 'User' ORDER BY ordinal_position
    `
    console.log('   Columns:', columns.map(c => c.column_name).join(', '))

    console.log('\n📦 Fetching users with available columns only...')
    
    const users: SourceUser[] = await sourceDb.$queryRaw`
      SELECT 
        id, email, password, name, role, 
        "isVerified", "verificationToken", "resetToken", "resetTokenExpiry",
        "createdAt", "updatedAt", "verificationTokenExpiry",
        avatar, bio, "socialLinks"
      FROM "User"
    `
    
    console.log(`   Found ${users.length} users`)

    if (users.length > 0) {
      console.log('\n📥 Importing users to Supabase...')
      
      for (const user of users) {
        try {
          await targetDb.user.create({
            data: {
              id: user.id,
              email: user.email,
              password: user.password,
              name: user.name || user.email,
              role: toRole(user.role),
              isVerified: user.isVerified ?? false,
              verificationToken: user.verificationToken,
              resetToken: user.resetToken,
              resetTokenExpiry: user.resetTokenExpiry,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt,
              verificationTokenExpiry: user.verificationTokenExpiry,
              avatar: user.avatar,
              bio: user.bio,
              socialLinks: toSocialLinks(user.socialLinks),
              emailVerified: null,
              image: null,
            }
          })
          console.log(`   ✅ User: ${user.email}`)
        } catch (err) {
          console.error(`   ❌ Failed: ${user.email} - ${err}`)
        }
      }
    }

    const count = await targetDb.user.count()
    console.log(`\n✅ Total users in Supabase: ${count}`)

  } catch (error) {
    console.error('\n❌ FATAL ERROR:', error)
    process.exit(1)
  } finally {
    await sourceDb.$disconnect()
    await targetDb.$disconnect()
  }
}

migrateUsers().catch(console.error)

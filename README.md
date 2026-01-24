# Serayu

Portal berita dan CMS untuk wilayah Banjarnegara, dibangun dengan Next.js 16.

## Tech Stack

- **Framework**: Next.js 16.1.1 (App Router)
- **React**: 19.2.3 dengan React Compiler
- **Database**: PostgreSQL dengan Prisma ORM
- **Authentication**: JWT (jose) dengan bcrypt password hashing
- **Styling**: Tailwind CSS 4
- **UI**: Lucide React icons, Framer Motion animations
- **Testing**: Vitest dengan Testing Library

## Prerequisites

- Node.js 18.x atau lebih baru
- PostgreSQL database
- npm atau yarn

## Setup

### 1. Clone & Install

```bash
git clone <repository-url>
cd serayu
npm install
```

### 2. Environment Variables

Salin `.env.example` ke `.env` dan isi dengan konfigurasi Anda:

```bash
cp .env.example .env
```

Variabel yang diperlukan:

| Variable | Deskripsi |
|----------|-----------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret key untuk JWT (min 32 karakter) |
| `NEXT_PUBLIC_SITE_URL` | URL publik situs |
| `SMTP_*` | Konfigurasi email untuk reset password |

### 3. Database Setup

```bash
# Push schema ke database
npx prisma db push

# Seed data awal (opsional)
npx prisma db seed

# Buka Prisma Studio untuk melihat data
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Development server |
| `npm run dev:lan` | Development server (accessible dari LAN) |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint check |
| `npm run test` | Vitest watch mode |
| `npm run test:run` | Vitest single run |

## Project Structure

```
serayu/
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── seed.ts          # Seed data
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── admin/       # Admin dashboard pages
│   │   ├── api/         # API routes
│   │   └── ...          # Public pages
│   ├── components/      # React components
│   ├── lib/             # Utilities & configs
│   └── __tests__/       # Test files
├── public/              # Static assets
└── ...
```

## API Routes

### Articles
- `GET /api/articles` - List articles (supports `?category=`, `?status=`, `?my=true`)
- `POST /api/articles` - Create article (auth required)
- `GET /api/articles/[slug]` - Get single article
- `PUT /api/articles/[slug]` - Update article (auth + ownership required)
- `DELETE /api/articles/[slug]` - Delete article (auth + ownership required)

### Authentication
- `POST /api/auth/login` - Login, returns JWT
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Get current user

### Categories
- `GET /api/categories` - List categories
- `POST /api/categories` - Create category (admin only)
- `DELETE /api/categories` - Delete category (admin only)

## User Roles

| Role | Permissions |
|------|-------------|
| `ADMIN` | Full access: manage all articles, categories, users |
| `WRITER` | Create articles, edit/delete own articles only |

## Testing

```bash
# Run all tests
npm run test:run

# Watch mode
npm run test
```

## Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di [Vercel](https://vercel.com)
3. Set environment variables
4. Deploy

### Self-hosted

```bash
npm run build
npm run start
```

Pastikan `NODE_ENV=production` dan semua environment variables sudah diset.

## License

Private - All rights reserved.

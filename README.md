<div align="center">

# Serayu

### Portal Berita & CMS untuk Wilayah Banjarnegara

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.3-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-336791?style=for-the-badge&logo=postgresql)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-06B6D4?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Private-red?style=for-the-badge)]()

**Serayu** adalah platform portal berita modern yang dibangun khusus untuk mengangkat berita, opini, cerita inspiratif, dan potensi tersembunyi dari wilayah Banjarnegara dan sekitarnya.

[Fitur](#-fitur) •
[Tech Stack](#-tech-stack) •
[Quick Start](#-quick-start) •
[Dokumentasi API](#-dokumentasi-api) •
[Deployment](#-deployment)

</div>

---

## Daftar Isi

- [Fitur](#-fitur)
- [Tech Stack](#-tech-stack)
- [Quick Start](#-quick-start)
- [Struktur Proyek](#-struktur-proyek)
- [Dokumentasi API](#-dokumentasi-api)
- [User Roles & Permissions](#-user-roles--permissions)
- [Scripts](#-scripts)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [Credits](#-credits)
- [License](#-license)

---

## Fitur

### Manajemen Artikel
- CRUD artikel lengkap dengan rich text editor
- Galeri gambar dengan lightbox viewer
- Sistem tag dan kategori
- Draft, publish, dan scheduled publishing
- Auto-save saat mengedit
- Preview artikel sebelum publish

### Dashboard Admin
- Statistik real-time (total artikel, views, users)
- Grafik pengunjung interaktif
- Quick actions untuk akses cepat
- Overview artikel terbaru

### Manajemen Pengguna
- Sistem role-based (Admin, Writer, Reader)
- Autentikasi ganda: NextAuth OAuth (Google) + JWT email/password
- Verifikasi email untuk registrasi
- Reset password via email
- Profil pengguna dengan avatar dan bio

### Kategori & Tag
- Manajemen kategori dinamis
- Artikel by tag endpoint
- Penyimpanan kategori di database

### Algoritma Trending
- Time-weighted scoring untuk konten viral
- Ranking otomatis berdasarkan views dan waktu
- Featured article support

### Sistem Newsletter
- Subscribe dengan verifikasi email
- Unsubscribe one-click
- Newsletter digest via cron job
- Template email profesional

### Bookmark & Komentar
- Simpan artikel favorit
- Sistem komentar per artikel
- Autentikasi untuk komentar

### Upload Gambar
- Upload gambar lokal
- Image gallery untuk artikel
- Caption dan credit gambar
- Optimasi gambar otomatis

### Penjadwalan Publikasi
- Scheduled publishing dengan cron job
- Status: draft, published, scheduled
- Publish otomatis pada waktu yang ditentukan

### Pengaturan Situs
- Konfigurasi hero section
- Pengaturan label section
- Informasi kontak
- Social media links
- Quote of the day

### Keamanan
- Rate limiting untuk endpoint autentikasi
- Password hashing dengan bcrypt
- JWT token authentication
- CSRF protection

### Progressive Web App
- Service worker dengan Serwist
- Offline page support
- Installable sebagai aplikasi
- Web manifest

---

## Tech Stack

| Kategori | Teknologi |
|----------|-----------|
| **Framework** | Next.js 16.1.1 (App Router) |
| **UI Library** | React 19.2.3 + React Compiler |
| **Bahasa** | TypeScript 5.x |
| **Database** | PostgreSQL |
| **ORM** | Prisma |
| **Styling** | Tailwind CSS 4 |
| **Autentikasi** | NextAuth.js v5 + JWT (jose) |
| **Password** | bcryptjs |
| **Email** | Nodemailer (SMTP) |
| **Icons** | Lucide React |
| **Animasi** | Framer Motion |
| **Validasi** | Zod 4 |
| **PWA** | Serwist |
| **Testing** | Vitest + Testing Library |
| **Theming** | next-themes |
| **Date** | date-fns |

---

## Quick Start

### Prerequisites

Pastikan sistem Anda memiliki:

- **Node.js** 18.x atau lebih baru
- **PostgreSQL** database (lokal atau cloud seperti Supabase, Neon)
- **npm** atau **yarn** package manager

### 1. Clone & Install

```bash
git clone <repository-url>
cd serayu
npm install
```

### 2. Setup Environment Variables

Salin file `.env.example` ke `.env`:

```bash
cp .env.example .env
```

Kemudian isi dengan konfigurasi Anda:

| Variable | Deskripsi | Contoh |
|----------|-----------|--------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@localhost:5432/serayu` |
| `DIRECT_URL` | Direct connection (untuk Prisma migrate) | `postgresql://user:pass@localhost:5432/serayu` |
| `JWT_SECRET` | Secret key untuk JWT (min 32 karakter) | Random string 32+ chars |
| `AUTH_SECRET` | NextAuth secret (min 32 karakter) | Random string 32+ chars |
| `NEXT_PUBLIC_SITE_URL` | URL publik situs | `http://localhost:3000` |
| `NEXT_PUBLIC_APP_URL` | URL aplikasi | `http://localhost:3000` |
| `GOOGLE_CLIENT_ID` | Google OAuth Client ID | Dari Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Google OAuth Client Secret | Dari Google Cloud Console |
| `SMTP_HOST` | SMTP server host | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | Email untuk SMTP | `your-email@gmail.com` |
| `SMTP_PASS` | App password untuk SMTP | 16 karakter dari Google |
| `EMAIL_FROM` | Sender email address | `Serayu <your-email@gmail.com>` |

> **Tips Gmail SMTP:**
> 1. Aktifkan 2FA di akun Google
> 2. Buat App Password di [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
> 3. Gunakan password 16 karakter yang dihasilkan

### 3. Setup Database

```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database
npx prisma db push

# Seed data awal (opsional - untuk testing)
npx prisma db seed

# Buka Prisma Studio untuk melihat data (opsional)
npx prisma studio
```

### 4. Run Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

---

## Struktur Proyek

```
serayu/
├── prisma/
│   ├── schema.prisma        # Database schema (models, relations)
│   └── seed.ts              # Seed data untuk development
├── public/
│   └── uploads/             # Uploaded images storage
├── scripts/
│   ├── migrate-from-vercel.ts   # Migration utility
│   └── verify-migration.ts      # Migration verification
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── admin/           # Admin dashboard pages
│   │   │   ├── (protected)/ # Protected admin routes
│   │   │   └── login/       # Admin login page
│   │   ├── api/             # API routes
│   │   │   ├── articles/    # Article endpoints
│   │   │   ├── auth/        # Authentication endpoints
│   │   │   ├── bookmarks/   # Bookmark endpoints
│   │   │   ├── categories/  # Category endpoints
│   │   │   ├── comments/    # Comment endpoints
│   │   │   ├── cron/        # Cron job endpoints
│   │   │   ├── newsletter/  # Newsletter endpoints
│   │   │   ├── settings/    # Site settings endpoints
│   │   │   ├── trending/    # Trending algorithm endpoint
│   │   │   ├── upload/      # Image upload endpoint
│   │   │   ├── users/       # User management endpoints
│   │   │   └── views/       # View tracking endpoint
│   │   ├── article/[slug]/  # Article detail page
│   │   ├── author/[id]/     # Author profile page
│   │   ├── tag/[tag]/       # Articles by tag
│   │   ├── search/          # Search page
│   │   ├── saved/           # Bookmarked articles
│   │   └── ...              # Other public pages
│   ├── components/          # React components
│   │   ├── admin/           # Admin-specific components
│   │   ├── article/         # Article components
│   │   ├── gallery/         # Gallery/lightbox components
│   │   ├── home/            # Homepage components
│   │   ├── layout/          # Header, Footer, etc.
│   │   ├── providers/       # Context providers
│   │   └── ui/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── lib/                 # Utilities & configurations
│   │   ├── auth.ts          # JWT auth utilities
│   │   ├── auth-config.ts   # NextAuth configuration
│   │   ├── email.ts         # Email sending utilities
│   │   ├── prisma.ts        # Prisma client instance
│   │   ├── rate-limit.ts    # Rate limiting logic
│   │   ├── trending.ts      # Trending algorithm
│   │   └── validations.ts   # Zod schemas
│   ├── types/               # TypeScript type definitions
│   ├── auth.ts              # NextAuth handlers
│   └── __tests__/           # Test files
├── .env.example             # Environment variables template
├── package.json             # Dependencies & scripts
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json            # TypeScript configuration
└── vitest.config.ts         # Vitest configuration
```

---

## Dokumentasi API

### Articles

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/articles` | - | List artikel (query: `?category=`, `?status=`, `?my=true`) |
| `POST` | `/api/articles` | Writer+ | Buat artikel baru |
| `GET` | `/api/articles/[slug]` | - | Detail artikel by slug |
| `PUT` | `/api/articles/[slug]` | Owner/Admin | Update artikel |
| `DELETE` | `/api/articles/[slug]` | Owner/Admin | Hapus artikel |
| `GET` | `/api/articles/by-tag/[tag]` | - | Artikel by tag |
| `GET` | `/api/articles/stats` | Admin | Statistik artikel |

### Authentication

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/auth/register` | - | Registrasi user baru |
| `POST` | `/api/auth/login` | - | Login dengan email/password |
| `POST` | `/api/auth/logout` | Yes | Logout user |
| `GET` | `/api/auth/me` | Yes | Get current user |
| `GET` | `/api/auth/verify` | - | Verifikasi email (query: `?token=`) |
| `POST` | `/api/auth/forgot-password` | - | Request reset password |
| `POST` | `/api/auth/reset-password` | - | Reset password dengan token |
| `*` | `/api/auth/[...nextauth]` | - | NextAuth.js handlers |

### Users

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/users` | Admin | List semua users |
| `GET` | `/api/users/[id]` | Admin | Detail user |
| `PUT` | `/api/users/[id]` | Admin | Update user (role, status) |
| `DELETE` | `/api/users/[id]` | Admin | Hapus user |

### Categories

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/categories` | - | List semua kategori |
| `POST` | `/api/categories` | Admin | Buat kategori baru |
| `DELETE` | `/api/categories` | Admin | Hapus kategori |

### Bookmarks

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/bookmarks` | Yes | List bookmark user |
| `POST` | `/api/bookmarks` | Yes | Tambah bookmark |
| `DELETE` | `/api/bookmarks` | Yes | Hapus bookmark |

### Comments

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/comments` | - | List komentar (query: `?slug=`) |
| `POST` | `/api/comments` | Yes | Tambah komentar |

### Newsletter

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/newsletter/subscribe` | - | Subscribe newsletter |
| `GET` | `/api/newsletter/verify` | - | Verifikasi email subscriber |
| `GET` | `/api/newsletter/unsubscribe` | - | Unsubscribe newsletter |

### Settings

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/settings` | - | Get site settings |
| `PUT` | `/api/settings` | Admin | Update site settings |

### Utilities

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `POST` | `/api/views` | - | Record article view |
| `GET` | `/api/trending` | - | Get trending articles |
| `POST` | `/api/upload` | Yes | Upload image |

### Cron Jobs

| Method | Endpoint | Auth | Deskripsi |
|--------|----------|------|-----------|
| `GET` | `/api/cron/publish-scheduled` | Cron Secret | Publish scheduled articles |
| `GET` | `/api/cron/newsletter-digest` | Cron Secret | Send newsletter digest |

---

## User Roles & Permissions

| Permission | READER | WRITER | ADMIN |
|------------|:------:|:------:|:-----:|
| Baca artikel | Ya | Ya | Ya |
| Bookmark artikel | Ya | Ya | Ya |
| Komentar artikel | Ya | Ya | Ya |
| Buat artikel | - | Ya | Ya |
| Edit artikel sendiri | - | Ya | Ya |
| Hapus artikel sendiri | - | Ya | Ya |
| Akses dashboard admin | - | Ya | Ya |
| Edit semua artikel | - | - | Ya |
| Hapus semua artikel | - | - | Ya |
| Manajemen kategori | - | - | Ya |
| Manajemen user | - | - | Ya |
| Ubah role user | - | - | Ya |
| Site settings | - | - | Ya |

---

## Scripts

| Command | Deskripsi |
|---------|-----------|
| `npm run dev` | Jalankan development server |
| `npm run dev:lan` | Development server (accessible dari LAN dengan IP) |
| `npm run build` | Build production |
| `npm run start` | Jalankan production server |
| `npm run lint` | Jalankan ESLint untuk code checking |
| `npm run test` | Jalankan Vitest dalam watch mode |
| `npm run test:run` | Jalankan Vitest sekali (untuk CI) |
| `npm run postinstall` | Auto-generate Prisma client setelah install |
| `npm run migrate:from-vercel` | Migrasi data dari Vercel |
| `npm run migrate:verify` | Verifikasi hasil migrasi |

### Prisma Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema ke database (development)
npx prisma db push

# Buat migration (production)
npx prisma migrate dev --name <migration-name>

# Deploy migrations (production)
npx prisma migrate deploy

# Buka Prisma Studio
npx prisma studio

# Seed database
npx prisma db seed
```

---

## Deployment

### Vercel (Recommended)

1. **Push ke GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import di Vercel**
   - Buka [vercel.com](https://vercel.com)
   - Import repository dari GitHub
   - Framework akan terdeteksi otomatis sebagai Next.js

3. **Set Environment Variables**
   - Tambahkan semua variabel dari `.env.example`
   - Pastikan `AUTH_TRUST_HOST=true` untuk Vercel

4. **Setup Database**
   - Gunakan database PostgreSQL cloud (Supabase, Neon, Railway)
   - Update `DATABASE_URL` di Vercel

5. **Deploy**
   - Vercel akan otomatis build dan deploy
   - Setiap push ke `main` akan trigger auto-deploy

6. **Setup Cron Jobs** (opsional)
   - Buat `vercel.json` untuk cron configuration:
   ```json
   {
     "crons": [
       {
         "path": "/api/cron/publish-scheduled",
         "schedule": "*/5 * * * *"
       },
       {
         "path": "/api/cron/newsletter-digest",
         "schedule": "0 8 * * 1"
       }
     ]
   }
   ```

### Self-hosted

1. **Build aplikasi**
   ```bash
   npm run build
   ```

2. **Set environment variables**
   ```bash
   export NODE_ENV=production
   # Set semua variabel dari .env
   ```

3. **Jalankan server**
   ```bash
   npm run start
   ```

4. **Setup reverse proxy** (opsional)
   - Gunakan Nginx atau Caddy sebagai reverse proxy
   - Konfigurasi SSL dengan Let's Encrypt

5. **Setup cron jobs** (Linux)
   ```bash
   # Edit crontab
   crontab -e
   
   # Tambahkan:
   */5 * * * * curl http://localhost:3000/api/cron/publish-scheduled
   0 8 * * 1 curl http://localhost:3000/api/cron/newsletter-digest
   ```

---

## Contributing

Kami menyambut kontribusi! Silakan baca panduan berikut sebelum berkontribusi:

1. Fork repository ini
2. Buat branch fitur (`git checkout -b feature/fitur-baru`)
3. Commit perubahan (`git commit -m 'Menambahkan fitur baru'`)
4. Push ke branch (`git push origin feature/fitur-baru`)
5. Buat Pull Request

### Development Guidelines

- Gunakan TypeScript strict mode
- Ikuti ESLint rules yang sudah dikonfigurasi
- Tulis test untuk fitur baru
- Gunakan Conventional Commits untuk pesan commit

---

## Credits

Proyek ini dibangun dengan bantuan teknologi open source yang luar biasa:

- [Next.js](https://nextjs.org/) - React framework untuk production
- [React](https://react.dev/) - Library untuk membangun UI
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [NextAuth.js](https://authjs.dev/) - Authentication untuk Next.js
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icon set
- [Serwist](https://serwist.pages.dev/) - PWA tooling for Next.js
- [Vitest](https://vitest.dev/) - Fast unit testing framework
- [Zod](https://zod.dev/) - TypeScript-first schema validation

---

## License

**Private - All rights reserved.**

Proyek ini bersifat privat dan tidak untuk distribusi publik.

---

<div align="center">

**Dibuat untuk Banjarnegara**

*Mengangkat opini, cerita inspiratif, dan potensi tersembunyi dari Banjarnegara.*

</div>

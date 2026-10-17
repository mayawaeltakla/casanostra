import { PrismaClient } from '@prisma/client'

/* قاعدة البيانات أصبحت PostgreSQL فقط (Prisma Postgres).
 *
 * أُزيل الاحتياطي المحلي السابق (`file:../db/custom.db`) عمداً: كان يسمح
 * بتشغيل الإنتاج على قاعدة SQLite محلية بالخطأ ودون أي إنذار. الآن إن غاب
 * DATABASE_URL يتوقف التطبيق بخطأ واضح بدل استخدام قاعدة غير مقصودة. */
if (!process.env.DATABASE_URL) {
  throw new Error(
    'DATABASE_URL is not set. Configure a PostgreSQL connection string (Prisma Postgres) before running the app.',
  )
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'production' ? ['error'] : ['query'],
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db

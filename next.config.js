/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  POSTGRES_URL:
    "postgres://default:ykYzOjv5mtp7@ep-winter-firefly-81478293-pooler.eu-central-1.postgres.vercel-storage.com:5432/librarydb",
  POSTGRES_PRISMA_URL:
    "postgres://default:ykYzOjv5mtp7@ep-winter-firefly-81478293-pooler.eu-central-1.postgres.vercel-storage.com:5432/librarydb?pgbouncer=true&connect_timeout=15",
  POSTGRES_URL_NON_POOLING:
    "postgres://default:ykYzOjv5mtp7@ep-winter-firefly-81478293.eu-central-1.postgres.vercel-storage.com:5432/librarydb",
  POSTGRES_USER: "default",
  POSTGRES_HOST:
    "ep-winter-firefly-81478293-pooler.eu-central-1.postgres.vercel-storage.com",
  POSTGRES_PASSWORD: "ykYzOjv5mtp7",
  POSTGRES_DATABASE: "librarydb",
};

module.exports = nextConfig;

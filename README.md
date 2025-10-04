# Minty – Personal Finance Tracker

Minty is a full-stack financial tracking app inspired by Mint. It’s designed as both a personal tool and a portfolio project to demonstrate full-stack engineering skills.

This project is currently in **Phase 0** (monorepo + API + DB up and running). Future phases will add authentication, Plaid integration, and dashboards.


## 🛠 Tech Stack

- **Monorepo:** [Turborepo](https://turbo.build/) with pnpm workspaces
- **Backend API:** [NestJS](https://nestjs.com/) + [Prisma](https://www.prisma.io/) + [PostgreSQL](https://www.postgresql.org/) + [Redis](https://redis.io/)
- **Web Frontend:** [Next.js](https://nextjs.org/) (apps/web)
- **Mobile App:** [Expo](https://expo.dev/) React Native (apps/mobile)
- **Infrastructure:** [Docker Compose](https://docs.docker.com/compose/) for local Postgres & Redis


## 🚀 Getting Started

### Prerequisites
- **Node.js 18+**
- **pnpm** installed globally
- **Docker Desktop** running (for Postgres & Redis)

### Setup
Clone the repo and install dependencies:

```bash
git clone https://github.com/<your-username>/minty.git
cd minty
pnpm install

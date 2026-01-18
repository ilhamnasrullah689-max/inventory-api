#Inventory API

Simple Node.js REST API for inventory management using PosgreSQL, Docker, adn Docker Compose.
---

## Tech Stack
- Node.js
- PostgreSQL 15
- Docker & Docker Compose
- Traefik (Reverse Proxy)

---
## Project Structure

inventory-api/
├── app/
│ ├── Dockerfile
│ ├── index.js
│ ├── package.json
│ └── package-lock.json
├── db/
│ └── init.sql
├── env/
│ ├── app.env
│ └── db.env
├── docker-compose.yml
├── .gitignore
└── README.md


---

## Services Overview

### 1. API Service
- Node.js Express app
- Exposed internally on port `3000`
- Connected ke PostgreSQL via Docker network

### 2. Database Service
- PostgreSQL 15 (Alpine)
- Persistent volume untuk data
- Auto-initialize schema via `init.sql`

### 3. Traefik
- Reverse proxy & router
- EntryPoint: port `80`
- Routing berdasarkan **Host rule**

---


## ⚙️ Environment Variables

Create environment files:

### `env/app.env`

DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventory
DB_PORT=5432

### `env/db.env`
```env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=inventory


---

## ▶️ Run Application

```bash
docker compose up -d --build

API will be available at:

http://localhost:3000

##Test API

curl http://localhost:3000

##Stop Services 

docker compose down

📌 Notes

Environment files are excluded from version control

PostgreSQL uses Docker volumes for persistence

Designed for local development & learning DevOps fundamentals


---

### 2️⃣ Commit README
```bash
git add README.md
git commit -m "docs: add project README"
git push

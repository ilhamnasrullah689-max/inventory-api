# Inventory API

Simple Node.js REST API for inventory management using PostgreSQL, Docker, and Docker Compose.

This project is built as a learning and practice environment for backend services and DevOps fundamentals.

---

## Tech Stack

- Node.js (Express)
- PostgreSQL 15 (Alpine)
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
- Node.js Express application
- Runs on port `3000`
- Communicates with PostgreSQL via Docker internal network

### 2. Database Service
- PostgreSQL 15 (Alpine)
- Uses Docker volume for persistent data
- Initializes schema automatically using `init.sql`

### 3. Traefik (Reverse Proxy)
- Acts as reverse proxy and router
- Exposes entrypoint on port `80`
- Routing is based on Host rules

---

## Environment Variables

Environment variables are separated into files and **excluded from version control**.

### `env/app.env`
```env
DB_HOST=db
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=inventory
DB_PORT=5432

env/db.env
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=inventory

##How to Run

Make sure Docker and Docker Compose are installed.

From the project root directory:

docker compose up -d --build

##Access Application

API

http://localhost:3000

Test using curl:

curl http://localhost:3000

#Test using curl:

curl http://localhost:3000

Notes

Environment files (*.env) are not committed to Git for security reasons

PostgreSQL data is persisted using Docker volumes

Traefik returns 404 page not found if no router rule matches the request

This project is intended for local development and DevOps learning purposes

License 

MIT 
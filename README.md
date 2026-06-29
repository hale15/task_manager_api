# Task Manager API

![CI/CD Pipeline](https://github.com/hale15/task_manager_api/actions/workflows/ci.yml/badge.svg)

A full-stack task management REST API built with Node.js, Express, PostgreSQL, and Docker.

## Tech Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Auth:** JWT (JSON Web Tokens)
- **Containerization:** Docker + Docker Compose
- **CI/CD:** GitHub Actions
- **Testing:** Jest + Supertest

## API Endpoints

### Auth
- POST /api/auth/register — Register new user
- POST /api/auth/login — Login and get token
- GET /api/auth/me — Get current user (protected)

### Tasks
- GET /api/tasks — Get all tasks (protected)
- POST /api/tasks — Create task (protected)
- GET /api/tasks/:id — Get single task (protected)
- PUT /api/tasks/:id — Update task (protected)
- DELETE /api/tasks/:id — Delete task (protected)

## Run locally with Docker

```bash
docker-compose up --build
```

## Run without Docker

```bash
npm install
npm run setup-db
npm run dev
```
